import React, { useState } from "react";
import axios from "axios";
import Select from 'react-select';
import '../assets/styles/ModalSugerir.css'

const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", 
  "SP", "SE", "TO"
];

const SugerirPontoPopUp = ({ onClose }) => {
    const [address, setAddress] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [materials, setMaterials] = useState([]);

    const materialOptions = [
        { value: "12", label: "Papel" },
        { value: "1", label: "Papelão" },
        { value: "2", label: "Plástico" },
        { value: "3", label: "Vidro" },
        { value: "4", label: "Metal" },
        { value: "5", label: "Orgânico" },
        { value: "6", label: "Eletrônico" },
    ];

    const handleSubmit = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/sugerir-ponto`, {
                endereco: address,
                cep: cep,
                cidade: city,
                estado: state,
                materiais: materials.map((material) => material.value),
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
                <select className='estados-pop-up' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Selecione o Estado</option>
                    {estadosBrasileiros.map((estado) => (
                        <option key={estado} value={estado}>
                            {estado}
                        </option>
                    ))}
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
                <button onClick={handleSubmit}>Confirmar Sugestão</button>
            </div>
        </div>
    );
};

export default SugerirPontoPopUp;
