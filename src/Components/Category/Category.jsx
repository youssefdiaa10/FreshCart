import React from 'react';
import style from "./Category.module.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import {ThreeDots} from 'react-loader-spinner';
import { Helmet } from 'react-helmet';



export default function Category() {


    async function getCategories() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);

    }

        let {data , isLoading} = useQuery('Categories' , () => getCategories());

        // console.log(data?.data.data);




        async function getSubCategories(id , name) {

            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);

            console.log(data.data[0]);

            displaySubCategories(data.data , name);
        }

    function displaySubCategories(category , name) {

        document.getElementById('subCategoryName').innerHTML = name;


        let box = '';

        for (let i = 0; i < category.length; i++) {
            box += `<div className="col-md-4">
            <div className="border rounded-2 d-flex justify-content-center">
                <h2 className='text-success'>${category[i].name}</h2>
            </div>
        </div>`;
        }

        document.getElementById('subCategories').innerHTML = box;

    }


    return <>

<div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Category</title>
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


    <div className="container">

        <div className="row gy-5">

            {data?.data.data.map((category , index) => {return <div key={index} className="col-md-4">
                <div onClick={() => {getSubCategories(category._id , category.name)}} className={style.category + " border rounded-2"}>
                    <div >
                        <img src={category.image} className='w-100 rounded-top-2' height={400} alt="category" />
                    </div>

                    <h5 className='text-center fw-bold fs-3 text-success py-3'>{category.name}</h5>

                </div>
            </div>})}

        </div>

        <section className='my-5'>

        <div className="d-flex justify-content-center mb-4">
            <h1 className="text-success " id='subCategoryName'></h1>
        </div>

        <div className="row gy-4" id='subCategories'>

        </div>

        </section>

    </div>

    </>
}
