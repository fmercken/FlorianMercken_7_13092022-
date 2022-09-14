import React from 'react';
import '../styles/Login.scss';
import api from '../services/api'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        console.log("Email changed ... new value: ", email)
    }, [email])

    const onLogin = () => {
        setLoading(true);
        api.auth.login(email, password)
        .then(function (response) {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("isAdmin", response.data.isAdmin ? response.data.isAdmin : "false");

            if(response.data.token)
            {
                navigate("/", { replace: true });
            }
          })
          .catch(function (error) {
            console.log(error);
          }).finally(() => {
            setLoading(false)
          });
        } 
        
            const onSignup = () => { 
        
                api.auth.register(email, password)
                .then((result) => { 
                    console.log("result", result)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                });
    }


    return (
        <div>
            <form className="connection">
                <div className="size-1">
                    <input className="size-2" onChange={(evenement) => setEmail(evenement.target.value)} type="text" name="email" placeholder="E-mail adress"></input>
                </div>
                <div className="size-1">
                    <input className="size-2" onChange={(evenement) => setPassword(evenement.target.value)} type="password" name="password" placeholder="Password"></input> 
                </div>
                <div className="padding-1">
                    {loading ? "chargement ..." : <button type="button" className="padding-3" onClick={onLogin}> Login </button>}
                </div>
                <div  className="padding-2">
                    {!loading && <button type="button" onClick={onSignup}> Register </button>}
                </div>
            </form>
        </div>
    );
};


export default Login;



