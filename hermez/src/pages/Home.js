import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopUp from '../components/Popup';

import './css/Home.css';
import balaoChat from '../img/home/balaoChat.png';
import gerenciarUsuario from '../img/home/gerenciarUsuario.png';
import foneAtendimento from '../img/home/foneAtendimento.png';
import papelComLapis from '../img/home/papelComLapis.png';

function BotoesAdm() {
  const [chamados, setChamados] = useState(true);
  const [gerenciar, setGerenciar] = useState(true);

  return (
    <>
      {chamados ? (
        <Link
          className='botoesHome grande'
          onClick={() => setChamados(!chamados)}
        >
          <div>
            <img src={balaoChat} alt="BalaoChat" />
            <h1>Visualizar chamados</h1>
          </div>
        </Link>
      ) : (
        <div className='botoesPequenoHome' id='GerenciarUsuariosItens'>
          <Link className='botoesHome pequeno'>
            <div>
              <h1>Gerar relatórios</h1>
            </div>
          </Link>
          <Link className='botoesHome pequeno'>
            <div>
              <h1>Histórico meus chamados</h1>
            </div>
          </Link>
        </div>
      )}
      {gerenciar ? (
        <Link
          className='botoesHome grande'
          onClick={() => setGerenciar(!gerenciar)}
        >
          <div>
            <img src={gerenciarUsuario} alt="GerenciarUsuario" />
            <h1>Gerenciar usuários</h1>
          </div>
        </Link>
      ) : (
        <div className='botoesPequenoHome' id='GerenciarUsuariosItens'>
          <Link className='botoesHome pequeno' to="cadastrar-usuario">
            <div>
              <h1>Cadastrar usuários</h1>
            </div>
          </Link>
          <Link className='botoesHome pequeno'>
            <div>
              <h1>Alterar dados usuários</h1>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [usuario, setUsuario] = useState('Funcionario');
  const cargo = localStorage.getItem('car_cod');

  useEffect(() => {
    if (cargo === '1') {
      setUsuario('Funcionário');
    } else if (cargo === '2') {
      setUsuario('Técnico');
    } else if (cargo === '3') {
      setUsuario('Administrador');
    }
  }, [cargo]);

  return (
    <>
      <div className='cabecalhoHeader'>
        <div />
        <p>
          <h1>Olá, {usuario}!</h1>
          <h2>Acesse suas funções de uma maneira rápida e fácil!</h2>
        </p>
      </div>
      <div className='divbotoesHome'>
        {cargo === '3' ? (
          <BotoesAdm />
        ) : (
          <Link className='botoesHome grande'>
            <div>
              <img src={balaoChat} alt="BalaoChat" />
              <h1>Histórico de chamados</h1>
            </div>
          </Link>
        )}
        <Link className='botoesHome grande' to="realizar-chamado">
          <div>
            <img src={papelComLapis} alt="PapelComLapis" />
            <h1>Iniciar um novo chamado</h1>
          </div>
        </Link>
        {cargo !== '1' ? (
          <Link className='botoesHome grande' to="atender-chamados">
            <div>
              <img src={foneAtendimento} alt="FoneAtendimento" />
              <h1>Atender chamados</h1>
            </div>
          </Link>
        ) : (
          null
        )}
      </div>
      <PopUp/>
    </>
  );
}
