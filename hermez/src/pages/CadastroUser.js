import '../components/css/FormsPadrao.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import fechar from '../img/fechar.svg';

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
            fetch("https://hermezapi-back.vercel.app/funcionario/cadastro?dev=true", {
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
            <div className='divFormPadrao'>
                <form className='formPadrao'  onSubmit={handleSubmit}>
                    <Link to='../' className='botaoFecharFormPadrao'>
                        <img src={fechar} alt='Fechar formulário' />
                    </Link>
                    <h1>Cadastrar novo funcionário</h1>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor="nomeCompleto">NOME COMPLETO</label>
                        <input
                            className="inputFormPadrao"
                            id="nomeCompleto"
                            name='nomeCompleto'
                            onChange={(e) => setNomeCompleto(e.target.value)}
                            value={nomeCompleto}
                            placeholder='Nome'
                            required
                            type="text"
                        />
                    </div>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor='senha'>SENHA</label>
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
                            <label htmlFor='senhaConfirmada'>CONFIRMAR SENHA</label>
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
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor='email'> E-MAIL</label>
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
                        <div>
                            <label htmlFor='cnpjCadastro'>FUNÇÃO</label>
                            <input
                                className="inputFormPadrao"
                                id="funcaoCadastro"
                                name='funcao'
                                value={funcao}
                                required
                                onChange={(e) => setFuncao(e.target.value)}
                                placeholder='Função'
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor="celular">CELULAR</label>
                            <input
                                className="inputFormPadrao"
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
                            <label htmlFor='cnpjCadastro'>CARGO</label>
                            <select
                                className="selectFormPadrao"
                                id="cargoCadastro"
                                name='cargo'
                                onChange={(e) => setCargo(e.target.value)}
                            >
                                <option
                                    value="0"
                                    style={{display: 'none'}}
                                >
                                    Cargo
                                </option>
                                <option value="1">Funcionário</option>
                                <option value="2">Técnico</option>
                                {(localStorage.getItem('fun_cod') === null) && <option value="3">Administrador</option>}
                            </select>
                        </div>
                    </div>
                    <div className='divBotaoEnviar'>
                        <input
                            id="cadastrandoFuncionario"
                            value='Cadastrar'
                            type='submit'
                        />
                    </div>
                    {erroSenha &&    <p className="erro">{erroSenha}</p>}
                </form>
            </div>
        </>
    );
}