import React from 'react';
import '../styles/Login.scss';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Logout = () => {

    let navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/login");
    }, [])

    return (<></>);
};


export default Logout;
