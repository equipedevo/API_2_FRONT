import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import './css/AtenderChamado.css';
// import DateRangeComp from './components/DateRangeComp.jsx'



export default function AtenderChamado() {
    const [database, setDatabase] = useState([]);
    const [prioridade, setPrioridade] = useState(0);
    // const [periodo, setPeriodo] = useState('');
    const [funcionario, setFuncionario] = useState('');
    const [status, setStatus] = useState(0);
    const [tipo, setTipo] = useState(0);


    useEffect(() => {
        fetch(process.env.REACT_APP_URL_CHAMADO_GET_TODOS, {
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

    // DateRangeComp(() => {
    //     fetch(process.env.REACT_APP_URL_CHAMADO_GET_TODOS, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then((response) => response.json())
    //     .catch((error) => console.log(error));
    // }, []);

    console.log(database)

    return (
        <>
                <div className="dashboard">
            
                    <div className='divFormPadrao'>
                        <form className='formPadrao'>

                            <h1>LISTA DE CHAMADOS</h1>

                            <div className='divDuasColunasFormPadrao'>

                                <div className="filtros" id='prioridade'>
                                    <label>PRIORIDADE</label>

                                        <select
                                        id='selectPrioridade'
                                        name='Prioridade'
                                        value={prioridade}
                                        onChange={(e) => setPrioridade(e.target.value)}
                                        >

                                            <option
                                                value='0'
                                                style={{display: 'block'}}
                                            >
                                            </option>
                                            <option value='1'>Baixa</option>
                                            <option value='2'>Média</option>
                                            <option value='3'>Alta</option>
                                            <option value='4'>Urgente</option>

                                        </select>
                                </div>
                                

                                {/* PRECISA PEGAR OS FUNCIONARIOS DO BANCO */}
                                <div className="filtros" id='funcionario'>
                                    <label>FUNCIONÁRIO</label>

                                    <select
                                    id='selectFuncionario'
                                    name='funcionario'
                                    value={funcionario}
                                    onChange={(e) => setFuncionario(e.target.value)}
                                    >

                                        <option
                                        value='0'
                                        style={{displau: 'block'}}
                                        >   
                                        </option>

                                    </select>
                                </div>   
                            </div>


                            <div className='divDuasColunasFormPadrao'>

                                <div className="filtros" id='status'>

                                    <label>STATUS</label>

                                        <select
                                        id='selectStatus'
                                        name='Status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        >
                                        
                                            <option
                                                value='0'
                                                style={{display: 'block'}}
                                            >
                                            </option>
                                            <option value='1'>Em Andamento</option>
                                            <option value='2'>Aberto</option>
                                            <option value='3'>Fechado</option>
                                            <option value='4'>Cancelado</option>
                                            <option value='5'>Concluído</option>

                                        </select>
                                </div>

                                <div className="filtros" id='tipo'>
                                    <div>
                                        <label>TIPO</label>
                                            <select
                                            id='selectTipo'
                                            name='Tipo'
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                            >
                                            
                                                <option
                                                    value='0'
                                                    style={{display: 'block'}}
                                                >
                                                </option>
                                                <option value='1'>Hardware</option>
                                                <option value='2'>Software</option>
                                            
                                            </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* LISTA DE CHAMADOS ABAIXO */}
                    <section className="tabela">
                        <div className="header">
                            <p className="id">ID</p>
                            <p className="prioridade">PRIORIDADE</p>
                            <p className="data">PERÍODO</p>
                            <p className="cliente">FUNCIONÁRIO</p>
                            <p className="titulo">TÍTULO</p>
                            <p className="status">STATUS</p>
                            <p className="tipo">TIPO</p>
                        </div>

                        { database.map( i => 
                            <details key={i.cha_cod}>
                                <summary>
                                    <p className="id">#{ i.cha_cod }</p>
                                    
                                    
                                    <p className="prioridade">{ i.cha_prioridade }</p>
                                    

                                    <p className="data">{ new Date(i.cha_dataInicio).toLocaleDateString() }</p>
                                    <p className="cliente">{ i.fun_nome }</p>
                                    <p className="titulo">{ i.cha_titulo }</p>
                                    <p className="status">{ i.sta_nome }</p>
                                    <p className="tipo">Hardware</p>
                                </summary>
                                <div className="descricao">
                                    <p>{ i.cha_desc }</p>

                                    <div className="botoes">
                                        <Link to='/base'>
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
        </>
    )
}