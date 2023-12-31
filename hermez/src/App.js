import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './pages/Base';
import BaseEmpresa from './pages/BaseEmpresa';
import Home from './pages/Home';
import './App.css';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginFuncionario from './pages/LoginFuncionario';
import CadastroEmpresa from './pages/CadastroEmpresa';
import AbrirChamado from './pages/AbrirChamado';
import AtenderChamado from './pages/AtenderChamados';
import CadastroFuncionario from './pages/CadastroFuncionario';
import TodosFuncionários from './pages/TodosFuncionários';
import EditarFuncionario from './pages/EditarFuncionario';
import Chats from './pages/Chats';
import Relatorios from './pages/Relatorios';
import CadastroPerguntas from './pages/CadastroPerguntas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginFuncionario />}/>
        <Route path="empresa/login" element={<LoginEmpresa />}/>
        <Route path="empresa/cadastro" element={<CadastroEmpresa />}/>
        <Route path="/funcionario" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="chats" element={< Chats/>} />
          <Route path="realizar-chamado" element={< AbrirChamado />} />
          <Route path="atender-chamados" element={<AtenderChamado />} />
          <Route path="cadastrar-usuario" element={<CadastroFuncionario />} />
          <Route path="lista-funcionarios" element={<TodosFuncionários />} />
          <Route path="editar-funcionario" element={<EditarFuncionario />} />
          <Route path="relatorios" element={<Relatorios/>} />
        </Route>
        <Route path="/empresa" element={<BaseEmpresa />}>
          <Route index element={<CadastroFuncionario />} />
          <Route path="lista-funcionarios" element={<TodosFuncionários />} />
          <Route path="editar-funcionario" element={<EditarFuncionario />} />
          <Route path="perguntas-frequentes" element={<CadastroPerguntas />} />
        </Route>
        {/* path="*" serve para qualquer rota, então deve ficar por último e direcionar para a home ou uma página de erro 404 */}
        <Route path="*" element={<LoginFuncionario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
