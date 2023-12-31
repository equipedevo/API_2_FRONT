import { Outlet } from 'react-router-dom'

import Popup from '../components/Popup'
import Header from '../components/HeaderEmpresa'
import Footer from '../components/Footer'

export default function Home(){
    if (localStorage.getItem('emp_cod') === null || localStorage.getItem('fun_cod') !== null) {
        window.location.href = '../empresa/login'
    }
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Popup />
        </>
    );
}