import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { Context } from '.';
import NewsPage from './pages/NewsPage/NewsPage'
import DocumentsPage from './pages/DocumentsPage/DocumentsPage'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
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
import UserRequests from './pages/UserPages/UserRequests/UserRequests';
import CreateVoting from './pages/AdminPages/CreateVoting/CreateVoting';
import UserRequestItem from './pages/UserPages/UserRequestItem/UserRequestItem';
import AdminRequestItem from './pages/AdminPages/AdminRequestItem/AdminRequestItem';
import VotingResultsItem from './pages/VotingResultsItem/VotingResultsItem';
import PersonalData from './pages/UserPages/PersonalData/PersonalData';
import PersonalDataEdit from './pages/UserPages/PersonalData/PersonalDataEdit/PersonalDataEdit';
import ChangePassword from './pages/UserPages/PersonalData/ChangePassword/ChangePassword';
import VotingItem from './pages/VotingItem/VotingItem';


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
                        <Route index element={<VotingsPage/>} />
                    </Route>
                    <Route path="projects">
                        <Route index element={<ProjectsPage />}/>
                        <Route path=':id' element={<ProjectsItem />}/>
                    </Route>
                    
                    {/* authorizated routes */}
                    <Route element={<AuthRequired />}>
                        <Route path="votings">
                            <Route path=":id">
                                <Route index element={<VotingItem />}/>
                                <Route path='results' element={<VotingResultsItem/>}/>
                            </Route>
                        </Route>
                        <Route path="requests">
                            <Route index element={<UserRequests />}/>
                            <Route path=":id" element={<UserRequestItem />}/>
                            <Route path="create" element={<Request />}/>
                        </Route>
                        <Route path="user">
                            <Route index element={<PersonalData />}/>
                            <Route path="edit">
                                <Route index element={<PersonalDataEdit/>}/>
                                <Route path="password" element={<ChangePassword />}/>
                            </Route>
                        </Route>
                    </Route>

                    {/* admin routes */}
                    <Route path="admin" element={<AdminRequired />}>
                        <Route path="requests">
                            <Route index element={<Requests/>}/>
                            <Route path=":id" element={<AdminRequestItem />}/>
                        </Route>
                        <Route path="votings">
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