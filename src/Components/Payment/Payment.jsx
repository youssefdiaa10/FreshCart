import React, { useContext } from 'react';
import style from "./Payment.module.css";
import { useFormik } from 'formik';
import { CartContext } from '../Context/CartContext';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { useState } from 'react';



export default function Payment() {


    let valid = Yup.object({
        details : Yup.string().required("Details Required"),
        phone : Yup.string().required("Phone Required").matches(/^01[0125][0-9]{8}$/),
        city : Yup.string().required("City Required").matches(/^[a-zA-Z]{1,30}$/),
    });


    let {paramsId} = useParams();

    // console.log(paramsId);

    let {payment} = useContext(CartContext);

    async function getPayment(id , shippingAddress) {

        let {data} =  await payment(id , shippingAddress);

        console.log(data);

        if (data.status === 'success') {

            window.location.href = data.session.url;

        }

    }


    let formik = useFormik({

        initialValues : {
            details : '',
            phone : '',
            city : '',
        },

        validationSchema : valid,

        onSubmit : (value) => {
            getPayment(paramsId , value);
        }
    });



    return <>

        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Payment</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>


    <div className="container">

    <form method='post' onSubmit={formik.handleSubmit}>

        <label htmlFor="details">Details</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='details' id="details" className='form-control mt-2 mb-4' />
        {formik.errors.details && formik.touched.details? <div className="alert alert-danger">{formik.errors.details}</div> : ''}


        <label htmlFor="phone">Phone</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name='phone' id="phone" className='form-control mt-2 mb-4' />
        {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div> : ''}


        <label htmlFor="city">City</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='city' id="city" className='form-control mt-2 mb-4' />
        {formik.errors.city && formik.touched.city? <div className="alert alert-danger">{formik.errors.city}</div> : ''}


        <button type='submit' className='btn btn-outline-primary w-100 mt-4' disabled={!(formik.isValid && formik.dirty)}>Pay</button>

    </form>


    </div>

    </>
}
