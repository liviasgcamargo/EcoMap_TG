import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { googleMapsApiKey } from "./ChaveAPIGoogleMaps";

const BuscarOngPopUp = ({ onClose }) => {
    const [address, setAddress] = useState("");
    const [radius, setRadius] = useState(5);
    const [materials, setMaterials] = useState([]);
    const [serviceType, setServiceType] = useState(null);
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
        { value: "7", label: "Roupa" },
        { value: "8", label: "Alimento" },
        { value: "9", label: "Brinquedo" },
        { value: "10", label: "Produto de Higiene" },
        { value: "11", label: "Móveis" },
    ];

    const serviceTypeOptions = [
        { value: "Retira no Local", label: "Retira no Local" },
        { value: "Não Retira", label: "Não Retira" },
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/buscar-ongs`, {
                latitude: lat,
                longitude: lng,
                raio: radius,
                materiais: materials.map((material) => material.value), // Extrai valores dos materiais
                tipoServico: serviceType?.value, // Extrai o valor selecionado
            });

            // Redireciona para a página de resultados com os dados obtidos
            navigate("/resultados-ongs", { state: { resultados: response.data, center: { lat, lng }, raio: radius } });
        } catch (error) {
            console.error("Erro ao buscar ONGs próximas:", error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <div className="popup-content-title">
                    <h1>Buscar ONGs</h1>
                </div>
                <label>Endereço:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Digite o endereço"
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
                <label>Tipo de Serviço:</label>
                <Select
                    options={serviceTypeOptions}
                    value={serviceType}
                    onChange={setServiceType} // Atualiza o estado ao selecionar
                    className="service-type-select"
                    placeholder="Selecione o tipo de serviço..."
                />
                <button onClick={handleSearch}>BUSCAR</button>
            </div>
        </div>
    );
};

export default BuscarOngPopUp;
