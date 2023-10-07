import React, { useContext, useEffect } from 'react';
import style from "./WishList.module.css";
import { useState } from 'react';
import { WishListContext } from '../Context/WishListContext';
import { CartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';



export default function WishList() {

    let {addToCart , setCartNum} = useContext(CartContext);

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


    let [wishListData , setWishListData] = useState(null);


    let {getLogWishList , deleteFromWishList} = useContext(WishListContext);


    async function displayWishList() {

        let {data} = await getLogWishList();

        setWishListData(data);

        console.log(data);

    };



    async function deleteItemFromWishList(id) {

        let {data} = await deleteFromWishList(id);

        setWishListData(data);
    };




    useEffect(() => {

        displayWishList();

    });



    return <>

        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>


    {wishListData ?
        <div className="bg-light w-75 m-auto p-4">

            <h2 className="mb-4">My Wish List</h2>

            {wishListData.data.map((product) => <div className="row my-5 border-bottom pb-5">

                <div className="col-md-2">
                    <img src={product.imageCover} className='w-100'  alt="product" />
                </div>

                <div className="col-md-10">
                    <div className="mt-5">
                        <h4 className=''>{product.title}</h4>

                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className='text-success h5'>{product.price} EGP</h5>
                            </div>

                            <div>
                                <button onClick={() => {addProductToCart(product.id)}} className='btn btn-success mx-2 '>Add to Cart</button>
                            </div>
                        </div>

                        <button onClick={() => {deleteItemFromWishList(product.id)}} className='btn text-danger'><i className="fas fa-trash-can "></i> Remove</button>

                    </div>

                </div>

            </div>)}

        </div> : ''}

    </>
}
