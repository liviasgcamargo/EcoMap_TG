import React from 'react'
import { Link } from 'react-router-dom'
import Facebook from '../assets/images/icon_facebook.png'
import Linkedin from '../assets/images/icon_linkedin.png'
import Twitter from '../assets/images/icon_twitter.png'
import Youtube from '../assets/images/icon_youtube.png'
import Instagram from '../assets/images/icon_instagram.png'
import '../assets/styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer-content">
      <p className='footerP'>© 2024 Ecomap</p>
      <hr className="linhaFooter" />
      <div className="footer-links">
        <div className="linksUteis">
          <Link to="/">Home</Link>
          <Link className='links-responsivos' to="/guia">Guia de reciclagem</Link>
          <Link className='links-responsivos' to="/faq">Perguntas Frequentes</Link>
          <Link className='links-responsivos' to="/sobre-nos">Sobre nós</Link>
          <Link to="/perfil-adm">Administrador</Link>
        </div>
        <div className="redes_sociais">
          <img src={Facebook} alt="" />
          <img src={Linkedin} alt="" />
          <img src={Twitter} alt="" />
          <img src={Youtube} alt="" />
          <img src={Instagram} alt="" />
        </div>
      </div>
    </div>

  )
}

export default Footer