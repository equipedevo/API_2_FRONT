import { useEffect, useState } from "react";
import Popup from '../components/Popup';
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
    useEffect(() => {
        const lembrar = localStorage.getItem('lembrar');
        const empCod = localStorage.getItem('emp_cod');
        const email = localStorage.getItem('email');
        const nome = localStorage.getItem('nome');
        const carCod = localStorage.getItem('car_cod');
        const celular = localStorage.getItem('celular');
        const funCod = localStorage.getItem('fun_cod');
        const funcao = localStorage.getItem('funcao');
        const cnpj = localStorage.getItem('cnpj');
    
        if (lembrar !== null && empCod !== null && email !== null && nome !== null) {
            if (carCod !== null && celular !== null && funCod !== null && funcao !== null) {
                if (cnpj === null) {
                    window.location.href = '/funcionario';
                    return;
                }
            } else if (cnpj !== null) {
                window.location.href = '/empresa';
                return;
            }
        }
    
        localStorage.clear();
    }, []);
    
    /* MOSTRAR SENHA */
    const [email, setEmail] = useState('');
    const [mostraSenha, setmostraSenha] = useState(false);
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const [statusCheckbox, setStatusCheckbox] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        if (email !== '' && senha !== ''){
            fetch(process.env.REACT_APP_URL_EMPRESA_LOGIN, {
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
                    if (statusCheckbox){
                        localStorage.setItem("lembrar", 1)
                    }
                    localStorage.setItem("emp_cod", dados.resposta.emp_cod)
                    localStorage.setItem("email", dados.resposta.email)
                    localStorage.setItem("nome", dados.resposta.nome)
                    localStorage.setItem("cnpj", dados.resposta.cnpj)
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
    }
    return (
        <>
            <div className="divLoginPadrão flex">
                <div className="divConteudoLogin">
                    <h1>HERMEZ</h1>
                    <div className="esquerda">
                        <form className='FormsLogin flex' onSubmit={handleSubmit}>
                            <div>
                                <img src={perfil} alt="perfil"/>
                                <input
                                    className='InputLogin'
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email da Empresa"
                                    type='email'
                                    value={email}
                                />
                            </div>
                            <div>
                                <img src={cadeado} alt='cadeado'/>
                                <input
                                    className='InputLogin'
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="Senha"
                                    type={mostraSenha ? 'text' : 'password'}
                                    value={senha}
                                />
                                <img
                                    alt='olho'
                                    onClick = {() => setmostraSenha(!mostraSenha)}
                                    src = {mostraSenha ? olho : olhoCortado}
                                    value = {mostraSenha}
                                />
                            </div>
                            <div
                                className="checkboxFormLogin"
                                onClick={() => setStatusCheckbox(!statusCheckbox)}>
                                <input
                                    type="checkbox"
                                    checked={statusCheckbox}
                                />
                                <label>
                                    <img src={check} alt='check'/>
                                </label>
                                Lembrar de mim
                            </div>
                            <div className='botoesFormLogin flex'>
                                <div>
                                    <input
                                        className='botaoLogin vermelho'
                                        value='Entrar'
                                        type='submit'
                                    />
                                </div>
                                <div>
                                    <Link
                                        className='botaoLogin verde'
                                        to="../empresa/cadastro">
                                        Cadastrar
                                    </Link>
                                </div>
                            </div>
                            {erroLogin && 
                             
                                <p className="erro">{erroLogin}</p>
                            }
                        </form>
                        <div className='divTrocaLogin Mobile'>
                            <Link to="/">
                                Entrar como Usuário
                            </Link>
                        </div>
                    </div>
                </div>
                <img
                    src={esquerda}
                    alt='imagemRaio'
                />
                <div className="divTrocaLogin Desktop">
                    <Link to="/">
                        Entrar como Usuário
                    </Link>
                </div>
            </div>
            <Popup/>
        </>
    );
}