import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Postusers from '../components/Postusers';

const Home = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if(navigate)
        {
            // si le token n'existe pas alors on rediriger vers la page login
            const userToken = localStorage.getItem("token");
            if(!userToken)
            {
                navigate("/login", { replace: true });
            }
        }
        
    }, [navigate])

    return (
        <div>
            <ul>
                <Postusers />
            </ul>
        </div>
    );
};

export default Home;
