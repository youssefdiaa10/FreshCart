import React, { useContext } from 'react';
import style from "./ProductDetails.module.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner';
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";



export default function ProductDetails() {

    let {addToCart} = useContext(CartContext);

    async function addProductToCart(id) {

        let {data} = await addToCart(id);

        if (data.status === 'success') {
            toast.success(data.message , {
                duration: 1000,
                position: 'top-right',
            });
        }

        else {
            toast.error(data.message);
        }

    }


    let {id} = useParams();

    async function getProductDetails(idParams) {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${idParams}`);

    }

        let {data , isLoading} = useQuery('ProductDetails' , () => getProductDetails(id));


        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
        };


    return <>

        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>


        {isLoading ?  <div className="d-flex justify-content-center align-content-center position-absolute top-0 start-0 end-0 bottom-0 ">
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



        <div className="container ">

                {data?.data.data ?  <div className="row gy-5 align-items-center">

                    <div className='col-md-3'>
                        <div className="">
                            <Slider {...settings}>
                                {data?.data.data.images.map((img , index) => {return <img src={img} alt="product" className='w-100' key={index} />})}
                            </Slider>
                        </div>
                    </div>

                    <div className="col-md-8">
                    <div >
                        <h3 className='text-success'>{data?.data.data.title}</h3>
                        <h4 className='h6 fw-light'>{data?.data.data.description}</h4>
                        <h5 className='text-success'>{data?.data.data.category.name}</h5>

                        <div className="d-flex justify-content-between">
                            <span>{data?.data.data.price} EGP</span>
                            <span><i className='fas fa-star text-warning me-2'></i>{data?.data.data.ratingsAverage}</span>
                        </div>
                    </div>

                    <div className=" d-flex justify-content-between align-content-center">
                        <button onClick={() => {addProductToCart(data?.data.data.id)}} type="button" className='btn btn-success my-2 w-75 '>+ Add</button>

                        <i className="fa-solid fa-heart fs-3 my-auto me-3"></i>
                    </div>
                    </div>

                </div> : ''}

        </div>

    </>
}
