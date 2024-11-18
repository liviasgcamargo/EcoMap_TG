import React from "react";
import { useNavigate } from "react-router-dom";

const BotaoVoltar = () => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate(-1)}
            style={{
                backgroundColor: "#405a41",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "50px",
                textAlign: "center"
            }}
        >
            VOLTAR
        </button>
    );
};

export default BotaoVoltar;
