import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/FormsPadrao.css';
import fechar from '../img/fechar.svg';
export default function AbrirChamado() {
    const [titulo, setTitulo] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erroSenha, setErro] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        setErro('');
        fetch(process.env.REACT_APP_URL_CHAMADO_CADASTRO, {
            method:'POST',
            body: JSON.stringify({
                desc: descricao,
                local: local,
                titulo: titulo,
                codFun: localStorage.getItem("fun_cod"),
                codEmp: localStorage.getItem("emp_cod")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => {
            if(response.status === 200){
                localStorage.setItem("novoPopup", 'Criação do chamado');
                window.location.href = '../funcionario'
            }
            else{
                (response.json()).then(data => {
                    setErro(data.msg)
                })
            }
        })
    }


    return (
        <>
            <div className='divFormPadrao'>
                <form className='formPadrao' onSubmit={submitForm}>
                    <Link to='../' className='botaoFecharFormPadrao'>
                        <img src={fechar} alt='Fechar formulário' />
                    </Link>
                    <h1>Nos conte seu problema</h1>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                                <label htmlFor='titulo'>TÍTULO</label>
                                <input
                                    className="inputFormPadrao"
                                    id='titulo'
                                    maxLength='72'
                                    name='titulo'
                                    onChange={(e) => setTitulo(e.target.value)}
                                    placeholder='Título'
                                    type='text'
                                    required
                                    value={titulo}
                                />
                        </div>
                        <div>
                            <label htmlFor='local'>
                                LOCALIZAÇÃO DO APARELHO
                            </label>
                            <input
                                className="inputFormPadrao"
                                id='local'
                                maxLength='20'
                                name='local'
                                onChange={(e) => setLocal(e.target.value)}
                                placeholder='Localização'
                                type='text'
                                required
                                value={local}
                            />
                        </div>
                    </div>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor='descricao'>DESCRIÇÃO</label>
                        <textarea
                            className="textareaFormPadrao"
                            id="descricao"
                            maxLength='690'
                            name="descricao"
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            type='text'
                            required
                            value={descricao}
                        />
                    </div>
                    <div className='divBotaoEnviar'>
                        <input
                            id="abrindoChamado"
                            type='submit'
                            value='Enviar'
                        />
                    </div>
                    {erroSenha && <p className="erro">{erroSenha}</p>}
                </form>
            </div>
        </>
    )
}