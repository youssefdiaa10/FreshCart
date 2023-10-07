import React from 'react';
import style from "./Register.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {ThreeDots} from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Register() {

    let [error , setError] = useState('');


    let [loading , setLoading] = useState(false);


    let user = {
        name : '',
        email : '',
        password : '',
        rePassword : '',
        phone : '',
    }

    let valid = Yup.object({
        name : Yup.string().required("Name Required").min(3 , 'Name min length is 3').max(20 , 'Name max length is 20'),
        email : Yup.string().required("Email Required").email('Email pattern is Invalid'),
        phone : Yup.string().required("Phone Required").matches(/^01[0125][0-9]{8}$/),
        password : Yup.string().required("Password Required").matches(/^[a-zA-Z][a-zA-Z0-9]{6,9}$/),
        rePassword : Yup.string().required("Re-password Required").oneOf([Yup.ref('password')]),
    });


        let navigate = useNavigate();


    async function submitForm(value) {

        setLoading(true);

        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , value).catch((error) => {

                    console.log(error);

                    setError(error.response.data.message);

                    setLoading(false);
        });

        if (data.message === 'success') {

            setLoading(false);

            localStorage.setItem("token" , data.token);

            navigate('/login');
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
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>


        <div className="container mt-5">


            {error ? <div className="alert alert-danger">{error}</div> : ''}



            <h3>Register Now</h3>



            <form className='d-flex flex-column' onSubmit={formik.handleSubmit}>



                <label className='mt-4 mb-2 ' htmlFor="name">Name :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='name' id='name' className='form-control mb-2'/>
                {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : ''}




                <label className='mt-4 mb-2 ' htmlFor="email">Email :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' id='email' className='form-control mb-2'/>
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : ''}




                <label className='mt-4 mb-2 ' htmlFor="password">Password :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' id='password' className='form-control mb-2'/>
                {formik.errors.password && formik.touched.password? <div className="alert alert-danger">
                    <p>must be : </p>
                    <div className="d-flex flex-column">
                        <p>* Start with a letter (either uppercase or lowercase).</p>
                        <p>* Be between 6 and 9 characters in total.</p>
                        <p>* Can only contain letters (A-Z or a-z) and numbers (0-9)</p>
                    </div>
                </div> : ''}




                <label className='mt-4 mb-2 ' htmlFor="rePassword">Re-password :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='rePassword' id='rePassword' className='form-control mb-2'/>
                {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">Re-Password pattern is Invalid</div> : ''}




                <label className='mt-4 mb-2 ' htmlFor="phone">Phone :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name='phone' id='phone' className='form-control mb-2'/>
                {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">Invalid Phone</div> : ''}




                <div className="w-100 d-flex justify-content-end ">
                    <button type="submit" className='btn btn-success py-2 px-4 mt-4 fs-4' disabled={!(formik.isValid && formik.dirty)}>Register Now</button>
                </div>

            </form>

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


    </>
}
