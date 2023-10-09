import React, {useRef} from "react"
import './css/UploadArquivo.css'

export default function UploadArquivo({onFileSelect}){
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        const fileuploaded = e.target.files[0];
        document.getElementById('arquivo').textContent = e.target.files[0].name;
        onFileSelect(fileuploaded)
    }

    return (
        <div className="arquivo">
            <input 
                type='file' 
                onChange={handleFileInput}
                ref={fileInput}
            />

            <label
                id='arquivo'
                for='arquivo'
                className="botao-upload"
                onClick={e => fileInput.current && fileInput.current.click()}
        
            >
                Anexe seu arquivo
            </label>
        </div>
    )
}