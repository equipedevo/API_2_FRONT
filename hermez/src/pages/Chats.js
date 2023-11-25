import React, { useEffect, useState, useRef } from "react";
import aberto from "../img/chats/iconeAberto.svg";
import andamento from "../img/chats/iconeAndamento.svg";
import reaberto from "../img/chats/iconeReaberto.svg";
import cancelado from "../img/chats/iconeCancelado.svg";
import concluido from "../img/chats/iconeConcluido.svg";
import fechado from "../img/chats/iconeFechado.svg";
import anexo from "../img/chats/clipAnexo.svg";
import enviar from "../img/chats/enviar.svg";
import "./css/Chats.css";

export default function Chats() {
    const [mostraChat, setMostraChat] = useState(false);
    const [activeChat, setActiveChat] = useState(false);
    const [database, setDatabase] = useState([]);
    const [mensagens, setMensagens] = useState([]);
    const [textoMsg, setTextoMsg] = useState('');
    const [selectChaCod, setSelectChaCod] = useState(null);
    const [atribuidos, setAtribuidos] = useState([]);
    const [file, setFile] = useState(null);
    const [staCod, setStaCod] = useState(0);

    const fileInput = useRef(null);


    const formData = new FormData();
    formData.append('arq_cod', file);
    formData.append('msg_texto', textoMsg);
    formData.append('fun_cod', localStorage.getItem('fun_cod'));
    formData.append('ct_cod', selectChaCod);

    const handleFileInput = (e) => {
        const fileuploaded = e.target.files[0];
        setFile(fileuploaded);
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (selectChaCod === null) {
            console.log('Selecione um chamado')
        }
        else {

            fetch(`${process.env.REACT_APP_URL_CHAT_NOVA_MENSAGEM}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setTextoMsg('');
                    console.log('Mensagem enviada com sucesso', data)
                })
                .catch((error) => console.log('Erro no envio da mensagem', error));

        }
    }

    const meusChamados = atribuidos.concat(database);
    meusChamados.sort((a, b) => {
        let x = new Date(a.cha_dataInicio);
        let y = new Date(b.cha_dataInicio);
        return x - y;
    })
    meusChamados.reverse();

    const statusCha = (status) => {

        switch (status) {
            case 'Aberto':
                return aberto;
            case 'Em andamento':
                return andamento;
            case 'Reaberto':
                return reaberto;
            case 'Cancelado':
                return cancelado;
            case 'Concluído':
                return concluido;
            case 'Fechado':
                return fechado;
        }
    }


    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_CHAMADO_GET_MEUS}`, {
            method: 'POST',
            body: JSON.stringify({
                emp_cod: localStorage.getItem('emp_cod'),
                fun_cod: localStorage.getItem('fun_cod')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

            .then((response) => response.json())
            .then((data) => { setDatabase(data)})
            .catch((error) => console.log(error));

        fetch(`${process.env.REACT_APP_URL_CHAMADO_GET_MEUS_ATRIBUIDOS}`, {
            method: 'POST',
            body: JSON.stringify({
                emp_cod: localStorage.getItem('emp_cod'),
                tec_cod: localStorage.getItem('fun_cod')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

            .then((response) => response.json())
            .then((data) => { setAtribuidos(data) })
            .catch((error) => console.log(error));


        

    }, [selectChaCod, staCod])

    useEffect(() => {

        const interval = setInterval(() => {
            fetch(`${process.env.REACT_APP_URL_CHAT_MENSAGENS}`, {
                method: 'POST',
                body: JSON.stringify({
                    cha_cod: selectChaCod,
                    remetente: localStorage.getItem('fun_cod'),
                    pag: 0
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.mensagens == null) {
                        setMensagens([]);
                    } else {
                        setMensagens(data.mensagens.reverse());
                    }

                })
                .catch((error) => console.log(error));
        }, 100);
        return () => clearInterval(interval);

    }, [selectChaCod]);

    const handleOnClick = () => {
        setStaCod(5);
        console.log('staCod: ' + staCod);
        console.log('selectChaCod: ' + selectChaCod);

        fetch(`${process.env.REACT_APP_URL_CHAT_ATUALIZAR_STATUS}`, {
            method: 'POST',
            body: JSON.stringify({
                sta_cod: staCod,
                cha_cod: selectChaCod
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .catch((error) => console.log(error));
    }

    return (

        <>
            <div className="container">
                <div className="lista">
                    
                    {Array.isArray(meusChamados) ? meusChamados.map(chamado => {
                        const imgStatus = statusCha(chamado.sta_nome)

                        return (
                            <details key={chamado.cha_cod}
                                onClick={() => {
                                    setMostraChat({ ...mostraChat, [chamado.cha_cod]: !mostraChat[chamado.cha_cod] });
                                    setSelectChaCod(chamado.cha_cod)
                                }}>

                                <summary className={activeChat ? 'chat active' : 'chat'} >
                                    <div className="icone">
                                        <img src={imgStatus} alt='icone status' />
                                        <p className={`status ${chamado.sta_nome.toLowerCase()}`}>{chamado.sta_nome}</p>
                                    </div>
                                    <div className="texto">
                                        <p className={`tituloChat ${chamado.sta_nome.toLowerCase()}`}>{chamado.cha_titulo}</p>
                                    </div>
                                </summary>
                                <div className="linhadotempo">

                                </div>
                            </details>
                        )
                    }

                    )
                        : (
                            console.log('Nenhum chamado atribuído na lista')
                        )
                    }



                </div>

                <div className={mostraChat ? "conversa-fechada" : 'conversa-default'}>
                    <p>Inicie as conversas dos seus chamados</p>
                </div>
                <div className={mostraChat ? 'conversa-aberta' : 'conversa-fechada'} value={mostraChat}>
                    {meusChamados
                        .filter(cha => cha.cha_cod === selectChaCod)
                        .map(cha => (
                            <p className={`tituloConv ${cha.sta_nome.toLowerCase()}`} key={cha.cha_cod}>{cha.cha_titulo}</p>

                        ))}


                    <div className="mensagens">

                        {Array.isArray(mensagens) ? mensagens.map(msg => (
                                
                                <div className={`balao ${msg.remetente == localStorage.getItem('fun_cod') ? 'minha_msg' : 'pessoa_msg'}`}>
                                    <p className="mensagem">{msg.texto}</p>
                                </div>
                            ))
                            : (
                                <p>Nenhuma mensagem</p>
                            )
                        }


                    </div>



                    <div className="resposta">
                        <form className="form-resposta" onSubmit={submitForm}>
                            <input
                                className="campoResposta"
                                placeholder="Digite sua mensagem..."
                                type="text"
                                value={textoMsg}
                                onChange={(e) => { setTextoMsg(e.target.value) }}
                                onSubmit={submitForm}
                            />

                            <label id='textArquivo' htmlFor="arquivo" className="botao" onClick={e => fileInput.current && fileInput.current.click(e)}>
                                <span>
                                    <img src={anexo} alt="enviar arquivo" />
                                </span>
                            </label>
                            <input
                                type="file"
                                id="arquivo"
                                multiple={false}
                                ref={fileInput}
                                value={file}
                                onChange={handleFileInput}
                                style={{ display: 'none' }}
                            />

                            <button type="submit" className="botao">
                                <img src={enviar} alt="enviar mensagem" />
                            </button>
                        </form>

                        <button type="submit" className="btn-concluir" onClick={() => handleOnClick()}>
                            Concluir
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}