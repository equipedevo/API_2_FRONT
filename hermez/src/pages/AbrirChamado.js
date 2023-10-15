import { useState } from 'react';
import { Link } from 'react-router-dom'
import './css/AbrirChamado.css';
import fechar from '../img/fechar.svg';
import UploadArquivo from '../components/UploadArquivo';


export default function AbrirChamado() {
    const [nome, setNome] = useState(localStorage.getItem("nome"));
    const [titulo, setTitulo] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null);


    
    const submitForm = (e) => {
        e.preventDefault();
        console.log('dados formulario:  ', descricao)

        fetch("https://hermezapi-back.vercel.app/chamado/cadastro?dev=true", {
            method:'POST',
            body: JSON.stringify({
                nome: nome,
                desc: descricao,
                local: local,
                titulo: titulo,
                codFun: localStorage.getItem("fun_cod"),
                codEmp: localStorage.getItem("emp_cod")
                //imagem: img
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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


    return (
        <>
            <body>
                <form className='formAbrirChamado' onSubmit={submitForm}>
                    <Link to='/' className='img'>
                        <img src={fechar} alt='Fechar formulário' />
                    </Link>
                    <h1>Nos conte seu problema</h1>

                    <div className='coluna'>
                        <div className='campo'>
                            <label for='nome'>NOME</label>
                            <input
                                type='text'
                                placeholder="Nome"
                                id='nome'
                                name="nome"
                                value={nome}
                                required
                                disabled
                            />
                        </div>

                        <div className='campo'>
                            <label for='titulo'>TÍTULO</label>
                            <input
                                type='text'
                                placeholder='Título'
                                id='titulo'
                                name='titulo'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='linha'>
                        <div className='campo'>
                            <label for='local'>LOCALIZAÇÃO DO APARELHO <span>(Opcional)</span>
                            </label>
                            <input
                                type='text'
                                placeholder='Localização'
                                id='local'
                                name='local'
                                value={local}
                                onChange={(e) => setLocal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='coluna component'>
                        <div className='select campo'>
                            <label>TIPO:</label>
                            <select className='tipo' value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                <option value={''} selected hidden>Selecione</option>
                                <option value={'Hardware'}>Hardware</option>
                                <option value={'Sofware'}>Software</option>
                            </select>
                        </div>

                        <div className='file campo'>
                            <UploadArquivo
                                onFileSelect={(file) => setSelectedFile(file)}
                            />
                        </div>
                    </div>

                    <div className='linha'>
                        <div className='campo'>
                            <label for='descricao'>DESCRIÇÃO</label>
                            <textarea
                                placeholder="Descrição"
                                id="descricao"
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='enviar'
                    >
                        Enviar
                    </button>
                </form>
            </body>
        </>
    )

}