// // Cadastro.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import '../assets/styles/Cadastro.css'

// const Cadastro = () => {
//     const navigate = useNavigate();
//     const [categoria, setCategoria] = useState("ONG");
//     const [formData, setFormData] = useState({
//         email: "",
//         senha: "",
//         confirmarSenha: "",
//         nome_org: "",
//         CNPJ: "",
//         telefone: "",
//         descricao: "",
//         tipo_servico: "Não Retira",
//         endereco: "",
//         cep: "",
//         cidade: "",
//         estado: "",
//         materiais: [],
//         tipo_transacao: "Compra",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleCheckboxChange = (e) => {
//         const { value, checked } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             materiais: checked
//                 ? [...prevData.materiais, value]
//                 : prevData.materiais.filter((item) => item !== value),
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const fk_id_categoria = categoria === "ONG" ? 2 : 1;

//         // Valida se as senhas correspondem
//         if (formData.senha !== formData.confirmarSenha) {
//             alert("As senhas não coincidem. Por favor, tente novamente.");
//             return;
//         }

//         try {
//             await axios.post(`${process.env.REACT_APP_API_URL}/cadastrar`, {
//                 ...formData,
//                 fk_id_categoria,
//                 status_usuario: false,
//             });

//             // Redireciona o usuário para o login após o cadastro
//             navigate("/login");
//         } catch (error) {
//             console.error("Erro ao cadastrar usuário:", error);
//             alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
//         }
//     };

//     return (
//         <div>

//             <Navbar />

//             <div className="cadastro-container">
//                 <div className="texto-acima">
//                     <h2>Cadastro de {categoria}</h2>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Tipo de Cadastro:
//                         <select className="select-tipo-cadastro" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
//                             <option value="ONG">ONG</option>
//                             <option value="Empresa">Empresa</option>
//                         </select>
//                     </label>

//                     <label>Email:</label>
//                     <input type="email" name="email" value={formData.email} placeholder="Exemplo: email@gmail.com" onChange={handleChange} required />

//                     <label>Senha:</label>
//                     <input type="password" name="senha" value={formData.senha} placeholder="*****" onChange={handleChange} required />

//                     <label>Confirme a Senha:</label>
//                     <input type="password" name="confirmarSenha" value={formData.confirmarSenha} placeholder="*****" onChange={handleChange} required />

//                     <label>Nome da Organização:</label>
//                     <input type="text" name="nome_org" value={formData.nome_org} placeholder="Digite o nome da sua organização" onChange={handleChange} required />

//                     <label>CNPJ:</label>
//                     <input type="text" name="CNPJ" value={formData.CNPJ} placeholder="Exemplo: 12.345.678/9123-45" onChange={handleChange} required />

//                     <label>Telefone:</label>
//                     <input type="text" name="telefone" value={formData.telefone} placeholder="Exemplo: 1234-5678" onChange={handleChange} required />

//                     <label>Descrição:</label>
//                     {categoria === "Empresa" && (
//                         <label>
//                             <p>*Faça uma breve descrição da {categoria} e quais materiais compra e/ou vende.</p>
//                             <textarea className="text-descricao" name="descricao" value={formData.descricao} onChange={handleChange} />
//                         </label>
//                     )}

//                     {categoria === "ONG" && (
//                         <label>
//                             <p>*Faça uma breve descrição da {categoria} e preferência de materiais.</p>
//                             <textarea className="text-descricao" name="descricao" value={formData.descricao} onChange={handleChange} />
//                         </label>
//                     )}

//                     <label className="tipoServico">Tipo de Serviço:</label>
//                     <select className="form-cadastro-dropdown" name="tipo_servico" value={formData.tipo_servico} onChange={handleChange}>
//                         <option value="Retira no Local">Retira no Local</option>
//                         <option value="Não Retira">Não Retira</option>
//                     </select>

// <label>Endereço:</label>
// <input type="text" name="endereco" value={formData.endereco} placeholder="Exemplo: Rua das Margaridas 45 Jardim das Flores" onChange={handleChange} required />

