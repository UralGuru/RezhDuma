import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './components/shared/Button/Button';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import NavBar from './layouts/NavBar/NavBar';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <NavBar />
            
            <Button className="btn-primary">{"SomeText"}</Button>
            <Footer />
        </BrowserRouter>
    );
}

export default App;