import { useState } from 'react';
import './css/AbrirChamado.css';
import fechar from '../img/fechar.svg';
import UploadArquivo from '../components/UploadArquivo';


export default function AbrirChamado(){
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const submitForm = () => {
        const formData =new FormData();
        formData.append("name", name);
        formData.append("file", selectedFile);
    }


    return(
        <>
            <body>
                <form className='formAbrirChamado' >
                    <img src={fechar} alt='Fechar formulário'/>
                    <h1>Nos conte seu problema</h1>

                    <div className='coluna'>
                        <div>
                            <label for='nome'>NOME</label>
                            <input 
                                type='text'
                                placeholder="Nome"
                                id='nome'
                                name="nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label for='titulo'>TÍTULO</label>
                            <input 
                                type='text'
                                placeholder='Título'
                                id='titulo'
                                name='titulo'
                                required
                            />
                        </div>
                    </div>

                    <div className='linha'>
                        <label for='local'>LOCALIZAÇÃO DO APARELHO <span>(Opcional)</span>
                        </label>
                        <input 
                            type='text'
                            placeholder='Localização'
                            id='local'
                            name='local'
                        />
                    </div>

                    <div className='coluna'>
                        <div>
                            <label for='tipo'>TIPO</label>
                            <select id="tipo" name="tipo" required>
                                <option selected style={{display: 'none'}}>Selecione</option>
                                <option value='1'>Hardware</option>
                                <option value='2'>Software</option>
                            </select>
                        </div>
                        
                        <div className='file'>
                            <UploadArquivo 
                                onFileSelect={(file) => setSelectedFile(file)}    
                            />
                        </div>
                    </div>

                    <div className='linha'>
                        <label for='descricao'>DESCRIÇÃO</label>
                        <textarea 
                            placeholder="Descrição"
                            id="descricao"
                            name="descricao"
                            required
                        />
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