// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpa qualquer erro anterior

        try {
            // Envia a requisição de login para o backend
            const response = await axios.post("http://localhost:8000/login", {
                email,
                senha,
            });

            // Salva o token JWT retornado pelo backend
            localStorage.setItem("token", response.data.token);

            // Redireciona para a página de perfil após o login bem-sucedido
            navigate("/perfil");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError("Email ou senha incorretos.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button type="submit">Entrar</button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
