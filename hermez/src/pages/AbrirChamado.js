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
    const [erroSenha, setErro] = useState('');
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('desc', descricao);
    formData.append('local', local);
    formData.append('titulo', titulo);
    formData.append('serv', tipo);
    formData.append('fun_cod', localStorage.getItem("fun_cod"));
    formData.append('emp_cod', localStorage.getItem("emp_cod"));
    console.log(formData);

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
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors'
            }).then(response => {
                if(response.status === 200){
                    alert('Chamado feito com sucesso')
                    window.location.href = '../funcionario'
                }
                else{
                    (response.json()).then(data => {
                        console.log(data.msg)
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
                            <label htmlFor='titulo'>TÍTULO</label>
                            <input
                                className="inputFormPadrao"
                                placeholder='Título'
                                id='titulo'
                                name='titulo'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor='local'>
                            LOCALIZAÇÃO DO APARELHO
                            <span> (Opcional)</span>
                        </label>
                        <input
                            className="inputFormPadrao"
                            placeholder='Localização'
                            id='local'
                            name='local'
                            value={local}
                            onChange={(e) => setLocal(e.target.value)}
                            type='text'
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
                            <label htmlFor='arquivo'>INSIRA UMA IMAGEM</label>
                            <UploadArquivo onFileSelect={(file) => {formData.append('imagem', file)}} />
                        </div>
                    </div>
                    <div className='divUmaColunaFormPadrao'>
                        <label htmlFor='descricao'>DESCRIÇÃO</label>
                        <textarea
                            className="textareaFormPadrao"
                            placeholder="Descrição"
                            id="descricao"
                            name="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>
                    <div className='divBotaoEnviar'>
                        <input
                            id="abrindoChamado"
                            type='submit'
                            value='Enviar'
                        />
                    </div>
                    {erroSenha &&    <p className="erro">{erroSenha}</p>}
                </form>
            </div>
        </>
    )

}