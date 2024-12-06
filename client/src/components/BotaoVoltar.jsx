import React from "react";
import { useNavigate } from "react-router-dom";

const BotaoVoltar = () => {
    const navigate = useNavigate();

    return (
        <div className="botao-voltar-container" 
        style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "10%"
        }} 
        >
            <button
                onClick={() => navigate(-1)}
                style={{
                    backgroundColor: "#405a41",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "50px",
                    textAlign: "center",
                    width: "30%"
                }}
            >
                VOLTAR
            </button>
        </div>

    );
};

export default BotaoVoltar;
