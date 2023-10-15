import './css/Home.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import balaoChat from '../img/home/balaoChat.png';
import gerenciarUsuario from '../img/home/gerenciarUsuario.png';
import foneAtendimento from '../img/home/foneAtendimento.png';
import papelComLapis from '../img/home/papelComLapis.png';

export default function Home(){
    const [chamados, setChamados] = useState(true);
    const [gerenciar, setGerenciar] = useState(true);
    return (
        <>
            <div className='cabecalhoHeader'>
                <div/>
                <p>
                    <h1>Olá, Administrador!</h1>
                    <h2>Acesse suas funções de uma maneira rápida e fácil!</h2>
                </p>
            </div>
            <div className='divbotoesHome'>
                {chamados ? (
                    <Link
                        className='botoesHome grande'
                        onClick={()=> setChamados(!chamados)}
                        >
                        <div>
                            <img src={balaoChat}/>
                            <h1> Visualizar chamados</h1>
                        </div>
                    </Link>
                ):(
                    <div className='botoesPequenoHome' id='GerenciarUsuariosItens'>
                        <Link className='botoesHome pequeno'>
                            <div>
                                <h1>Gerar relatórios</h1>
                            </div>
                        </Link>
                        <Link className='botoesHome pequeno'>
                            <div>
                                <h1>Histórico meus chamados</h1>
                            </div>
                        </Link>
                    </div>
                )}
                {gerenciar ? (
                    <Link
                        className='botoesHome grande'
                        onClick={()=> setGerenciar(!gerenciar)}
                    >
                        <div>
                            <img src={gerenciarUsuario}/>
                            <h1>Gerenciar usuários</h1>
                        </div>
                    </Link>
                ):(
                    <div className='botoesPequenoHome' id='GerenciarUsuariosItens'>
                        <Link className='botoesHome pequeno' to="cadastro">
                            <div>
                                <h1>Cadastrar usuários</h1>
                            </div>
                        </Link>
                        <Link className='botoesHome pequeno'>
                            <div>
                                <h1>Alterar dados usuários</h1>
                            </div>
                        </Link>
                    </div>
                )}
                <Link className='botoesHome grande' to="dashboard-chamado">
                    <div>
                        <img src={papelComLapis}/>
                        <h1> Iniciar um novo chamados</h1>
                    </div>
                </Link>
                <Link className='botoesHome grande' to="chamado">
                    <div>
                        <img src={foneAtendimento}/>
                        <h1> Atender chamados</h1>
                    </div>
                </Link>
            </div>
        </>
    );
}