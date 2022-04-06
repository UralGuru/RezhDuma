import './App.css';
import {React} from 'react';
import Header from './components/Header/Header';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>

            </div>
        </BrowserRouter>

    );
}

export default App;