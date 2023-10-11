import { useState } from 'react';
import './css/AbrirChamado.css';
import fechar from '../img/fechar.svg';
import UploadArquivo from '../components/UploadArquivo';
import Select from '../components/Select';


export default function AbrirChamado() {
    const [nome, setNome] = useState("");
    const [titulo, setTitulo] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);


    const submitForm = () => {
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("titulo", titulo);
        formData.append("local", local);
        formData.append("descricao", descricao);

        formData.append("file", selectedFile);

        // axios
        //     .post("url", formData)
        //     .then((res) => {
        //         alert("File upload success");
        //     })
        //     .catch((err) => alert("File upload error"));
    }


    return (
        <>
            <body>
                <form className='formAbrirChamado' >
                    <img src={fechar} alt='Fechar formulário' />
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
                                onChange={(e) => setNome(e.target.value)}
                                required
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
                            <Select></Select>
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
                        onClick={submitForm}
                    >
                        Enviar
                    </button>
                </form>
            </body>
        </>
    )

}