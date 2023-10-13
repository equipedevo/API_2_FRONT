import './css/Home.css';
import { Link } from 'react-router-dom';

import balaoChat from '../img/home/balaoChat.png';
import gerenciarUsuario from '../img/home/gerenciarUsuario.png';
import foneAtendimento from '../img/home/foneAtendimento.png';
import papelComLapis from '../img/home/papelComLapis.png';

export default function Home(){
    return (
        <>
            <div className='botoesHomePrincipal'>
                <Link>
                    <div>
                        <img src={balaoChat}/>
                        <h1> Visualizar chamados</h1>
                    </div>
                </Link>
                <Link>
                    <div>
                        <img src={gerenciarUsuario}/>
                        <h1> Gerenciar Usuário</h1>
                    </div>
                </Link>
                <Link>
                    <div>
                        <img src={foneAtendimento}/>
                        <h1> Iniciar um novo chamados</h1>
                    </div>
                </Link>
                <Link>
                    <div>
                        <img src={papelComLapis}/>
                        <h1> Atender chamados</h1>
                    </div>
                </Link>
            </div>
        </>
    );
}