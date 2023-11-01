import React, { useEffect, useState} from "react";
// import { Link } from 'react-router-dom';
import './css/AtenderChamado.css';
// import DateRangeComp from './components/DateRangeComp.jsx'



export default function AtenderChamado() {
    const [database, setDatabase] = useState([]);
    const [prioridade, setPrioridade] = useState(0);
    const [periodo, setPeriodo] = useState('');
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
            

                    <h1>Lista de Chamados</h1>

                    <section className="filtros_cima" style={{display: 'flex'}}>

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
                                        style={{display: 'flex'}}
                                    >
                                    </option>
                                    <option value='1'>Baixa</option>
                                    <option value='2'>Média</option>
                                    <option value='3'>Alta</option>
                                    <option value='4'>Urgente</option>

                                </select>
                        </div>


                        <div className="filtros" id='periodo'>
                            {/* PRECISA PENSAR NUM MODO DE DEIXAR UM SELECT DE CALENDÁRIO */}
                            <label>PERÍODO</label>

                                <select
                                id='selectPeriodo'
                                name='Periodo'
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                                >

                                    <option
                                        value='0'
                                        style={{display: 'flex'}}
                                    >
                                    </option>

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
                                style={{displau: 'flex'}}
                                >   
                                </option>

                            </select>
                        </div>   
                    </section>


                    <section className="filtros_baixo" style={{display: 'flex'}}>

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
                                        style={{display: 'flex'}}
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
                                            style={{display: 'flex'}}
                                        >
                                        </option>
                                        <option value='1'>Hardware</option>
                                        <option value='2'>Software</option>
                                    
                                    </select>
                            </div>
                        </div>
                    </section>
                </div>
        </>
    )
}