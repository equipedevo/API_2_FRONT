import { useEffect, useState } from "react";
import './css/TodosFuncionários.css';
import lupa from '../img/lupa.png';
export default function Funcionarios() {
    useEffect(() => {
        fetch(process.env.REACT_APP_URL_TODOS_FUNCIONARIOS, {}
    )}, []);
    return (
        <>
            <div className="divTodosFuncionarios">
                <div className="divPesquisarFuncionário">
                    <input
                        placeholder='Nome do Funcionário'
                    />
                    <img src={lupa}/>
                </div>
                <div className="divTabelaFuncionario">
                    <div className="divTituloTabelaFuncionarios">
                        <p>Nome do Usuário</p>
                        <p>Serviço</p>
                    </div>
                    <form className="divListaFuncionarios" >
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                        <div>
                            <p>Nome do Usuário</p>
                            <p>Serviço</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}