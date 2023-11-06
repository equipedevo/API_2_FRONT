import { useState } from 'react';
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

function DropdownAdms() {
    const [chamadosVisible, setChamadosVisible] = useState(false);
    const [gerenciarUsuariosVisible, setGerenciarUsuariosVisible] = useState(false);

    function toggleChamados() {
        setChamadosVisible(!chamadosVisible);
    }

    function toggleGerenciarUsuarios() {
        setGerenciarUsuariosVisible(!gerenciarUsuariosVisible);
    }

    
    return (
        <>
            <button onClick={toggleChamados}>
                <img src={balaoChat} alt="Chamados"/>
                Chamados
                <img
                    src={dropdown}
                    style={{
                        transform: chamadosVisible ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                    alt='dropdown'
                />
            </button>
            <div
                className="dropdownHeader"
                id="Chamados"
                style={{ display: chamadosVisible ? 'flex' : 'none' }}
            >
                <Link>Relatório</Link>
                <Link>Meus Chamados</Link>
            </div>
            <button onClick={toggleGerenciarUsuarios}>
                <img src={gerenciarUsuario} alt="Gerenciar Usuários" />
                Gerenciar Usuários
                <img
                    src={dropdown}
                    style={{
                        transform: gerenciarUsuariosVisible ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                    alt='dropdown'
                />
            </button>
            <div
                className="dropdownHeader"
                id="GerenciarUsuarios"
                style={{ display: gerenciarUsuariosVisible ? 'flex' : 'none' }}
            >
                <Link to="cadastrar-usuario">Cadastrar</Link>
                <Link to="lista-funcionarios">Alterar Dados</Link>
            </div>
        </>
    );
}
export default function Header() {
    const cargo = localStorage.getItem('car_cod');
    const [funcoesVisible, setFuncoesVisible] = useState(false);
    function toggleGerenciarFuncoes() {
        setFuncoesVisible(!funcoesVisible);
    }
    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
    <>
        <header className="hearderPadrão">
        <Link to="./" className="linkHearderPadrão">
            <img src={home} alt="Início" />
            Início
        </Link>
        <div className="dropdownHeader alignCenter">
            <button onClick={(toggleGerenciarFuncoes)}>Suas Funções</button>
            <div
                id='Funcoes'
                style={{ display: funcoesVisible ? 'flex' : 'none' }}
            >
                {cargo === '3' ? (
                    <DropdownAdms/>
                ):(
                    <Link>
                        <img to="chat" src={balaoChat} alt="BalaoChat" />
                        <h1>Histórico de chamados</h1>
                    </Link>
                )}
                {cargo !== '1' && (
                <>
                    <Link to="atender-chamados">
                        <img src={foneAtendimento} alt="Atender Chamados" />
                        Atender Chamados
                    </Link>
                </>
                )}
                <Link to="realizar-chamado">
                    <img src={papelComLapis} alt="Novo Chamado" />
                    Novo Chamado
                </Link>
            </div>
        </div>
        <Link className="linkHearderPadrão">
            <img src={perfil} alt="Perfil" />
            Perfil
        </Link>
        <Link className="linkHearderPadrão" onClick={logout}>
            <img src={sair} alt="Sair" />
            Sair
        </Link>
        </header>
    </>
  );
}