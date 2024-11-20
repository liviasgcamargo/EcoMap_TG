// ResultadoEmpresa.js
import React from "react";
import { useLocation } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResultadoEmpresa = () => {
    const location = useLocation();
    const { resultados, center, raio} = location.state;

    // Verificar se há resultados para evitar erros no mapa
    const points = resultados.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        endereco: point.endereco,
        telefone: point.telefone,
        transacao: point.transacao,
        descricao: point.descricao,
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
        <div class='resultados-mapa-container'>
            <div class='resultados-container'>
                <h2>Empresas Próximas de Você</h2>
                {resultados.length === 0 ? (
                    <p>Nenhuma empresa encontrada.</p>
                ) : (
                    resultados.map((empresa) => (
                        <div key={empresa.id_empresa} className="card">
                            <h2><strong></strong> {empresa.nome_org}</h2>
                            <p><strong>Tipo de Transação:</strong> {empresa.tipo_transacao}</p>
                            <p><strong>Descrição:</strong> {empresa.descricao}</p>
                            {/* <p>{empresa.nome}</p> */}
                            <p><strong>Endereço:</strong> {empresa.endereco}</p>
                            <p><strong>Distância:</strong> {empresa.distance.toFixed(2)} km</p>
                            <p><strong>Materiais Aceitos:</strong> {empresa.materiais_aceitos || "Não especificado"}</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${empresa.latitude},${empresa.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver no mapa
                            </a>
                            <a
                                    href={`https://wa.me/55${empresa.telefone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ENTRAR EM CONTATO
                                </a>
                        </div>
                    ))
                )}
            </div>
            <div class='mapa'>
                <GoogleMap points={points} center={center} zoom={zoom} />
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default ResultadoEmpresa;
