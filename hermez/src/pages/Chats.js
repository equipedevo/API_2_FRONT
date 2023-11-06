import React, { useEffect, useState, useRef } from "react";
import aberto from "../img/chats/iconeAberto.svg";
//import andamento from "../img/chats/iconeAndamento.svg";
//import reaberto from "../img/chats/iconeReaberto.svg";
//import cancelado from "../img/chats/iconeCancelado.svg";
//import concluido from "../img/chats/iconeConcluido.svg";
//import fechado from "../img/chats/iconeFechado.svg";
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

    const fileInput = useRef(null);

    const [timer, setTimer] = useState(new Date());
    
    
    
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
            alert('Selecione um chamado')
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

    const sleep = ms => new Promise (r => setTimeout(r, ms));
    const reload = async function() {
        console.log('1segundo');
        await sleep(1000);
        reload();
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
            .then((data) => { setDatabase(data); console.log('esse é o database',database) })
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
            .then((data) => { setAtribuidos(data); console.log(atribuidos); })
            .catch((error) => console.log(error));
            
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
                        console.log(data.mensagens)
                    }
                    
                })
                .catch((error) => console.log(error));
            
            reload();
    }, [selectChaCod])


    return (

        <>
            <div className="container">
                <div className="lista">
                    {database.map(chamado => {
                        return (
                            <details key={chamado.cha_cod}
                                onClick={() => {
                                    setMostraChat({ ...mostraChat, [chamado.cha_cod]: !mostraChat[chamado.cha_cod] });
                                    setSelectChaCod(chamado.cha_cod);
                                }}>

                                <summary className={activeChat ? 'chat active' : 'chat'} >
                                    <div className="icone">
                                        <img src={aberto} alt='icone status' />
                                        <p className={`status ${chamado.sta_nome.toLowerCase()}`}>{chamado.sta_nome}</p>
                                    </div>
                                    <div className="texto">
                                        <p className="tituloChat aberto">{chamado.cha_titulo}</p>
                                        <p className="subtitulo">Você:a resposta como sempre foi aparentemente enorme</p>
                                    </div>
                                </summary>
                                <div className="linhadotempo">

                                </div>
                            </details>
                        )
                    }
                    )}

                    {Array.isArray(atribuidos) ?

                        atribuidos.map(atribuido => {
                            return (
                                <details key={atribuido.cha_cod}
                                    onClick={() => {
                                        setMostraChat({ ...mostraChat, [atribuido.cha_cod]: !mostraChat[atribuido.cha_cod] });
                                        setSelectChaCod(atribuido.cha_cod)
                                    }}>

                                    <summary className={activeChat ? 'chat active' : 'chat'} >
                                        <div className="icone">
                                            <img src={aberto} alt='icone status' />
                                            <p className={`status ${atribuido.sta_nome.toLowerCase()}`}>{atribuido.sta_nome}</p>
                                        </div>
                                        <div className="texto">
                                            <p className="tituloChat aberto">{atribuido.cha_titulo}</p>
                                            <p className="subtitulo">Você:a resposta como sempre foi aparentemente enorme</p>
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
                    {database
                        .filter(cha => cha.cha_cod === selectChaCod)
                        .map(cha => (
                            <p className={`tituloConv ${cha.sta_nome.toLowerCase()}`} key={cha.cha_cod}>{cha.cha_titulo}</p>

                        ))}

                    { atribuidos.length > 0 ?
                        atribuidos
                        .filter(cha => cha.cha_cod === selectChaCod)
                        .map(cha => (
                            <p className={`tituloConv ${cha.sta_nome.toLowerCase()}`} key={cha.cha_cod}>{cha.cha_titulo}</p>

                        ))
                        : (console.log('Nenhum chamado atribuído'))}


                    <div className="mensagens">

                        {Array.isArray(mensagens) ?
                            
                            mensagens.map(msg => (
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
                    </div>
                </div>
            </div>
        </>
    );
}