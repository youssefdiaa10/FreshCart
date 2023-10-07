import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props){

    let headers = {

        token : localStorage.getItem('token'),

    };

    function addToWishList(id){

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId : id} , {headers}).then(response => response).catch(error => error);
    }

    function getLogWishList() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers});
    }

    function deleteFromWishList(id) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {headers});
    }

    return <WishListContext.Provider value={{addToWishList , getLogWishList , deleteFromWishList}}>

        {props.children}

    </WishListContext.Provider>

}