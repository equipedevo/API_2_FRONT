import './css/CadastroEmpresa.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
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
                    <input
                        type="text"
                        placeholder='Nome'
                        id="nomeCompleto"
                        name='nomeCompleto'
                    required/>
                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span for="senha">SENHA</span>
                            <input
                                type="password"
                                placeholder='Senha'
                                id="senha"
                                name='senha'
                            required/>
                        </div>
                        <div>
                            <span for="senha">CONFIRMAR SENHA</span>
                            <input
                                type="password"
                                placeholder='Senha'
                                id="senhaConfirmada"
                                name='senhaConfirmada'
                            required/>
                        </div>
                    </div>
                    <span for="email">E-MAIL</span>
                    <input
                        type="email"
                        placeholder='E-mail'
                        id="email"
                        name='email'
                    required/>
                    <div className='divEnviarCadastroEmpresa'>
                        <input type='button' value='Enviar'/>
                    </div>
                </form>
            </body>
            <Footer/>
        </>
    );
}