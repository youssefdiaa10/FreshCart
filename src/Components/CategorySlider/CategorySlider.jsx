import React, { useEffect } from 'react';
import style from "./CategorySlider.module.css";
import axios from 'axios';
import { useState } from 'react';
import Slider from "react-slick";
import Category from './../Category/Category';



export default function CategorySlider() {

    let [category , setCategory] = useState([]);

    async function getCategory() {

        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');

        setCategory(data.data);

    }

    useEffect(() => {

        getCategory();

    } , []);


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true,
    };

    return <>

    <div className="container ">

        <Slider {...settings}>

            {category.map(category => <div className='d-flex flex-column'>

            <img src={category.image} alt='category' className='w-100' height={250}/>

            <h3 className='h5'>{category.name}</h3>

            </div>)}

        </Slider>

    </div>

    </>
}


