import { Link } from 'react-router-dom';
import './css/Header.css';

import alterarUsuario from './../img/menu/alterarUsuario.png';
import cadastrarUsuario from '../img/menu/cadastrarUsuario.png';
import sair from '../img/menu/sair.png';

export default function Header(){
    function logout(){
        localStorage.clear();
        window.location.href = '/'
    }
    return (
        <>
            <header className='hearderPadrão'>
                <div>
                    <Link to='./' className='linkHearderPadrão'>
                        <img src={alterarUsuario}/>
                        Cadastrar
                    </Link>
                    <Link className='linkHearderPadrão'>
                        <img src={cadastrarUsuario}/>
                        Alterar Dados
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