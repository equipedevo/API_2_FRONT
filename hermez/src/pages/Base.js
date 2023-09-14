import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import './css/Base.css';

export default function Home(){
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}