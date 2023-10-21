import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css';
/* IMAGEM */
import cadeado from '../img/login/cadeado.png';
import direita from '../img/login/direita.png';
import olho from '../img/login/olho.png';
import olhoCortado from '../img/login/olhoCortado.png';
import perfil from '../img/login/perfil.png';
import check from '../img/login/check.png';

export default function Login(){
    const [email, setEmail] = useState('');
    const [mostraSenha, setmostraSenha] = useState(false);
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const [statusCheckbox, setStatusCheckbox] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        if (email !== '' && senha !== ''){
            fetch(process.env.REACT_APP_URL_FUNCIONARIO_LOGIN, {
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
                    localStorage.setItem("fun_cod", dados.resposta.fun_cod)
                    localStorage.setItem("nome", dados.resposta.nome)
                    localStorage.setItem("emal", dados.resposta.email)
                    localStorage.setItem("celular", dados.resposta.celular)
                    localStorage.setItem("funcao", dados.resposta.funcao)
                    localStorage.setItem("car_cod", dados.resposta.car_cod)
                    localStorage.setItem("emp_cod", dados.resposta.emp_cod)
                    window.location.href = '/funcionario'
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
            <div className="divLoginPadrão flex">
                <div className="divTrocaLogin Desktop">
                    <Link to="empresa/login">
                        Entrar como Empresa
                    </Link>
                </div>
                <img
                    src={direita}
                    alt='imagemRaio'
                />
                <div className="divConteudoLogin">
                    <h1 className='direita'>HERMEZ</h1>
                    <div className='direita'>
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
                            <Link to="empresa/login">
                                Entrar como Empresa
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}