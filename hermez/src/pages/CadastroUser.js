import './css/CadastroUser.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import sair from '../img/menu/sair.png';
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


                <form className='formUserCadastro'>
                    <h1> Cadastrar novo usuário</h1>
                    <span for="nomeCompleto">NOME COMPLETO</span>
                    <input type="text" placeholder='Nome' id="nomeCompleto" required/>
                    <div className='div2ColunasFormCadastro'>

                        <div>
                            <span for="senha">SENHA</span>
                            <input type="password" placeholder='Senha' id="senha" required/>
                        </div>

                        <div>
                            <span for="senha">CONFIRMAR SENHA</span>
                            <input type="password" placeholder='Confirmar Senha' id="senhaConfirmada" required/>
                        </div>
                    </div>


                    <div className='div2ColunasFormCadastro'>

                        <div>
                            <span for="email">E-MAIL</span>
                            <input type="email" placeholder='e-mail' id="email" required/>
                        </div>

                        <div>
                            {/* opcional  */}
                            <span for="vinculo">VÍNCULO COM A EMPRESA</span> 
                            <input type="text" placeholder='Vínculo' id="vinculo" required/>
                        </div>

                    </div>


                    <div className='div2ColunasFormCadastro'>

                        <div>
                            <span for="telefone">TELEFONE</span>
                            <input type="number" placeholder='Telefone' id="telefone" required/>
                        </div>

                        <div>
                            <span for="celular">CELULAR</span>
                            <input type="number" placeholder='Celular' id="celular" required/>
                        </div>

                    </div>  

                    
                    <div className='div2ColunasFormCadastro'>

                        <div>
                            {/* opcional */}
                            <span for="setor">SETOR</span>
                            <input type="text" placeholder='Setor' id="setor" required/>
                        </div>

                        <div class='dropdownUser'>
                            <button onclick="myFunction()" class='dropbtn'>CLASSIFICAÇÃO</button>
                            <div id='dropUser'class='dropdown-content'>
                                <p>Administrador</p>
                                <p>Funcionário</p>
                                <p>Técnico</p>
                            </div>
                        </div>

                        

                    </div>


                    <div className='divEnviarCadastroUser'>
                        <input type='button' value='Cadastrar'/>
                    </div>

                    
                </form>
            </body>
            <Footer/>
        </>
    );
}