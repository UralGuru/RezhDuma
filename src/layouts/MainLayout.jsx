import React from 'react';
import { BreadcrumbItem } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import NavBar from './NavBar/NavBar';

const MainLayout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default MainLayout;