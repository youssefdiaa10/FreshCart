import React from 'react';
import style from "./Brand.module.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';


export default function Brand() {

    async function getBrands() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);

    }

        let {data} = useQuery('Brands' , () => getBrands());

        console.log(data?.data.data);


    return <>

<div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>



    <div className="container">

        <div className="d-flex justify-content-center">
            <h1 className='text-success mb-5'>All Brands</h1>
        </div>

        <div className="row gy-4">
            {data?.data.data.map((brand , index) => {return <>

            <div class="modal fade" id={`${brand.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-4 mt-5">
                                    <h1 className='text-success'>{brand.name}</h1>
                                    <h6 className='text-secondary'>{brand.slug}</h6>
                                </div>

                                <div className="col-8">
                                    <div className="">
                                        <img src={brand.image} alt="brand" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div key={index} className="col-md-3"  data-bs-toggle="modal" data-bs-target={`#${brand.id}`}>
                <div className="border border-2 rounded-2">
                    <div>
                        <img src={brand.image} className='w-100' alt="brand" />
                    </div>

                    <h5 className='text-center fw-light fs-6'>{brand.name}</h5>

                </div>
            </div></>})}
        </div>

    </div>

    </>
}
