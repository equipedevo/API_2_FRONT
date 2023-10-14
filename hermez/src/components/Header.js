import { Link } from 'react-router-dom';
import './css/Header.css';

import sair from '../img/menu/sair.png';
import perfil from '../img/menu/perfilHeader.png';
import home from '../img/menu/home.png';
import dropdown from '../img/dropdown.png';
import balaoChat from '../img/menu/balaoChat.png';
import gerenciarUsuario from '../img/menu/gerenciarUsuario.png';
import foneAtendimento from '../img/menu/foneAtendimento.png';
import papelComLapis from '../img/menu/papelComLapis.png';

export default function Header(){
    function logout(){
        localStorage.clear();
        window.location.href = '/'
    }
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
                    <Link to="./" className='linkHearderPadrão'>
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
                                <Link to='cadastro'>
                                    Cadastrar
                                </Link>
                                <Link to='/meusChamados'>
                                    Alterar Dados
                                </Link>
                            </div>
                            <Link to="atenderChamados">
                                <img src={foneAtendimento}/>
                                Atender Chamados
                            </Link>
                            <Link to="novoChamado">
                                <img src={papelComLapis}/>
                                Novo Chamado
                            </Link>
                        </div>
                    </div>
                    <Link to="perfil" className='linkHearderPadrão'>
                        <img src={perfil}/>
                        Perfil
                    </Link>
                    <Link
                        className='linkHearderPadrão'
                        onClick={() => logout()}
                    >
                        <img src={sair}/>
                        Sair
                    </Link>
                </div>
            </header>
        </>
    );
}   