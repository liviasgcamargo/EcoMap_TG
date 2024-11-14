// SugerirPontoPopUp.js
import React, { useState } from "react";
import axios from "axios";
import '../assets/styles/ModalSugerir.css'

const SugerirPontoPopUp = ({ onClose }) => {
    const [address, setAddress] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [materials, setMaterials] = useState([]);

    const handleMaterialChange = (event) => {
        const { value, checked } = event.target;
        setMaterials((prevMaterials) =>
            checked ? [...prevMaterials, value] : prevMaterials.filter((item) => item !== value)
        );
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/sugerir-ponto`, {
                endereco: address,
                cep: cep,
                cidade: city,
                estado: state,
                materiais: materials,
            });
            alert("Ponto de coleta sugerido com sucesso! Aguarde a validação do administrador.");
            onClose();
        } catch (error) {
            console.error("Erro ao sugerir ponto de coleta:", error);
            alert("Ocorreu um erro ao sugerir o ponto de coleta.");
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <div className="popup-content-title">
                <h1>Sugerir novo ponto de coleta</h1>
                </div>
                <label>Endereço:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Digite o endereço" />
                <label>CEP:</label>
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" />
                <label>Cidade:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Digite a cidade" />
                <label>Estado:</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Digite o estado" />
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
                <button onClick={handleSubmit}>Confirmar Sugestão</button>
            </div>
        </div>
    );
};

export default SugerirPontoPopUp;
