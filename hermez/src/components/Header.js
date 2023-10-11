import { Link } from 'react-router-dom';
import './css/Header.css';

import sair from '../img/sair.png';
import perfil from '../img/perfilHeader.png';
import home from '../img/home.png';
import dropdown from '../img/dropdown.png';
import balaoChat from '../img/balaoChat.png';
import gerenciarUsuario from '../img/gerenciarUsuario.png';
import foneAtendimento from '../img/foneAtendimento.png';
import papelComLapis from '../img/papelComLapis.png';

export default function Header(){
    /* MOSTRAR dropdown */
    function fechaDropdown(a) {
        const elementA = document.getElementById(a);
        const dropdownElement = document.getElementById(`dropdown${a}`);
        if (a==='Funcoes') {
            document.getElementById('Chamados').style.display = "none";
            document.getElementById('GerenciarUsuarios').style.display = "none";
            document.getElementById('dropdownGerenciarUsuarios').style.transform = 'rotate(0)';
            document.getElementById('dropdownChamados').style.transform = 'rotate(0)';
        }
        if (elementA && elementA.style.display === "flex") {
            elementA.style.display = "none";
            if (dropdownElement) {
                dropdownElement.style.transform = 'rotate(0)';
            }
        } else {
            if (elementA) {
                elementA.style.display = "flex";
            }
            if (dropdownElement) {
                dropdownElement.style.transform = 'rotate(180deg)';
            }
        }
    };
    return (
        <>
            <header className='hearderPadrão'>
                <div>
                    <Link to="/home" className='linkHearderPadrão'>
                    <img src={home} />
                        Início
                    </Link>
                    <div className="dropdownHeader alignCenter">
                        <button onClick={() => fechaDropdown('Funcoes')}>Suas Funções</button>
                        <div id='Funcoes'>
                            <button
                                onClick={() => fechaDropdown('Chamados')}>
                                <img src={balaoChat}/>
                                Chamados
                                <img src={dropdown} id='dropdownChamados'/>
                            </button>
                            <div className="dropdownHeader" id='Chamados'>
                                <Link to='/relatorio'>
                                    Relatório
                                </Link>
                                <Link to='/meusChamados'>
                                    Meus Chamados
                                </Link>
                            </div>
                            <button
                                onClick={() => fechaDropdown('GerenciarUsuarios')}>
                                <img src={gerenciarUsuario}/>
                                Gerenciar Usuários
                                <img src={dropdown} id='dropdownGerenciarUsuarios'/>
                            </button>
                            <div className="dropdownHeader" id='GerenciarUsuarios'>
                                <Link to='/relatorio'>
                                    Cadastrar
                                </Link>
                                <Link to='/meusChamados'>
                                    Alterar Dados
                                </Link>
                            </div>
                            <Link to="/perfil">
                                <img src={foneAtendimento}/>
                                Atender Chamados
                            </Link>
                            <Link to="/perfil">
                                <img src={papelComLapis}/>
                                Novo Chamado
                            </Link>
                        </div>
                    </div>
                    <Link to="/perfil" className='linkHearderPadrão'>
                        <img src={perfil}/>
                        Perfil
                    </Link>
                    <Link to="/" className='linkHearderPadrão'>
                        <img src={sair}/>
                        Sair
                    </Link>
                </div>
            </header>
            <div className='cabecalhoHeader'>
                <div/>
                <p>
                    <h1>Olá, Administrador!</h1>
                    <h2>Acesse suas funções de uma maneira rápida e fácil!</h2>
                </p>
            </div>
        </>
    );
}   