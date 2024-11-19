import React, { useEffect, useState } from "react";
import BotaoVoltar from "../components/BotaoVoltar";
import axios from "axios";

const PontosSugeridos = () => {
    const [pontos, setPontos] = useState([]);

    const fetchPontosSugeridos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/pontos-sugeridos`);
            const data = response.data.map(ponto => ({
                ...ponto,
                materiais: ponto.materiais ? ponto.materiais.split(",") : [] // Converte a string em array
            }));
            setPontos(data);
        } catch (error) {
            console.error("Erro ao buscar pontos sugeridos:", error);
        }
    };

    useEffect(() => {
        fetchPontosSugeridos();
    }, []);

    const handleAprovar = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/aprovar-ponto/${id}`);
            alert("Ponto aprovado com sucesso!");
            fetchPontosSugeridos();
        } catch (error) {
            console.error("Erro ao aprovar ponto:", error);
        }
    };

    const handleExcluir = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/excluir-ponto/${id}`);
            alert("Ponto excluído com sucesso!");
            fetchPontosSugeridos();
        } catch (error) {
            console.error("Erro ao excluir ponto:", error);
        }
    };

    return (
        <>
        <BotaoVoltar/>
            <div className="suggested-points-container">
                <h2>Pontos Sugeridos para Validação</h2>
                {pontos.length === 0 ? (
                    <p>Nenhum ponto sugerido encontrado.</p>
                ) : (
                    pontos.map((ponto) => (
                        <div key={ponto.id_pontoColeta} className="suggested-point">
                            <p><strong>Endereço:</strong> {ponto.endereco}</p>
                            <p><strong>CEP:</strong> {ponto.cep}</p>
                            <p><strong>Cidade:</strong> {ponto.cidade}</p>
                            <p><strong>Estado:</strong> {ponto.estado}</p>
                            <p><strong>Latitude:</strong> {ponto.latitude}</p>
                            <p><strong>Longitude:</strong> {ponto.longitude}</p>
                            <p><strong>Materiais Aceitos:</strong> {ponto.materiais.join(", ")}</p>
                            <div className="btn-sugeridos">
                                <button onClick={() => handleAprovar(ponto.id_pontoColeta)}>Aprovar</button>
                                <button onClick={() => handleExcluir(ponto.id_pontoColeta)}>Excluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default PontosSugeridos;
