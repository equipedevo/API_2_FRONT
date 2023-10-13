import './css/CadastroUser.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import sair from '../img/sair.png';
import './CadastroEmpresa';

export default function CadastroUser() {
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');    
    const [erroSenha, setErro] = useState('');    
    const [email, setEmail] = useState('');    
    const [vinculo, setVinculo] = useState('');    
    const [telefone, setTelefone] = useState('');    
    const [celular, setCelular] = useState('');    
    const [setor, setSetor] = useState('');    
    const [cargo, setCargo] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cadastroSucesso, setCadastroSucesso] = useState(false); 


    function handleEmailChange(event) {
        const email = event.target.value;
        setEmail(email);
    }


    function handleVinculoChange(event) {
        const vinculo = event.target.value;
        setVinculo(vinculo);
    }


    function handleTelefoneChange(event) {
        const telefone = event.target.value;
        setTelefone(telefone);
    }


    function handleCelularChange(event) {
        const celular = event.target.value;
        setCelular(celular);
    }


    function handleSetorChange(event) {
        const setor = event.target.value;
        setSetor(setor);
    }


    function handleCargoChange(event) {
        const cargo = event.target.value;
        setCargo(cargo);
    }

    function handleNomeChange(event) {
        const nome = event.target.value;
        setNomeCompleto(nome);
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
            fetch("https:hermezapi-backvercelappfuncionariocadastro", {
                method:'POST',
                body: JSON.stringify({
                    nome: nomeCompleto,
                    email: email,
                    celular: celular,
                    senha: senha,
                    cargo: cargo,
                    // emp_cod: razaoSocial,
                    // funcao: funcao                                      
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
                        <Link to="/">
                            <img src={sair}alt="VOLTAR"/> 
                            Voltar
                        </Link>
                    </div>
                </header>


                <form className='formUserCadastro' onSubmit={handleSubmit}>

                    <h1> Cadastrar novo usuário</h1>

                    
                    <div>
                        <span htmlFor="nomeCompleto">NOME COMPLETO</span>
                            <input 
                                id='nomeCompleto'
                                name='nomeCompleto'
                                value={nomeCompleto}
                                onChange={handleNomeChange}
                                placeholder='Nome' 
                                required
                                type="text" 
                        />
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


                    <div className='div2ColunasFormCadastro'>

                        <div>
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
                        </div>

                        <div>
                            {/* opcional  */}
                            <span for="vinculo">VÍNCULO COM A EMPRESA</span> 
                            <input 
                                id="vinculo"
                                name='vinculo'
                                value={vinculo}
                                onChange={handleVinculoChange}
                                placeholder='Vínculo' 
                                required
                                type="text" 
                            />
                        </div>

                    </div>


                    <div className='div2ColunasFormCadastro'>

                        <div>
                            <span for="telefone">TELEFONE</span>
                            <input 
                                id="telefone" 
                                name='telefone'
                                value={telefone}
                                onChange={handleTelefoneChange}
                                placeholder='Telefone' 
                                required
                                type="text"
                            />
                        </div>

                        <div>
                            <span for="celular">CELULAR</span>
                            <input 
                            id="celular"
                            name='celular'
                            value={celular} 
                            onChange={handleCelularChange}
                            placeholder='Celular' 
                            required
                            type="text" 
                        />
                        </div>

                    </div>  

                    
                    <div className='div2ColunasFormCadastro'>

                        <div>
                            {/* opcional */}
                            <span for="setor">SETOR</span>
                            <input 
                            id="setor" 
                            name='setor'
                            value={setor}
                            onChange={handleSetorChange}
                            placeholder='Setor' 
                            required
                            type="text" 
                            />
                        </div>

                        <div class='dropdownUser'>
                            <button onclick="myFunction()" class='dropbtn'>CLASSIFICAÇÃO</button>
                            <div>
                                <select 
                                    class='dropdown-content'
                                    id='dropUser'
                                    name='dropUser'
                                    value={cargo}
                                    onChange={handleCargoChange}
                                    placeholder='Cargo'
                                    // required
                                    // type='button'
                                >
                                    <option value='Administrador'>Administrador</option>
                                    <option value='Funcionario'>Funcionário</option>
                                    <option value='Tecnico'>Técnico</option>
                                {/* <p>Administrador</p>
                                <p>Funcionário</p>
                                <p>Técnico</p> */}
                                </select>
                            </div>
                        </div>

                        

                    </div>


                    <div className='divBotaoEnviar'>
                        <button
                            id="cadastrandoUser"
                            placeholder='Enviar'
                            type='submit'
                        >
                            Cadastrar</button>
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
            <Footer/>
        </>
    );
}