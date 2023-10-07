import React, { useContext } from 'react';
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';


export default function Navbar() {

    let {userToken , setUserToken} = useContext(UserContext);

    let {cartNum} = useContext(CartContext);

    let navigate = useNavigate();


    function logout(){

        localStorage.removeItem('token');

        setUserToken(null);

        navigate('/login');
    }

    return <>

<nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 start-0 end-0 z-3">

    <div className="container-fluid">

        <div className="">
        <i className='fa-solid fa-cart-shopping fs-2 text-success me-2'></i>

        <span className="navbar-brand text-success fw-bold fs-3">FreshCart</span>
        </div>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">

            {userToken !=null ? <>
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"home"}>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"cart"}>Cart</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"wishlist"}>Wish List</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"product"}>Products</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"category"}>Categories</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"brand"}>Brands</NavLink>
                </li>
            </ul>
            </> : ''}


            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">

            {userToken !=null ? <>
                <li className="nav-item">
                    <div className="d-flex">
                        <NavLink className={({isActive}) => isActive === true? "nav-link position-relative me-1 text-black " : "nav-link position-relative me-1 not-active "} to={"cart"}>
                            <i className='fa-solid fa-cart-shopping fs-3'></i>
                            <span class="position-absolute top-75 start-100 translate-middle badge rounded-pill bg-success">
                                {cartNum <= 99 ? cartNum : "99+"}
                            </span>
                            </NavLink>

                        <span onClick={logout} className={"nav-link log-out"}>Logout</span>
                    </div>
                </li>
            </> : <>
            <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"register"}>Register</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className={({isActive}) => isActive === true? "nav-link text-black " : "nav-link not-active "} to={"login"}>Login</NavLink>
                </li>
            </>}

            </ul>

        </div>

    </div>

</nav>

    </>
}
