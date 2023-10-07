import axios from "axios";
import { createContext, useState } from "react";

export let HeartContext = createContext();

export default function HeartContextProvider(props){

    let [heart , setHeart] = useState([]);


    return <HeartContext.Provider value={{heart , setHeart}}>

        {props.children}

    </HeartContext.Provider>

}