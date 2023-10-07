import React from 'react';
import style from "./Layout.module.css";
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import { Offline } from 'react-detect-offline';


export default function Layout() {

    let {setUserToken} = useContext(UserContext);

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {

            setUserToken(localStorage.getItem('token'));

        }

    });


    return <>

        <Navbar/>

        <div className='mt-5 mb-5 opacity-0 text-white'>0</div>

        <Outlet/>

        <Offline>
            <div className='bg-danger position-fixed start-0 bottom-0 p-2 m-2 shadow-lg border border-1'>please connect network</div>
        </Offline>


        <Toaster/>

    </>
}
