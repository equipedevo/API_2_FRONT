import { Link } from 'react-router-dom';
import './css/Header.css';

import sair from '../img/sair.png';
import perfil from '../img/perfilHeader.png';
import home from '../img/home.png';
export default function Header(){
    return (
        <>
            <header className='hearderPadrão'>
                <div>
                    <Link to="/home">
                        <img src={home}/>
                        Início
                    </Link>
                    <Link to="/perfil">
                        <img src={perfil}/>
                        Perfil
                    </Link>
                    <Link to="/">
                        <img src={sair}/>
                        Sair
                    </Link>
                </div>
            </header>
        </>
    );
}