import { useEffect, useState } from "react";
import './css/TodosFuncionários.css';
import lupa from '../img/lupa.png';
export default function Funcionarios() {
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [erro, setErro] = useState('');
    useEffect(() => {
        fetch(process.env.REACT_APP_URL_TODOS_FUNCIONARIOS, {
            method:"POST",
            body: JSON.stringify({
                emp_cod: localStorage.getItem("emp_cod")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => {
            if(response.status === 200) {
                response.json().then((lista) => {
                    setListaFuncionarios(lista.funcionarios);
                });
            }
            else{(response.json()).then(data => 
                setErro(data.msg)
            )}
        })
    }, []);
    return (
        <>
            <div className="divTodosFuncionarios">
                <div className="divPesquisarFuncionário">
                    <input
                        placeholder='Nome do Funcionário'
                    />
                    <img src={lupa} alt="lupa"/>
                </div>
                {erro && <p className="erro">{erro}</p>}
                <div className="divTabelaFuncionario">
                    <div className="divTituloTabelaFuncionarios">
                        <p>Nome do Usuário</p>
                        <p>Serviço</p>
                    </div>
                    <form className="divListaFuncionarios" >
                        {listaFuncionarios.map(i =>
                            <div>
                                <p>{i.fun_nome}</p>
                                <p>{
                                    i.car_cod === 1 ? 'Funcionário':
                                    i.car_cod === 2 ? 'Técnico':
                                    i.car_cod === 3 ? 'Administrador':
                                    'Unknown'}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}