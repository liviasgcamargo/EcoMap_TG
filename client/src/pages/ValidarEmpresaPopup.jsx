// ValidarEmpresaPopup.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ValidarEmpresaPopup = ({ onClose }) => {
    const [empresas, setEmpresas] = useState([]);
    const googleMapsApiKey = ""; // Substitua pela sua chave da API do Google Maps

    // Função para buscar empresas pendentes de validação
    const fetchEmpresasPendentes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/empresas-pendentes");
            setEmpresas(response.data);
        } catch (error) {
            console.error("Erro ao buscar empresas pendentes:", error);
        }
    };

    useEffect(() => {
        fetchEmpresasPendentes();
    }, []);

    const handleValidarEmpresa = async (empresa) => {
        const enderecoCompleto = `${empresa.endereco}, ${empresa.cidade}, ${empresa.estado}, ${empresa.cep}`;

        try {
            // Valida o endereço usando a API de Geocoding do Google Maps
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enderecoCompleto)}&key=${googleMapsApiKey}`;
            const geocodeResponse = await axios.get(geocodeUrl);

            if (geocodeResponse.data.status === "OK") {
                const location = geocodeResponse.data.results[0].geometry.location;
                const enderecoFormatado = geocodeResponse.data.results[0].formatted_address;
                
                // Extraímos detalhes específicos do endereço (cidade, estado, etc.)
                const addressComponents = geocodeResponse.data.results[0].address_components;
                const cidade = addressComponents.find(component => component.types.includes("administrative_area_level_2"))?.long_name || empresa.cidade;
                const estado = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || empresa.estado;
                const cep = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || empresa.cep;

                // Atualiza o status da empresa no banco de dados e adiciona o endereço completo, latitude e longitude
                await axios.put(`http://localhost:8000/validar-empresa/${empresa.id_usuario}`, {
                    endereco: enderecoFormatado,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    latitude: location.lat,
                    longitude: location.lng
                });

                alert("Empresa validada com sucesso e endereço atualizado!");
                fetchEmpresasPendentes(); // Atualiza a lista de empresas pendentes
            } else {
                alert("Endereço inválido. Verifique as informações e tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao validar empresa:", error);
            alert("Erro ao validar empresa. Tente novamente.");
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Empresas Pendentes de Validação</h2>

                {empresas.length === 0 ? (
                    <p>Nenhuma empresa pendente de validação.</p>
                ) : (
                    empresas.map((empresa) => (
                        <div key={empresa.id_usuario} className="empresa-item">
                            <p><strong>Email:</strong> {empresa.email}</p>
                            <p><strong>Nome da Organização:</strong> {empresa.nome_org}</p>
                            <p><strong>CNPJ:</strong> {empresa.CNPJ}</p>
                            <p><strong>Telefone:</strong> {empresa.telefone}</p>
                            <p><strong>Descrição:</strong> {empresa.descricao}</p>
                            <p><strong>Tipo de Serviço:</strong> {empresa.tipo_servico}</p>
                            <p><strong>Tipo de Transação:</strong> {empresa.tipo_transacao}</p>
                            <p><strong>Endereço:</strong> {empresa.endereco}</p>
                            <p><strong>CEP:</strong> {empresa.cep}</p>
                            <p><strong>Cidade:</strong> {empresa.cidade}</p>
                            <p><strong>Estado:</strong> {empresa.estado}</p>
                            <button onClick={() => handleValidarEmpresa(empresa)}>VALIDAR</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ValidarEmpresaPopup;
