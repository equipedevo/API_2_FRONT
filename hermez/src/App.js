import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './pages/Base'
import Home from './pages/Home';
import './App.css';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginUsuario from './pages/LoginUsuario';
import CadastroEmpresa from './pages/CadastroEmpresa';
import CadastroUser from './pages/CadastroUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginEmpresa />}/>
        <Route path="empresa" element={<LoginEmpresa />}/>
        <Route path="usuario" element={<LoginUsuario />}/>
        <Route path="cadastroEmpresa" element={<CadastroEmpresa />}/>
        <Route path="cadastroUser" element={<CadastroUser />}/>
        <Route path="/base" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="cadastro" element={<CadastroUser />} />
          {/* path="*" serve para qualquer rota, então deve ficar por último e direcionar para a home ou uma página de erro 404 */}
          <Route path="*" element={<LoginUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
