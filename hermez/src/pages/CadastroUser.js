import './css/CadastroUser.css';
import { useState } from 'react';
import './CadastroEmpresa';

export default function CadastroUser() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const [email, setEmail] = useState('');
    const [vinculo, setVinculo] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [setor, setSetor] = useState('');
    const [cargo, setCargo] = useState('');

    // Função para formatar telefone
    function formatPhoneNumber(phone, id) {
        phone = phone.replace(/\D/g, '');
    
        if (document.getElementById(id).maxLength === 10) {
            phone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        else if (document.getElementById(id).maxLength === 11) {
            phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    
        return phone;
    }
    
    function handleTelefoneChange(event) {
        const inputTelefone = event.target.value;
        const formattedTelefone = formatPhoneNumber(inputTelefone, "telefoneCadastro")
        setTelefone (formattedTelefone);
    }

    function handleCelularChange(event) {
        const inputCelular = event.target.value;
        const formattedCelular = formatPhoneNumber(inputCelular, "celularCadastro")
        setCelular(formattedCelular);
    }

    function handleNomeCompletoChange(event) {
        const nome = event.target.value;
        setNomeCompleto(nome);
    }
    
    function handleEmailChange(event) {
        const email = event.target.value;
        setEmail(email);
    }

    function handleVinculoChange(event) {
        const vinculo = event.target.value;
        setVinculo(vinculo);
    }

    function handleSetorChange(event) {
        const setor = event.target.value;
        setSetor(setor);
    }

    function handleCargoChange(event) {
        const cargo = event.target.value;
        setCargo(cargo);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const criterioDeAceitacao = (
            senha.length >= 8 &&
            /[A-Z]/.test(senha) &&
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(senha) &&
            /\d/.test(senha)
        );
        if (senha !== senhaConfirmada) {
            setErro('As senhas não coincidem.');
        }
        else if(!criterioDeAceitacao){
            setErro(`Crie uma senha com no mínimo 8 caracteres, tendo pelo menos: 1 número; 1 letra maiúscula; 1 caracter especial;`);
        }
        else {
            setErro('');
            fetch("https:hermezapi-backvercelappfuncionariocadastro", {
                method:'POST',
                body: JSON.stringify({
                    nome: nomeCompleto,
                    email: email,
                    celular: celular,
                    senha: senha,
                    cargo: cargo,
                    // emp_cod: razaoSocial,
                    // funcao: funcao                                      
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then(response => {
                if(response.status === 200) {
                    console.log('Sucesso')
                }
                else {
                    (response.json()).then(data => {
                        console.log(data.msg)
                    });
                }
            });
        }
    };
    return (
        <>
            <body className='bodyCadastro'>
                <form className='formUserCadastro'>
                    <h1> Cadastrar novo usuário</h1>
                    <span htmlFor="nomeCompleto">NOME COMPLETO</span>
                    <input
                        id="nomeCompleto"
                        name='nomeCompleto'
                        onChange={handleNomeCompletoChange}
                        value={nomeCompleto}
                        placeholder='Nome'
                        required
                        type="text"
                    />
                    <div className='div2ColunasFormCadastro'>
                        <div>
                            <span htmlFor="senha">SENHA</span>
                            <input
                                id="senha"
                                name='senha'
                                onChange={(e) => setSenha(e.target.value)}
                                value={senha}
                                placeholder='Senha'
                                required
                                type="password"
                            />
                        </div>
                        <div>
                            <span htmlFor="senhaConfirmada">CONFIRMAR SENHA</span>
                            <input
                                id="senhaConfirmada"
                                name='senhaConfirmada'
                                onChange={(e) => setSenhaConfirmada(e.target.value)}
                                value={senhaConfirmada}
                                placeholder='Senha'
                                required
                                type="password"
                            />
                        </div>
                    </div>


                    <div className='div2ColunasFormCadastro'>

                        <div>
                            <span for="email">E-MAIL</span>
                            <input
                                id="email"
                                name='email'
                                value={email}
                                onChange={handleEmailChange}
                                placeholder='E-mail'
                                required
                                type="email"
                            />
                        </div>

                        <div>
                            <span htmlFor="vinculo">
                                VÍNCULO COM A EMPRESA
                                <span className='opcional'> (Opcional)</span>
                            </span>
                            <input
                                id="vinculoCadastro"
                                name='vinculo'
                                value={vinculo}
                                onChange={handleVinculoChange}
                                placeholder='Vínculo'
                                required
                                type="text"
                            />
                        </div>
                    </div>


                    <div className='div2ColunasFormCadastro'>

                    <div>
                        <span htmlFor="telefone">TELEFONE</span>
                        <input
                            autoComplete="off"
                            id="telefoneCadastro"
                            maxLength="10"
                            name='telefoneCadastro'
                            onChange={handleTelefoneChange}
                            value={telefone}
                            placeholder='Telefone'
                            required
                            type="text"
                        />
                    </div>

                    <div>
                        <span htmlFor="celular">CELULAR</span>
                        <input
                            autoComplete="off"
                            id="celularCadastro"
                            maxLength="11"
                            name='celularCadastro'
                            onChange={handleCelularChange}
                            value={celular}
                            placeholder='Celular'
                            required
                            type="text"
                        />
                    </div>

                </div>  

                    
                    <div className='div2ColunasFormCadastro'>

                        <div>
                            <span htmlFor="setor">
                                SETOR
                                <span className='opcional'> (Opcional)</span>
                            </span>
                            <input
                                id="setorCadastro"
                                name='setor'
                                value={setor}
                                onChange={handleSetorChange}
                                placeholder='Setor'
                                type="text"
                            />
                        </div>
                        
                        <div>
                            <span htmlFor="cargo">CARGO</span>
                            <select id="cargoCadastro" name='cargo'>
                                <option value="Funcionário">Cargo</option>
                                <option value="Funcionário">Funcionário</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                    </div>
                    <div className='divEnviarCadastro'>
                        <input
                            id="cadastrandoFuncionario"
                            value='Cadastrar'
                            type='submit'
                        />
                    </div>
                </form>
            </body>
        </>
    );
}