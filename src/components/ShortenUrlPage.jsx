import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShortenUrlPage = () => {
    const {url} = useParams();
    useEffect (()=>{
        if(url){
            console.log("inside shorten url page");
            window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
        }
    });
    return null;
}

export default ShortenUrlPage