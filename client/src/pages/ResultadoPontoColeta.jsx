import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";

const ResultadoPontoColeta = () => {
    const location = useLocation();
    const { resultados } = location.state || { resultados: [] };

    // Verificar se há resultados para evitar erros no mapa
    const points = resultados.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        endereco: point.endereco,
    }));

    return (
        <div class='resultados-mapa-container'>
            <div class='resultados-container'>
                <h2>Pontos de Coleta Próximos</h2>
                {resultados.length === 0 ? (
                    <p>Nenhum ponto de coleta encontrado.</p>
                ) : (
                    resultados.map((point) => (
                        <div key={point.id_pontoColeta} className="card">
                            <p>{point.endereco}</p>
                            <p>Distância: {point.distance.toFixed(2)} km</p>
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
            <div class='mapa'>
                <GoogleMap points={points} />
            </div>
        </div>
    );
};

export default ResultadoPontoColeta;
