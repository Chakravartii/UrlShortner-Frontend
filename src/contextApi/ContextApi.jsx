import { Children, createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({Children}) =>{
    const getToken = localStorage.getItem("JWT_TOKEN")
    ?JSON.parse(localStorage.getItem("JWT_TOKEN")):null;

    const [token,setToken] = useState(getToken);

    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value = {sendData}>{Children}</ContextApi.Provider>
}

export const useStoreContext = () =>{
    const context = useContext(ContextApi);
    return context;
}