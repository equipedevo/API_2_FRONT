import React from "react";
import aberto from "../img/chats/aberto.svg";

export default function VisualizarChamado() {
    return (
        <>
            <div className="container">
                <div className="conversas">
                    <div className="icone">
                        <img src={aberto} alt='icone de aberto' />
                        <p>Aberto</p>
                    </div>
                    <div className="texto">
                        <p className="titulo aberto">Título do chamado</p>
                        <p className="subtitulo">Você: Sua resposta</p>
                    </div>
                </div>
                <div className="chats">

                </div>
            </div>
        </>
    );
}