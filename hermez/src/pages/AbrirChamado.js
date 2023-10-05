
export default function AbrirChamado(){
    return(
        <>
            <body>
                <forms className='formAbrirChamado' action='#'>
                    <img />
                    <h1>Nos conte seu problema</h1>

                    <div className='linha'>
                        <span for='nome'>NOME</span>
                        <input 
                            type='text'
                            placeholder="Nome"
                            id='nome'
                            name="nome"
                            required
                        />

                        <span for='titulo'>TÍTULO</span>
                        <input 
                            type='text'
                            placeholder='Título'
                            id='titulo'
                            name='titulo'
                            required
                        />
                    </div>

                    <span for='local'>LOCALIZAÇÃO DO APARELHO<p>(Opcional)</p>
                    </span>
                    <input 
                        type='text'
                        placeholder='Localização'
                        id='local'
                        name='local'
                    />

                    <div className='linha'>
                        <span for='tipo'>TIPO</span>
                        <select form='formAbrirChamado' name="tipo" selected='Selecione' required>
                            <option value='select'>Selecione</option>
                            <option value='1'>Hardware</option>
                            <option value='2'>Software</option>
                        </select>

                        <input type="file" id='arquivo' name='meuArquivo'/>
                    </div>

                    <span for='mensagem'>MENSAGEM</span>
                    <textarea 
                        placeholder="Mensagem"
                        id="mensagem"
                        name="mensagem"
                        required
                    />

                    <input type='submit' value='Enviar' />
                </forms>
            </body>
        </>
    )

}