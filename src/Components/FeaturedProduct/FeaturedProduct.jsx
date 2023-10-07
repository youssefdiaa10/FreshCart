import style from "./FeaturedProduct.module.css";
import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import {ThreeDots} from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';
import { HeartContext } from '../Context/HeartContext';



export default function FeaturedProduct() {

    let {addToCart , setCartNum} = useContext(CartContext);

    let {addToWishList} = useContext(WishListContext);

    let {heart , setHeart} = useContext(HeartContext);


    async function addProductToCart(id) {

        let {data} = await addToCart(id);

        setCartNum(data.numOfCartItems);

        if (data.status === 'success') {
            toast.success(data.message , {
                duration: 2000,
                position: 'top-right',
            });

        }

        else {
            toast.error(data.message);
        }

    }


    async function addProductToWishList(id) {

        let {data} = await addToWishList(id);

        if (data.status === 'success') {
            toast.success(data.message , {
                duration: 2000,
                position: 'top-right',
            });

        }

        else {
            toast.error(data.message);
        }

    }


    async function getProduct() {

        return axios.get('https://ecommerce.routemisr.com/api/v1/products');

    }


    let {data , isLoading} = useQuery('FeaturedProduct' , getProduct , {

        // cacheTime: 3000,
        // refetchOnMount:false,
        // staleTime: 3000,
        refetchInterval:1000,
    });


    return <>


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


    <div className="container mt-5 ">

        <input type="search" className='form-control mb-5' placeholder='search...'/>

        <div className="row gy-4">

            {data?.data.data.map((item , index) =>  <div key={index} className="col-sm-12 col-md-4 col-lg-3 ">

                <div className={style.product + " rounded-2 p-2 "}>

                    <Link className='text-decoration-none text-black' to={`/productdetails/${item.id}`}>
                        <div>
                            <img src={item.imageCover} className='w-100' alt="product" />
                            <h6 className='text-success fw-light mt-2'>{item.category.name}</h6>
                            <h3 className='h6 mt-3'>{item.title.split(" ").slice(0 , 2).join(" ")}</h3>
                        </div>
                    </Link>

                    <div className="d-flex justify-content-between ">
                        <span>{item.price} EGP</span>
                        <span><i className="fas fa-star text-warning mx-1"></i>{item.ratingsAverage}</span>
                    </div>

                    <div className="d-flex justify-content-end">
                        <i onClick={() => {addProductToWishList(item.id)}} className={heart ? "fa-solid fa-heart me-3 fs-3 text-danger" : "fa-solid fa-heart me-3 fs-3"}></i>
                    </div>

                        <button onClick={() => {addProductToCart(item.id)}} type="button" className={style.addCart + ' btn btn-success my-2 w-100 '}>+ Add</button>

                </div>

            </div>)}

        </div>

</div>

    </>
}
