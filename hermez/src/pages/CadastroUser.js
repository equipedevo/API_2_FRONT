import './css/CadastroUser.css';
import { useState } from 'react';

export default function CadastroUser() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [email, setEmail] = useState('');
    const [funcao, setFuncao] = useState('');
    const [celular, setCelular] = useState('');
    const [cargo, setCargo] = useState(0);
    const [erroSenha, setErro] = useState('');

    // Função para formatar telefone
    function formatPhoneNumber(phone) {
        phone = phone.replace(/\D/g, '');
        phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        return phone;
    }

    function handleCelularChange(event) {
        const inputCelular = event.target.value;
        const formattedCelular = formatPhoneNumber(inputCelular);
        setCelular(formattedCelular);
    }

    function handleNomeCompletoChange(event) {
        const nome = event.target.value;
        setNomeCompleto(nome);
    }

    function handleEmailChange(event) {
        const email = event.target.value;
        setEmail(email);
    }

    function handleFuncaoChange(event) {
        const funcao = event.target.value;
        setFuncao(funcao);
    }


    function handleCargoChange(event) {
        const selectedCargo = parseInt(event.target.value);
        setCargo(selectedCargo);
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
        else if (!criterioDeAceitacao) {
            setErro(`Crie uma senha com no mínimo 8 caracteres, tendo pelo menos: 1 número; 1 letra maiúscula; 1 caracter especial;`);
        }
        else if (celular.length !== 15) {
            setErro('O número de celular inserido está incorreto.');
        }
        else if (cargo === 0) {
            setErro('Escolha um cargo.');
        }
        else {
            setErro(``);
            fetch(process.env.REACT_APP_URL_FUNCIONARIO_CADASTRO, {
                method:'POST',
                body: JSON.stringify({
                    nome: nomeCompleto,
                    email: email,
                    celular: celular,
                    senha: senha,
                    car_cod: cargo,                                  
                    emp_cod: localStorage.getItem("emp_cod"),
                    funcao: funcao
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then(response => {
                if(response.status === 200) {
                    localStorage.setItem("novoCadastro", 'novo cadastro');
                    if (localStorage.getItem('fun_cod') === null){
                        window.location.href = '../empresa'
                    }
                    else{
                        window.location.href = '../funcionario'
                    }
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
                <form className='formUserCadastro' onSubmit={handleSubmit}>
                    <h1> Cadastrar novo usuário</h1>
                    <span htmlFor="nomeCompleto">NOME COMPLETO</span>
                    <input
                        id="nomeCompleto"
                        name='nomeCompleto'
                        onChange={handleNomeCompletoChange}
                        value={nomeCompleto}
                        placeholder='Nome'
                        required
                        type="text"
                    />
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
                            <span htmlFor="email">E-MAIL</span>
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
                            <span htmlFor="funcao">
                                FUNÇÃO
                            </span>
                            <input
                                id="funcaoCadastro"
                                name='funcao'
                                value={funcao}
                                required
                                onChange={handleFuncaoChange}
                                placeholder='Função'
                                type="text"
                            />
                        </div>
                    </div>

                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span htmlFor="celular">CELULAR</span>
                            <input
                                autoComplete="off"
                                id="celularCadastro"
                                maxLength="11"
                                name='celularCadastro'
                                onChange={handleCelularChange}
                                value={celular}
                                placeholder='Celular'
                                required
                                type="text"
                            />
                        </div>
                        <div>
                            <span htmlFor="cargo">CARGO</span>
                            <select id="cargoCadastro" name='cargo' onChange={handleCargoChange}>
                                <option value="0" selected style={{display: 'none'}}>Cargo</option>
                                <option value="1">Funcionário</option>
                                <option value="2">Técnico</option>
                                {(localStorage.getItem('fun_cod') === null) ? (
                                    <option value="3">Administrador</option>
                                ):(null)}
                            </select>
                        </div>
                    </div>
                    <div className='divEnviarCadastro'>
                        <input
                            id="cadastrandoFuncionario"
                            value='Cadastrar'
                            type='submit'
                        />
                    </div>
                    {erroSenha &&    <p className="erro">{erroSenha}</p>}
                </form>
            </body>
        </>
    );
}