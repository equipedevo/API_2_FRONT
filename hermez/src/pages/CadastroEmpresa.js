import './css/CadastroEmpresa.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import sair from '../img/sair.png';

export default function CadastroEmpresa() {
    const [razaoSocial, setRazaoSocial] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [erroSenha, setErro] = useState('');
    const [cadastroSucesso, setCadastroSucesso] = useState(false); 

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
    function handleEmailChange(event) {
        const email = event.target.value;
        setEmail(email);
    }
    function handleRazaoSocialChange(event) {
        const razaoSocial = event.target.value;
        setRazaoSocial(razaoSocial);
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
        else if(criterioDeAceitacao){
            setErro(`Crie uma senha com no mínimo 8 caracteres, tendo pelo menos: 1 número; 1 letra maiúscula; 1 caracter especial;`);
        }
        else {
            setErro('');
            fetch("https://hermezapi-back.vercel.app/empresa/cadastro?dev=true", {
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
                    setCadastroSucesso(true);
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
                        <Link to="/" className='linkHearderPadrão'>
                            <img src={sair} alt="Sair" />
                            Voltar
                        </Link>
                    </div>
                </header>
                <form className='formEmpresaCadastro' onSubmit={handleSubmit}>
                    <h1> Cadastre sua Empresa</h1>
                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span htmlFor="razaoSocial">RAZÃO SOCIAL</span>
                            <input
                                id="razaoSocial"
                                name='razaoSocial'
                                onChange={handleRazaoSocialChange}
                                value={razaoSocial}
                                placeholder='Razão Social'
                                required
                                type="text"
                            />
                        </div>
                        <div>
                            <span htmlFor="cnpjCadastro">CNPJ</span>
                            <input
                                autoComplete="off"
                                id="cnpjCadastro"
                                maxLength="18"
                                name='nomeCompleto'
                                onChange={handleCnpjChange}
                                value={cnpj}
                                placeholder='CNPJ'
                                required
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span htmlFor="senha">SENHA</span>
                            <input
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
                            <span htmlFor="senhaConfirmada">CONFIRMAR SENHA</span>
                            <input
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
                    <span for="email">E-MAIL</span>
                    <input
                        id="email"
                        name='email'
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='E-mail'
                        required
                        type="email"
                    />
                    <div className='divEnviarCadastroEmpresa'>
                        <input
                            id="cadastrandoEmpresa"
                            value='Enviar'
                            type='submit'
                        />
                    </div>
                    {erroSenha && <p className="erro">{erroSenha}</p>}
                </form>
                {cadastroSucesso && (
                <div className="popUpCadastro">
                    <div>
                        <span className="fechar" onClick={() => setCadastroSucesso(false)}>&times;</span> 
                        <p>Cadastro realizado com sucesso!</p>
                    </div>
                </div>
                )}
            </body>
            <Footer />
        </>
    );
}
