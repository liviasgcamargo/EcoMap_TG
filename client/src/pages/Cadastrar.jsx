import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const Cadastrar = () => {
  return (
    <>

      <Navbar />

      <>
        <h2>CADASTRAR</h2>
        <form action="#" method="get" id="formCadastro">
          <fieldset>
            <div className="tipo-usuario">
              
              <label>
                <input type="radio" name="tipo" defaultValue="empresa" /> Empresa
              </label>
              <label>
                <input type="radio" name="tipo" defaultValue="ong" /> ONG
              </label>
            </div>
            
              

            {/* Campos ocultos */}
            {/* Campos para empresa */}
            <div id="empresaFields" style={{ display: "none" }}>
              <label htmlFor="nome">Nome</label>
              <input type="text" name="nome" id="nome" required="" />
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" name="cnpj" id="cnpj" required="" />
              <label htmlFor="telefone">Telefone</label>
              <input type="text" name="telefone" id="telefone" required="" />
              <label>
                <input type="checkbox" id="compraMateriais" /> Compra materiais
              </label>
              <div className="dropdown" id="dropdownCompraMateriais">
                <button className="dropbtn">
                  Selecionar materiais que a empresa compra
                </button>
                <div className="dropdown-content">
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisCompra"
                      defaultValue="plastico"
                    />{" "}
                    Plástico
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisCompra"
                      defaultValue="vidro"
                    />{" "}
                    Vidro
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisCompra"
                      defaultValue="metal"
                    />{" "}
                    Metal
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisCompra"
                      defaultValue="papel"
                    />{" "}
                    Papel
                  </label>
                </div>
              </div>
              <label>
                <input type="checkbox" id="vendeMateriais" /> Vende materiais
              </label>
              <div className="dropdown" id="dropdownVendaMateriais">
                <button className="dropbtn">
                  Selecionar materiais que a empresa vende
                </button>
                <div className="dropdown-content">
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisVenda"
                      defaultValue="plastico"
                    />{" "}
                    Plástico
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisVenda"
                      defaultValue="vidro"
                    />{" "}
                    Vidro
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisVenda"
                      defaultValue="metal"
                    />{" "}
                    Metal
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisVenda"
                      defaultValue="papel"
                    />{" "}
                    Papel
                  </label>
                </div>
              </div>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                rows={6}
                cols={50}
                placeholder="Escreva uma breve descrição de sua empresa aqui..."
                required=""
                defaultValue={""}
              />
              <label>Tipo de serviço</label>
              <div className="tipo-servico">
                <label>
                  <input
                    type="radio"
                    name="tipoServico"
                    defaultValue="retirada"
                    defaultChecked=""
                  />{" "}
                  Serviço de retirada
                </label>
                <label>
                  <input type="radio" name="tipoServico" defaultValue="recebimento" />{" "}
                  Recebimento no local
                </label>
                <label>
                  <input type="radio" name="tipoServico" defaultValue="ambos" /> Ambos
                </label>
              </div>
            </div>
            {/* Campos para ONG */}
            <div id="ongFields" style={{ display: "none" }}>
              <label htmlFor="nomeOng">Nome da ONG</label>
              <input type="text" name="nome" id="nomeOng" required="" />
              <label htmlFor="cnpjOng">CNPJ</label>
              <input type="text" name="cnpj" id="cnpjOng" required="" />
              <label htmlFor="telefoneOng">Telefone</label>
              <input type="text" name="telefone" id="telefoneOng" required="" />
              <label>Tipos de materiais que a ONG aceita como doação:</label>
              <div className="dropdown" id="dropdownDoacao">
                <button className="dropbtn">Selecionar materiais</button>
                <div className="dropdown-content">
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisDoacao"
                      defaultValue="roupas"
                    />{" "}
                    Roupas
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisDoacao"
                      defaultValue="alimentos"
                    />{" "}
                    Alimentos
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisDoacao"
                      defaultValue="brinquedos"
                    />{" "}
                    Brinquedos
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materiaisDoacao"
                      defaultValue="moveis"
                    />{" "}
                    Móveis
                  </label>
                </div>
              </div>
              <label htmlFor="descricaoOng">Descrição</label>
              <textarea
                id="descricaoOng"
                name="descricao"
                rows={6}
                placeholder="Escreva uma breve descrição da sua ONG aqui..."
                required=""
                defaultValue={""}
              />
              <label>Tipo de serviço</label>
              <div className="tipo-servico">
                <label>
                  <input
                    type="radio"
                    name="tipoServico"
                    defaultValue="retirada"
                    defaultChecked=""
                  />{" "}
                  Serviço de retirada
                </label>
                <label>
                  <input type="radio" name="tipoServico" defaultValue="recebimento" />{" "}
                  Recebimento no local
                </label>
                <label>
                  <input type="radio" name="tipoServico" defaultValue="ambos" /> Ambos
                </label>
              </div>
            </div>
            {/* Fim dos campos ocultos */}
            <p className="login-redirect">
              Já possui uma conta? <Link to="/login">Faça o Login</Link>
            </p>
            <div className="container-btn">
              <input
                type="submit"
                className="btnCadastrar"
                id="btnCadastrar"
                defaultValue="CADASTRAR"
              />
            </div>
          </fieldset>
        </form>
      </>


      <Footer />

    </>
  )
}

export default Cadastrar