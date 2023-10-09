import React, {useRef} from "react"
import './css/UploadArquivo.css'

export default function UploadArquivo(onFileSelect){
    const fileInput = useRef(null)
    const handleFileInput = (e) => {
        onFileSelect(e.target.value.files[0])
    }

    return (
        <div className="arquivo">
            <input type='file' onChange={handleFileInput} />
            <label
                className="botao-upload"
                onClick={e => fileInput.current && fileInput.current.click()}
            >
                Anexe seu arquivo
            </label>
        </div>
    )
}