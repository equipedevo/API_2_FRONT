import { useEffect, useState, useMemo } from "react";
import '../components/css/FormsPadrao.css';
import Popup from '../components/Popup';
import { Link } from 'react-router-dom';
import fechar from '../img/fechar.svg';
import lapis from '../img/alterar/lapis.svg';
import lupa from '../img/alterar/lupa.svg';
import x from '../img/alterar/x.svg';

export default function EditarFuncionario() {
    /* PEGAR DADOS DO FUNCIONÁRIO */
    const queryParameters = useMemo(() => new URLSearchParams(window.location.search), []);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [funcao, setFuncao] = useState('');
    const [celular, setCelular] = useState('');
    const [cargo, setCargo] = useState(0);
    const [erro, setErro] = useState('');

    useEffect(() => {
        setErro('');
        /* CONEXÃO COM BACK PARA PEGAR OS DADOS DO FUNCIONÁRIO */
        fetch(process.env.REACT_APP_PEGAR_DADO_FUNCIONARIO, {
            method: "POST",
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
            if (response.status === 200) {
                response.json().then(data => {
                    setNome(data.nome);
                    setFuncao(data.funcao);
                    setEmail(data.email);
                    setCelular(data.celular);
                    setCargo(data.car_cod);
                }
            )} else {
                response.json().then(data => {
                    setErro(data.msg);
                }
            )}
        });
    }, [queryParameters]);

    /* ALTERAR SENHA */
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [senhaCorreta, setSenhaCorreta] = useState(false);

    function VerificarSenha() {
        /* CONEXÃO COM BACK PARA VERIFICAR A SENHA ANTIGA */
        fetch(process.env.REACT_APP_TROCAR_SENHA, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                senha: senhaAntiga,
                novaSenha: senhaAntiga
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => {
            if (response.status === 200) {
                setErro('');
                setSenhaCorreta(!senhaCorreta);
            } else {
                response.json().then(data => {
                    setErro(data.msg);
                });
            }
        });
    }

    /* ALTERAR DADOS*/
    const [mudaNome, setMudaNome] = useState(false);
    const [mudaEmail, setMudaEmail] = useState(false);
    const [mudaFuncao, setMudaFuncao] = useState(false);
    const [mudaCelular, setMudaCelular] = useState(false);
    const [mudaCargo, setMudaCargo] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novaFuncao, setNovaFuncao] = useState('');
    const [novoCelular, setNovoCelular] = useState('');
    const [novoCargo, setNovoCargo] = useState(0);

    // Função para formatar o telefone
    function formatPhoneNumber(phone) {
        phone = phone.replace(/\D/g, '');
        phone = phone.replace(/(\d{2})(\d{5})(\d{3})/, '($1) $2-$3');
        return phone;
    }

    function handleCelularChange(event) {
        const inputCelular = event.target.value;
        const formattedCelular = formatPhoneNumber(inputCelular);
        setNovoCelular(formattedCelular);
    }

    /* ENVIAR OS DADOS */
    function handleSubmit(event) {
        event.preventDefault();
        if (mudaCargo && !['1', '2', '3'].includes(novoCargo)) {
            setErro('Insira um cargo!');
            return;
        }
        if (senhaCorreta) {
            const criterioDeAceitacao = (
                senhaNova.length >= 8 &&
                /[A-Z]/.test(senhaNova) &&
                /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(senhaNova) &&
                /\d/.test(senhaNova)
            );
            if (criterioDeAceitacao) {
                /* CONEXÃO COM BACK PARA ALTERAR A SENHA */
                fetch(process.env.REACT_APP_TROCAR_SENHA, {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        senha: senhaAntiga,
                        novaSenha: senhaNova
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                }).then(response => {
                    if (response.status !== 200) {
                        response.json().then(data => {
                            setErro(data.msg);
                            return;
                        });
                    }
                });
                } else {
                    setErro('A senha nova não atende os critérios de cadastro! (No mínimo 8 caracteres, tendo pelo menos: 1 número; 1 letra maiúscula; 1 caracter especial!');
                    return;
                }
            }
            const alterar = []
            alterar.push(mudaNome ? novoNome : nome)
            alterar.push(mudaFuncao ? novaFuncao : funcao)
            alterar.push(mudaEmail ? novoEmail : email)
            alterar.push(mudaCelular ? novoCelular : celular)
            alterar.push(mudaCargo ? novoCargo : cargo)
            setErro('');
            /* CONEXÃO COM BACK PARA ALTERAR OS DADOS DO FUNCIONÁRIO */
            fetch(process.env.REACT_APP_ATUALIZAR_DADO_FUNCIONARIO, {
                method: "POST",
                body: JSON.stringify({
                    fun_cod: queryParameters.get("idfuncionario"),
                    nome: alterar[0],
                    funcao: alterar[1],
                    email: alterar[2],
                    celular: alterar[3],
                    car_cod: alterar[4]
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then(response => {
                if (response.status === 200) {
                    localStorage.setItem("novoPopup", 'Alteração dos dados do funcionário')
                    window.location.href = ''
                } else {
                    response.json().then(data => {
                        setErro(data.msg);
                    });
                }
            });
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
                                    disabled={!mudaNome}
                                    id="nome"
                                    maxLength="30"
                                    name='nome'
                                    onChange={(e) => setNovoNome(e.target.value)}
                                    placeholder='Insira um novo nome'
                                    required
                                    type="text"
                                    value={mudaNome ? novoNome : nome}
                                />
                                <img
                                    alt='Editar dados'
                                    onClick={() => setMudaNome(!mudaNome)}
                                    src={mudaNome ? x : lapis}
                                />
                            </div>
                        </div>
                        <div className='divDuasColunasFormPadrao'>
                            <div>
                                <label htmlFor='emailCadastro'> E-MAIL</label>
                                <div>
                                    <input
                                        className="inputFormPadrao"
                                        disabled={!mudaEmail}
                                        id="emailCadastro"
                                        maxLength='30'
                                        name='emailCadastro'
                                        onChange={(e) => setNovoEmail(e.target.value)}
                                        placeholder='Insira um novo E-mail'
                                        required
                                        type="email"
                                        value={mudaEmail ? novoEmail : email}
                                    />
                                    <img
                                        src={mudaEmail ? x : lapis}
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
                                        disabled={!mudaFuncao}
                                        id="funcaoCadastro"
                                        maxLength='15'
                                        name='funcaoCadastro'
                                        onChange={(e) => setNovaFuncao(e.target.value)}
                                        placeholder='Insira uma nova Função'
                                        required
                                        type="text"
                                        value={mudaFuncao ? novaFuncao : funcao}
                                    />
                                    <img
                                        src={mudaFuncao ? x : lapis}
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
                                        disabled={!mudaCelular}
                                        id="celularCadastro"
                                        maxLength="15"
                                        name='celularCadastro'
                                        onChange={handleCelularChange}
                                        placeholder='Insira um novo celular'
                                        required
                                        type="text"
                                        value={mudaCelular ? novoCelular: celular}
                                    />
                                    <img
                                        alt='Editar dados'
                                        onClick={() => setMudaCelular(!mudaCelular)}
                                        src={mudaCelular ? x : lapis}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='cargoCadastro'>CARGO</label>
                                <div>
                                    {mudaCargo ? 
                                        <select
                                            className="selectFormPadrao"
                                            id="cargoCadastro"
                                            name='cargoCadastro'
                                            onChange={(e) => setNovoCargo(e.target.value)}
                                        >
                                            <option
                                                style={{display: 'none'}}
                                            >
                                                Insira um novo Cargo
                                            </option>
                                            <option value="1">Funcionário</option>
                                            <option value="2">Técnico</option>
                                            {(localStorage.getItem('fun_cod') === null) && <option value="3">Administrador</option>}
                                        </select>
                                        :
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
                                    }
                                    <img
                                        alt='Editar dados'
                                        onClick={() => setMudaCargo(!mudaCargo)}
                                        src={mudaCargo ? x : lapis}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='divDuasColunasFormPadrao'>
                            <div>
                                <label htmlFor='senhaAntiga'>SENHA ANTIGA</label>
                                <div>
                                    <input
                                        className="inputFormPadrao"
                                        disabled={senhaCorreta}
                                        id="senhaAntiga"
                                        maxLength='9'
                                        name='senhaAntiga'
                                        onChange={(e) => setSenhaAntiga(e.target.value)}
                                        value={senhaAntiga}
                                        placeholder='Senha Antiga'
                                        type="password"
                                    />
                                    <img
                                        alt='Editar dados'
                                        onClick={() => VerificarSenha()}
                                        src={senhaCorreta ? x : lupa}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='senhaConfirmada'>NOVA SENHA</label>
                                    <input
                                        className="inputFormPadrao"
                                        id="senhaConfirmada"
                                        disabled={!senhaCorreta}
                                        maxLength='9'
                                        name='senhaConfirmada'
                                        onChange={(e) => setSenhaNova(e.target.value)}
                                        value={senhaNova}
                                        placeholder='Senha'
                                        type="password"
                                        />
                            </div>
                        </div>
                        <div className='divBotaoEnviar'>
                            <input
                                id="cadastrandoFuncionario"
                                value='Alterar'
                                type='submit'
                            />
                        </div>
                        {erro && <p className="erro">{erro}</p>}
                    </form>
                </div>
            <Popup/>
        </>
    );
}