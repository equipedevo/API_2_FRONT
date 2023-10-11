import React from "react";
import './css/Select.css';
import down from '../img/arrow-down.png';
import up from '../img/arrow-up.png';

export default function Select() {
    let select = document.querySelector('.select'),
        selectedValue = document.getElementById('selected-value'),
        tipo = document.getElementById('tipo'),
        inputsOptions = document.querySelectorAll('.option input');

    inputsOptions.forEach(input => {
        input.addEventListener('click', (e) => {
            selectedValue.textContent = input.dataset.label        
        })
    });



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