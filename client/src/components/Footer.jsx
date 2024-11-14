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
        <ul className="linksUteis">
          <li>
            <a href=""><Link to="/">Home</Link></a>
          </li>
          <li>
            <a href=""><Link to="/sobre-nos">Sobre nós</Link></a>
          </li>
          <li>
            <a href="">Entre em contato</a>
          </li>
          <li>
          <a href=""><Link to="/perfil-adm">Administrador</Link></a>
          </li>
          
        </ul>
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