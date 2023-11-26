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
            <img src={balaoChat} alt="BalaoChat"/>
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
          <Link className='botoesHome pequeno' to="chats">
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
          <Link className='botoesHome pequeno' to="lista-funcionarios">
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

  // Lógica para identificar o tipo de usuário
  useEffect(() => {
    if (cargo === '1') {
      setUsuario('Funcionário');
    } else if (cargo === '2') {
      setUsuario('Técnico');
    } else if (cargo === '3') {
      setUsuario('Administrador');
    }
  }, [cargo]);

  // Lógica para exibir um manual específico a depender do tipo de usuário identificado
  let manualHTML;
  if (cargo === '1') {
    // Manual para Funcionário
    manualHTML = (
      <div className='manual'>
        <header>
          <h1>Manual do Usuário</h1>
        </header>

        <br></br><br></br>

        <main>
          <section>
            <h2>Introdução</h2>
            <br></br>
              <p>Bem-vindo ao manual do funcionário para o Sistema de Gerenciamento de Chamados: Hermez. 
                Este manual fornecerá informações detalhadas sobre como usar o site de maneira eficaz.</p>
          </section>

          <br></br><br></br>

          <section>
            <h2>Como Usar</h2>
            <br></br>
            <p>O segmento à seguir fornecerá informações e instruções sobre as funcionalidades do sistema Hermez.</p>
              <br></br><br></br>

            <div className='corpo'>

                  <h2>Histórico de chamados</h2>
                  <br></br>

                  <p>Em <a href='https://hermezapi.vercel.app/funcionario/chats' target='_blank' rel='noreferrer'>'Histórico meus Chamados'</a> você pode consultar todos os chamados já abertos por você, 
                        os status deles e mensagens trocadas entre você e os funcionários, bem como enviar mensagens novas, caso o status permita.</p>

                  <br></br><br></br>

                  {/* BOX 3 */}
                  <h2>Iniciar um novo chamado</h2>
                  <br></br>
                  <p>É a ferramenta principal do sistema. Ao clicar em <a href='https://hermezapi.vercel.app/funcionario/realizar-chamado' target='_blank' rel='noreferrer'>Iniciar um novo chamado</a> e preencher os campos, o seu chamado será criado e o seu problema será resolvido por um técnico o mais rápido possível!</p>

                  <br></br><br></br>

                  <h2>Entendendo os chamados</h2>
                  <br></br>

                  <h3>Status</h3>
                  <br></br>
                  <p>Status também é uma informação presente em todos os chamados, que indica em que etapa de processamento e resolução o seu problema se encontra.</p>
                    <br></br>
                    <ol>
                      <li id='aberto'>Aberto</li>
                      <p>Indica um chamado que ainda nao foi atendido, ou seja, nenhum técnico está trabalhando nele.</p>
                    <br></br>
                      <li id='andamento'>Andamento</li>
                      <p>Indica um chamado que está sendo atendido por um técnico, que está sendo solucionado.</p>
                    <br></br>
                      <li id='concluido'>Concluído</li>
                      <p>Indica um chamado que teve seu problema solucionado com sucesso.</p>
                    <br></br>
                      <li id='reaberto'>Reaberto</li>
                      <p>Indica um chamado que não teve seu problema não foi solucionado com sucesso, mesmo após ter sido dado como 'concluído'.</p>
                    <br></br>
                      <li id='fechado'>Fechado</li>
                      <p>Indica um chamado que não pode mais ser reaberto, podendo ser dado como finalizado.</p>
                    <br></br>
                      <li id='cancelado'>Cancelado</li>
                      <p>Indica um chamado que em que uma das partes decidiu que não precisa mais ser trabalhado, seja o técnico, o administrador ou o próprio funcionário que tenha optado por isso.
                        Pode ser entendido como um problema que foi resolvido de outra forma.</p>
                    </ol>

            </div>
          </section>

        </main>
      </div>
    );
  } else if (cargo === '2') {
    // Manual para Técnico
    manualHTML = (
      <div className='manual'>
        <header>
          <h1>Manual do Usuário</h1>
        </header>

        <br></br><br></br>

        <main>
          <section>
            <h2>Introdução</h2>
            <br></br>
              <p>Bem-vindo ao manual do Técnico para o Sistema de Gerenciamento de Chamados: Hermez. 
                Este manual fornecerá informações detalhadas sobre como usar o site de maneira eficaz.</p>
          </section>

          <br></br><br></br>

          <section>
            <h2>Como Usar</h2>
            <br></br>
            <p>O segmento à seguir fornecerá informações e instruções sobre as funcionalidades do sistema Hermez.</p>
              <br></br><br></br>

            <div className='corpo'>

                  {/* BOX 1 */}
                  <h2>Histórico de chamados</h2>
                  <br></br>

                      <p>Em <a href='https://hermezapi.vercel.app/funcionario/chats' target='_blank' rel='noreferrer'>'Histórico meus Chamados'</a> você pode consultar todos os chamados já abertos por você, 
                        os status deles e mensagens trocadas entre você e os funcionários, bem como enviar mensagens novas, caso o status permita.</p>

                  <br></br><br></br>

                  {/* BOX 3 */}
                  <h2>Iniciar um novo chamado</h2>
                  <br></br>
                  <p>É a ferramenta principal do sistema. Ao clicar em <a href='https://hermezapi.vercel.app/funcionario/realizar-chamado' target='_blank' rel='noreferrer'>Iniciar um novo chamado</a> e preencher os campos, o seu chamado será criado e o seu problema será resolvido por um técnico o mais rápido possível!</p>

                  <br></br><br></br>

                  {/* BOX 4 */}
                  <h2>Atender chamados</h2>
                  <br></br>
                  <p>É a segunda ferramenta mais importante do sistema. 
                    <a href='https://hermezapi.vercel.app/funcionario/atender-chamados' target='_blank' rel='noreferrer'>Aqui</a> você e administradores podem trabalhar nos chamados feitos pelos outros 
                    funcionários e também podem procurar por chamados específicos utilizando os filtros.</p>
                  <br></br>
                    
                    <ul>
                      <li>Iniciar chamado indica que o chamado foi visualizado e você estará trabalhando nele.
                          Clicar aqui irá redicionar o usuário para uma tela de chat, onde poderá se comunicar com o funcionário;
                      </li>
                      <br></br>
                      <li>Cancelar um chamado significa que ele não precisa e não será mais resolvido 
                          por algum motivo que o um tecnico, os administradores ou o funcionário julgarem melhor.</li>
                    </ul>

                    <br></br><br></br>

                    <h2>Entendendo os chamados</h2>
                  <br></br>

                  <h3>Prioridade</h3>
                  <br></br>
                  <p>A prioridade é uma informação presente em todos os chamados, que auxilía os técnicos a identificarem 
                    quais chamados precisam ser atendidos mais rapidamente e assim, focarem seus esforços no que é mais importante. 
                    É altamente aconselhável a resolver os chamados baseados em sua prioridade, mas é importante julgar cada 
                    caso individualemnte, para não criar gargalos no sistema. Por exemplo, se houver um chamado com prioridade urgente, 
                    com estimativa de conclusão para 5h, e um outro chamado com prioridade baixa e estivamativa de conclusão de 30 minutos, 
                    pode ser que valha a pena resolver o problema mais fácil primeiro, para que não se acumule tarefas.
                    Um outro bom exemplo é se seu chefe abrir um chamado, mesmo que seja 'baixa prioridade', 
                    talvez você o queira resolver rapidamente, antes de um urgente.</p>
                    <br></br>
                    <ol>
                      <li id='urgente'>Urgente</li>
                      <p>Sâo problemas que afetam o funcionamento da empresa como um todo, fazendo com que 2 ou mais setores sejam afetados, por exemplo.
                        <br></br>
                        Estimativa de conclusão: 8 horas.
                      </p>
                    <br></br>
                      <li id='alta'>Alta</li>
                      <p>Sâo problemas que afetam o funcionamento de um setor, inteiro ou parcialmente.
                      <br></br>
                        Estimativa de conclusão: 6 horas. 
                      </p>
                    <br></br>
                      <li id='media'>Média</li>
                      <p>Sâo problemas que afetam uma pequena quantidade de pessoas, mas não impacta diretamente num setor.
                      <br></br>
                        Estimativa de conclusão: 3 horas.
                      </p>
                    <br></br>
                      <li id='baixa'>Baixa</li>
                      <p>Sâo problemas que afetam somente uma pessoa e não tem impacto direto no setor.
                      <br></br>
                        Estimativa de conclusão: 1 hora e 30 minutos.
                      </p>
                    </ol>

                    <br></br><br></br>

                  <h3>Status</h3>
                  <br></br>
                  <p>Status também é uma informação presente em todos os chamados, que indica em que etapa de processamento e resolução o seu problema se encontra.</p>
                    <br></br>
                    <ol>
                      <li id='aberto'>Aberto</li>
                      <p>Indica um chamado que ainda nao foi atendido, ou seja, nenhum técnico está trabalhando nele.</p>
                    <br></br>
                      <li id='andamento'>Andamento</li>
                      <p>Indica um chamado que está sendo atendido por um técnico, que está sendo solucionado.</p>
                    <br></br>
                      <li id='concluido'>Concluído</li>
                      <p>Indica um chamado que teve seu problema solucionado com sucesso.</p>
                    <br></br>
                      <li id='reaberto'>Reaberto</li>
                      <p>Indica um chamado que não teve seu problema não foi solucionado com sucesso, mesmo após ter sido dado como 'concluído'.</p>
                    <br></br>
                      <li id='fechado'>Fechado</li>
                      <p>Indica um chamado que não pode mais ser reaberto, podendo ser dado como finalizado.</p>
                    <br></br>
                      <li id='cancelado'>Cancelado</li>
                      <p>Indica um chamado que em que uma das partes decidiu que não precisa mais ser trabalhado, seja o técnico, o administrador ou o próprio funcionário que tenha optado por isso.
                        Pode ser entendido como um problema que foi resolvido de outra forma.</p>
                    </ol>

            </div>

          </section>

        </main>
      </div>
    );
  } else if (cargo === '3') {
    // Manual para Administrador
    manualHTML = (
      <div className='manual'>
        <header>
          <h1>Manual do Usuário</h1>
        </header>

        <br></br><br></br>

        <main>
          <section>
            <h2>Introdução</h2>
            <br></br>
              <p>Bem-vindo ao manual do administrador para o Sistema de Gerenciamento de Chamados: Hermez. 
                Este manual fornecerá informações detalhadas sobre como usar o site de maneira eficaz.</p>
          </section>

          <br></br><br></br>

          <section>
            <h2>Como Usar</h2>
            <br></br>
            <p>O segmento à seguir fornecerá informações e instruções sobre as funcionalidades do sistema Hermez.</p>
              <br></br><br></br>

            <div className='corpo'>

                  {/* BOX 1 */}
                  <h2>Visualizar chamados</h2>
                  <br></br>

                    <ol>
                      <li>Em 'Gerar Relatórios' você pode criar relatórios a respeito dos chamados na sua empresa, como por exemplo:</li>
                      <br></br>
                        <ol>
                          <ul>
                            <li>Relatórios de Prioridade: número de chamados com cada nível de prioridade;</li>
                            <br></br>
                            <li>Relatórios por Status: número de chamados com cada tipo de status.</li>
                          </ul>
                        </ol> 
                        <br></br>  
                      <li>Em <a href='https://hermezapi.vercel.app/funcionario/chats' target='_blank' rel='noreferrer'>'Histórico meus Chamados'</a> você pode consultar todos os chamados já abertos por você, 
                        os status deles e mensagens trocadas entre você e o técnico, bem como enviar mensagens novas, caso o status permita.</li>
                    </ol>

                  <br></br><br></br>

                  {/* BOX 2 */}
                  <h2>Gerênciar usuários</h2>
                  <br></br>
                    <ol>
                      <li><a href='https://hermezapi.vercel.app/funcionario/cadastrar-usuario' target='_blank' rel='noreferrer'>Cadastrar usuários:</a> aqui você pode cadastrar novos usuários na sua empresa;</li>
                      <br></br>
                      <li><a href='https://hermezapi.vercel.app/funcionario/lista-funcionarios' target='_blank' rel='noreferrer'>Alterar dados usuários:</a> aqui você pode alterar os dados dos funcinários abaixo de você, como senha, email, etc.</li>
                    </ol>

                  <br></br><br></br>

                  {/* BOX 3 */}
                  <h2>Iniciar um novo chamado</h2>
                  <br></br>
                  <p>É a ferramenta principal do sistema. Ao clicar em <a href='https://hermezapi.vercel.app/funcionario/realizar-chamado' target='_blank' rel='noreferrer'>Iniciar um novo chamado</a> e preencher os campos, o seu chamado será criado e o seu problema será resolvido por um técnico o mais rápido possível!</p>

                  <br></br><br></br>

                  {/* BOX 4 */}
                  <h2>Atender chamados</h2>
                  <br></br>
                  <p>É a segunda ferramenta mais importante do sistema. 
                    <a href='https://hermezapi.vercel.app/funcionario/atender-chamados' target='_blank' rel='noreferrer'>Aqui</a> os técnicos e administradores podem trabalhar nos chamados feitos pelos outros 
                    funcionários e também podem procurar por chamados específicos utilizando os filtros.</p>
                  <br></br>
                    
                    <ul>
                      <li>Iniciar chamado indica que o chamado foi visualizado e está sendo resolvido por um técnico.
                          Clicar aqui irá redicionar o usuário para uma tela de chat, onde o técnico poderá se comunicar com o funcionário;
                      </li>
                      <br></br>
                      <li>Cancelar um chamado significa que ele não precisa e não será mais resolvido 
                          por algum motivo que o técnico, os administradores ou o funcionário achar melhor.</li>
                    </ul>

                    <br></br><br></br>

                  <h2>Entendendo os chamados</h2>
                  <br></br>

                  <h3>Prioridade</h3>
                  <br></br>
                  <p>A prioridade é uma informação presente em todos os chamados, que auxilía os técnicos a identificarem 
                    quais chamados precisam ser atendidos mais rapidamente e assim, focarem seus esforços no que é mais importante. 
                    É altamente aconselhável a resolver os chamados baseados em sua prioridade, mas é importante julgar cada 
                    caso individualemnte, para não criar gargalos no sistema. Por exemplo, se houver um chamado com prioridade urgente, 
                    com estimativa de conclusão para 5h, e um outro chamado com prioridade baixa e estivamativa de conclusão de 30 minutos, 
                    pode ser que valha a pena resolver o problema mais fácil primeiro, para que não se acumule tarefas.
                    Um outro bom exemplo é se seu chefe abrir um chamado, mesmo que seja 'baixa prioridade', 
                    talvez você o queira resolver rapidamente, antes de um urgente.</p>
                    <br></br>
                    <ol>
                      <li id='urgente'>Urgente</li>
                      <p>Sâo problemas que afetam o funcionamento da empresa como um todo, fazendo com que 2 ou mais setores sejam afetados, por exemplo.
                        <br></br>
                        Estimativa de conclusão: 8 horas.
                      </p>
                    <br></br>
                      <li id='alta'>Alta</li>
                      <p>Sâo problemas que afetam o funcionamento de um setor, inteiro ou parcialmente.
                      <br></br>
                        Estimativa de conclusão: 6 horas. 
                      </p>
                    <br></br>
                      <li id='media'>Média</li>
                      <p>Sâo problemas que afetam uma pequena quantidade de pessoas, mas não impacta diretamente num setor.
                      <br></br>
                        Estimativa de conclusão: 3 horas.
                      </p>
                    <br></br>
                      <li id='baixa'>Baixa</li>
                      <p>Sâo problemas que afetam somente uma pessoa e não tem impacto direto no setor.
                      <br></br>
                        Estimativa de conclusão: 1 hora e 30 minutos.
                      </p>
                    </ol>

                    <br></br><br></br>

                  <h3>Status</h3>
                  <br></br>
                  <p>Status também é uma informação presente em todos os chamados, que indica em que etapa de processamento e resolução o seu problema se encontra.</p>
                    <br></br>
                    <ol>
                      <li id='aberto'>Aberto</li>
                      <p>Indica um chamado que ainda nao foi atendido, ou seja, nenhum técnico está trabalhando nele.</p>
                    <br></br>
                      <li id='andamento'>Andamento</li>
                      <p>Indica um chamado que está sendo atendido por um técnico, que está sendo solucionado.</p>
                    <br></br>
                      <li id='concluido'>Concluído</li>
                      <p>Indica um chamado que teve seu problema solucionado com sucesso.</p>
                    <br></br>
                      <li id='reaberto'>Reaberto</li>
                      <p>Indica um chamado que não teve seu problema não foi solucionado com sucesso, mesmo após ter sido dado como 'concluído'.</p>
                    <br></br>
                      <li id='fechado'>Fechado</li>
                      <p>Indica um chamado que não pode mais ser reaberto, podendo ser dado como finalizado.</p>
                    <br></br>
                      <li id='cancelado'>Cancelado</li>
                      <p>Indica um chamado que em que uma das partes decidiu que não precisa mais ser trabalhado, seja o técnico, o administrador ou o próprio funcionário que tenha optado por isso.
                        Pode ser entendido como um problema que foi resolvido de outra forma.</p>
                    </ol>

            </div>

          </section>

        </main>
      </div>
    );
  }
  

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
          <Link className='botoesHome grande' to="chats">
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

      {manualHTML}
      
    </>
  );
}
