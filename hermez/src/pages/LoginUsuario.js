import { useState } from 'react';
import './css/Login.css';
import { Link } from 'react-router-dom';

/* IMAGEM */
import cadeado from '../img/cadeado.png';
import direita from '../img/direita.png';
import olho from '../img/olho.png';
import olhoCortado from '../img/olhoCortado.png';
import perfil from '../img/perfil.png';

export default function Login(){
    /* MOSTRAR SENHA */
    const [mostraSenha, setmostraSenha] = useState(false);
    const [senha, setSenha] = useState('');
    const deixarSenhaVisivel = () => {
        setmostraSenha(!mostraSenha);
    };
    const [statusCheckbox, setStatusCheckbox] = useState(false);
    const mudaStatusCheckbox= () => {
        setStatusCheckbox(!statusCheckbox)
    }
    return (
        <>
            <body>
                <div className="fundoLogin">
                    <div className="divTrocaTelaLogin">
                        <Link
                            to="/empresa">
                            Entrar como Empresa
                        </Link>
                    </div>
                    <img
                        className="imagemRaio"
                        src={direita}
                    />
                    <div className="divLogin">
                        <h1>HERMEZ</h1>
                        <div className='formTelaLogin loginCliente'>
                            <form>
                                <span>
                                    <img src={perfil}/>
                                    <input
                                        type='email'
                                        placeholder="Email do Usuário"
                                    />
                                </span>
                                <span>
                                    <img src={cadeado}/>
                                    <input
                                        type={mostraSenha ? 'text' : 'password'}
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(x) => setSenha(x.target.value)}
                                    />
                                    <img
                                        src = {mostraSenha ? olho : olhoCortado}
                                        className = "imagemOlho"
                                        onClick = {deixarSenhaVisivel}
                                    />
                                </span>
                                <div
                                    className="checkboxFormLogin"
                                    onClick={mudaStatusCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={statusCheckbox}
                                        onChange={() => setStatusCheckbox(!statusCheckbox)}
                                    />
                                    Lembrar de mim
                                </div>
                            </form>
                            <div className='divButtonFormLogin'>
                                <Link
                                    className='buttonLogin'
                                    to="/base">
                                    Entrar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}