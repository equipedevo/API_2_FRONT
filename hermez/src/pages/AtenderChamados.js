import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './css/AtenderChamado.css';

export default function AtenderChamado() {
    const [database, setDatabase] = useState([]);
    const [prioridade, setPrioridade] = useState('');
    const [funcionario, setFuncionario] = useState('');
    const [status, setStatus] = useState('');
    const [tipo, setTipo] = useState('');

    const prioridades = [
        {id: 1, nome: 'Baixa'},
        {id: 2, nome: 'Média'},
        {id: 3, nome: 'Alta'},
        {id: 4, nome: 'Urgente'}
    ];

    const aplicarFiltro = () => {
        const filtro = {
            emp_cod: localStorage.getItem('emp_cod'),
            priori: prioridade,
            func: funcionario,
            status: status,
            tipo: tipo
        };
        fetch(process.env.REACT_APP_URL_CHAMADO_FILTRO, {
            method: 'POST',
            body: JSON.stringify(filtro),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            setDatabase(data);
        }).catch((error) => console.log(error));
    };

    useEffect(() => {
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

    useEffect(() => { 
        const filtroEffect = () => {
            aplicarFiltro();
        }
        filtroEffect();
    }, [prioridade, funcionario, status, tipo]);
    return (
        <>
            <div className='divFormPadrao'>
                <form className='formPadrao'>
                    <h1>LISTA DE CHAMADOS </h1>
                    <div className='divDuasColunasFormPadrao'>
                        <div className="filtros" id='prioridade'>
                            <label>PRIORIDADE</label>
                            <select
                                id='selectPrioridade'
                                name='prioridade'
                                value={prioridade}
                                onChange={(e) => setPrioridade(e.target.value)}
                            >
                                <option
                                    value=''
                                    style={{display: 'block'}}
                                >
                                    Todos
                                </option>
                                <option value='1'>Baixa</option>
                                <option value='2'>Média</option>
                                <option value='3'>Alta</option>
                                <option value='4'>Urgente</option>
                            </select>
                        </div>
                        <div className="filtros" id='funcionario'>
                            <label>FUNCIONÁRIO</label>
                            <input
                                id='selectFuncionario'
                                name='funcionario'
                                value={funcionario}
                                onChange={(e) => setFuncionario(e.target.value)}
                                placeholder="Nome do Funcionário"
                                type='text'
                            />
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
                                    value=''
                                    style={{display: 'block'}}
                                >
                                    Todos
                                </option>
                                <option value='Aberto'>Aberto</option>
                                <option value='Em andamento'>Em Andamento</option>
                                <option value='Reaberto'>Reaberto</option>
                                <option value='Cancelado'>Cancelado</option>
                                <option value='Concluido'>Concluído</option>
                                <option value='Fechado'>Fechado</option>
                            </select>
                        </div>
                        <div className="filtros" id='tipo'>
                            <label>TIPO</label>
                            <select
                                id='selectTipo'
                                name='Tipo'
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option
                                    value=''
                                    style={{display: 'block'}}
                                >
                                    Todos
                                </option>
                                <option value="manuntenção de cpu">Manuntenção de Cpu</option>
                                <option value="Consertar sua Placa-mãe">Consertar sua Placa-mãe</option>
                                <option value="reestabelecer internet">Reestabelecer Internet</option>
                                <option value="computador quebrou">Computador Quebrou</option>
                                <option value="computador lento">Computador Lento</option>
                                <option value="Outros.">Outros</option>    
                            </select>
                        </div>
                    </div>
                    {/* LISTA DE CHAMADOS ABAIXO */}
                    <section className="tabela">
                        <div className="header">
                            <p className="id">ID</p>
                            <p className="prioridade">PRIORIDADE</p>
                            <p className="data">DATA</p>
                            <p className="cliente">FUNCIONÁRIO</p>
                            <p className="titulo">TÍTULO</p>
                            <p className="status">STATUS</p>
                            <p className="tipo">TIPO</p>
                        </div>
                        {Array.isArray(database) && database.map( i => (
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
                                    <p className="tipo">{i.ser_nome.toUpperCase()}</p>
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
                        ))}
                    </section>
                </form>
            </div>
        </>
    )
}