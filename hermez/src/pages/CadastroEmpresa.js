import './css/CadastroEmpresa.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import sair from '../img/sair.png';
export default function CadastroEmpresa(){
    return (
        <>
            <body className='bodyCadastro'>
                <header className='hearderPadrão'>
                    <div>
                        <Link to="/">
                            <img src={sair}/>
                            Voltar
                        </Link>
                    </div>
                </header>
                <form className='formEmpresaCadastro'>
                    <h1> Cadastre sua Empresa</h1>
                    <span for="nomeCompleto">NOME COMPLETO</span>
                    <input type="text" placeholder='Nome' id="nomeCompleto" required/>
                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span for="senha">SENHA</span>
                            <input type="password" placeholder='Senha' id="senha" required/>
                        </div>
                        <div>
                            <span for="senha">CONFIRMAR SENHA</span>
                            <input type="password" placeholder='Senha' id="senhaConfirmada" required/>
                        </div>
                    </div>
                    <span for="nomeCompleto">E-MAIL</span>
                    <input type="email" placeholder='E-mail' id="email" required/>
                    <div className='divEnviarCadastroEmpresa'>
                        <input type='button' value='Enviar'/>
                    </div>
                </form>
            </body>
            <Footer/>
        </>
    );
}