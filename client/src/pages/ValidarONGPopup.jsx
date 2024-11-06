// ValidarONGPopup.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ValidarONGPopup = ({ onClose }) => {
    const [ongs, setONGs] = useState([]);
    const googleMapsApiKey = ""; // Substitua pela sua chave da API do Google Maps

    // Função para buscar ONGs pendentes de validação
    const fetchONGsPendentes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/ongs-pendentes");
            setONGs(response.data);
        } catch (error) {
            console.error("Erro ao buscar ONGs pendentes:", error);
        }
    };

    useEffect(() => {
        fetchONGsPendentes();
    }, []);

    const handleValidarONG = async (ong) => {
        const enderecoCompleto = `${ong.endereco}, ${ong.cidade}, ${ong.estado}, ${ong.cep}`;

        try {
            // Valida o endereço usando a API de Geocoding do Google Maps
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoCompleto)}&key=${googleMapsApiKey}`;
            const geocodeResponse = await axios.get(geocodeUrl);

            if (geocodeResponse.data.status === "OK") {
                const location = geocodeResponse.data.results[0].geometry.location;
                const enderecoFormatado = geocodeResponse.data.results[0].formatted_address;
                
                // Extraímos detalhes específicos do endereço (cidade, estado, etc.)
                const addressComponents = geocodeResponse.data.results[0].address_components;
                const cidade = addressComponents.find(component => component.types.includes("administrative_area_level_2"))?.long_name || ong.cidade;
                const estado = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || ong.estado;
                const cep = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || ong.cep;

                // Atualiza o status da ONG no banco de dados e adiciona o endereço completo, latitude e longitude
                await axios.put(`http://localhost:8000/validar-ong/${ong.id_usuario}`, {
                    endereco: enderecoFormatado,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    latitude: location.lat,
                    longitude: location.lng
                });

                alert("ONG validada com sucesso e endereço atualizado!");
                fetchONGsPendentes(); // Atualiza a lista de ONGs pendentes
            } else {
                alert("Endereço inválido. Verifique as informações e tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao validar ONG:", error);
            alert("Erro ao validar ONG. Tente novamente.");
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>ONGs Pendentes de Validação</h2>

                {ongs.length === 0 ? (
                    <p>Nenhuma ONG pendente de validação.</p>
                ) : (
                    ongs.map((ong) => (
                        <div key={ong.id_usuario} className="ong-item">
                            <p><strong>Email:</strong> {ong.email}</p>
                            <p><strong>Nome da Organização:</strong> {ong.nome_org}</p>
                            <p><strong>CNPJ:</strong> {ong.CNPJ}</p>
                            <p><strong>Telefone:</strong> {ong.telefone}</p>
                            <p><strong>Descrição:</strong> {ong.descricao}</p>
                            <p><strong>Tipo de Serviço:</strong> {ong.tipo_servico}</p>
                            <p><strong>Tipo de Transação:</strong> {ong.tipo_transacao}</p>
                            <p><strong>Endereço:</strong> {ong.endereco}</p>
                            <p><strong>CEP:</strong> {ong.cep}</p>
                            <p><strong>Cidade:</strong> {ong.cidade}</p>
                            <p><strong>Estado:</strong> {ong.estado}</p>
                            <button onClick={() => handleValidarONG(ong)}>VALIDAR</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ValidarONGPopup;
