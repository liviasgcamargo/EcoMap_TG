// frontend/src/pages/ResultadoPontoColeta.js
import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResultadoPontoColeta = () => {
    const location = useLocation();
    const { resultados, center } = location.state;

    // Verificar se há resultados para evitar erros no mapa
    const points = resultados.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        endereco: point.endereco,
    }));

    return (
        <div>
 <Navbar />
        <div className="resultados-mapa-container">
            <div className="resultados-container">
                <h2>Pontos de Coleta Próximos</h2>
                {resultados.length === 0 ? (
                    <p>Nenhum ponto de coleta encontrado.</p>
                ) : (
                    resultados.map((point) => (
                        <div key={point.id_pontoColeta} className="card">
                            <p><strong>Endereço:</strong> {point.endereco}</p>
                            <p><strong>Distância:</strong> {point.distance.toFixed(2)} km</p>
                            <p><strong>Materiais Aceitos:</strong> {point.materiais_aceitos}</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver no mapa
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

export default ResultadoPontoColeta;
