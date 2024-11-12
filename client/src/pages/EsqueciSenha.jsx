import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../assets/styles/EsqueciSenha.css'

const EsqueciSenha = () => {

    return (
        <>
        <Navbar/>

        <div className="esqueci-senha-container">
            <h2>Redefinir Senha</h2>
            <form >
                <label>Email:</label>
                <input type="email" required />
                <p>Você irá receber um e-mail no endereço informado acima contendo o 
                procedimento para criar uma nova senha</p>
                <button>Enviar</button>
            </form>

        </div>

        <Footer/>

        </>
    );
};

export default EsqueciSenha;
