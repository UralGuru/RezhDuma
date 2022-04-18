import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import classNames from 'classnames/bind';
import Container from '../../components/shared/Container/Container';

import styles from './NavBar.module.css';
import { DOCUMENTS_ICON, HISTORY_ICON, NEWS_ICON, POLLS_ICON, PROJECTS_ICON, VOTINGS_ICON } from '../../utils/constants';

const NavLink = ({children, to, imageUrl}) => {
  const match = useMatch(to);
  let cx = classNames.bind(styles);

  return (
    <Link
      to={to}
      className={
        cx('btn_nav', {'btn_nav_active': match})
      }
      >
        <img className={styles.btn_nav_image} src={imageUrl} />
        <div>{children}</div> 
    </Link>
  );
}

const NavBar = () => {

  return ( 
    <div className={styles.navbar}>
      <Container>
        <div className={styles.btn_group}>
          <NavLink to={'/news'} imageUrl={NEWS_ICON}>новости</NavLink>
          <NavLink to={'/history'} imageUrl={HISTORY_ICON}>история</NavLink>
          <NavLink to={'/documents'} imageUrl={DOCUMENTS_ICON}>документы</NavLink>
          <NavLink to={'/votings'} imageUrl={VOTINGS_ICON}>голосования</NavLink>
          <NavLink to={'/polls'} imageUrl={POLLS_ICON}>опросы</NavLink>
          <NavLink to={'/projects'} imageUrl={PROJECTS_ICON}>проекты</NavLink>
        </div>
      </Container>
    </div>
  )
}

export default NavBar;