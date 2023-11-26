import React, { useEffect, useState } from 'react';
import './css/Relatorios.css';
import Popup from '../components/Popup';
import { Chart } from "react-google-charts";

export default function Relatorios() {
    const [tipoGrafico, setTipoGrafico] = useState('prioridade')
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [grafico, setGrafico] = useState('null');
    const [itens, setPrioridades] = useState([]);
    const [erro, setErro] = useState('');
    const [dadosProntos, setDadosProntos] = useState(false);
    const handleCheckboxChange = (item) => {
        if (itens.includes(item)) {
            setPrioridades(itens.filter((p) => p !== item));
        } else {
            setPrioridades([...itens, item]);
        }
    };
    function handleClickPrioridade() {
        setTipoGrafico('prioridade');
        setPrioridades([])
    };
    function handleClickStatus() {
        setTipoGrafico('status');
        setPrioridades([])
    };
    useEffect(() => {
        const formatacaoData = (date) => {
            const formattedDate = new Date(date).toISOString().split('T')[0];
            return formattedDate;
        };
        const geradorDeBarras = async () => {
            try {
                const titulos = tipoGrafico === 'prioridade' ? ['Baixa', 'Média', 'Alta', 'Urgente'] : ['Aberto', 'Em Andamento', 'Reaberto', 'Cancelado', 'Concluído', 'Fechado'];
                const cores = tipoGrafico === 'prioridade' ? ['#E5D123', '#EF9A4C', '#F4324A', '#4d0047'] : ['#5182FF', '#e9d62d', '#EF9A4C', '#FF5151', '#61E366', '#34B132'];

                let dadosTemporarios = [];

                if (dataInicio && dataFim && itens) {
                    const inicioPeriodo = formatacaoData(dataInicio);
                    const fimPeriodo = formatacaoData(dataFim);
                    if (tipoGrafico === 'prioridade') {
                        await Promise.all(itens.map(async (prioridade) => {
                            const response = await fetch(`${process.env.REACT_APP_URL_RELATORIO_PRIORIDADE}`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    emp_cod: localStorage.getItem("emp_cod"),
                                    inicioPeriodo: inicioPeriodo,
                                    fimPeriodo: fimPeriodo,
                                    prioridade: prioridade
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            });

                            if (response.status === 200) {
                                const lista = await response.json();
                                console.log(lista, prioridade)
                                dadosTemporarios.push([
                                    titulos[prioridade - 1],
                                    lista.chamados.length,
                                    cores[prioridade - 1],
                                    lista.chamados.length,
                                ]);
                            } else {
                                const data = await response.json();
                                setErro(data.msg);
                            }
                        }));
                    } else {
                        await Promise.all(itens.map(async (statusP) => {
                            const response = await fetch(`${process.env.REACT_APP_URL_RELATORIO_STATUS}`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    emp_cod: localStorage.getItem("emp_cod"),
                                    inicioPeriodo: inicioPeriodo,
                                    fimPeriodo: fimPeriodo,
                                    status: statusP
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            });
                            if (response.status === 200) {
                                const lista = await response.json();
                                dadosTemporarios.push([
                                    titulos[statusP - 1],
                                    lista.chamados.length,
                                    cores[statusP - 1],
                                    lista.chamados.length,
                                ]);
                            } else {
                                const data = await response.json();
                                setErro(data.msg);
                            }
                        }));
                    }
                }
                setGrafico(dadosTemporarios);
                setErro('');
                setDadosProntos(true);
            } catch (error) {
                setErro('Erro ao gerar o gráfico.');
            }
        };
        geradorDeBarras();
    }, [dataInicio, dataFim, itens, tipoGrafico]);

    return (
        <>
            <div className='relatorios'>
                <div className='botoesRelatorios'>
                    <h1>RELATÓRIO POR:</h1>
                    <div>
                        <button onClick={() => handleClickPrioridade()}>Prioridade</button>
                        <button onClick={() => handleClickStatus()}>Status</button>
                    </div>
                </div>
                <div className='variaveisRelatorios'>
                    <h1> VARIÁVEIS:</h1>
                    <div>
                        <div>
                            <span>Data de início:</span>
                            <input type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                        </div>
                        <div>
                            <span>Data final:</span>
                            <input type='date' value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                        </div>
                        <div>
                            <span>Items:</span>
                            {tipoGrafico === 'prioridade' ? (
                                <>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='1'
                                            checked={itens.includes('1')}
                                            onChange={() => handleCheckboxChange('1')}
                                        />
                                        Baixa
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='2'
                                            checked={itens.includes('2')}
                                            onChange={() => handleCheckboxChange('2')}
                                        />
                                        Média
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='3'
                                            checked={itens.includes('3')}
                                            onChange={() => handleCheckboxChange('3')}
                                        />
                                        Alta
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='4'
                                            checked={itens.includes('4')}
                                            onChange={() => handleCheckboxChange('4')}
                                        />
                                        Urgente
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='1'
                                            checked={itens.includes('1')}
                                            onChange={() => handleCheckboxChange('1')}
                                        />
                                        Aberto
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='2'
                                            checked={itens.includes('2')}
                                            onChange={() => handleCheckboxChange('2')}
                                        />
                                        Andamento
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='3'
                                            checked={itens.includes('3')}
                                            onChange={() => handleCheckboxChange('3')}
                                        />
                                        Reaberto
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='4'
                                            checked={itens.includes('4')}
                                            onChange={() => handleCheckboxChange('4')}
                                        />
                                        Cancelado
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='5'
                                            checked={itens.includes('5')}
                                            onChange={() => handleCheckboxChange('5')}
                                        />
                                        Concluído
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='6'
                                            checked={itens.includes('6')}
                                            onChange={() => handleCheckboxChange('6')}
                                        />
                                        Fechado
                                    </label>
                                </>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {dadosProntos && grafico && grafico.length >= 1 && (
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="300px"
                    data={[
                        [tipoGrafico === 'prioridade' ? ('Prioridade') : ('Status'), 'Quantidade', { role: 'style' }, { role: 'annotation' }],
                        ...grafico
                    ]}
                    options={{
                        title: tipoGrafico === 'prioridade' ? ('Prioridades') : ('Status'),
                        bar: { groupWidth: '80%' },
                        legend: { position: 'none' }
                    }}
                />
            )}
            {erro && <p className="erro">{erro}</p>}
            <Popup />
        </>
    );
}
