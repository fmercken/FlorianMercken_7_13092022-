
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation  } from "react-router-dom";
import Createpost from './pages/Createpost';
import Updatepost from './pages/Updatepost';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import { useState } from 'react';
import { useEffect } from 'react';

const RootComponent = () => {
    const location = useLocation();
    
    //Permet de contrôler l'affichage du menu (ex: ne pas l'afficher sur la pager login)
    const [showNavigation, setShownavigation] = useState(true);

    useEffect(() => {
        setShownavigation(location.pathname !== '/login')
    }, [location])

    return (
        <div>
            <Logo />
            {showNavigation && <Navigation/>}
            <Routes>
                <Route path= "/" element ={<Home />} />
                <Route path="/Createpost" element={<Createpost />} />
                <Route path="/Updatepost" element={<Updatepost />} />
                <Route path= "/Login" element ={<Login />} />
                <Route path= "/Logout" element ={<Logout />} />
                
            </Routes>
        </div>
    );
};

export default RootComponent;