import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './css/AtenderChamado.css';

export default function AtenderChamado() {
    const [database, setDatabase] = useState([]);

    const prioridades = [
        {id: 1, nome: 'Alta'},
        {id: 2, nome: 'Média'},
        {id: 3, nome: 'Baixa'}
    ];

    useEffect(() => {
        fetch(process.env.REACT_APP_URL_CHAMADO_GET_TODOS, {
            method: 'POST',
            body: JSON.stringify({
                emp_cod: localStorage.getItem('emp_cod')
            }),
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

        fetch(process.env.REACT_APP_URL_CHAMADO_ATRIBUIR, {
            method: 'POST',
            body: JSON.stringify({
                fun_cod: localStorage.getItem('fun_cod'),
                cha_cod: localStorage.getItem('cha_cod')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        .then((response) => response.json())
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
                            <details key={i.cha_cod}>
                                <summary>
                                    <p className="id">#{ i.cha_cod }</p>
                                    
                                    { prioridades.map( p =>
                                        (i.cha_prioridade === p.id) && 
                                        <div className="prioridade">
                                            <p className={`prioridade ${p.nome.toLowerCase()}`}>{ p.nome }</p>
                                        </div>
                                    )}
                                    
                                    <p className="data">{ new Date(i.cha_dataInicio).toLocaleDateString() }</p>
                                    <p className="cliente">{ i.fun_nome }</p>
                                    <p className="titulo">{ i.cha_titulo }</p>
                                    <p className="status">{ i.sta_nome.toUpperCase() }</p>
                                    <p className="tipo">Hardware</p>
                                </summary>
                                <div className="descricao">
                                    <p>{ i.cha_desc }</p>

                                    <div className="botoes">
                                        <Link to='/funcionario/chats'>
                                            <button className="iniciar" onClick={() => localStorage.setItem('cha_cod', i.cha_cod)}>Iniciar</button>
                                        </Link>
                                        <Link to='/funcionario'>
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