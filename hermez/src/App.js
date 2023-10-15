import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './pages/Base';
import BaseEmpresa from './pages/BaseEmpresa';
import Home from './pages/Home';
import './App.css';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginUsuario from './pages/LoginUsuario';
import CadastroEmpresa from './pages/CadastroEmpresa';
import AbrirChamado from './pages/AbrirChamado';
import AtenderChamado from './pages/AtenderChamados';
import CadastroUser from './pages/CadastroUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUsuario />}/>
        <Route path="empresa/login" element={<LoginEmpresa />}/>
        <Route path="empresa/cadastro" element={<CadastroEmpresa />}/>
        <Route path="/funcionario" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="realizar-chamado" element={< AbrirChamado />} />
          <Route path="atender-chamados" element={<AtenderChamado />} />
          <Route path="cadastrar-usuario" element={<CadastroUser />} />
        </Route>
        <Route path="/empresa" element={<BaseEmpresa />}>
          <Route index element={<CadastroUser />} />
        </Route>
        {/* path="*" serve para qualquer rota, então deve ficar por último e direcionar para a home ou uma página de erro 404 */}
        <Route path="*" element={<LoginUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
