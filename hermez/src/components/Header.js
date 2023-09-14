import { Link } from 'react-router-dom'

import './css/Header.css'

export default function Header(){
    return (
        <>
            <header>
                <h1>HEADER</h1>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/cadastro">Cadastro</Link>
                    <Link to="/login">Login</Link>
                </div>
            </header>
        </>
    );
}