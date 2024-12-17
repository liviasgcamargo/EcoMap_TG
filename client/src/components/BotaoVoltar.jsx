import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/AdminDashboard.css';

const BotaoVoltar = () => {
    const navigate = useNavigate();

    return (
        <div className="botao-voltar-container">
            <button onClick={() => navigate(-1)}>VOLTAR</button>
        </div>
    );
};

export default BotaoVoltar;
