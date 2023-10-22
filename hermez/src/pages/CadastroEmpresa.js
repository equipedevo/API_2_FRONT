import '../components/css/FormsPadrao.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import sair from '../img/menu/sair.png';

export default function CadastroEmpresa() {
    const [razaoSocial, setRazaoSocial] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [erroSenha, setErro] = useState('');

    // Função para formatar CNPJ
    function formatCnpj(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
        cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
        return cnpj;
    }
    
    function handleCnpjChange(event) {
        const inputCnpj = event.target.value;
        const formattedCnpj = formatCnpj(inputCnpj);
        setCnpj(formattedCnpj);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const criterioDeAceitacao = (
            senha.length >= 8 &&
            /[A-Z]/.test(senha) &&
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(senha) &&
            /\d/.test(senha)
        );
        if (senha !== senhaConfirmada) {
            setErro('As senhas não coincidem.');
        }
        else if(!criterioDeAceitacao){
            setErro(`Crie uma senha com no mínimo 8 caracteres, tendo pelo menos: 1 número; 1 letra maiúscula; 1 caracter especial;`);
        }
        else {
            setErro('');
            fetch(process.env.REACT_APP_URL_EMPRESA_CADASTRO, {
                method:'POST',
                body: JSON.stringify({
                    razaoSocial:razaoSocial,
                    cnpj:cnpj,
                    email:email,
                    senha:senha
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then(response => {
                if(response.status === 200) {
                    localStorage.setItem("novoPopup", 'Cadastro da empresa');
                    window.location.href = '../empresa/login'
                }
                else {
                    (response.json()).then(data => {
                        setErro(data.msg)
                    });
                }
            });
        }
    };
    return (
        <>
            <body className='bodyCadastro'>
                <header className='hearderPadrão'>
                    <div>
                        <Link to="../empresa/login" className='linkHearderPadrão'>
                            <img src={sair} alt="Sair" />
                            Voltar
                        </Link>
                    </div>
                </header>
                <div className='divFormPadrao' onSubmit={handleSubmit}>
                    <form className='formPadrao'>
                        <h1> Cadastre sua Empresa</h1>
                        <div className='divDuasColunasFormPadrao'>
                            <div>
                                <label htmlFor="razaoSocial">RAZÃO SOCIAL</label>
                                <input
                                    className="inputFormPadrao"
                                    id="razaoSocial"
                                    name='razaoSocial'
                                    onChange={(e) => setRazaoSocial(e.target.value)}
                                    value={razaoSocial}
                                    placeholder='Razão Social'
                                    required
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="cnpjCadastro">CNPJ</label>
                                <input
                                    className="inputFormPadrao"
                                    id="cnpjCadastro"
                                    maxLength="18"
                                    name='cnpjCadastro'
                                    onChange={handleCnpjChange}
                                    value={cnpj}
                                    placeholder="Razão Social"
                                    required
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='divDuasColunasFormPadrao'>
                            <div>
                                <label htmlFor="senha">SENHA</label>
                                <input
                                    className="inputFormPadrao"
                                    id="senha"
                                    name='senha'
                                    onChange={(e) => setSenha(e.target.value)}
                                    value={senha}
                                    placeholder='Senha'
                                    required
                                    type="password"
                                />
                            </div>
                            <div>
                                <label htmlFor="senhaConfirmada">CONFIRMAR SENHA</label>
                                <input
                                    className="inputFormPadrao"
                                    id="senhaConfirmada"
                                    name='senhaConfirmada'
                                    onChange={(e) => setSenhaConfirmada(e.target.value)}
                                    value={senhaConfirmada}
                                    placeholder='Senha'
                                    required
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="divUmaColunaFormPadrao">
                            <label htmlFor="email"> E-MAIL</label>
                            <input
                                className="inputFormPadrao"
                                id="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='E-mail'
                                required
                                type="email"
                            />
                        </div>
                        <div className='divBotaoEnviar'>
                            <input
                                id="cadastrandoEmpresa"
                                value='Enviar'
                                type='submit'
                            />
                        </div>
                        {erroSenha && <p className="erro">{erroSenha}</p>}
                    </form>
                </div>
            </body>
            <Footer />
        </>
    );
}
