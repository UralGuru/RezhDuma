import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import NavBar from './NavBar/NavBar';

const MainLayout = () => {
  return (
    <>
      <Header />
      
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;