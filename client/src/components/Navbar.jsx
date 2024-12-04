import React from 'react'
import Logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import '../assets/styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="menu_navegacao">
      <Link to="/">
        <img className="logoHeader" src={Logo} alt="Logo" />
      </Link>
      <div className="menu_itens">
        <Link className="menu_item" to="/">Home</Link>
        <Link className="menu_item" to="/guia">Guia de Reciclagem</Link>
        <Link className="menu_item" to="/faq">Perguntas Frequentes</Link>
        <Link className="menu_item" to="/sobre-nos">Sobre Nós</Link>

        <div className='buttons-container'>
          <Link id="btnContact" to="/Cadastro">Cadastrar</Link>
          <Link id="btnContact" to="/Login">Entrar</Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
