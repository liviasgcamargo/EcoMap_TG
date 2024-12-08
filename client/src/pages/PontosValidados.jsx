// PontosValidados.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../assets/styles/PontosValidados.css';
import BotaoVoltar from "../components/BotaoVoltar";

const PontosValidados = () => {
    const [pontos, setPontos] = useState([]);
    const [editPonto, setEditPonto] = useState(null);
    const estadosBrasil = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
        "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];
    const tiposMateriais = ["Papel", "Papelão", "Plástico", "Vidro", "Metal", "Orgânico", "Eletrônico"];

    const fetchPontosValidados = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/pontos-validados`);
            const data = response.data.map((ponto) => ({
                ...ponto,
                materiais: ponto.materiais ? ponto.materiais.split(",") : [],
            }));
            setPontos(data);
        } catch (error) {
            console.error("Erro ao buscar pontos validados:", error);
        }
    };

    useEffect(() => {
        fetchPontosValidados();
    }, []);

    const handleEditar = (ponto) => {
        setEditPonto(ponto);
    };

    const handleUpdate = async (id) => {
        try {
            const updatedPonto = {
                ...editPonto,
                materiais: editPonto.materiais.map(material => material) // Envia os materiais como array
            };
            await axios.put(`${process.env.REACT_APP_API_URL}/atualizar-ponto/${id}`, updatedPonto);
            alert("Ponto atualizado com sucesso!");
            setEditPonto(null);
            fetchPontosValidados();
        } catch (error) {
            console.error("Erro ao atualizar ponto:", error);
        }
    };

    const handleExcluir = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/excluir-ponto/${id}`);
            alert("Ponto excluído com sucesso!");
            fetchPontosValidados();
        } catch (error) {
            console.error("Erro ao excluir ponto:", error);
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setEditPonto((prev) => ({
            ...prev,
            materiais: checked
                ? [...prev.materiais, value]
                : prev.materiais.filter((material) => material !== value),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditPonto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <BotaoVoltar />

            <div className="container-validados">
                <div className="texto-acima">
                    <h2>Pontos Validados</h2>
                </div>
                
                {pontos.length === 0 ? (
                    <p>Nenhum ponto validado encontrado.</p>
                ) : (
                    pontos.map((ponto) => (
                        <div key={ponto.id_pontoColeta} className="ponto-validado">
                            {editPonto && editPonto.id_pontoColeta === ponto.id_pontoColeta ? (
                                <div>
                                    <label>Endereço:</label>
                                    <input
                                        type="text"
                                        name="endereco"
                                        value={editPonto.endereco}
                                        onChange={handleChange}
                                    />
                                    <label>CEP:</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={editPonto.cep}
                                        onChange={handleChange}
                                    />
                                    <label>Cidade:</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={editPonto.cidade}
                                        onChange={handleChange}
                                    />
                                    <label>Estado:</label>
                                    <select name="estado" value={editPonto.estado} onChange={handleChange}>
                                        {estadosBrasil.map((estado) => (
                                            <option key={estado} value={estado}>
                                                {estado}
                                            </option>
                                        ))}
                                    </select>
                                    <label>Materiais Aceitos:</label>
                                    <div className="material-checkboxes">
                                        {tiposMateriais.map((material) => (
                                            <label key={material}>
                                                <input
                                                    type="checkbox"
                                                    value={material}
                                                    checked={editPonto.materiais.includes(material)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                {material}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="btn-validated">
                                        <button onClick={() => handleUpdate(ponto.id_pontoColeta)}>Salvar</button>
                                        <button onClick={() => setEditPonto(null)}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p><strong>Endereço:</strong> {ponto.endereco}</p>
                                    <p><strong>CEP:</strong> {ponto.cep}</p>
                                    <p><strong>Cidade:</strong> {ponto.cidade}</p>
                                    <p><strong>Estado:</strong> {ponto.estado}</p>
                                    <p><strong>Latitude:</strong> {ponto.latitude}</p>
                                    <p><strong>Longitude:</strong> {ponto.longitude}</p>
                                    <p><strong>Materiais Aceitos:</strong> {ponto.materiais.join(", ")}</p>
                                    <div className="btn-validated">
                                        <button onClick={() => handleEditar(ponto)}>Editar</button>
                                        <button onClick={() => handleExcluir(ponto.id_pontoColeta)}>Excluir</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default PontosValidados;
