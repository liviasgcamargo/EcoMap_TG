// // Perfil.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// const Perfil = () => {
//     const navigate = useNavigate();
//     const [perfil, setPerfil] = useState(null);
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         // Busca as informações do perfil do usuário ao carregar a página
//         const fetchPerfil = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/perfil");
//                 setPerfil(response.data);
//             } catch (error) {
//                 console.error("Erro ao buscar perfil:", error);
//             }
//         };

//         fetchPerfil();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPerfil((prevPerfil) => ({
//             ...prevPerfil,
//             [name]: value,
//         }));
//     };

//     const handleCheckboxChange = (e) => {
//         const { value, checked } = e.target;
//         setPerfil((prevPerfil) => ({
//             ...prevPerfil,
//             materiais: checked
//                 ? [...(prevPerfil.materiais || []), value]
//                 : (prevPerfil.materiais || []).filter((material) => material !== value),
//         }));
//     };

//     const handleSave = async () => {
//         try {
//             await axios.put("http://localhost:8000/atualizar-perfil", {
//                 ...perfil,
//                 status_usuario: false, // Define o status como FALSE após qualquer alteração
//             });
//             alert("Perfil atualizado com sucesso! O administrador precisa validar as alterações.");
//             setEditMode(false);
//         } catch (error) {
//             console.error("Erro ao atualizar perfil:", error);
//             alert("Erro ao atualizar perfil. Tente novamente.");
//         }
//     };

//     const handleDeleteAccount = async () => {
//         if (window.confirm("Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
//             try {
//                 await axios.delete("http://localhost:8000/excluir-conta");
//                 alert("Conta excluída com sucesso!");
//                 navigate("/"); // Redireciona para a página inicial
//             } catch (error) {
//                 console.error("Erro ao excluir conta:", error);
//                 alert("Erro ao excluir conta. Tente novamente.");
//             }
//         }
//     };

//     if (!perfil) return <p>Carregando...</p>;

//     return (
//         <div className="perfil-container">
//             <h2>Perfil de {perfil.categoria === 1 ? "Empresa" : "ONG"}</h2>
//             <div className="perfil-info">
//                 <label>Email:</label>
//                 <input type="email" name="email" value={perfil.email} onChange={handleChange} disabled={!editMode} />

//                 <label>Senha:</label>
//                 <input type="password" name="senha" onChange={handleChange} disabled={!editMode} />

//                 <label>Nome da Organização:</label>
//                 <input type="text" name="nome_org" value={perfil.nome_org} onChange={handleChange} disabled={!editMode} />

//                 <label>CNPJ:</label>
//                 <input type="text" name="CNPJ" value={perfil.CNPJ} onChange={handleChange} disabled={!editMode} />

//                 <label>Telefone:</label>
//                 <input type="text" name="telefone" value={perfil.telefone} onChange={handleChange} disabled={!editMode} />

//                 <label>Descrição:</label>
//                 <textarea name="descricao" value={perfil.descricao} onChange={handleChange} disabled={!editMode} />

//                 <label>Tipo de Serviço:</label>
//                 <select name="tipo_servico" value={perfil.tipo_servico} onChange={handleChange} disabled={!editMode}>
//                     <option value="Retira no Local">Retira no Local</option>
//                     <option value="Não Retira">Não Retira</option>
//                 </select>

//                 <label>Endereço:</label>
//                 <input type="text" name="endereco" value={perfil.endereco} onChange={handleChange} disabled={!editMode} />

//                 <label>CEP:</label>
//                 <input type="text" name="cep" value={perfil.cep} onChange={handleChange} disabled={!editMode} />

//                 <label>Cidade:</label>
//                 <input type="text" name="cidade" value={perfil.cidade} onChange={handleChange} disabled={!editMode} />

//                 <label>Estado:</label>
//                 <input type="text" name="estado" value={perfil.estado} onChange={handleChange} disabled={!editMode} />

//                 <label>Tipos de Material Aceito:</label>
//                 <div className="material-options">
//                     {["Papelao", "Plastico", "Vidro", "Metal", "Organico", "Eletronico"].map((material) => (
//                         <label key={material}>
//                             <input
//                                 type="checkbox"
//                                 value={material}
//                                 checked={(perfil.materiais || []).includes(material)}
//                                 onChange={handleCheckboxChange}
//                                 disabled={!editMode}
//                             />{" "}
//                             {material}
//                         </label>
//                     ))}
//                 </div>

