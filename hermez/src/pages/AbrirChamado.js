import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/FormsPadrao.css';
import fechar from '../img/fechar.svg';
import UploadArquivo from '../components/UploadArquivo';
export default function AbrirChamado() {
    const [nome, setNome] = useState(localStorage.getItem("nome"));
    const [titulo, setTitulo] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0)
    const [arquivoImportado, setArquivoImportado] = useState(   );
    const [erroSenha, setErro] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        if (tipo===0){
            setErro('Insira um tipo');
        }
        else{
            setErro('');
            console.log('dados formulario:  ', descricao)

            fetch(process.env.REACT_APP_URL_CHAMADO_CADASTRO, {
                method:'POST',
                body: JSON.stringify({
                    nome: nome,
                    desc: descricao,
                    local: local,
                    titulo: titulo,
                    image: arquivoImportado,
                    codFun: localStorage.getItem("fun_cod"),
                    codEmp: localStorage.getItem("emp_cod"),
                    serv: tipo
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then(response => {
                if(response.status === 200){
                    localStorage.setItem("novoPopup", 'Criação do chamado');
                    window.location.href = '../funcionario'
                }
                else{
                    (response.json()).then(data => {
                        setErro(data.msg)
                    })
                }
            })
        }
    }


    return (
        <>
            <div className='divFormPadrao'>
                <form className='formPadrao' onSubmit={submitForm}>
                    <Link to='../' className='botaoFecharFormPadrao'>
                        <img src={fechar} alt='Fechar formulário' />
                    </Link>
                    <h1>Nos conte seu problema</h1>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor='nome'>NOME</label>
                            <input
                                className="inputFormPadrao"
                                disabled
                                id='nome'
                                name="nome"
                                value={nome}
                                required
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome"
                                type='text'
                            />
                        </div>
                        <div>
                            <label htmlFor='tituloChamado'>TÍTULO</label>
                            <input
                                className="inputFormPadrao"
                                id='tituloChamado'
                                maxLength='72'
                                name='tituloChamado'
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder='Título'
                                type='text'
                                required
                                value={titulo}
                            />
                        </div>
                    </div>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor='localChamado'>
                            LOCALIZAÇÃO DO APARELHO
                        </label>
                        <input
                            className="inputFormPadrao"
                            id='localChamado'
                            maxLength='20'
                            name='localChamado'
                            onChange={(e) => setLocal(e.target.value)}
                            placeholder='Localização'
                            type='text'
                            required
                            value={local}
                        />
                    </div>
                    <div className='divDuasColunasFormPadrao'>
                        <div>
                            <label htmlFor='tipo'>TIPO</label>
                            <select
                                className="selectFormPadrao"
                                id="cargoCadastro"
                                name='cargo'
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option
                                    value="0"
                                    style={{display: 'none'}}
                                >
                                    Selecione
                                </option>
                                <option value="manuntenção de cpu">Manuntenção de Cpu</option>
                                <option value="Consertar sua Placa-mãe">Consertar sua Placa-mãe</option>
                                <option value="reestabelecer internet">Reestabelecer Internet</option>
                                <option value="computador quebrou">Computador Quebrou</option>
                                <option value="computador lento">Computador Lento</option>
                                <option value="Outros.">Outros</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor='imagemChamado'>
                                IMAGEM DO PROBLEMA
                            </label>
                            <UploadArquivo
                                id='imagemChamado'
                                name='imagemChamado'
                                onFileSelect={(arquivo) => setArquivoImportado(arquivo)}
                            />
                        </div>
                    </div>
                    <div className='divUmaColunaFormPadrao'>
                            <label htmlFor='descricao'>DESCRIÇÃO</label>
                            <textarea
                                className="textareaFormPadrao"
                                id="descricao"
                                maxLength='690'
                                name="descricao"
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descrição"
                                type='text'
                                required
                                value={descricao}
                            />
                    </div>
                    <div className='divBotaoEnviar'>
                        <input
                            id="abrindoChamado"
                            type='submit'
                            value='Enviar'
                        />
                    </div>
                    {erroSenha && <p className="erro">{erroSenha}</p>}
                </form>
            </div>
        </>
    )
}