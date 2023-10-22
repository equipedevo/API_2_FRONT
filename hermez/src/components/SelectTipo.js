import './css/Select.css';
import down from '../img/arrow-down.png';
import up from '../img/arrow-up.png';

export default function SelectTipo() {
    let selectedValue = document.getElementById('selected-value'),
        inputsOptions = document.querySelectorAll('.option input');

    if (inputsOptions.name == 'category'){
        inputsOptions.addEventListener('click', () => {
            selectedValue.textContent = inputsOptions.dataset.label
            console.log('*** input', inputsOptions.value)
        })
    }



    return (
        <>
            <div id="category-select">
                <label for='tipo'>TIPO</label>
                <input type="checkbox" id="tipo" />


                <div id="select-button">
                    <div id="selected-value">Selecione a categoria</div>

                    <div id="arrows">
                        <img src={down} className="down"></img>
                        <img src={up} className="up"></img>
                    </div>
                </div>
            </div>

            <ul id="options">
                <li className="option">
                    <input 
                        type="radio"
                        name="category"
                        value='1'
                        data-label="Hardware"
                    />

                    <span className="label">Hardware</span>
                </li>


                <li className="option">
                    <input 
                        type="radio"
                        name="category"
                        value='2'
                        data-label="Software"
                    />

                    <span className="label">Software</span>
                </li>
            </ul>
        </>
    )
}