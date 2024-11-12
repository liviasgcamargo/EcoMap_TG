// AdminDashboard.js
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdicionarPontoPopup from "../components/AdicionarPontoPopup" // Popup para adicionar pontos
import ValidarEmpresaPopup from "../components/ValidarEmpresaPopup" // Popup para validar empresas
import ValidarONGPopup from "../components/ValidarONGPopup" // Novo popup para validar ONGs
import Logo from '../assets/images/logo.png'
import Sugeridos from '../assets/images/pontos-sugeridos.png'
import AddPonto from '../assets/images/adicionar-ponto.png'
import ValidarEmpresa from '../assets/images/validar-empresa.png'
import ValidarONG from '../assets/images/validar-ong.png'
import { Link } from "react-router-dom"
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
        <nav className="menu_navegacao">
            <Link to="/">
                <img className="logoHeader" src={Logo} alt="Logo" />
            </Link>            
            <a className="btn-sair">
                <Link to="/perfil-adm">Sair</Link>
            </a>
        </nav>

            <h2>Painel de Gerenciamento do Administrador</h2>
            <div className="dashboard-container">

                <button className="btn-dashboard ">
                    <img
                        src={Sugeridos}
                        alt="Ícone do botão"
                        className="button-icon"
                        onClick={handleSuggestedPointsClick}
                    />
                    <p className="titulo-btn-adm">Pontos Sugeridos</p>
                </button>

                <button className="btn-dashboard ">
                    <img
                        src={AddPonto}
                        alt="Ícone do botão"
                        className="button-icon"
                        onClick={handleAdicionarPontoClick}
                    />
                    <p className="titulo-btn-adm">Adicionar Ponto</p>
                </button>

                <button className="btn-dashboard ">
                    <img
                        src={ValidarEmpresa}
                        alt="Ícone do botão"
                        className="button-icon"
                        onClick={handleValidarEmpresaClick}
                    />
                    <p className="titulo-btn-adm">Validar Empresa</p>
                </button>

                <button className="btn-dashboard ">
                    <img
                        src={ValidarONG}
                        alt="Ícone do botão"
                        className="button-icon"
                        onClick={handleValidarONGClick}
                    />
                    <p className="titulo-btn-adm">Validar ONG</p>
                </button>

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
