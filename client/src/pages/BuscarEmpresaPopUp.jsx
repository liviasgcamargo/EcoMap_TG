// BuscarEmpresaPopUp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuscarEmpresaPopUp = ({ onClose }) => {
    const [address, setAddress] = useState("");
    const [radius, setRadius] = useState(5);
    const [materials, setMaterials] = useState([]);
    const [transactionType, setTransactionType] = useState("Compra");
    const googleMapsApiKey = "";
    const navigate = useNavigate();

    const handleMaterialChange = (event) => {
        const { value, checked } = event.target;
        setMaterials((prevMaterials) =>
            checked ? [...prevMaterials, value] : prevMaterials.filter((item) => item !== value)
        );
    };

    const handleSearch = async () => {
        try {
            // Geocodificação do endereço usando a API do Google Maps
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${googleMapsApiKey}`;
            const geocodeResponse = await axios.get(geocodeUrl);
            const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

            // Envio das coordenadas e outros parâmetros ao backend
            const response = await axios.post("http://localhost:8000/buscar-empresas", {
                latitude: lat,
                longitude: lng,
                raio: radius,
                materiais: materials,
                tipoTransacao: transactionType,
            });

            // Redireciona para a página de resultados com os dados obtidos
            navigate("/resultados-empresas", { state: { resultados: response.data } });
        } catch (error) {
            console.error("Erro ao buscar empresas próximas:", error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <h2>Buscar Empresas</h2>
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
                <div className="material-checkboxes">
                    <label>
                        <input type="checkbox" value="1" onChange={handleMaterialChange} /> Papelão
                    </label>
                    <label>
                        <input type="checkbox" value="2" onChange={handleMaterialChange} /> Plástico
                    </label>
                    <label>
                        <input type="checkbox" value="3" onChange={handleMaterialChange} /> Vidro
                    </label>
                    <label>
                        <input type="checkbox" value="4" onChange={handleMaterialChange} /> Metal
                    </label>
                    <label>
                        <input type="checkbox" value="5" onChange={handleMaterialChange} /> Orgânico
                    </label>
                    <label>
                        <input type="checkbox" value="6" onChange={handleMaterialChange} /> Eletrônico
                    </label>
                </div>
                <label>Tipo de Transação:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="Compra"
                            checked={transactionType === "Compra"}
                            onChange={() => setTransactionType("Compra")}
                        />
                        Compra
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="Vende"
                            checked={transactionType === "Vende"}
                            onChange={() => setTransactionType("Vende")}
                        />
                        Vende
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="Compra e Vende"
                            checked={transactionType === "Compra e Vende"}
                            onChange={() => setTransactionType("Compra e Vende")}
                        />
                        Compra e Vende
                    </label>
                </div>
                <button onClick={handleSearch}>BUSCAR</button>
            </div>
        </div>
    );
};

export default BuscarEmpresaPopUp;