// <label>CEP:</label>
// <input type="text" name="cep" value={formData.cep} placeholder="Exemplo: 10000-000" onChange={handleChange} required />

// <label>Cidade:</label>
// <input type="text" name="cidade" value={formData.cidade} placeholder="Exemplo: Sorocaba" onChange={handleChange} required />

// <label htmlFor="estado">Estado</label>
// <select
//     className="form-cadastro-dropdown"
//     id="estado"
//     name="estado"
//     value={formData.estado}
//     onChange={handleChange}
//     required
// >
//     <option value="">Selecione o estado</option>
//     <option value="AC">Acre</option>
//     <option value="AL">Alagoas</option>
//     <option value="AP">Amapá</option>
//     <option value="AM">Amazonas</option>
//     <option value="BA">Bahia</option>
//     <option value="CE">Ceará</option>
//     <option value="DF">Distrito Federal</option>
//     <option value="ES">Espírito Santo</option>
//     <option value="GO">Goiás</option>
//     <option value="MA">Maranhão</option>
//     <option value="MT">Mato Grosso</option>
//     <option value="MS">Mato Grosso do Sul</option>
//     <option value="MG">Minas Gerais</option>
//     <option value="PA">Pará</option>
//     <option value="PB">Paraíba</option>
//     <option value="PR">Paraná</option>
//     <option value="PE">Pernambuco</option>
//     <option value="PI">Piauí</option>
//     <option value="RJ">Rio de Janeiro</option>
//     <option value="RN">Rio Grande do Norte</option>
//     <option value="RS">Rio Grande do Sul</option>
//     <option value="RO">Rondônia</option>
//     <option value="RR">Roraima</option>
//     <option value="SC">Santa Catarina</option>
//     <option value="SP">São Paulo</option>
//     <option value="SE">Sergipe</option>
//     <option value="TO">Tocantins</option>
// </select>

// <label>Tipos de Material Aceito:</label>
// {categoria === "ONG" && (
//     <div className="material-options">
//         <label><input type="checkbox" value="Papel" onChange={handleCheckboxChange} /> Papel</label>
//         <label><input type="checkbox" value="Papelao" onChange={handleCheckboxChange} /> Papelão</label>
//         <label><input type="checkbox" value="Plastico" onChange={handleCheckboxChange} /> Plástico</label>
//         <label><input type="checkbox" value="Vidro" onChange={handleCheckboxChange} /> Vidro</label>
//         <label><input type="checkbox" value="Metal" onChange={handleCheckboxChange} /> Metal</label>
//         <label><input type="checkbox" value="Organico" onChange={handleCheckboxChange} /> Orgânico</label>
//         <label><input type="checkbox" value="Eletronico" onChange={handleCheckboxChange} /> Eletrônico</label>
//         <label><input type="checkbox" value="Roupa" onChange={handleCheckboxChange} /> Roupa</label>
//         <label><input type="checkbox" value="Alimento" onChange={handleCheckboxChange} /> Alimento</label>
//         <label><input type="checkbox" value="Brinquedo" onChange={handleCheckboxChange} /> Brinquedo</label>
//         <label><input type="checkbox" value="Produto de Higiene" onChange={handleCheckboxChange} /> Produto de Higiene</label>
//         <label><input type="checkbox" value="Moveis" onChange={handleCheckboxChange} /> Móveis</label>
//     </div>
// )}

// {categoria === "Empresa" && (
//     <div className="material-options">
//         <label><input type="checkbox" value="Papel" onChange={handleCheckboxChange} /> Papel</label>
//         <label><input type="checkbox" value="Papelao" onChange={handleCheckboxChange} /> Papelão</label>
//         <label><input type="checkbox" value="Plastico" onChange={handleCheckboxChange} /> Plástico</label>
//         <label><input type="checkbox" value="Vidro" onChange={handleCheckboxChange} /> Vidro</label>
//         <label><input type="checkbox" value="Metal" onChange={handleCheckboxChange} /> Metal</label>
//         <label><input type="checkbox" value="Organico" onChange={handleCheckboxChange} /> Orgânico</label>
//         <label><input type="checkbox" value="Eletronico" onChange={handleCheckboxChange} /> Eletrônico</label>
//     </div>
// )}

