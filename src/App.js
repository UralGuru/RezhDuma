import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Button from './components/shared/Button/Button';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import NavBar from './layouts/NavBar/NavBar';

import NewsPage from './pages/NewsPage/NewsPage'
import DocumentsPage from './pages/DocumentsPage/DocumentsPage'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import PollsPage from './pages/PollsPage/PollsPage'
import VotingsPage from './pages/VotingsPage/VotingsPage'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/constants';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <NavBar />
            <Routes>
                <Route path="*" element={<MainPage />}/>
                <Route path="/main" element={<MainPage />}/>
                <Route path={LOGIN_ROUTE} element={<Login />}/>
                <Route path={REGISTRATION_ROUTE} element={<Registration />}/>

                <Route path="/news" element={<NewsPage />}/>
                <Route path="/documents" element={<DocumentsPage />}/>
                <Route path="/history" element={<HistoryPage />}/>
                <Route path="/votings" element={<VotingsPage />}/>
                <Route path="/polls" element={<PollsPage />}/>
                <Route path="/projects" element={<ProjectsPage />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;