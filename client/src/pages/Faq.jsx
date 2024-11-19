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
                    <p className='paragrafo-faq'>
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
                            <ul>
                                <li>Madeiras de construção civil. </li>
                                <li>Recicláveis.</li>
                                <li>Resíduos eletrônicos e eletrodomésticos.</li>
                                <li>Móveis velhos.</li>
                                <li>Entulho de obras.</li>
                                <li>Podas e vegetação.</li>
                            </ul>

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
                            <ul>
                                <li>Resíduo domiciliar.</li>
                                <li>Óleo automotivo e seus frascos.</li>
                                <li>Tintas. </li>
                                <li>Resíduo infectante.</li>
                                <li>Lâmpadas.</li>
                                <li>Gesso.</li>
                                <li>Sucata de veículos. </li>
                                <li>Pneus.</li>
                                <li>Animais mortos.</li>
                            </ul>

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

                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section5"
                            className="accordion__input"
                        />
                        <label htmlFor="section5" className="accordion__label">
                            É possível fazer a coleta de materiais diretamente no meu endereço?                        </label>
                        <div className="accordion__content">
                            <p>
                                Alguns pontos de coleta oferecem serviços de coleta no local, especialmente para materiais grandes ou em grande quantidade. Consulte o site do ponto de coleta ou entre em contato diretamente para saber se essa opção está disponível.
                            </p>
                        </div>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section6"
                            className="accordion__input"
                        />
                        <label htmlFor="section6" className="accordion__label">
                            Os pontos de coleta seletiva são gratuitos?                                              </label>
                        <div className="accordion__content">
                            <p>
                                Sim, os pontos de coleta seletiva são gratuitos. Você pode levar os seus materiais recicláveis sem custos. No entanto, é importante verificar com o ponto específico, pois alguns podem cobrar por serviços adicionais, como o transporte de grandes volumes.                            </p>
                        </div>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="example_accordion"
                            id="section7"
                            className="accordion__input"
                        />

                        <label htmlFor="section7" className="accordion__label">
                            É possível fazer a coleta de materiais diretamente no meu endereço?                        </label>
                        <div className="accordion__content">
                            <p>
                                Alguns pontos de coleta oferecem serviços de coleta no local, especialmente para materiais grandes ou em grande quantidade. Consulte as informações do ponto de coleta ou entre em contato diretamente para saber se essa opção está disponível.
                            </p>
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                name="example_accordion"
                                id="section8"
                                className="accordion__input"
                            />


                            <label htmlFor="section8" className="accordion__label">
                                Os pontos de coleta têm um horário de funcionamento?                        </label>
                            <div className="accordion__content">
                                <p>
                                    Sim! Cada ponto de coleta tem seu próprio horário de funcionamento, que pode variar. Ao consultar um ponto específico, você encontrará as informações de horário para garantir que você possa levar seus materiais durante o período de coleta.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </>


            <Footer />
        </>
    )
}

export default Faq