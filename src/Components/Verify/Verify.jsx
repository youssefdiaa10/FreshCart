import React from 'react';
import style from "./Verify.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {ThreeDots} from 'react-loader-spinner';
import { UserContext } from '../Context/UserContext';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';

export default function Verify() {

    let [error , setError] = useState('');

    let [check , setCheck] = useState('');


    let {userToken , setUserToken} = useContext(UserContext);


    let user = {
        code : '',
    }

        let navigate = useNavigate();


    async function submitForm(value) {

        setCheck(value);

        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , value).catch((error) => {

                    console.log(error);

                    setError(error.response.data.message);

        });

        // if (data.statusMsg === 'success') {

        //     navigate('/verify');

        // }
    }


    let valid = Yup.object({
        code : Yup.string().required("Code Required").oneOf([check]),
    });


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



            <h3>Please Enter your validation code</h3>



            <form className='d-flex flex-column' onSubmit={formik.handleSubmit}>




                <label className='mt-4 mb-2 ' htmlFor="email">Code :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' id='email' className='form-control mb-2'/>
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : ''}



                <div className="w-100 mt-4 ">
                    <button type="submit" className='btn btn-success py-2 px-4 fs-4' disabled={!(formik.isValid && formik.dirty)}>Verify</button>
                </div>

            </form>

        </div>

        </>
}
