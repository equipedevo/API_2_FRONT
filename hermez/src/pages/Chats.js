import React from "react";
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
    return (
        <>
            <div className="container">
                <div className="lista">
                    <details>
                        <summary className="chat active">
                            <div className="icone">
                                <img src={aberto} alt='icone de aberto' />
                                <p className="status aberto">Aberto</p>
                            </div>
                            <div className="texto">
                                <p className="tituloChat aberto">Título do chamado</p>
                                <p className="subtitulo">Você: Sua resposta como sempre foi aparentemente enorme</p>
                            </div>
                        </summary>
                        <div className="linhadotempo">
                            
                        </div>
                    </details>
                    <div className="chat">
                        <div className="icone">
                            <img src={reaberto} alt='icone de status' />
                            <p className="status reaberto">Reaberto</p>
                        </div>
                        <div className="texto">
                            <p className="tituloChat reaberto">Título do chamado</p>
                            <p className="subtitulo">Você: Sua resposta</p>
                        </div>
                    </div>
                    <div className="chat">
                        <div className="icone">
                            <img src={andamento} alt='icone de andamento' />
                            <p className="status andamento">Andamento</p>
                        </div>
                        <div className="texto">
                            <p className="tituloChat andamento">Título do chamado</p>
                            <p className="subtitulo">Você: Sua resposta</p>
                        </div>
                    </div>
                    <div className="chat">
                        <div className="icone">
                            <img src={cancelado} alt='icone de cancelado' />
                            <p className="status cancelado">Cancelado</p>
                        </div>
                        <div className="texto">
                            <p className="tituloChat cancelado">Título do chamado</p>
                            <p className="subtitulo">Você: Sua resposta</p>
                        </div>
                    </div>
                    <div className="chat">
                        <div className="icone">
                            <img src={concluido} alt='icone de concluido' />
                            <p className="status concluido">Concluido</p>
                        </div>
                        <div className="texto">
                            <p className="tituloChat concluido">Título do chamado</p>
                            <p className="subtitulo">Você: Sua resposta</p>
                        </div>
                    </div>
                    <div className="chat">
                        <div className="icone">
                            <img src={fechado} alt='icone de fechado' />
                            <p className="status fechado">Fechado</p>
                        </div>
                        <div className="texto">
                            <p className="tituloChat fechado">Título do chamado</p>
                            <p className="subtitulo">Você: Sua resposta</p>
                        </div>
                    </div>
                </div>


                <div className="conversa">
                    <p className="tituloConv aberto">Título do problema</p>
                    
                    <div className="mensagens">
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao minha_msg">
                            <p className="mensagem">Mensagem do suporte</p>
                        </div>
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao minha_msg">
                            <p className="mensagem">Mensagem do suporte</p>
                        </div>
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao minha_msg">
                            <p className="mensagem">Mensagem do suporte</p>
                        </div>
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao minha_msg">
                            <p className="mensagem">Mensagem do suporte</p>
                        </div>
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao minha_msg">
                            <p className="mensagem">Mensagem do suporte</p>
                        </div>
                        <div className="balao pessoa_msg">
                            <p className="mensagem">Mensagem do cliente</p>
                        </div>
                        <div className="balao minha_msg">
                            <p className="mensagem">Mensagem do suporte</p>
                        </div>
                    </div>
                    

                    <div className="resposta">
                        <input className="campoResposta" placeholder="Digite sua mensagem..." type="text"></input>
                        <img src={anexo} alt="enviar arquivo"/>
                        <img src={enviar} alt="enviar mensagem"/>
                    </div>
                </div> 
            </div>
        </>
    );
}