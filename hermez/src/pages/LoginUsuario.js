import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css';

/* IMAGEM */
import cadeado from '../img/cadeado.png';
import direita from '../img/direita.png';
import olho from '../img/olho.png';
import olhoCortado from '../img/olhoCortado.png';
import perfil from '../img/perfil.png';
import check from '../img/check.png';

export default function Login(){
    /* MOSTRAR SENHA */
    const [email, setEmail] = useState('');
    const [mostraSenha, setmostraSenha] = useState(false);
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const deixarSenhaVisivel = () => {
        setmostraSenha(!mostraSenha);
    };
    /* MUDAR STATUS CHECKBOX */
    const [statusCheckbox, setStatusCheckbox] = useState(false);
    const mudaStatusCheckbox = () => {
        setStatusCheckbox(!statusCheckbox)
    };
    function handleEmailChange(event) {
        const email = event.target.value;
        setEmail(email);
    };
    function handleSubmit(event) {
        event.preventDefault();
        if (email !== '' && senha !== ''){
            fetch("https://hermezapi-back.vercel.app/usuario/login?dev=true", {
                method:'POST',
                body: JSON.stringify({
                    email:email,
                    senha:senha
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            .then(response =>{
                if(response.status === 200) {
                    window.location.href = '/base';
                }
                else {
                    (response.json()).then(data => {
                        setErroLogin(data.msg)
                    });
                }
            });
        }
        else {
            setErroLogin('Preencha os campos E-mail e Senha');
        }
    };
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
                        alt='imagemRaio'
                    />
                    <div className="divLogin">
                        <h1>HERMEZ</h1>
                        <div className='formTelaLogin loginCliente'>
                            <form onSubmit={handleSubmit}>
                                <span>
                                    <img src={perfil} alt="perfil"/>
                                    <input
                                        type='email'
                                        onChange={handleEmailChange}
                                        placeholder="Email do Usuário"
                                        value={email}
                                    />
                                </span>
                                <span>
                                    <img src={cadeado} alt='cadeado'/>
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
                                        alt='olho'
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
                                    <label>
                                        <img src={check} alt='check'/>
                                    </label>
                                    Lembrar de mim
                                </div>
                                <div className='divButtonFormLogin'>
                                    <input
                                        className='buttonLogin'
                                        value='Entrar'
                                        type='submit'
                                    />
                                </div>
                            </form>
                            {erroLogin && <p className="erro">{erroLogin}</p>}
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}