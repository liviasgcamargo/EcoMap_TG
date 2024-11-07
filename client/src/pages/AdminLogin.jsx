// AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Verifica as credenciais do administrador
        if (username === "admecomap" && password === "adm123") {
            navigate("/gerenciar-info-administrador");
        } else {
            alert("Credenciais incorretas. Tente novamente.");
        }
    };

    return (

        <>

        <div className="login-container">
            <h2>Login do Administrador</h2>
            <form onSubmit={handleLogin}>
                <label>Usuário:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite o usuário"
                />
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
        </>
    );
};

export default AdminLogin;
