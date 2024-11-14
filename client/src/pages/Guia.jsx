import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lixeira from "../assets/images/lixeira.svg"
import Divider from "../assets/images/divider.svg"
import '../assets/styles/Guia.css';

const Guia = () => {
  return (
    <>
      <Navbar />

      <div className="infographic-container">

        <div className="section">
          <img src={Divider} alt="" />
          <h2 className="section-title">O que é Coleta Seletiva?</h2>
          <p className="section-text">
            Coleta seletiva é o recolhimento de materiais recicláveis (papel, plástico, metal) que não devem ser misturados ao lixo comum
             das residências ou local de trabalho. Trata-se de um cuidado dado ao resíduo que começa com a separação dos materiais em 
             orgânicos e inorgânicos, e, em seguida, com a disposição correta para o reaproveitamento e reciclagem.
            De forma a sensibilizar as pessoas para questão do correto tratamento que os resíduos sólidos produzidos no dia-a-dia devem 
            receber, seja nos ambientes públicos ou privados, a coleta seletiva também funciona como um processo de educação ambiental, 
            na medida em que conscientiza as pessoas sobre os problemas do desperdício de recursos naturais e da poluição causada pelo 
            lixo </p>
        </div>

        <div className="section">
        <img src={Divider} alt="" />
          <h2 className="section-title">Cores dos Recipientes de Reciclagem</h2>
          <div className="recycling-bins">
            <div className="bin bin-paper">
              <span className="bin-label">Papel</span>
              <div className="bin-color blue">
                <img className="icone-lixo" src={Lixeira} alt="" />
              </div>
            </div>
            <div className="bin bin-plastic">
              <span className="bin-label">Plástico</span>
              <div className="bin-color red">
                <img className="icone-lixo" src={Lixeira} alt="" />
              </div>
            </div>
            <div className="bin bin-glass">
              <span className="bin-label">Vidro</span>
              <div className="bin-color green">
                <img className="icone-lixo" src={Lixeira} alt="" />
              </div>
            </div>
            <div className="bin bin-metal">
              <span className="bin-label">Metal</span>
              <div className="bin-color yellow">
                <img className="icone-lixo" src={Lixeira} alt="" />
              </div>
            </div>
            <div className="bin bin-organic">
              <span className="bin-label">Orgânico</span>
              <div className="bin-color brown">
                <img className="icone-lixo" src={Lixeira} alt="" />
              </div>
            </div>
            <div className="bin bin-other">
              <span className="bin-label">Não Recicláveis</span>
              <div className="bin-color gray">
                <img className="icone-lixo" src={Lixeira} alt="" />
              </div>
            </div>
          </div>
          <ul className='ul-materiais-reciclagem'>
            <li className='li-materiais-reciclagem'>
              <strong>Papel:</strong> Jornais, revistas, papelão,impressos em geral, cadernos e livros. <br /><br />
              Não pode: Papel higiênico, guardanapos, fitas e etiquetas adesivas, fotografias e papéis plastificados.
            </li>

            <li className='li-materiais-reciclagem'>
              <strong>Plástico:</strong> Sacolas, garrafas PET, embalagens em geral, copos descartáveis e canos de PVC. <br /><br />

              Não pode: Embalagens de balas e de doces, embalagens de produtos tóxicos.
            </li>


            <li className='li-materiais-reciclagem'>
              <strong>Vidro:</strong> Garrafas, embalagens em geral, potes, copos, vidros planos e lisos. <br /><br />

              Não pode: Espelhos, cerâmica, tubos de TV ou monitores, vidros temperados, lâmpadas de LED e fluorescentes.
            </li>
            <li className='li-materiais-reciclagem'>
              <strong>Metal:</strong> Latas de alumínio ou de ferro, clipes, papel alumínio e grampos para papel ou para cabelo. <br /><br />

              Não pode: Embalagens de marmitex, esponjas de aço, pilhas, baterias e eletroeletrônicos.
            </li>

            <li className='li-materiais-reciclagem'>
              <strong>Orgânico:</strong> todo tipo de resíduo de origem biológica: restos de alimentos, cascas de legumes e frutas, folhas e vegetais, etc.
            </li>

            <li className='li-materiais-reciclagem'>
              <strong>Não recicláveis:</strong> materiais que não podem ser reciclados ou o processo de reciclagem é mais difícil. Como etiquetas, espelhos, adesivos, etc.
            </li>
          </ul>

          <div className='dicas-reciclagem'>
            <h1><strong>Dicas:</strong></h1>
            <ul>
              <li> → Limpe cada item, como forma de evitar a proliferação de insetos e microorganismos, que podem deteriorar o material a ser reciclado.</li>
              <li> → No caso dos papéis, evite amassá-los.</li>
              <li> → Embalagens de papelão, como as de pizza, não podem estar sujas de molho ou engorduradas. Nesse caso, descarte a parte “suja” como lixo não reciclável e encaminhe a parte limpa para reciclagem.</li>
              <li> → Com embalagens de vidro, especialmente se estiverem quebradas, é necessário um cuidado extra na hora de embalar, para não ferir os trabalhadores que irão manuseá-las.</li>
            </ul>
          </div>

        </div>

        <div className="section">
        <img src={Divider} alt="" />
          <h2 className="section-title">Benefícios da Coleta Seletiva</h2>
          <ul className="lista-beneficios">
            <li> → Reduz a poluição ambiental e o desperdício.</li>
            <li> → Conserva recursos naturais ao permitir a reciclagem.</li>
            <li> → Gera empregos em indústrias de reciclagem.</li>
            <li> → Promove a conscientização ambiental.</li>
            <li> → Melhoria da limpeza e qualidade do ambiente de trabalho;</li>
            <li> → Diminuição da exploração de recursos naturais renováveis e não renováveis;</li>
            <li> → Diminuição do impacto ambiental na geração de resíduos: poluição do solo, da água e do ar;</li>
            <li> → Diminuição da proliferação de doenças e da contaminação dos alimentos;</li>
            <li> → Diminuição de custos no processo de destinação de resíduos;</li>
            <li> → Possibilidade de venda dos materiais recicláveis, gerando renda à organização;</li>
            <li> → Parceria com organizações comunitárias, gerando inclusão social.</li>
          </ul>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Guia