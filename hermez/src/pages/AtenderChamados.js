import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './css/AtenderChamado.css';

export default function AtenderChamado() {
    const [listaChamado, setListaChamado] = useState([]);
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
        fetch(`${process.env.REACT_APP_URL_CHAMADO_FILTRO}`, {
            method: 'POST',
            body: JSON.stringify(filtro),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            setListaChamado(data);
        }).catch((error) => console.log(error));
    };

    const mudarStatus = (novoStatus, chamado) => {
        localStorage.setItem('sta_cod', novoStatus);
        localStorage.setItem('cha_cod', chamado);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_CHAMADO_ATRIBUIR}`, {
            method: 'POST',
            body: JSON.stringify({
                fun_cod: localStorage.getItem('fun_cod'),
                cha_cod: localStorage.getItem('cha_cod'),
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        .then((response) => response.json())
        .catch((error) => console.log(error));

    }, []);

    useEffect(() => { 
        const filtroEffect = () => {
            aplicarFiltro();
        }
        filtroEffect();
    }, [prioridade, funcionario, status, tipo]);



    useEffect(() => {
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
    }, [])

    return (
        <>
            <div className='divFormPadrao'>
                <form className='formPadrao'>
                    <h1>LISTA DE CHAMADOS </h1>
                    <div className='divDuasColunasFormPadrao'>
                        <div className="filtros" id='prioridade'>
                            <label htmlFor="prioridadeFiltragem">PRIORIDADE</label>
                            <select
                                className="selectFormPadrao"
                                id='prioridadeFiltragem'
                                name='prioridadeFiltragem'
                                onChange={(e) => setPrioridade(e.target.value)}
                            >
                                <option value=''>Todos</option>
                                <option value='1'>Baixa</option>
                                <option value='2'>Média</option>
                                <option value='3'>Alta</option>
                                <option value='4'>Urgente</option>
                            </select>
                        </div>
                        <div className="filtros" id='funcionario'>
                            <label htmlFor="funcionarioFiltragem">FUNCIONÁRIO</label>
                            <input
                                className="inputFormPadrao"
                                id='funcionarioFiltragem'
                                maxLength="30"
                                name='funcionarioFiltragem'
                                onChange={(e) => setFuncionario(e.target.value)}
                                value={funcionario}
                                placeholder="Nome do Funcionário"
                                type='text'
                            />
                        </div>   
                    </div>
                    <div className='divDuasColunasFormPadrao'>
                        <div className="filtros" id='status'>
                            <label htmlFor="prioridadeStatus">STATUS</label>
                            <select
                                className="selectFormPadrao"
                                id='prioridadeStatus'
                                name='prioridadeStatus'
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value=''>Todos</option>
                                <option value='Aberto'>Aberto</option>
                                <option value='Em andamento'>Em Andamento</option>
                                <option value='Reaberto'>Reaberto</option>
                                <option value='Cancelado'>Cancelado</option>
                                <option value='Concluido'>Concluído</option>
                                <option value='Fechado'>Fechado</option>
                            </select>
                        </div>
                        <div className="filtros" id='tipo'>
                            <label htmlFor="prioridadeTipo">TIPO</label>
                            <select
                                className="selectFormPadrao"
                                id='prioridadeTipo'
                                name='prioridadeTipo'
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value=''>Todos</option>
                                <option value="manuntenção de cpu">Manuntenção de Cpu</option>
                                <option value="Consertar sua Placa-mãe">Consertar sua Placa-mãe</option>
                                <option value="reestabelecer internet">Reestabelecer Internet</option>
                                <option value="computador quebrou">Computador Quebrou</option>
                                <option value="computador lento">Computador Lento</option>
                                <option value="Outros.">Outros</option>    
                            </select>
                        </div>
                    </div>
                    <div className="tabelaChamados">
                        <div className="tituloTabelaChamados">
                            <p>ID</p>
                            <p>PRIORIDADE</p>
                            <p>DATA</p>
                            <p>FUNCIONÁRIO</p>
                            <p>TÍTULO</p>
                            <p>STATUS</p>
                            <p>TIPO</p>
                        </div>
                        <div>{Array.isArray(listaChamado) && listaChamado.map(chamado =>
                            <details key={chamado.cha_cod}>
                                <summary  className="listaTabelaChamados">
                                    <p>#{chamado.cha_cod}</p>
                                    {prioridades.map(prioridade =>
                                        (chamado.cha_prioridade === prioridade.id) &&
                                        <div className="divPrioridade">
                                            <p className={`${prioridade.nome.toLowerCase()}`}>{prioridade.nome}</p>
                                        </div>
                                    )}
                                    <p>{new Date(chamado.cha_dataInicio).toLocaleDateString()}</p>
                                    <p>{chamado.fun_nome}</p>
                                    <p>{chamado.cha_titulo}</p>
                                    <p>{chamado.sta_nome.toUpperCase()}</p>
                                    <p>{chamado.ser_nome.toUpperCase()}</p>
                                </summary>
                                <div className="divDescricaoChamado">
                                    <p>{chamado.cha_desc}</p>
                                    <div>
                                        <Link to='/funcionario/chats' className="iniciar" onClick={() => mudarStatus(2, chamado.cha_cod)}>
                                            Iniciar
                                        </Link>
                                        <button className="cancelar" onClick={() => mudarStatus(4, chamado.cha_cod)}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </details>
                        )}</div>
                    </div>
                </form>
            </div>
        </>
    )
}