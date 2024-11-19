// frontend/src/pages/Perfil.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IconePerfil from "../assets/images/imagem-perfil.svg";
import "../assets/styles/Perfil.css";

const Perfil = () => {
    const [perfil, setPerfil] = useState(null);
    const [originalPerfil, setOriginalPerfil] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [changePasswordMode, setChangePasswordMode] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const navigate = useNavigate();

    const estados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const materiaisDisponiveis = ["Papelão", "Plástico", "Vidro", "Metal", "Orgânico", "Eletrônico"];
    const materiaisDisponiveisOng = ["Papelão", "Plástico", "Vidro", "Metal", "Orgânico", "Eletrônico", "Roupa", "Alimento", "Brinquedo", "Produto de Higiene", "Móveis"];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await api.get("/perfil");
                
                // Verifique se a API está retornando "materiais" como um array; 
                // caso contrário, converta para array vazio.
                const perfilData = {
                    ...response.data,
                    materiais: response.data.materiais || []
                };
                
                setPerfil(perfilData);
                setOriginalPerfil(perfilData);
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
                navigate("/login");
            }
        };

        fetchPerfil();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil({ ...perfil, [name]: value });
    };

    const handleMaterialChange = (e) => {
        const { value, checked } = e.target;
        setPerfil((prev) => ({
            ...prev,
            materiais: checked
                ? [...(prev.materiais || []), value]
                : (prev.materiais || []).filter((material) => material !== value)
        }));
    };

    const handleSave = async () => {
        try {
            await api.put("/atualizar-perfil", { ...perfil, materiais: perfil.materiais || [] });
            alert("Perfil atualizado com sucesso! O administrador precisa validar as alterações.");
            setEditMode(false);
            setOriginalPerfil(perfil);
            setPasswordVisible(false);
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert("Erro ao atualizar perfil. Tente novamente.");
        }
    };

    const handleChangePassword = async () => {
        if (novaSenha !== confirmarSenha) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            await api.post("/alterar-senha", { senhaAtual, novaSenha });
            alert("Senha alterada com sucesso!");
            setChangePasswordMode(false);
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            alert("Erro ao alterar senha. Verifique a senha atual.");
        }
    };

    const handleCancelChangePassword = () => {
        setChangePasswordMode(false);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
    };

    const handleCancel = () => {
        setPerfil(originalPerfil);
        setEditMode(false);
        setPasswordVisible(false);
    };

    const handleDelete = async () => {
        if (window.confirm("Tem certeza de que deseja excluir sua conta?")) {
            try {
                await api.delete("/excluir-conta");
                alert("Conta excluída com sucesso!");
                navigate("/");
            } catch (error) {
                console.error("Erro ao excluir conta:", error);
                alert("Erro ao excluir conta. Tente novamente.");
            }
        }
    };

    // Nova função para obter a mensagem baseada no status do usuário
    const getStatusMessage = (status) => {
        if (status === true) {
            return "Sua Organização foi aprovada e já está disponível para consulta no site!";
        }
        if (status === false) {
            return "Sua Organização está sendo avaliada pela plataforma.";
        }
        return "Algumas informações sobre a sua Organização não estão corretas. Verifique e atualize suas informações para poder ter sua Organização disponível para consulta.";
    };

    if (!perfil) return <p>Carregando...</p>;

    return (
        <div>
            <Navbar />

            <h2>Perfil de {perfil.fk_id_categoria === 1 ? "Empresa" : "ONG"}</h2>
            <div className="perfil-container">
                <div className="perfil-info">
                    <img className="icone-perfil" src={IconePerfil} alt="" />

                    {/* Adicionado o status do usuário */}
                    <div className="status-container">
                        <label>Status da Organização:</label>
                        <p>{getStatusMessage(perfil.status_usuario)}</p>
                    </div>

                    <div className="info-cadastro-principais">
                        <label>Email:</label>
                        <input type="email" name="email" value={perfil.email || ''} onChange={handleChange} disabled={!editMode} />

                        {/* <label>Senha:</label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="senha"
                            value={passwordVisible ? perfil.senha || '' : "*****"}
                            placeholder="Nova senha"
                            onChange={handleChange}
                            disabled={!editMode}
                        /> */}
                    </div>

                    <div className="info-cadastro-principais">
                        <label>Nome da Organização:</label>
                        <input type="text" name="nome_org" value={perfil.nome_org || ''} onChange={handleChange} disabled={!editMode} />

                        <label>CNPJ:</label>
                        <input type="text" name="CNPJ" value={perfil.CNPJ || ''} onChange={handleChange} disabled={!editMode} />
                    </div>

                    <div className="info-cadastro-principais">
                        <label>Telefone:</label>
                        <input type="text" name="telefone" value={perfil.telefone || ''} onChange={handleChange} disabled={!editMode} />

                        <label>Descrição:</label>
                        <textarea name="descricao" value={perfil.descricao || ''} onChange={handleChange} disabled={!editMode} />
                    </div>

                    <div className="info-cadastro-principais">
                        <label>Tipo de Serviço:</label>
                        <select name="tipo_servico" value={perfil.tipo_servico || ''} onChange={handleChange} disabled={!editMode}>
                            <option value="Retira no Local">Retira no Local</option>
                            <option value="Não Retira">Não Retira</option>
                        </select>

                        <label>Endereço:</label>
                        <input type="text" name="endereco" value={perfil.endereco || ''} onChange={handleChange} disabled={!editMode} />
                    </div>

                    <div className="info-cadastro-principais">
                        <label>CEP:</label>
                        <input type="text" name="cep" value={perfil.cep || ''} onChange={handleChange} disabled={!editMode} />

                        <label>Cidade:</label>
                        <input type="text" name="cidade" value={perfil.cidade || ''} onChange={handleChange} disabled={!editMode} />
                    </div>

                    <div className="info-cadastro-principais">
                        <label>Estado:</label>
                        <select name="estado" value={perfil.estado || ''} onChange={handleChange} disabled={!editMode}>
                            {estados.map((estado) => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </select>

                        <label>Tipos de Material Aceito:</label>
                        {perfil.fk_id_categoria === 1 && (
                            <div className="info-materiais">
                            {materiaisDisponiveis.map((material) => (
                                <label key={material}>
                                    <input
                                        type="checkbox"
                                        value={material}
                                        checked={perfil.materiais && perfil.materiais.includes(material)}
                                        onChange={handleMaterialChange}
                                        disabled={!editMode}
                                    />{" "}
                                    {material}
                                </label>
                            ))}
                        </div>
                        )}
                        
                        {perfil.fk_id_categoria === 2 && (
                            <div className="info-materiais">
                            {materiaisDisponiveisOng.map((material) => (
                                <label key={material}>
                                    <input
                                        type="checkbox"
                                        value={material}
                                        checked={perfil.materiais && perfil.materiais.includes(material)}
                                        onChange={handleMaterialChange}
                                        disabled={!editMode}
                                    />{" "}
                                    {material}
                                </label>
                            ))}
                        </div>
                        )}

                    </div>

                    {!changePasswordMode ? (
                        <>
                            <button onClick={() => setEditMode(true)}>Editar Perfil</button>
                            <button onClick={() => setChangePasswordMode(true)}>Alterar Senha</button>
                        </>
                    ) : (
                        <div className="alterar-senha-container">
                            <h3>Alterar Senha</h3>
                            <label>Senha Atual:</label>
                            <input
                                type="password"
                                value={senhaAtual}
                                onChange={(e) => setSenhaAtual(e.target.value)}
                            />

                            <label>Nova Senha:</label>
                            <input
                                type="password"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />

                            <label>Confirmar Nova Senha:</label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />

                            <button onClick={handleChangePassword}>Salvar Nova Senha</button>
                            <button onClick={handleCancelChangePassword}>Cancelar</button>
                        </div>
                    )}

                    {editMode ? (
                        <div>
                            <button onClick={() => { setPasswordVisible(true); handleSave(); }}>Salvar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </div>
                    ) : (
                         <button onClick={() => { setEditMode(true); setPasswordVisible(true); }}>Editar Perfil</button>

                    )}

                    <button onClick={handleDelete}>Excluir Conta</button>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Perfil;
