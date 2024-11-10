// ResultadoONG.js
import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";

const ResultadoONG = () => {
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
                <h2>ONGs Próximas de Você</h2>
                {resultados.length === 0 ? (
                    <p>Nenhuma ONG encontrada.</p>
                ) : (
                    resultados.map((ong) => (
                        <div key={ong.id_ong} className="card">
                            <p>{ong.nome}</p>
                            <p>Endereço: {ong.endereco}</p>
                            <p>Distância: {ong.distance.toFixed(2)} km</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${ong.latitude},${ong.longitude}`}
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

export default ResultadoONG;
