import {useRef} from "react"
import './css/UploadArquivo.css'

export default function UploadArquivo({onFileSelect}){
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        const fileuploaded = e.target.files[0];
        document.getElementById('botaoInputArquivo').textContent = e.target.files[0].name;
        onFileSelect(fileuploaded)
        console.log(fileuploaded)
    }

    return (
        <div className="divInputArquivo">
            <input
                onChange={handleFileInput}
                ref={fileInput}
                
                type='file' 
            />

            <label
                id='botaoInputArquivo'
                htmlFor='textoarquivo'
                className="botaoInputArquivo"
                onClick={e => fileInput.current && fileInput.current.click(e)}
            >
                Anexe seu arquivo
            </label>
        </div>
    )
}