//                 {editMode ? (
//                     <>
//                         <button onClick={handleSave}>Salvar</button>
//                         <button onClick={() => setEditMode(false)}>Cancelar</button>
//                     </>
//                 ) : (
//                     <button onClick={() => setEditMode(true)}>Editar Perfil</button>
//                 )}

//                 <button onClick={handleDeleteAccount} className="delete-button">Excluir Conta</button>
//             </div>
//         </div>
//     );
// };

// export default Perfil;

// frontend/src/pages/Perfil.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Perfil = () => {
    const [perfil, setPerfil] = useState(null);
    const [originalPerfil, setOriginalPerfil] = useState(null); // Novo estado para armazenar os dados originais
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o token do localStorage
        localStorage.removeItem("token");

        // Redireciona o usuário para a página de login
        navigate("/");
    }

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await api.get("/perfil");
                setPerfil(response.data);
                setOriginalPerfil(response.data); // Armazena os dados originais
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

    const handleSave = async () => {
        try {
            await api.put("/atualizar-perfil", perfil);
            alert("Perfil atualizado com sucesso! O administrador precisa validar as alterações.");
            setEditMode(false);
            setOriginalPerfil(perfil); // Atualiza o estado original com os dados salvos
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert("Erro ao atualizar perfil. Tente novamente.");
        }
    };

    const handleCancel = () => {
        setPerfil(originalPerfil); // Reverte para os dados originais
        setEditMode(false); // Sai do modo de edição
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

    if (!perfil) return <p>Carregando...</p>;

    return (
        <div>
            <Navbar/>

            <h2>Perfil de {perfil.fk_id_categoria === 1 ? "Empresa" : "ONG"}</h2>
        <div className="perfil-container">

            <div className="perfil-info">
                <div className='info-cadastro-principais'>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={perfil.email || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />

                <label>Senha:</label>
                <input 
                    type="password" 
                    name="senha" 
                    placeholder="Nova senha" 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />
                </div>

                <div className="info-cadastro-principais">
                <label>Nome da Organização:</label>
                <input 
                    type="text" 
                    name="nome_org" 
                    value={perfil.nome_org || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />

                <label>CNPJ:</label>
                <input 
                    type="text" 
                    name="CNPJ" 
                    value={perfil.CNPJ || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />
                </div>
                
<div  className="info-cadastro-principais">
                <label>Telefone:</label>
                <input 
                    type="text" 
                    name="telefone" 
                    value={perfil.telefone || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />

                <label>Descrição:</label>
                <textarea 
                    name="descricao" 
                    value={perfil.descricao || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />
</div>

<div className="info-cadastro-principais">
                <label>Tipo de Serviço (Retira no local ou Não Retira):</label>
                <select 
                    name="tipo_servico" 
                    value={perfil.tipo_servico || ''} 
                    onChange={handleChange} 
                    disabled={!editMode}
                >
                    <option value="Retira no Local">Retira no Local</option>
                    <option value="Não Retira">Não Retira</option>
                </select>

                <label>Endereço:</label>
                <input 
                    type="text" 
                    name="endereco" 
                    value={perfil.endereco || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />
</div>

<div className="info-cadastro-principais">

                <label>CEP:</label>
                <input 
                    type="text" 
                    name="cep" 
                    value={perfil.cep || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />

                <label>Cidade:</label>
                <input 
                    type="text" 
                    name="cidade" 
                    value={perfil.cidade || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />
</div>

<div className="info-cadastro-principais">
                <label>Estado:</label>
                <input 
                    type="text" 
                    name="estado" 
                    value={perfil.estado || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />

                <label>Tipos de Material Aceito:</label>
                <input 
                    type="text" 
                    name="materiais" 
                    placeholder="Ex: Papelão, Plástico" 
                    value={perfil.materiais || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                />
</div>

                {editMode ? (
                    <div>
                        <button onClick={handleSave}>Salvar</button>
                        <button onClick={handleCancel}>Cancelar</button>
                    </div>
                ) : (
                    <button onClick={() => setEditMode(true)}>Editar Perfil</button>
                )}

                <button onClick={handleDelete}>Excluir Conta</button>
            </div>
        </div>
        <Footer/>
        </div>
       

    );
};

export default Perfil;
