import { useEffect, useState } from "react";
import './css/PopUpCadastro.css';

export default function Popup() {
    const [popUpSucesso, setCadastroSucesso] = useState(false);
    const [conteudoPopup, setConteudoPopup] = useState(null);
    useEffect(() => {
        const valorLocalStorage = localStorage.getItem("novoPopup");
        if (["Cadastro da empresa", "Cadastro do funcionário", "Criação do chamado"].includes(valorLocalStorage)) {
            setConteudoPopup(valorLocalStorage);
            setCadastroSucesso(true);
            localStorage.removeItem("novoPopup");
        }
    }, []);
    return (
        <>
            {popUpSucesso && conteudoPopup !== null &&
                <div className="popUpCadastroComSucesso">
                    <div>
                        <span onClick={() => setCadastroSucesso(false)}>&times;</span>
                        <p>{conteudoPopup} realizado com sucesso!</p>
                    </div>
                </div>
            }
        </>
    )
}   