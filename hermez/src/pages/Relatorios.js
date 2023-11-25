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
    const handleCheckboxChange = (item) => {
        if (itens.includes(item)) {
            setPrioridades(itens.filter((p) => p !== item));
        } else {
            setPrioridades([...itens, item]);
        }
    };
    function handleClickPrioridade(){
        setTipoGrafico('prioridade');
        setPrioridades([])
    };
    function handleClickStatus(){
        setTipoGrafico('status');
        setPrioridades([])
    };
    useEffect(() => {
        if (tipoGrafico === 'prioridade') {
            const exemploDados = {
                1: Array.from({ length: 10 }, (_, i) => ({ cha_cod: i + 1 })),
                2: Array.from({ length: 8 }, (_, i) => ({ cha_cod: i + 11 })),
                3: Array.from({ length: 6 }, (_, i) => ({ cha_cod: i + 21 })),
                4: Array.from({ length: 4 }, (_, i) => ({ cha_cod: i + 27 }))
            };
            // const formatacaoData = (date) => {
            //     const formattedDate = new Date(date).toISOString().split('T')[0];
            //     return formattedDate;
            // };
            const geradorDeBarras = async () => {
                try {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const titulos = ['Baixa', 'Média', 'Alta', 'Urgente'];
                    const cores = ['#E5D123', '#EF9A4C', '#F4324A', '#4d0047'];
                    let dadosTemporarios = [];
                    if (dataInicio && dataFim && itens) {
                        /*
                        const inicioPeriodo = formatacaoData(dataInicio)
                        const fimPeriodo = formatacaoData(dataFim)
                        itens.map(((prioridade) => {
                            fetch(REACT_APP_URL_RELATORIO_PRIORIDADE, {
                                method: 'POST',
                                body: JSON.stringify({
                                    inicioPeriodo: inicioPeriodo,
                                    fimPeriodo: fimPeriodo,
                                    prioridade: prioridade
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            }).then(response => {
                                if(response.status === 200) {
                                    response.json().then((lista) => {
                                        setGrafico([
                                            titulos[prioridade - 1],
                                            lista.chamados.lenght(),
                                            cores[prioridade - 1],
                                            lista.chamados.lenght()
                                        ])
                                    });
                                } else{
                                    (response.json()).then(data => setErro(data.msg))
                                }
                            })
                        })
                        */
                        dadosTemporarios = itens.map((prioridade) => [
                            titulos[prioridade - 1],
                            exemploDados[prioridade].length,
                            cores[prioridade - 1],
                            exemploDados[prioridade].length
                        ]);
                    }
                    setGrafico(dadosTemporarios);
                    setErro('');
                } catch (error) {
                    setErro('Erro ao gerar o gráfico.');
                }
            };
            geradorDeBarras();
        } else {
            const statusDados = {
                1: Array.from({ length: 5 }, (_, i) => ({ cha_cod: i + 1 })),
                2: Array.from({ length: 7 }, (_, i) => ({ cha_cod: i + 6 })),
                3: Array.from({ length: 3 }, (_, i) => ({ cha_cod: i + 14 })),
                4: Array.from({ length: 2 }, (_, i) => ({ cha_cod: i + 20 })),
                5: Array.from({ length: 8 }, (_, i) => ({ cha_cod: i + 22 })),
                6: Array.from({ length: 4 }, (_, i) => ({ cha_cod: i + 30 }))
            };
            // const formatacaoData = (date) => {
            //     const formattedDate = new Date(date).toISOString().split('T')[0];
            //     return formattedDate;
            // };
            const geradorDeBarras = async () => {
                try {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const titulos = ['Aberto', 'Em Andamento', 'Reaberto', 'Cancelado', 'Concluído', 'Fechado'];
                    const cores = ['#5182FF', '#e9d62d', '#EF9A4C', '#FF5151', '#61E366', '#34B132'];
                    let dadosTemporarios = [];
                    if (dataInicio && dataFim && itens) {
                        /*
                        const inicioPeriodo = formatacaoData(dataInicio)
                        const fimPeriodo = formatacaoData(dataFim)
                        itens.map(((statusP) => {
                            fetch(`${process.env.REACT_APP_URL_RELATORIO_STATUS}`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    inicioPeriodo: inicioPeriodo,
                                    fimPeriodo: fimPeriodo,
                                    status: statusP
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            }).then(response => {
                                if(response.statusP === 200) {
                                    response.json().then((lista) => {
                                        setGrafico([
                                            titulos[statusP - 1],
                                            lista.chamados.lenght(),
                                            cores[statusP - 1],
                                            lista.chamados.lenght()
                                        ])
                                    });
                                } else{
                                    (response.json()).then(data => setErro(data.msg))
                                }
                            })
                        })
                        */
                        dadosTemporarios = itens.map((prioridade) => [
                            titulos[prioridade - 1],
                            statusDados[prioridade].length,
                            cores[prioridade - 1],
                            statusDados[prioridade].length
                        ]);
                    }
                    setGrafico(dadosTemporarios);
                    setErro('');
                } catch (error) {
                    setErro('Erro ao gerar o gráfico.');
                }
            };
            geradorDeBarras();
        }
    }, [dataInicio, dataFim, itens]);

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
                            {tipoGrafico==='prioridade'?(
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
                            ):(
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
            {grafico && grafico.length >= 1 && (
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="300px"
                    data={[
                        [tipoGrafico==='prioridade'?('Prioridade'):('Status'), 'Quantidade', { role: 'style' }, { role: 'annotation' }],
                        ...grafico
                    ]}
                    options={{
                        title: tipoGrafico==='prioridade'?('Prioridades'):('Status'),
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
