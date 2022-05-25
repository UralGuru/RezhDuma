import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { Context } from '.';
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
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile/Profile';
import Request from './pages/Request/Request';
import NewsItem from './pages/NewsItem/NewsItem';
import FAQPage from './pages/FAQPage/FAQPage';
import AuthRequired from './pages/AuthRequired/AuthRequired';
import HistoryItem from "./pages/HistoryItem/HistoryItem";
import ProjectsItem from "./pages/ProjectsItem/ProjectsItem";
import AdminRequired from './pages/AdminRequired/AdminRequired';
import Requests from './pages/AdminPages/Requests/Requests';
import AdminProfile from './pages/AdminPages/AdminProfile/AdminProfile';
import DocumentsItem from "./pages/DocumentsItem/DocumentsItem";
import UserVotings from './pages/UserPages/UserVotings/UserVotings';
import Votings from './pages/AdminPages/Votings/Votings';
import UserRequests from './pages/UserPages/UserRequests/UserRequests';
import CreateVoting from './pages/AdminPages/CreateVoting/CreateVoting';
import UserRequestItem from './pages/UserPages/UserRequestItem/UserRequestItem';
import AdminRequestItem from './pages/AdminPages/AdminRequestItem/AdminRequestItem';
import VotingItem from './pages/AdminPages/VotingItem/VotingItem';



function App() {
    const {userStore} = useContext(Context);
    
    useEffect(() => {
        if (localStorage.getItem('refresh-token')) {
            userStore.checkAuth();
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>

                    {/* public routes */}
                    <Route index element={<MainPage />}/>
                    <Route path="login" element={<Login />}/>
                    <Route path="registration" element={<Registration />}/>
                    <Route path="profile" element={(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) ? <AdminProfile/> : <Profile />}/>
                    <Route path="faq" element={<FAQPage />}/>

                    <Route path="news">
                        <Route index element={<NewsPage />}/>
                        <Route path=':id' element={<NewsItem />}/>
                    </Route>
                    <Route path="documents">
                        <Route index element={<DocumentsPage />}/>
                        <Route path=':id' element={<DocumentsItem />}/>
                    </Route>
                    <Route path="history">
                        <Route index element={<HistoryPage />}/>
                        <Route path=':id' element={<HistoryItem />}/>
                    </Route>
                    <Route path="votings">
                        <Route index element={<VotingsPage />}/>
                        <Route path=':id' element={<NewsItem />}/>
                    </Route>
                    <Route path="projects">
                        <Route index element={<ProjectsPage />}/>
                        <Route path=':id' element={<ProjectsItem />}/>
                    </Route>
                    
                    {/* authorizated routes */}
                    <Route element={<AuthRequired />}>
                        <Route path="requests">
                            <Route index element={<UserRequests />}/>
                            <Route path=":id" element={<UserRequestItem />}/>
                            <Route path="create" element={<Request />}/>
                        </Route>
                        <Route path="votings" element={<UserVotings/>}/>
                    </Route>

                    {/* admin routes */}
                    <Route path="admin" element={<AdminRequired />}>
                        <Route path="requests">
                            <Route index element={<Requests/>}/>
                            <Route path=":id" element={<AdminRequestItem />}/>
                        </Route>
                        <Route path="votings">
                            <Route index element={<Votings/>}/>
                            <Route path=":id" element={<VotingItem />}/>
                            <Route path="create" element={<CreateVoting />}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<MainPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default observer(App);