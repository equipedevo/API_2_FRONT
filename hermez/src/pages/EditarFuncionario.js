import { useEffect, useState, } from "react";
import '../components/css/FormsPadrao.css';
import { Link } from 'react-router-dom';
import fechar from '../img/fechar.svg';
import papelComLapis from '../img/menu/papelComLapis.png';

export default function EditarFuncionario() {
    const queryParameters = new URLSearchParams(window.location.search);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [funcao, setFuncao] = useState('');
    const [celular, setCelular] = useState('');
    const [cargo, setCargo] = useState(0);
    const [erro, setErro] = useState('');
    useEffect(() => {
        setErro('');
        /* PEGAR DADOS DO FUNCIONÁRIO */
        fetch(process.env.REACT_APP_PEGAR_DADO_FUNCIONARIO, {
            method:"POST",
            body: JSON.stringify({
                fun_cod: queryParameters.get("idfuncionario"),
                emp_cod: localStorage.getItem("emp_cod")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => {
            if(response.status === 200) {
                response.json().then((data) => {
                    setNome(data.nome);
                    setFuncao(data.funcao);
                    setEmail(data.email);
                    setCelular(data.celular);
                    setCargo(data.car_cod);
                });
            }
            else{(response.json()).then(data => {
                setErro(data.msg);
            })}
        })
    }, []);
    const [mudaNome,    setMudaNome] = useState(true);
    const [mudaEmail,   setMudaEmail] = useState(true);
    const [mudaFuncao,  setMudaFuncao] = useState(true);
    const [mudaCelular, setMudaCelular] = useState(true);
    const [mudaCargo,   setMudaCargo] = useState(true);

    
    const [novoNome,    setNovoNome] = useState('');
    const [novoEmail,   setNovoEmail] = useState('');
    const [novaFuncao,  setNovaFuncao] = useState('');
    const [novoCelular, setNovoCelular] = useState('');
    const [novoCargo,   setNovoCargo] = useState('');

    // Função para formatar telefone
    function formatPhoneNumber(phone) {
        phone = phone.replace(/\D/g, '');
        phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        return phone;
    }

    function handleCelularChange(event) {
        const inputCelular = event.target.value;
        const formattedCelular = formatPhoneNumber(inputCelular);
        setNovoCelular(formattedCelular);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <>
            <div className='divFormPadrao'>
                <form className='formPadrao' onSubmit={handleSubmit}>
                    <Link to='../' className='botaoFecharFormPadrao'>
                        <img src={fechar} alt='Fechar formulário' />
                    </Link>
                    <h1>Cadastrar novo funcionário</h1>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor="nome">NOME COMPLETO</label>
                        <div>
                            <input
                                className="inputFormPadrao"
                                disabled={mudaNome ? true : false}
                                id="nome"
                                maxLength="30"
                                name='nome'
                                onChange={(e) => setNovoNome(e.target.value)}
                                placeholder='Insira um novo nome'
                                type="text"
                                value={mudaNome ? nome : novoNome}
                            />
                            <img
                                alt='Editar dados'
                                onClick={() => setMudaNome(!mudaNome)}
                                src={mudaNome? papelComLapis: fechar}
                            />
                        </div>
                    </div>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor='emailCadastro'> E-MAIL</label>
                            <div>
                                <input
                                    className="inputFormPadrao"
                                    disabled={mudaEmail ? true : false}
                                    id="emailCadastro"
                                    maxLength='30'
                                    name='emailCadastro'
                                    onChange={(e) => setNovoEmail(e.target.value)}
                                    placeholder='Insira um novo E-mail'
                                    type="email"
                                    value={mudaEmail? email : novoEmail}
                                />
                                <img
                                    src={mudaEmail? papelComLapis: fechar}
                                    alt='Editar dados'
                                    onClick={() => setMudaEmail(!mudaEmail)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='funcaoCadastro'>FUNÇÃO</label>
                            <div>
                                <input
                                    className="inputFormPadrao"
                                    disabled={mudaFuncao ? true : false}
                                    id="funcaoCadastro"
                                    maxLength='15'
                                    name='funcaoCadastro'
                                    onChange={(e) => setNovaFuncao(e.target.value)}
                                    placeholder='Insira uma nova Função'
                                    type="text"
                                    value={mudaFuncao? funcao : novaFuncao}
                                />
                                <img
                                    src={mudaFuncao? papelComLapis: fechar}
                                    alt='Editar dados'
                                    onClick={() => setMudaFuncao(!mudaFuncao)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor="celularCadastro">CELULAR</label>
                            <div>
                                <input
                                    className="inputFormPadrao"
                                    disabled={mudaCelular ? true : false}
                                    id="celularCadastro"
                                    maxLength="16"
                                    name='celularCadastro'
                                    onChange={handleCelularChange}
                                    placeholder='Insira um novo celular'
                                    type="text"
                                    value={mudaCelular ? celular : novoCelular}
                                />
                                <img
                                    alt='Editar dados'
                                    onClick={() => setMudaCelular(!mudaCelular)}
                                    src={mudaCelular? papelComLapis: fechar}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='cargoCadastro'>CARGO</label>
                            <div>
                                {mudaCargo ? 
                                    <input
                                        className="inputFormPadrao"
                                        disabled
                                        id="cargoCadastro"
                                        maxLength="16"
                                        name='cargoCadastro'
                                        type="text"
                                        value={
                                            cargo === 1 ? 'Funcionário':
                                            cargo === 2 ? 'Técnico':
                                            localStorage.getItem('fun_cod') === null &&
                                            cargo === 3 ? 'Administrador':
                                            'Unknown'
                                        }
                                    />
                                    :
                                    <select
                                        className="selectFormPadrao"
                                        id="cargoCadastro"
                                        name='cargoCadastro'
                                        onChange={(e) => setNovoCargo(e.target.value)}
                                    >
                                        <option
                                            value="0"
                                            style={{display: 'none'}}
                                        >
                                            Insira um novo Cargo
                                        </option>
                                        <option value="1">Funcionário</option>
                                        <option value="2">Técnico</option>
                                        {(localStorage.getItem('fun_cod') === null) && <option value="3">Administrador</option>}
                                    </select>
                                }
                                <img
                                    alt='Editar dados'
                                    onClick={() => setMudaCargo(!mudaCargo)}
                                    src={mudaCargo? papelComLapis: fechar}
                                />
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor='senha'>SENHA</label>
                            <input
                                className="inputFormPadrao"
                                id="senha"
                                maxLength='9'
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
                                maxLength='9'
                                name='senhaConfirmada'
                                onChange={(e) => setSenhaConfirmada(e.target.value)}
                                value={senhaConfirmada}
                                placeholder='Senha'
                                required
                                type="password"
                            />
                        </div>
                    </div>
                    */}
                    {/*     
                    <div className='divBotaoEnviar'>
                        <input
                            id="cadastrandoFuncionario"
                            value='Alterar'
                            type='submit'
                        />
                    </div>
                    */}
                    {erro &&    <p className="erro">{erro}</p>}
                </form>
            </div>
        </>
    );
}