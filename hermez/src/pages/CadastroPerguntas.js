import '../components/css/FormsPadrao.css';
import { useState } from 'react';

export default function CadastroPerguntas() {
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');
    const [erro, setErro] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setErro('');
        fetch(`${process.env.REACT_APP_URL_PERGUNTAS_CADASTRAR}`, {
            method: 'POST',
            body: JSON.stringify({
                emp_cod: localStorage.getItem("emp_cod"),
                per: pergunta,
                resp: resposta
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => {
            if (response.status === 200) {
                localStorage.setItem("novoPopup", 'Cadastro das Perguntas');
                window.location.href = '../empresa'
            }
            else {
                (response.json()).then(data => {
                    setErro(data.msg)
                });
            }
        });
    };
    return (
        <>
            <div className='divFormPadrao'>
                <form className='formPadrao' onSubmit={handleSubmit}>
                    <h1> Cadastre suas Perguntas Frequentes</h1>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor="pergunta">Pergunta</label>
                        <input
                            className="inputFormPadrao"
                            id="pergunta"
                            maxLength="120"
                            name='pergunta'
                            onChange={(e) => setPergunta(e.target.value)}
                            value={pergunta}
                            placeholder='Pergunta'
                            required
                            type="text"
                        />
                    </div>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor="resposta">Resposta</label>
                        <textarea
                            className="textareaFormPadrao"
                            id="resposta"
                            maxLength="160"
                            name='resposta'
                            onChange={(e) => setResposta(e.target.value)}
                            value={resposta}
                            placeholder="Resposta"
                            required
                            type="text"
                        />
                    </div>
                    <div className='divBotaoEnviar'>
                        <input
                            id="cadastrandoPerguntas"
                            value='Enviar'
                            type='submit'
                        />
                    </div>
                    {erro && <p className="erro">{erro}</p>}
                </form>
            </div>
        </>
    );
}
