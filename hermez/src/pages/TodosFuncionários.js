import { useEffect, useState } from "react";
import './css/TodosFuncionários.css';
import lupa from '../img/lupa.png';
import { Link } from "react-router-dom";
export default function Funcionarios() {
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [erro, setErro] = useState('');
    const [nomePesquisa, setNomePesquisa]= useState('');
    const filtrarFuncionario = (nome, nomePesquisa) => {
        nome = nome.toLowerCase();
        nomePesquisa = nomePesquisa.toLowerCase();
        if (nomePesquisa.length >= 3 && !nome.includes(nomePesquisa)) {
            return false;
        }
        else {
            return true;
        }
    } 
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
                    const listaFiltrada = lista.funcionarios.filter(funcionario =>
                        filtrarFuncionario(funcionario.fun_nome, nomePesquisa)
                    );
                    setListaFuncionarios(listaFiltrada);
                });
            }
            else{(response.json()).then(data => 
                setErro(data.msg)
            )}
        })
    }, [nomePesquisa]);
    return (
        <>
            <div className="divTodosFuncionarios">
                <div className="divPesquisarFuncionário">
                    <input
                        placeholder='Nome do Funcionário'
                        value={nomePesquisa}
                        onChange={(e) => setNomePesquisa(e.target.value)}
                    />
                    <img src={lupa} alt="lupa"/>
                </div>
                {erro && <p className="erro">{erro}</p>}
                <div className="divTabelaFuncionario">
                    <div className="divTituloTabelaFuncionarios">
                        <p>Nome do Usuário</p>
                        <p>Serviço</p>
                        <p>Editar dados</p>
                    </div>
                    <form className="divListaFuncionarios" >
                        {localStorage.getItem('fun_cod') !== null ?(listaFuncionarios.map
                            (funcionario => funcionario.car_cod !== 3 &&
                                <div key={funcionario.fun_cod}>
                                    <p>{funcionario.fun_nome}</p>
                                    <select className="selectTabelaFuncionarios">
                                        <option value={funcionario.car_cod} style={{display: 'none'}}>{
                                            funcionario.car_cod === 1 ? 'Funcionário':
                                            funcionario.car_cod === 2 ? 'Técnico':
                                            'Unknown'
                                        }</option>
                                        <option value="1">Funcionário</option>
                                        <option value="2">Técnico</option>  
                                    </select>
                                    <div className="divButtonTabelaFuncionarios">
                                        <Link to="">
                                            Editar
                                        </Link>
                                    </div>
                                </div>
                            )
                        ):(listaFuncionarios.map
                            (funcionario =>
                            <div key={funcionario.fun_cod}>
                                <p>{funcionario.fun_nome}</p>
                                <select className="selectTabelaFuncionarios">
                                    <option value={funcionario.car_cod} style={{display: 'none'}}>{
                                        funcionario.car_cod === 1 ? 'Funcionário':
                                        funcionario.car_cod === 2 ? 'Técnico':
                                        funcionario.car_cod === 3 ? 'Administrador':
                                        'Unknown'
                                    }</option>
                                    <option value="1">Funcionário</option>
                                    <option value="2">Técnico</option>  
                                    <option value="3">Administrador</option>  
                                </select>
                                <div className="divButtonTabelaFuncionarios">
                                    <Link to={`../editar-funcionario?idfuncionario=${funcionario.fun_cod}`}>
                                        Editar
                                    </Link>
                                </div>
                            </div>
                            )
                        )}
                    </form>
                    {erro &&
                        <p className="erro">{erro}</p>
                    }
                </div>
            </div>
        </>
    )
}