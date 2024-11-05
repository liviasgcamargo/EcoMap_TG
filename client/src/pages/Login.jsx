import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import '../assets/styles/Login.css'

const Login = () => {
  return (
    <>
    
    <Navbar/>

    <>
  <h2>ENTRAR</h2>
  <form action="#" method="post" id="formLogin">
    <fieldset>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required="" autofocus="" />
      <label htmlFor="senha">Senha</label>
      <input type="password" name="senha" id="senha" required="" />
      <p>
        <a href="esqueciSenha.html" className="esqueci-senha">
          Esqueci minha senha
        </a>
      </p>
      <p className="cadastro-redirect">
        Não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link>
      </p>
      <div className="container-btn">
        <input
          type="submit"
          className="btnEntrar"
          id="btnEntrar"
          defaultValue="ENTRAR"
        />
      </div>
    </fieldset>
  </form>
</>


    <Footer/>

    </>
  )
}

export default Login