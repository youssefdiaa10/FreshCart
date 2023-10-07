import React, { useContext } from 'react';
import style from "./Login.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {ThreeDots} from 'react-loader-spinner';
import { UserContext } from '../Context/UserContext';
import { Helmet } from 'react-helmet';



export default function Login() {

    let [error , setError] = useState('');


    let [loading , setLoading] = useState(false);


    let {userToken , setUserToken} = useContext(UserContext);


    let user = {
        email : '',
        password : '',
    }

    let valid = Yup.object({
        email : Yup.string().required("Email Required").email('Email pattern is Invalid'),
        password : Yup.string().required("Password Required").matches(/^[a-zA-Z][a-zA-Z0-9]{6,9}$/),
    });


        let navigate = useNavigate();


    async function submitForm(value) {

        setLoading(true);

        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , value).catch((error) => {

                    console.log(error);

                    setError(error.response.data.message);

                    setLoading(false);
        });

        if (data.message === 'success') {

            localStorage.setItem("token" , data.token);

            // setUserToken(localStorage.getItem("token"));

            setUserToken(data.token);


            setLoading(false);

            navigate('/home');

        }
    }


    let formik = useFormik({

        initialValues : user,

        onSubmit : submitForm,

        validationSchema : valid,
    });



    return <>
                {/* {console.log(formik)} */}

                <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>



        <div className="container mt-5">


            {error ? <div className="alert alert-danger">{error}</div> : ''}



            <h3>Login</h3>



            <form className='d-flex flex-column' onSubmit={formik.handleSubmit}>




                <label className='mt-4 mb-2 ' htmlFor="email">Email :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' id='email' className='form-control mb-2'/>
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : ''}




                <label className='mt-4 mb-2 ' htmlFor="password">Password :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' id='password' className='form-control mb-2'/>
                {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : ''}




                <div className="w-100 d-flex justify-content-between mt-4 ">
                    <Link to={'/forgetPassword'}>Forget Password</Link>


                    <button type="submit" className='btn btn-success py-2 px-4 fs-4' disabled={!(formik.isValid && formik.dirty)}>Login</button>
                </div>



        {loading ?  <div className="d-flex justify-content-center align-content-center position-absolute top-0 start-0 end-0 bottom-0 ">
            <button type='button' className='btn'>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
            </button>
        </div> : ''}



            </form>

        </div>

    </>
}
