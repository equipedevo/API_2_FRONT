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
    const [staCod, setStaCod] = useState(null);

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

    const trocaStatus = (status) => {
        setStaCod(status);
        localStorage.setItem('sta_cod', status);
        localStorage.setItem('cha_cod', selectChaCod);

        fetch(`${process.env.REACT_APP_URL_CHAMADO_ATUALIZAR_STATUS}`, {
            method: 'POST',
            body: JSON.stringify({
                sta_cod: localStorage.getItem('sta_cod'),
                cha_cod: localStorage.getItem('cha_cod')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .catch((error) => console.log(error));
    }

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

    const meusChamados = Array.isArray(atribuidos) ? atribuidos.concat(database) : database;
    meusChamados.sort((a, b) => {
        let x = new Date(a.cha_dataInicio);
        let y = new Date(b.cha_dataInicio);
        return x - y;
    })
    meusChamados.reverse();



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
            .then((data) => { setDatabase(data) })
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

    }, [selectChaCod])


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

                    {meusChamados
                        .filter(cha => cha.cha_cod === selectChaCod)
                        .map(cha => (

                            cha.sta_nome === 'Cancelado' ?

                                <div className="resposta">
                                    <div className="avisoStatus">
                                        <img src={cancelado} />
                                        <h2 className="cancelado">Chamado cancelado</h2>
                                    </div>
                                </div>
                            :
                            cha.sta_nome === 'Concluído' ?

                                <div className="resposta">
                                    <div className="avisoStatus">
                                        <img src={concluido} />
                                        <h2 className="concluído">Chamado concluído</h2>
                                    </div>
                                    <button className="btn-status" onClick={() => trocaStatus(3)}>Reabrir</button>
                                </div>
                            :
                            cha.sta_nome === 'Fechado' ?
                                <div className="resposta">
                                    <div className="avisoStatus">
                                        <img src={fechado} />
                                        <h2 className="fechado">Chamado fechado</h2>
                                    </div>
                                </div>
                            :
                            cha.sta_nome === 'Reaberto' ?
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
                                    <button className="btn-status" onClick={() => trocaStatus(6)}>Fechar</button>
                                </div>
                                :

                                //Em andamento e aberto

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
                                    <button className="btn-status" onClick={() => trocaStatus(5)}>Concluir</button>
                                </div>

                        ))}





                </div>
            </div>
        </>
    );
}