import React from 'react';
import { NavLink } from "react-router-dom"

const Navigation = () => {
    return (
        <div className="navigation">
            <ul>
                <NavLink to="/">
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/Createpost">
                    <li>Crée un post</li>
                </NavLink>
                <NavLink to="/logout">
                    <li>Se déconnecter</li>
                </NavLink>
            </ul>
            
        </div>
    );
};

export default Navigation;