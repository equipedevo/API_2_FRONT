import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import './css/Base.css';

export default function Home(){
    // if (localStorage.getItem('emp_cod') === null || localStorage.getItem('fun_cod') === null) {
    //     window.location.href = '/'
    // }
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}