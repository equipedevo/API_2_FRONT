import './css/CadastroUser.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import sair from '../img/menu/sair.png';
export default function CadastroUser(){
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