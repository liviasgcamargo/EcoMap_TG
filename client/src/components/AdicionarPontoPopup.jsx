import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { googleMapsApiKey } from "./ChaveAPIGoogleMaps";

const AdicionarPontoPopup = ({ onClose }) => {
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [materiais, setMateriais] = useState([]);

    const materiaisOptions = [
        { value: "Papel", label: "Papel" },
        { value: "Papelao", label: "Papelão" },
        { value: "Plastico", label: "Plástico" },
        { value: "Vidro", label: "Vidro" },
        { value: "Metal", label: "Metal" },
        { value: "Organico", label: "Orgânico" },
        { value: "Eletronico", label: "Eletrônico" },
    ];

    const handleAdicionarPonto = async () => {
        const enderecoCompleto = `${endereco}, ${cidade}, ${estado}, ${cep}`;

        try {
            // Valida o endereço usando a API de Geocoding do Google Maps
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoCompleto)}&key=${googleMapsApiKey}`;
            const geocodeResponse = await axios.get(geocodeUrl);

            if (geocodeResponse.data.status === "OK") {
                const location = geocodeResponse.data.results[0].geometry.location;
                const enderecoFormatado = geocodeResponse.data.results[0].formatted_address;

                // Extraímos detalhes específicos do endereço (cidade, estado, etc.)
                const addressComponents = geocodeResponse.data.results[0].address_components;
                const cidade = addressComponents.find(component => component.types.includes("administrative_area_level_2"))?.long_name || "";
                const estado = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || "";
                const cep = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || "";

                // Insere o ponto de coleta no banco de dados com os dados validados e o status como TRUE
                await axios.post(`${process.env.REACT_APP_API_URL}/adicionar-ponto`, {
                    endereco: enderecoFormatado,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    latitude: location.lat,
                    longitude: location.lng,
                    materiais: materiais.map((material) => material.value), // Extrai os valores selecionados
                });

                alert("Ponto de coleta adicionado com sucesso!");
                onClose(); // Fecha o popup
            } else {
                alert("Endereço inválido. Verifique as informações e tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao adicionar ponto de coleta:", error);
            alert("Erro ao adicionar ponto de coleta. Tente novamente.");
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1 className="popup-title">Adicionar Novo Ponto de Coleta</h1>
                <label>Endereço:</label>
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                <label>CEP:</label>
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />

                <label>Cidade:</label>
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />

                <label>Estado:</label>
                <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />

                <label>Tipos de Material Aceito:</label>
                <Select
                    isMulti
                    options={materiaisOptions}
                    value={materiais}
                    onChange={setMateriais}
                    className="material-select"
                    placeholder="Selecione os materiais..."
                />

                <button className="btn-add-ponto" onClick={handleAdicionarPonto}>ADICIONAR</button>
            </div>
        </div>
    );
};

export default AdicionarPontoPopup;
