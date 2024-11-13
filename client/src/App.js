import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BuscarPontoPopUp from "./components/BuscarPontoPopUp";
import BuscarOngPopUp from "./components/BuscarOngPopUp";
import BuscarEmpresaPopUp from "./components/BuscarEmpresaPopUp";
import SugerirPontoPopUp from "./components/SugerirPontoPopUp";
import AdicionarPontoPopup from "./components/AdicionarPontoPopup";
import ResultadoPontoColeta from "./pages/ResultadoPontoColeta";
import ResultadoOng from "./pages/ResultadoOng";
import ResultadoEmpresa from "./pages/ResultadoEmpresa";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PontosSugeridos from "./pages/PontosSugeridos";
import Faq from "./pages/Faq";
import Guia from "./pages/Guia";
import SobreNos from "./pages/SobreNos";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/EsqueciSenha";


function App() {

  const isAuthenticated = !!localStorage.getItem("token");
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/buscar-ponto-coleta" element={<BuscarPontoPopUp/>}/>
      <Route path="/buscar-ong" element={<BuscarOngPopUp/>}/>
      <Route path="/buscar-empresa" element={<BuscarEmpresaPopUp/>}/>
      <Route path="/sugerir-ponto" element={<SugerirPontoPopUp/>}/>
      <Route path="/adicionar-ponto" element={<AdicionarPontoPopup/>}/>
      <Route path="/resultado-ponto-coleta" element={<ResultadoPontoColeta/>}/>
      <Route path="/resultados-ongs" element={<ResultadoOng/>}/>
      <Route path="/resultados-empresas" element={<ResultadoEmpresa/>}/>
      <Route path="/perfil-adm" element={<AdminLogin />} />
      <Route path="/gerenciar-info-administrador" element={<AdminDashboard />} />
      <Route path="/gerenciar-pontos-sugeridos" element={<PontosSugeridos />} />
      <Route path="/guia" element={<Guia />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/sobre-nos" element={<SobreNos />} />
      <Route path="/pontos-sugeridos" element={<PontosSugeridos />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;