// ResultadoEmpresa.js
import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";

const ResultadoEmpresa = () => {
    const location = useLocation();
    const { resultados, center} = location.state;

    // Verificar se há resultados para evitar erros no mapa
    const points = resultados.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        endereco: point.endereco,
    }));

    return (
        <div class='resultados-mapa-container'>
            <div class='resultados-container'>
                <h2>Empresas Próximas de Você</h2>
                {resultados.length === 0 ? (
                    <p>Nenhuma empresa encontrada.</p>
                ) : (
                    resultados.map((empresa) => (
                        <div key={empresa.id_empresa} className="card">
                            <p>{empresa.nome}</p>
                            <p>Endereço: {empresa.endereco}</p>
                            <p>Distância: {empresa.distance.toFixed(2)} km</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${empresa.latitude},${empresa.longitude}`}
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
                <GoogleMap points={points} center={center} />
            </div>
        </div>
    );
};

export default ResultadoEmpresa;
