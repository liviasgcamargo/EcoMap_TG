import React, { useState } from "react";
import '../App.css';
import BuscarPontoPopUp from "./BuscarPontoPopUp";
import BuscarOngPopUp from "./BuscarOngPopUp";
import BuscarEmpresaPopUp from "./BuscarEmpresaPopUp";
import SugerirPontoPopUp from "./SugerirPontoPopUp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";


const Home = () => {
    const [activePopup, setActivePopup] = useState(null);

    const openPopup = (popupType) => {
        setActivePopup(popupType);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    return (
        <div>
            <Navbar />

            <>
                <div className="painelCentral">
                    <h1 className="pontoProximo">
                        Encontre o ponto mais <br /> próximo de você
                    </h1>
                    <p className="encontrarPontos">
                        Localize pontos de coleta próximos e tome a iniciativa de fazer a
                        diferença. Escolha uma das opções abaixo para começar.
                    </p>
                </div>
                {/* Fim dos textos principais da tela principal */}

                {/* Botões de consulta */}
                <div className="btnPrincipais">
                    <button onClick={() => openPopup("descarte")} className="btnPainel" id="btnPontoColeta">
                        quero descartar
                    </button>
                    <button onClick={() => openPopup("doacao")} className="btnPainel" id="btnONG">
                        quero doar
                    </button>
                    <button onClick={() => openPopup("compravenda")} className="btnPainel" id="btnEmpresa">
                        quero comprar <br /> ou vender
                    </button>
                </div>
            </>





            {activePopup === "descarte" && <BuscarPontoPopUp onClose={closePopup} />}
            {activePopup === "doacao" && <BuscarOngPopUp onClose={closePopup} />}
            {activePopup === "compravenda" && <BuscarEmpresaPopUp onClose={closePopup} />}

            <Cards />

            <div className="containerSugerir">
                <h2 className="naoRegistrado">Conhece algum ponto de entrega ainda não registrado?{" "}</h2>
                <span className="sugerir" onClick={() => openPopup("sugestao")}>
                    {activePopup === "sugestao" && <SugerirPontoPopUp onClose={closePopup} />}
                    Clique aqui para sugerir um novo endereço de coleta!
                </span>
            </div>

            <Footer />
        </div>

    );
};

export default Home;
