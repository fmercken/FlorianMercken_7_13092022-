import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootComponent from './RootComponent'

const App = () => {
    return (
            <BrowserRouter>
                <RootComponent />
            </BrowserRouter>
        
    );
};

export default App;