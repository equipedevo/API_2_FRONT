import './css/AbrirChamado.css';
import fechar from '../img/fechar.svg';
import './js/mudarNome.js'

export default function AbrirChamado(){
    return(
        <>
            <body>
                <form className='formAbrirChamado' action='#'>
                    <img src={fechar} alt='X'/>
                    <h1>Nos conte seu problema</h1>

                    <div className='coluna'>
                        <div>
                            <label for='nome'>NOME</label>
                            <input 
                                type='text'
                                placeholder="Nome"
                                id='nome'
                                name="nome"
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
                            <select form='formAbrirChamado' id="tipo" required>
                                <option value='select'>Selecione</option>
                                <option value='1'>Hardware</option>
                                <option value='2'>Software</option>
                            </select>
                        </div>
                        
                        <div className='arquivo'>
                            <label for='arquivo' className='nomeArquivo'>Anexe o seu arquivo</label>
                            <input type="file" id='arquivo' name='meuArquivo'/>
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

                    <input className='enviar' type='submit' value='Enviar' />
                </form>
            </body>
        </>
    )

}