// {categoria === "Empresa" && (
//     <label className="tipo_transacao" >
//         Tipo de Transação:
//         <select className="form-tipo-transacao" name="tipo_transacao" value={formData.tipo_transacao} onChange={handleChange}>
//             <option value="Compra">Compra</option>
//             <option value="Vende">Venda</option>
//             <option value="Compra e Vende">Compra e Venda</option>
//         </select>
//     </label>
// )}

//                     <button type="submit">CADASTRAR</button>
//                 </form>
//             </div>

//             <Footer />

//         </div>
//     );
// };

// export default Cadastro;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/styles/Cadastro.css";

const Cadastro = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1); // Estado para controlar a etapa
    const [categoria, setCategoria] = useState("ONG");
    const [formData, setFormData] = useState({
        email: "",
        senha: "",
        confirmarSenha: "",
        nome_org: "",
        CNPJ: "",
        telefone: "",
        descricao: "",
        tipo_servico: "Não Retira",
        endereco: "",
        cep: "",
        cidade: "",
        estado: "",
        materiais: [],
        tipo_transacao: "Compra",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            materiais: checked
                ? [...prevData.materiais, value]
                : prevData.materiais.filter((item) => item !== value),
        }));
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fk_id_categoria = categoria === "ONG" ? 2 : 1;

        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem. Por favor, tente novamente.");
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/cadastrar`, {
                ...formData,
                fk_id_categoria,
                status_usuario: false,
            });
            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="cadastro-container">
                <div className="texto-acima">
                    <h2>Cadastro de {categoria}</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <div>
                            <label>
                                Tipo de Cadastro:
                                <select
                                    className="select-tipo-cadastro"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <option value="ONG">ONG</option>
                                    <option value="Empresa">Empresa</option>
                                </select>
                            </label>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Exemplo: email@gmail.com"
                                onChange={handleChange}
                                required
                            />
                            <label>Senha:</label>
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                placeholder="*****"
                                onChange={handleChange}
                                required
                            />
                            <label>Confirme a Senha:</label>
                            <input
                                type="password"
                                name="confirmarSenha"
                                value={formData.confirmarSenha}
                                placeholder="*****"
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={nextStep}>
                                Próximo
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <label>Nome da Organização:</label>
                            <input
                                type="text"
                                name="nome_org"
                                value={formData.nome_org}
                                placeholder="Digite o nome da sua organização"
                                onChange={handleChange}
                                required
                            />
                            <label>CNPJ:</label>
                            <input
                                type="text"
                                name="CNPJ"
                                value={formData.CNPJ}
                                placeholder="Exemplo: 12.345.678/9123-45"
                                onChange={handleChange}
                                required
                            />
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="telefone"
                                value={formData.telefone}
                                placeholder="Exemplo: 1234-5678"
                                onChange={handleChange}
                                required
                            />

                            <label>Descrição:</label>
                            {categoria === "Empresa" && (
                                <label>
                                    <p>*Faça uma breve descrição da {categoria} e quais materiais compra e/ou vende.</p>
                                    <textarea className="text-descricao" name="descricao" value={formData.descricao} onChange={handleChange} />
                                </label>
                            )}

                            {categoria === "ONG" && (
                                <label>
                                    <p>*Faça uma breve descrição da {categoria} e preferência de materiais.</p>
                                    <textarea className="text-descricao" name="descricao" value={formData.descricao} onChange={handleChange} />
                                </label>
                            )}

                            <label className="tipoServico">Tipo de Serviço:</label>
                            <select className="form-cadastro-dropdown" name="tipo_servico" value={formData.tipo_servico} onChange={handleChange}>
                                <option value="Retira no Local">Retira no Local</option>
                                <option value="Não Retira">Não Retira</option>
                            </select>

                            <label>Tipos de Material Aceito:</label>
                            {categoria === "ONG" && (
                                <div className="material-options">
                                    <label><input type="checkbox" value="Papel" onChange={handleCheckboxChange} /> Papel</label>
                                    <label><input type="checkbox" value="Papelao" onChange={handleCheckboxChange} /> Papelão</label>
                                    <label><input type="checkbox" value="Plastico" onChange={handleCheckboxChange} /> Plástico</label>
                                    <label><input type="checkbox" value="Vidro" onChange={handleCheckboxChange} /> Vidro</label>
                                    <label><input type="checkbox" value="Metal" onChange={handleCheckboxChange} /> Metal</label>
                                    <label><input type="checkbox" value="Organico" onChange={handleCheckboxChange} /> Orgânico</label>
                                    <label><input type="checkbox" value="Eletronico" onChange={handleCheckboxChange} /> Eletrônico</label>
                                    <label><input type="checkbox" value="Roupa" onChange={handleCheckboxChange} /> Roupa</label>
                                    <label><input type="checkbox" value="Alimento" onChange={handleCheckboxChange} /> Alimento</label>
                                    <label><input type="checkbox" value="Brinquedo" onChange={handleCheckboxChange} /> Brinquedo</label>
                                    <label><input type="checkbox" value="Produto de Higiene" onChange={handleCheckboxChange} /> Produto de Higiene</label>
                                    <label><input type="checkbox" value="Moveis" onChange={handleCheckboxChange} /> Móveis</label>
                                </div>
                            )}

                            {categoria === "Empresa" && (
                                <div className="material-options">
                                    <label><input type="checkbox" value="Papel" onChange={handleCheckboxChange} /> Papel</label>
                                    <label><input type="checkbox" value="Papelao" onChange={handleCheckboxChange} /> Papelão</label>
                                    <label><input type="checkbox" value="Plastico" onChange={handleCheckboxChange} /> Plástico</label>
                                    <label><input type="checkbox" value="Vidro" onChange={handleCheckboxChange} /> Vidro</label>
                                    <label><input type="checkbox" value="Metal" onChange={handleCheckboxChange} /> Metal</label>
                                    <label><input type="checkbox" value="Organico" onChange={handleCheckboxChange} /> Orgânico</label>
                                    <label><input type="checkbox" value="Eletronico" onChange={handleCheckboxChange} /> Eletrônico</label>
                                </div>
                            )}

                            {categoria === "Empresa" && (
                                <label className="tipo_transacao" >
                                    Tipo de Transação:
                                    <select className="form-tipo-transacao" name="tipo_transacao" value={formData.tipo_transacao} onChange={handleChange}>
                                        <option value="Compra">Compra</option>
                                        <option value="Vende">Venda</option>
                                        <option value="Compra e Vende">Compra e Venda</option>
                                    </select>
                                </label>
                            )}

                            <button type="button" onClick={prevStep}>
                                Voltar
                            </button>
                            <button type="button" onClick={nextStep}>
                                Próximo
                            </button>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>

                            <label>Endereço:</label>
                            <input type="text" name="endereco" value={formData.endereco} placeholder="Exemplo: Rua das Margaridas 45 Jardim das Flores" onChange={handleChange} required />

                            <label>CEP:</label>
                            <input type="text" name="cep" value={formData.cep} placeholder="Exemplo: 10000-000" onChange={handleChange} required />

                            <label>Cidade:</label>
                            <input type="text" name="cidade" value={formData.cidade} placeholder="Exemplo: Sorocaba" onChange={handleChange} required />

                            <label htmlFor="estado">Estado</label>
                            <select
                                className="form-cadastro-dropdown"
                                id="estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o estado</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </select>

                            <button type="button" onClick={prevStep}>
                                Voltar
                            </button>
                            <button type="submit">Cadastrar</button>
                        </div>
                    )}
                </form>
            </div>

            <Footer />
        </div >
    );
};

export default Cadastro;
