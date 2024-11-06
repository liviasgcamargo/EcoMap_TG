// AdicionarPontoPopup.js
import React, { useState } from "react";
import axios from "axios";

const AdicionarPontoPopup = ({ onClose }) => {
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [materiais, setMateriais] = useState([]);
    const googleMapsApiKey = ""; // Substitua pela sua chave da API do Google Maps

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setMateriais((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

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
                await axios.post("http://localhost:8000/adicionar-ponto", {
                    endereco: enderecoFormatado,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    latitude: location.lat,
                    longitude: location.lng,
                    materiais,
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
                <h2>Adicionar Novo Ponto de Coleta</h2>
                <label>Endereço:</label>
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                
                <label>CEP:</label>
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />

                <label>Cidade:</label>
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />

                <label>Estado:</label>
                <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />

                <label>Tipos de Material Aceito:</label>
                <div className="material-options">
                    <label><input type="checkbox" value="Papelao" onChange={handleCheckboxChange} /> Papelão</label>
                    <label><input type="checkbox" value="Plastico" onChange={handleCheckboxChange} /> Plástico</label>
                    <label><input type="checkbox" value="Vidro" onChange={handleCheckboxChange} /> Vidro</label>
                    <label><input type="checkbox" value="Metal" onChange={handleCheckboxChange} /> Metal</label>
                    <label><input type="checkbox" value="Organico" onChange={handleCheckboxChange} /> Orgânico</label>
                    <label><input type="checkbox" value="Eletronico" onChange={handleCheckboxChange} /> Eletrônico</label>
                </div>

                <button onClick={handleAdicionarPonto}>ADICIONAR</button>
            </div>
        </div>
    );
};

export default AdicionarPontoPopup;
