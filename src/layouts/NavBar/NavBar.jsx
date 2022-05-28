import React, { useEffect, useRef, useState } from 'react';

import Container from '../../components/shared/Container/Container';
import styles from './NavBar.module.css';
import MainIcon from './assets/main.svg';
import NewsIcon from './assets/news.svg';
import VotingsIcon from './assets/votings.svg';
import DocumentsIcon from './assets/documents.svg';
import ProjectsIcon from './assets/projects.svg';
import HistoryIcon from './assets/history.svg';
import { Link, useMatch } from 'react-router-dom';
import classNames from 'classnames/bind';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

let cx = classNames.bind(styles);

const NavLink = ({children, to, imageUrl, className}) => {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      className={
        cx('btn_nav', {'btn_nav_active': match}, className)
      }>
        {imageUrl && <img className={styles.btn_nav_image} src={imageUrl} />}
        <div>{children}</div>
    </Link>
  );
}

const NavBar = () => {
  const ref = useRef();
  const [showSideBar, setShowSideBar] = useState(false);

  const sideBarToggle = () => {
    setShowSideBar(!showSideBar);
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showSideBar && ref.current && !ref.current.contains(e.target)) {
        setShowSideBar(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showSideBar])

  return ( 
    <div className={styles.navbar}>
      <Container>
        <div className={styles.btn_group}>
        <NavLink className={"in-row"} to={'/'} imageUrl={MainIcon}>главная</NavLink>
          <NavLink className={"in-row"} to={'/news'} imageUrl={NewsIcon}>новости</NavLink>
          <NavLink className={"in-row"} to={'/votings'} imageUrl={VotingsIcon}>голосования</NavLink>
          <NavLink className={"in-row"} to={'/documents'} imageUrl={DocumentsIcon}>документы</NavLink>
          <NavLink className={"in-row"} to={'/projects'} imageUrl={ProjectsIcon}>проекты</NavLink>
          <NavLink className={"in-row"} to={'/history'} imageUrl={HistoryIcon}>история</NavLink>
        </div>
        {!showSideBar && 
          <Link to="#" className={styles.toggle} onClick={sideBarToggle}>
            <AiOutlineMenu />
          </Link> }
        {showSideBar && 
          <Link to="#" className={styles.toggle} onClick={sideBarToggle}>
            <AiOutlineClose />
          </Link> }
      </Container>
      <div ref={ref} className={cx('sidebar', {'active': showSideBar})} onClick={() => sideBarToggle()}>
      <NavLink className={"in-line"} to={'/'} imageUrl={MainIcon}>главная</NavLink>
        <NavLink className={"in-line"} to={'/news'} imageUrl={NewsIcon}>новости</NavLink>
        <NavLink className={"in-line"} to={'/votings'} imageUrl={VotingsIcon}>голосования</NavLink>
        <NavLink className={"in-line"} to={'/documents'} imageUrl={DocumentsIcon}>документы</NavLink>
        <NavLink className={"in-line"} to={'/projects'} imageUrl={ProjectsIcon}>проекты</NavLink>
        <NavLink className={"in-line"} to={'/history'} imageUrl={HistoryIcon}>история</NavLink>
      </div>
    </div>
  )
}

export default NavBar;