import { useState } from 'react';
import './css/Login.css';

/* IMAGEM */
import cadeado from '../img/cadeado.png';
import esquerda from '../img/esquerda.png';
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
    /* MUDAR STATUS CHECKBOX */
    const [statusCheckbox, setStatusCheckbox] = useState(false);
    const mudaStatusCheckbox = () => {
        setStatusCheckbox(!statusCheckbox)
    }
    /* FUNÇÃO DE TROCA DE URL */
    const trocarURL = (novaURL) => {
        window.location.href = novaURL;
    }
    return (
        <>
            <body>
                <div className="fundoLogin">
                    <div className="divLogin">
                        <h1>HERMEZ</h1>
                        <div className='formTelaLogin loginEmpresa'>
                            <form >
                                <span>
                                    <img src={perfil}/>
                                    <input
                                        type='email'
                                        placeholder="Email da Empresa"
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
                                <button className='buttonLogin'>Entrar</button>
                                <button
                                    className='buttonCadastroEmpresa'
                                    onClick={() => trocarURL('cadastroEmpresa')}>
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </div>
                    <img
                        className="imagemRaio"
                        src={esquerda}
                    />
                    <div className="divTrocaTelaLogin">
                        <button 
                            onClick={() => trocarURL('/usuario')}>
                            Entrar como Usuário
                        </button>
                    </div>
                </div>
            </body>
        </>
    );
}