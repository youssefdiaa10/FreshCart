import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){

    let [cartNum, setCartNum] = useState(0);


    let headers = {

        token : localStorage.getItem('token'),

    };

    function addToCart(id){

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId : id} , {headers}).then(response => response).catch(error => error);
    }

    function getLogCart() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers});
    }

    function deleteFromCart(id) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {headers});
    }

    function clearCart() {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {headers}).catch(error => error);
    }

    function updateCount(id , count) {

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , {headers}).then(response => response).catch(error => error);
    }

    function payment(id , shippingAddress) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` , {shippingAddress} , {headers}).then(response => response).catch(error => error);
    }


    return <CartContext.Provider value={{addToCart , getLogCart , deleteFromCart , clearCart , updateCount , payment , cartNum, setCartNum}}>

        {props.children}

    </CartContext.Provider>

}