// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../assets/styles/Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpa qualquer erro anterior

        try {
            localStorage.removeItem("token");

            // Envia a requisição de login para o backend
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
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
        <div className="conteudo-footer">
            <Navbar />
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        placeholder="email@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        placeholder="**********"
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <p>
                        <a href="esqueci-senha" className="esqueci-senha">
                            Esqueci minha senha
                        </a>
                    </p>
                    <p className="cadastro-redirect">
                        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                    </p>
                    <button type="submit">Entrar</button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>

            <Footer />

        </div>
    );
};

export default Login;
