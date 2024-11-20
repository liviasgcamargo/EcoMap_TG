// ResultadoONG.js
import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BotaoVoltar from "../components/BotaoVoltar";

const ResultadoONG = () => {
    const location = useLocation();
    const { resultados, center, raio } = location.state;

    // Verificar se há resultados para evitar erros no mapa
    const points = resultados.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        endereco: point.endereco,
        telefone: point.telefone,
        descricao: point.descricao,
        tipo_servico: point.tipo_servico,
    }));

    const getZoomLevel = (raio) => {
        if (raio <= 5) return 13; // Aproximado para 5 km
        if (raio <= 10) return 12; // Aproximado para 10 km
        if (raio <= 20) return 11; // Aproximado para 20 km
        return 11; // Para áreas maiores
    };

    const zoom = getZoomLevel(raio);

    return (
        <div>
            <Navbar />
            <div className="tela-resultados-container">
                <h2>ONGs Próximas de Você</h2>
                <div className="resultados-mapa-container">
                    <div className="resultados-container">
                        {resultados.length === 0 ? (
                            <p>Nenhuma ONG encontrada.</p>
                        ) : (
                            resultados.map((ong) => (
                                <div key={ong.id_usuario} className="card">
                                    <h2><strong></strong> {ong.nome_org}</h2>
                                    {/* <p><strong>Telefone:</strong> {ong.telefone}</p> */}
                                    <p><strong>Descrição:</strong> {ong.descricao}</p>
                                    <p><strong>Endereço:</strong> {ong.endereco}</p>
                                    <p><strong>Tipo de Serviço:</strong> {ong.tipo_servico}</p>
                                    {/* <p><strong>Contato:</strong> {ong.telefone}</p> */}
                                    <p><strong>Materiais Aceitos:</strong> {ong.materiais_aceitos || "Não especificado"}</p>
                                    <p><strong>Distância:</strong> {ong.distance.toFixed(2)} km</p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${ong.latitude},${ong.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        VER NO MAPA
                                    </a>
                                    <a
                                        href={`https://wa.me/55${ong.telefone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        ENTRAR EM CONTATO
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mapa">
                        <GoogleMap points={points} center={center} zoom={zoom} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResultadoONG;
