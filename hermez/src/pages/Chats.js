import React, { useEffect, useState } from "react";
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
    let [database, setDatabase] = useState([]);
    const [message, setMessage] = useState('')

    const prioridades = [
        {id: 1, nome: 'Alta'},
        {id: 2, nome: 'Média'},
        {id: 3, nome: 'Baixa'}
    ];


    useEffect(() => {
        fetch(process.env.REACT_APP_URL_CHAMADO_GET_TODOS, {
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
            .then((data) => { setDatabase(data); })
            .catch((error) => console.log(error));
        
        
    })


    return (
        <>
            <div className="container">
                <div className="lista">
                {database.map(chamado => 
                        
                            <details onClick={() => setActiveChat(!activeChat)} key={chamado.cha_cod}>
                                <summary className={activeChat ? 'chat active' : 'chat'} onClick={() => setMostraChat(!mostraChat)}>
                                    <div className="icone">
                                        <img src={aberto} alt='icone de aberto' />
                                        <p className={`status ${chamado.sta_nome.toLowerCase()}`}>{ chamado.sta_nome }</p>
                                    </div>
                                    <div className="texto">
                                        <p className="tituloChat aberto">{ chamado.cha_titulo }</p>
                                        <p className="subtitulo">Você: Sua resposta como sempre foi aparentemente enorme</p>
                                    </div>
                                </summary>
                                <div className="linhadotempo">

                                </div>
                            </details>

                        
                    
                    )}

                </div>

                <div className={mostraChat ? "conversa-fechada" : 'conversa-default'}>
                    <p>Inicie as conversas dos seus chamados</p>
                </div>

                <div className={mostraChat ? 'conversa-aberta' : 'conversa-fechada'} value={mostraChat}>
                    <p className="tituloConv aberto">Título do chamado</p>

                    <div className="mensagens">

                        <div className="balao pessoa_msg">
                            <p className="mensagem">messagem do cliente</p>
                        </div>

                    </div>


                    <div className="resposta">
                        <input className="campoResposta" placeholder="Digite sua mensagem..." type="text"></input>
                        <button type="file">
                            <img src={anexo} alt="enviar arquivo" />
                        </button>
                        <button type="submit">
                            <img src={enviar} alt="enviar mensagem" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}