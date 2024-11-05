import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../assets/styles/Faq.css'

const Faq = () => {
    return (
        <>

            <Navbar />

            <>
                <h2>Perguntas Frequentes</h2>
                <div className="heroFAQ">
                    <p>
                        Bem-vindo à nossa seção de Perguntas Frequentes! Aqui, você encontrará
                        respostas para as dúvidas mais comuns sobre como localizar e utilizar os
                        pontos de descarte de coleta seletiva em sua região. <br />
                    </p>
                </div>
                <div className="accordion">
                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section1"
                            className="accordion__input"
                        />
                        <label htmlFor="section1" className="accordion__label">
                            Existe um limite de descarte nos ecopontos?
                        </label>
                        <div className="accordion__content">
                            <p>
                                Sim. Os munícipes podem descartar, de forma gratuita, até 01 m³ de
                                resíduos inertes nos ecopontos.
                            </p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section2"
                            className="accordion__input"
                        />
                        <label htmlFor="section2" className="accordion__label">
                            Quais materiais posso descartar nos ecopontos?
                        </label>
                        <div className="accordion__content">
                            <p>
                                Madeiras de construção civil. <br />
                                Recicláveis. <br />
                                Resíduos eletrônicos e eletrodomésticos. <br />
                                Móveis velhos. <br />
                                Entulho de obras. <br />
                                Podas e vegetação.
                            </p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section3"
                            className="accordion__input"
                        />
                        <label htmlFor="section3" className="accordion__label">
                            Quais materiais não são aceitos nos ecopontos?
                        </label>
                        <div className="accordion__content">
                            <p>
                                Resíduo domiciliar. <br />
                                Óleo automotivo e seus frascos. <br />
                                Tintas. <br />
                                Resíduo infectante. <br />
                                Lâmpadas. <br />
                                Gesso. <br />
                                Sucata de veículos. <br />
                                Pneus. <br />
                                Animais mortos.
                            </p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section4"
                            className="accordion__input"
                        />
                        <label htmlFor="section4" className="accordion__label">
                            Como é feita a coleta seletiva em Sorocaba?
                        </label>
                        <div className="accordion__content">
                            <p>
                                A coleta seletiva em Sorocaba é executada pelas cooperativas que
                                mantém acordo de cooperação com o município, realizam a coleta porta a
                                porta, triagem e comercialização dos resíduos passíveis de reciclagem,
                                as quais recebem apoio da Prefeitura. <br />
                                <br />
                                As cooperativas também coletam, triam e comercializam os equipamentos
                                eletroeletrônicos, como celulares, computadores, impressoras, máquinas
                                fotográficas, calculadoras, bem como as pilhas e baterias, são
                                produtos que podem conter elementos tóxicos e cujo descarte incorreto
                                pode causar danos ao meio ambiente. <br />
                                <br />O Município é atendido por duas cooperativas, a Coopereso e a
                                Coreso, as quais atendem cerca de 28.780 residências, no sistema de
                                coleta porta a porta, e conseguem reciclar cerca de 330 ton/mês de
                                resíduos.
                            </p>
                        </div>
                    </div>
                </div>
            </>


            <Footer />
        </>
    )
}

export default Faq