import React from 'react'
import Icon1 from '../assets/images/icon_box1.png'
import Icon2 from '../assets/images/icon_box2.png'
import Icon3 from '../assets/images/icon_box3.png'
import "../assets/styles/Cards.css"

const Cards = () => {
  return (
    <div className="container-cards">
      <div className="card">
        <h4 className="tituloCard">O que reciclar?</h4>
        <img src={Icon1} alt="Avatar" />
        <div className="container">
          <p className="textoCard">
            Clique para saber mais sobre os tipos de materiais que devem ser
            descartados adequadamente
          </p>
        </div>
      </div>
      <div className="card">
        <h4 className="tituloCard">Como reciclar?</h4>
        <img src={Icon2} alt="Avatar" />
        <div className="container" >
          <p className="textoCard">
            Você conhece os métodos ideais para descartar cada tipo de material?
          </p>
        </div>
      </div>
      <div className="card">
        <h4 className="tituloCard">Os impactos da reciclagem</h4>
        <img src={Icon3} alt="Avatar" />
        <div className="container">
          <p className="textoCard">
            Aprenda sobre os impactos da reciclagem no meio ambiente
          </p>
        </div>
      </div>
    </div>

  )
}

export default Cards