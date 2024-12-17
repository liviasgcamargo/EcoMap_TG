import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { googleMapsApiKey } from "./ChaveAPIGoogleMaps";

const BuscarPontoPopUp = ({ onClose }) => {
    const [address, setAddress] = useState("");
    const [radius, setRadius] = useState(5);
    const [materials, setMaterials] = useState([]);
    const navigate = useNavigate();

    // Opções para React Select
    const materialOptions = [
        { value: "12", label: "Papel" },
        { value: "1", label: "Papelão" },
        { value: "2", label: "Plástico" },
        { value: "3", label: "Vidro" },
        { value: "4", label: "Metal" },
        { value: "5", label: "Orgânico" },
        { value: "6", label: "Eletrônico" },
    ];

    const handleSearch = async () => {
        try {
            // Geocodificação do endereço usando a API do Google Maps
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${googleMapsApiKey}`;
            const geocodeResponse = await axios.get(geocodeUrl);
            const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

            // Envio das coordenadas e outros parâmetros ao backend
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/buscar-pontos-coleta`, {
                latitude: lat,
                longitude: lng,
                raio: radius,
                materiais: materials.map((material) => material.value), // Extrai apenas os valores selecionados
            });

            // Redireciona para a página de resultados com os dados obtidos
            navigate("/resultado-ponto-coleta", { state: { resultados: response.data, center: { lat, lng }, raio: radius } });
        } catch (error) {
            console.error("Erro ao buscar pontos próximos:", error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <div className="popup-content-title">
                    <h1>Buscar Ponto de Descarte</h1>
                </div>
                <label>Endereço:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Exemplo: Rua Das Margaridas 12 Jardim das Flores Sorocaba"
                />
                <label>Raio de Distância (km):</label>
                <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                    <option value={20}>20 km</option>
                </select>
                <label>Tipos de Material:</label>
                <Select
                    isMulti
                    options={materialOptions}
                    value={materials}
                    onChange={setMaterials} // Atualiza o estado ao selecionar/desselecionar
                    className="material-select"
                    placeholder="Selecione os materiais..."
                />
                <button onClick={handleSearch}>BUSCAR</button>
            </div>
        </div>
    );
};

export default BuscarPontoPopUp;
