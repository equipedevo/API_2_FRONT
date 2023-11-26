import { Link } from 'react-router-dom';
import './css/Header.css';

import alterarUsuario from './../img/menu/alterarUsuario.png';
import cadastrarUsuario from '../img/menu/cadastrarUsuario.png';
import papelComLapis from '../img/menu/papelComLapisBranco.png';
import sair from '../img/menu/sair.png';

export default function Header(){
    function logout(){
        localStorage.clear();
        window.location.href = '../empresa/login'
    }
    return (
        <>
            <header className='hearderPadrão'>
                <div>
                    <Link to='./' className='linkHearderPadrão'>
                        <img src={cadastrarUsuario} alt='Cadastrar Dados'/>
                        Cadastrar Funcionários
                    </Link>
                    <Link to="lista-funcionarios" className='linkHearderPadrão'>
                        <img src={alterarUsuario} alt='Alterar Dados'/>
                        Alterar Dados
                    </Link>
                    <Link to="perguntas-frequentes" className='linkHearderPadrão'>
                        <img src={papelComLapis} alt='Alterar Dados'/>
                        Cadastrar Perguntas
                    </Link>
                    <Link
                        className='linkHearderPadrão'
                        onClick={() => logout()}
                    >
                        <img src={sair} alt='Sair'/>
                        Sair
                    </Link>
                </div>
            </header>
        </>
    );
}   