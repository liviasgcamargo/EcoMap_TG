// ResultadoONG.js
import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BotaoVoltar from "../components/BotaoVoltar";

const ResultadoONG = () => {
    const location = useLocation();
    const { resultados, center } = location.state;

    // Verificar se há resultados para evitar erros no mapa
    const points = resultados.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        endereco: point.endereco,
        telefone: point.telefone,
    }));

    return (
        <div>
            <Navbar />
            {/* <BotaoVoltar /> */}
            <div className="resultados-mapa-container">
                <div className="resultados-container">
                    <h2>ONGs Próximas de Você</h2>
                    {resultados.length === 0 ? (
                        <p>Nenhuma ONG encontrada.</p>
                    ) : (
                        resultados.map((ong) => (
                            <div key={ong.id_usuario} className="card">
                                <h2><strong></strong> {ong.nome_org}</h2>
                                {/* <p><strong>Telefone:</strong> {ong.telefone}</p> */}
                                <p><strong>Endereço:</strong> {ong.endereco}</p>
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
                    <GoogleMap points={points} center={center} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResultadoONG;
