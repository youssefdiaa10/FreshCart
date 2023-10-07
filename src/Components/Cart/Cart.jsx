import React, { useContext, useEffect, useState } from 'react';
import style from "./Cart.module.css";
import { CartContext } from '../Context/CartContext';
import { HeartContext } from '../Context/HeartContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Cart() {

    let [cartData , setCartData] = useState(null);

    let {getLogCart , deleteFromCart , updateCount , setCartNum , clearCart , payment} = useContext(CartContext);

    // let {heart , setHeart} = useContext(HeartContext);


    async function displayCart() {

        let {data} = await getLogCart();

        setCartNum(data.numOfCartItems);

        setCartData(data);

    };



    async function deleteItem(id) {

        let {data} = await deleteFromCart(id);

        setCartData(data);

        // setHeart(false);
    };


    async function clearItems() {

        let {message} = await clearCart();

        console.log(message);

        setCartData(null);

        setCartNum(0);

        // setHeart(false);
    };



    async function updateProduct(id , count) {

        let {data} = await updateCount(id , count);

        setCartData(data);
    };




    useEffect(() => {

        displayCart();

    });



    return <>

<div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>


<div className="bg-light w-75 m-auto p-4">

            <h2 className="mb-4">Cart Shop</h2>

            {cartData ? <>


            <h4 className='h5 fw-light my-2'>Number of items : <span className="text-success">{cartData.numOfCartItems}</span></h4>

            <h4 className='h5 fw-light my-2'>Total Price : <span className="text-success">{cartData.data.totalCartPrice}</span></h4>

            <Link to={`/payment/${cartData.data._id}`}  className='btn btn-primary'>Checkout</Link>



            {cartData.data.products.map((product) => <div className="row my-5 border-bottom pb-5">

                {/* <h1 className="text-danger">{product.product.id}</h1> */}

                <div className="col-md-2">
                    <img src={product.product.imageCover} className='w-100'  alt="product" />
                </div>

                <div className="col-md-10">
                    <div className="cartItem">
                        <h4>{product.product.title}</h4>

                        <div className="d-flex justify-content-between">
                            <div>
                                <h5>price : {product.price}</h5>
                            </div>

                            <div>
                                <button onClick={() => {updateProduct(product.product.id , product.count+1)}} className='btn btn-outline-success mx-2 '>+</button>
                                <span>{product.count >= 1 ? product.count : "1"}</span>
                                <button onClick={() => {updateProduct(product.product.id , product.count-1)}} className='btn btn-outline-danger mx-2 '>-</button>
                            </div>
                        </div>

                        <button onClick={() => {deleteItem(product.product.id)}} className='btn text-danger'><i className="fas fa-trash-can "></i> Remove</button>

                    </div>

                </div>

            </div>)}

            <div className="d-flex justify-content-center">
                <button onClick={() => {clearItems()}} className='btn btn-outline-primary py-3 px-4'>Clear Your Cart</button>
            </div></>
            : <>
                <h2>Your Cart is Empty</h2>
            </>}

        </div>

    </>
}
