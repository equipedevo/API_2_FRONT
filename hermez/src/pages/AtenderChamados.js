import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './css/AtenderChamado.css';

export default function AtenderChamado() {
    const items = [
        {id: 1, prioridade: 'Urgente', data: '22/12/2023', cliente: 'Anakin', titulo: 'A intenet inteira caiu', status: 'EM ANDAMENTO', tipo: 'Hardware', descricao: 'Descrição do problema que eu gostaria de solucionar. Eu tenho muito medo de acontecer algo aqui, e não dar tempo de entrga me ajuda pelo amor de deus!!!!'},
        {id: 2, prioridade: 'Alta', data: '22/12/2023', cliente: 'Anakin', titulo: 'Meu computador quebrou muitas vezes aaaa', status: 'ABERTO', tipo: 'Hardware', descricao: 'Descrição do problema que eu gostaria de solucionar. Eu tenho muito medo de acontecer algo aqui, e não dar tempo de entrga me ajuda pelo amor de deus!!!!'},
        {id: 3, prioridade: 'Média', data: '22/12/2023', cliente: 'Anakin', titulo: 'Meu computador quebrou muitas vezes aaaa', status: 'FECHADO', tipo: 'Hardware', descricao: 'Descrição do problema que eu gostaria de solucionar. Eu tenho muito medo de acontecer algo aqui, e não dar tempo de entrga me ajuda pelo amor de deus!!!!'},
        {id: 4, prioridade: 'Baixa', data: '22/12/2023', cliente: 'Anakin', titulo: 'Meu computador quebrou muitas vezes aaaa', status: 'ABERTO', tipo: 'Hardware', descricao: 'Descrição do problema que eu gostaria de solucionar. Eu tenho muito medo de acontecer algo aqui, e não dar tempo de entrga me ajuda pelo amor de deus!!!!'}
    ]

    const [database, setDatabase] = useState([]);

    useEffect(() => {
        fetch('https://hermezapi-back.vercel.app/chamado/getTodos?dev=true', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setDatabase(data);
        })

        .catch((error) => console.log(error));

    }, []);

    console.log(database)

    return (
        <>
            <div className="container">
                <div className="dashboard">
                    <h1>Lista de chamados</h1>

                    <section className="filtros" style={{display: 'none'}}>
                        <div className="filtro" id="cliente">
                            <label>FILTRAR POR CLIENTE:</label>
                            <select>
                                <option>Anakin</option>
                                <option>Roberto</option>
                            </select>
                        </div>

                        <div className="filtro" id="status">
                            <label>FILTRAR POR STATUS:</label>
                            <select>
                                <option>EM ANDAMENTO</option>
                                <option>ABERTO</option>
                                <option>FECHADO</option>
                                <option>CANCELADO</option>
                                <option>CONCLUÍDO</option>
                            </select>
                        </div>

                        <div className="filtro" id="tipo">
                            <label>FILTRAR POR TIPO:</label>
                            <select>
                                <option>Hardware</option>
                                <option>Software</option>
                            </select>
                        </div>
                    </section>

                    <section className="tabela">
                        <div className="header">
                            <p className="id" >ID</p>
                            <p className="prioridade" >Prioridade</p>
                            <p className="data" >Data</p>
                            <p className="cliente" >Cliente</p>
                            <p className="titulo" >Título</p>
                            <p className="status" >Status</p>
                            <p className="tipo" >Tipo</p>
                        </div>

                        { database.map( i => 
                            <details>
                                <summary>
                                    <p className="id">#{ i.cha_cod }</p>
                                    <p className="prioridade">{ i.cha_prioridade}</p>
                                    <p className="data">{ new Date(i.cha_dataInicio).toLocaleDateString() }</p>
                                    <p className="cliente">{ i.fun_cod }</p>
                                    <p className="titulo">{ i.cha_titulo }</p>
                                    <p className="status">{ i.sta_cod }</p>
                                    <p className="tipo">Hardware</p>
                                </summary>
                                <div className="descricao">
                                    <p>{ i.cha_desc }</p>

                                    <div className="botoes">
                                        <Link to='/'>
                                            <button className="iniciar">Iniciar</button>
                                        </Link>
                                        <Link to='/'>
                                            <button className="cancelar">Cancelar</button>
                                        </Link>
                                    </div>
                                </div>
                            </details>
                        ) }
                    </section>
                </div>
            </div>
        </>
    )
}