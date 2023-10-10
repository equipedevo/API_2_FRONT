import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './pages/Base'
import Home from './pages/Home';
import './App.css';
import Cadastro from './pages/Cadastro';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginUsuario from './pages/LoginUsuario';
import CadastroEmpresa from './pages/CadastroEmpresa';
import AbrirChamado from './pages/AbrirChamado';
import AtenderChamado from './pages/AtenderChamados';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginEmpresa />}/>
        <Route path="empresa" element={<LoginEmpresa />}/>
        <Route path="usuario" element={<LoginUsuario />}/>
        <Route path="cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/base" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="chamado" element={< AbrirChamado />} />
          <Route path="cadastro" element={<LoginEmpresa />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="dashboard-chamado" element={<AtenderChamado />} />
          {/* path="*" serve para qualquer rota, então deve ficar por último e direcionar para a home ou uma página de erro 404 */}
          <Route path="*" element={<LoginUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
