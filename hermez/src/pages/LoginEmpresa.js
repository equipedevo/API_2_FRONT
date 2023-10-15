import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css';

/* IMAGEM */
import cadeado from '../img/login/cadeado.png';
import esquerda from '../img/login/esquerda.png';
import olho from '../img/login/olho.png';
import olhoCortado from '../img/login/olhoCortado.png';
import perfil from '../img/login/perfil.png';
import check from '../img/login/check.png';

export default function Login(){
    /* MOSTRAR SENHA */
    const [email, setEmail] = useState('');
    const [mostraSenha, setmostraSenha] = useState(false);
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const novoCadastro = localStorage.getItem("novoCadastro")
    useEffect(() => {if (novoCadastro === "novo cadastro") {
        setCadastroSucesso(true);
    }}, [novoCadastro]);
    const fecharPopUpCadastroComSucesso = () => {
        localStorage.removeItem("novoCadastro");
        setCadastroSucesso(false);
    }
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
            fetch("https://hermezapi-back.vercel.app/empresa/login?dev=true", {
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
            }).then(response => response.json().then(
                dados =>({
                    status: response.status,
                    resposta: dados,
                })
            )).then(dados => {
                if (dados.status===200) {
                    localStorage.setItem("emp_cod", dados.resposta.emp_cod)
                    localStorage.setItem("nome", dados.resposta.nome)
                    localStorage.setItem("cnpj", dados.resposta.cnpj)
                    localStorage.setItem("email", dados.resposta.email)
                    window.location.href = '/empresa'
                }
                else {
                    setErroLogin(dados.resposta.msg);
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
                    <div className="divLogin">
                        <h1>HERMEZ</h1>
                        <div className='formTelaLogin loginEmpresa'>
                            <form onSubmit={handleSubmit}>
                                <span>
                                    <img src={perfil} alt="perfil"/>
                                    <input
                                        type='email'
                                        onChange={handleEmailChange}
                                        placeholder="Email da Empresa"
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
                                    <Link
                                        className='buttonCadastroEmpresa'
                                        to="../empresa/cadastro">
                                        Cadastrar
                                    </Link>
                                </div>
                            </form>
                            {erroLogin && <p className="erro">{erroLogin}</p>}
                        </div>
                    </div>
                    <img
                        className="imagemRaio"
                        src={esquerda}
                        alt='imagemRaio'
                    />
                    <div className="divTrocaTelaLogin">
                        <Link to="/">
                            Entrar como Usuário
                        </Link>
                    </div>
                </div>
                {cadastroSucesso && (
                <div className="popUpCadastroComSucesso">
                    <div>
                        <span onClick={() => fecharPopUpCadastroComSucesso()}>&times;</span> 
                        <p>Cadastro realizado com sucesso!</p>
                    </div>
                </div>
                )}
            </body>
        </>
    );
}