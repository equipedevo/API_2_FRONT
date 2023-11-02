// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import './css/AtenderChamado.css';

// export default function AtenderChamado() {
//     const [database, setDatabase] = useState([]);

//     const prioridades = [
//         {id: 1, nome: 'Alta'},
//         {id: 2, nome: 'Média'},
//         {id: 3, nome: 'Baixa'}
//     ];

//     useEffect(() => {
//         fetch(process.env.REACT_APP_URL_CHAMADO_GET_TODOS, {
//             method: 'POST',
//             body: JSON.stringify({
//                 codEmp: localStorage.getItem('emp_cod')
//             }),
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             setDatabase(data);
//         })

//         .catch((error) => console.log(error));

//     }, []);

//     console.log(database)

//     return (
//         <>
//             <div className="container">
//                 <div className="dashboard">
//                     <h1>Lista de chamados</h1>

//                     <section className="filtros" style={{display: 'none'}}>
//                         <div className="filtro" id="cliente">
//                             <label>FILTRAR POR CLIENTE:</label>
//                             <select>
//                                 <option>Anakin</option>
//                                 <option>Roberto</option>
//                             </select>
//                         </div>

//                         <div className="filtro" id="status">
//                             <label>FILTRAR POR STATUS:</label>
//                             <select>
//                                 <option>EM ANDAMENTO</option>
//                                 <option>ABERTO</option>
//                                 <option>FECHADO</option>
//                                 <option>CANCELADO</option>
//                                 <option>CONCLUÍDO</option>
//                             </select>
//                         </div>

//                         <div className="filtro" id="tipo">
//                             <label>FILTRAR POR TIPO:</label>
//                             <select>
//                                 <option>Hardware</option>
//                                 <option>Software</option>
//                             </select>
//                         </div>
//                     </section>

//                     <section className="tabela">
//                         <div className="header">
//                             <p className="id" >ID</p>
//                             <p className="prioridade" >Prioridade</p>
//                             <p className="data" >Data</p>
//                             <p className="cliente" >Cliente</p>
//                             <p className="titulo" >Título</p>
//                             <p className="status" >Status</p>
//                             <p className="tipo" >Tipo</p>
//                         </div>

//                         { database.map( i => 
//                             <details key={i.cha_cod}>
//                                 <summary>
//                                     <p className="id">#{ i.cha_cod }</p>
                                    
//                                     { prioridades.map( p =>
//                                         (i.cha_prioridade === p.id) && 
//                                         <div className="prioridade">
//                                             <p className={`prioridade ${p.nome.toLowerCase()}`}>{ p.nome }</p>
//                                         </div>
//                                     )}
                                    
//                                     <p className="data">{ new Date(i.cha_dataInicio).toLocaleDateString() }</p>
//                                     <p className="cliente">{ i.fun_nome }</p>
//                                     <p className="titulo">{ i.cha_titulo }</p>
//                                     <p className="status">{ i.sta_nome.toUpperCase() }</p>
//                                     <p className="tipo">Hardware</p>
//                                 </summary>
//                                 <div className="descricao">
//                                     <p>{ i.cha_desc }</p>

//                                     <div className="botoes">
//                                         <Link to='/funcionario'>
//                                             <button className="iniciar">Iniciar</button>
//                                         </Link>
//                                         <Link to='/funcionario'>
//                                             <button className="cancelar">Cancelar</button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </details>

//                         ) }
//                     </section>
//                 </div>
//             </div>
//         </>
//     )
// }













// .dashboard{
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     width: 80%;
//     margin: 5% 10%;
//     padding: 2%;

//     border-radius: 20px;
//     background-color: var(--cinzaClaro);
// }

// .dashboard h1{
//     font: var(--títulos);
//     margin-bottom: 5%;
// }

// /*FILTROS*/
// .filtros{
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     margin-bottom: 5%;
// }

// .filtros div{
//     width: auto;
// }

// .filtro select{
//     width: 300px;
// }



// /*TABELA DE CHAMADOS*/
// .tabela{
//     display: flex;
//     flex-direction: column;
//     width: 100%;
// }

// .header{
//     display: flex;
//     justify-content: space-between;
//     height: 50px;

//     border-bottom: 0.5px solid var(--cinzaEscuro);
// }

// .header p{
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     font-weight: 700;
// }

// .dashboard summary{
//     display: flex;
//     justify-content: space-between;
//     height: 50px;
// }

// .dashboard summary p{
//     display: flex;
//     justify-content: center;
//     align-items: center;

// }

// .dashboard details:nth-child(even){
//     background-color: var(--cinzaHover);
// }

// .id{
//     width: 50px;
// }

// .data, .cliente {
//     width: 140px;
// }

// .titulo{
//     width: 300px;
//     text-align: center;
// }

// .status, .tipo, .prioridade{
//     width: 200px;
// }

// .prioridade{
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .prioridade p{
//     width: auto;
//     padding: 0 5%;
//     border-radius: 10px;
//     color: var(--branco);
// }

// .alta {
//     background-color: var(--vermelho);
// }

// .média {
//     background-color: #EF9A4C;
// }

// .baixa {
//     background-color: #E5D123;
// }

// .descricao{
//     padding: 10px;
// }

// .descricao p{
//     margin-bottom: 2%;
//     text-align: justify;

// }





// .botoes{
//     display: flex;
//     justify-content: center;
//     gap: 20px;
// }

// .dashboard button{
//     padding: 5px;
//     border-radius: 10px;
// }


// .iniciar{
//     border: 0.5px solid #EF9A4C;
//     background-color: transparent;
// }
// .iniciar:hover{
//     background-color: #EF9A4C;
// }


// .cancelar{
//     border: 0.5px solid var(--vermelho);
//     background-color: transparent;
// }
// .cancelar:hover{
//     background-color: var(--vermelho);
// }
