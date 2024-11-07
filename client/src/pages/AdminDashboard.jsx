// AdminDashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdicionarPontoPopup from "./AdicionarPontoPopup"; // Popup para adicionar pontos
import ValidarEmpresaPopup from "./ValidarEmpresaPopup"; // Popup para validar empresas
import ValidarONGPopup from "./ValidarONGPopup"; // Novo popup para validar ONGs
import Logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";
import '../assets/styles/AdminDashboard.css'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [showAdicionarPontoPopup, setShowAdicionarPontoPopup] = useState(false);
    const [showValidarEmpresaPopup, setShowValidarEmpresaPopup] = useState(false);
    const [showValidarONGPopup, setShowValidarONGPopup] = useState(false);

    const handleSuggestedPointsClick = () => {
        navigate("/gerenciar-pontos-sugeridos");
    };

    const handleAdicionarPontoClick = () => {
        setShowAdicionarPontoPopup(true); // Mostra o popup de adição de ponto
    };

    const handleValidarEmpresaClick = () => {
        setShowValidarEmpresaPopup(true); // Mostra o popup de validação de empresas
    };

    const handleValidarONGClick = () => {
        setShowValidarONGPopup(true); // Mostra o popup de validação de ONGs
    };

    return (

        <>
            <img className="logoHeader" src={Logo} alt="Logo" />
            <a id="btnContact">
                <Link to="/Login2">Sair</Link>
            </a>

            <div className="dashboard-container">
                <h2>Painel de Gerenciamento do Administrador</h2>
                <button onClick={handleSuggestedPointsClick}>PONTOS SUGERIDOS</button>
                <button onClick={handleAdicionarPontoClick}>ADICIONAR PONTO</button>
                <button onClick={handleValidarEmpresaClick}>VALIDAR EMPRESA</button>
                <button onClick={handleValidarONGClick}>VALIDAR ONG</button>

                {/* Renderiza o popup de adicionar ponto */}
                {showAdicionarPontoPopup && (
                    <AdicionarPontoPopup onClose={() => setShowAdicionarPontoPopup(false)} />
                )}

                {/* Renderiza o popup de validar empresa */}
                {showValidarEmpresaPopup && (
                    <ValidarEmpresaPopup onClose={() => setShowValidarEmpresaPopup(false)} />
                )}

                {/* Renderiza o popup de validar ONG */}
                {showValidarONGPopup && (
                    <ValidarONGPopup onClose={() => setShowValidarONGPopup(false)} />
                )}
            </div>
        </>
    );
};

export default AdminDashboard;
