import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../assets/styles/Guia.css';

const Guia = () => {
  return (
    <>
    
    <Navbar/>

    <h2>Guia de Reciclagem</h2>
    
    <div className="container">
      {/* Categorias de Materiais Recicláveis */}
      <div className="section">
        <h2 >Categorias de Materiais Recicláveis</h2>
        <ul className="item-list">
          <li className="list-item"><span className="highlight">Papel:</span> Jornais, revistas, caixas de papelão, folhas de caderno</li>
          <li className="list-item"><span className="highlight">Plástico:</span> Garrafas PET, sacolas plásticas, embalagens de produtos de limpeza</li>
          <li className="list-item"><span className="highlight">Vidro:</span> Garrafas de vidro, potes de vidro (não incluir espelhos, vidro temperado)</li>
          <li className="list-item"><span className="highlight">Metal:</span> Latas de alumínio, embalagens de aço, panelas (sem cabos plásticos)</li>
          <li className="list-item"><span className="highlight">Eletrônicos:</span> Pilhas, baterias, pequenos aparelhos eletrônicos</li>
        </ul>
      </div>

      {/* Diretrizes de Reciclagem */}
      <div className="section">
        <h2 className="title">Diretrizes de Reciclagem</h2>
        <ul className="item-list">
          <li className="list-item">🔄 Lave os materiais antes de descartar, especialmente embalagens com restos de comida</li>
          <li className="list-item">🔄 Separe por tipo de material para facilitar o trabalho de reciclagem</li>
          <li className="list-item">🔄 Retire tampas e rótulos sempre que possível</li>
          <li className="list-item">❌ Evite reciclar objetos compostos por vários materiais diferentes</li>
        </ul>
      </div>

      {/* Tipos de Recicláveis e Não Recicláveis */}
      <div className="section">
        <h2 className="title">Tipos de Recicláveis e Não Recicláveis</h2>
        <ul className="item-list">
          <li className="list-item"><span className="highlight">Recicláveis:</span> Garrafas plásticas, papéis (não engordurados), potes de vidro, latas de alumínio</li>
          <li className="list-item"><span className="highlight">Não Recicláveis:</span> Papel engordurado, sacos de salgadinho metalizados, espelhos, pilhas sem tratamento especial</li>
        </ul>
      </div>

      {/* Informações Educativas */}
      <div className="section">
        <h2 className="title">Informações Educativas sobre Reciclagem</h2>
        <div className="educational-info">
          <p><span className="highlight">Benefícios da Reciclagem:</span> Economia de recursos, redução da poluição, geração de empregos</p>
          <p><span className="highlight">Tempo de Decomposição:</span> Plástico (450 anos), papel (6 meses), alumínio (200 anos)</p>
        </div>
      </div>
    </div>

    <Footer/>


    </>
  )
}

export default Guia