import React from 'react';
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../Assets//Images/img1.jpg"
import img2 from "../../Assets//Images/img2.jpg"
import img3 from "../../Assets//Images/img3.jpg"
import img4 from "../../Assets//Images/img4.jpg"
import img5 from "../../Assets//Images/img5.jpg"




export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false
    };


    return <>

        <div className="container my-5">

            <div className="row gy-5 gx-0 justify-content-center">

                <div className="col-md-8">

                    <Slider {...settings}>

                        <img src={img3} alt="ad" className='w-100' height={400}/>
                        <img src={img4} alt="ad" className='w-100' height={400}/>
                        <img src={img5} alt="ad" className='w-100' height={400}/>

                    </Slider>

                </div>

                <div className="col-md-3">

                    <img src={img1} alt="ad" className='' height={200}/>
                    <img src={img2} alt="ad" className='' height={200}/>

                </div>

            </div>

        </div>

    </>
}
