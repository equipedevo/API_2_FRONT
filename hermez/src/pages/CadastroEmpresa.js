import './css/CadastroEmpresa.css';

export default function CadastroEmpresa(){
    function trocarURL(novaURL) {
        window.location.href = novaURL;
    }
    return (
        <>
            <body className='bodyCadastro'>
                <header>
                   <a onClick={() => trocarURL('/')}>Voltar</a>
                </header>
                <form className='formEmpresaCadastro'>
                    <h1> Cadastre sua Empresa</h1>
                    <span for="nomeCompleto">NOME COMPLETO</span>
                    <input type="text" placeholder='Nome' id="nomeCompleto" required/>
                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span for="senha">SENHA</span>
                            <input type="password" placeholder='Senha' id="senha" required/>
                        </div>
                        <div>
                            <span for="senha">CONFIRMAR SENHA</span>
                            <input type="password" placeholder='Senha' id="senhaConfirmada" required/>
                        </div>
                    </div>
                    <span for="nomeCompleto">E-MAIL</span>
                    <input type="email" placeholder='E-mail' id="email" required/>
                    <div className='divEnviarCadastroEmpresa'>
                        <input type='button' value='Enviar'/>
                    </div>
                </form>
            </body>
        </>
    );
}