import React from 'react';
import style from "./Home.module.css";
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';



export default function Home() {

    return <>
            <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>


        <MainSlider/>

        <CategorySlider/>

        <FeaturedProduct/>

    </>
}
