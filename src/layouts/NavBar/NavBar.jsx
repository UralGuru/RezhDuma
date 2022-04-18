import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import classNames from 'classnames/bind';
import Container from '../../components/shared/Container/Container';

import styles from './NavBar.module.css';

const CustomLink = ({children, to}) => {
  const match = useMatch(to);

  let cx = classNames.bind(styles);

  return (
    <Link
      to={to}
      className={
        cx('btn_nav', {'btn_nav_active': match})
      }
      >
      {children}
    </Link>
  );
}

const NavBar = () => {

  return ( 
    <div className={styles.navbar}>
      <Container>
        <div className={styles.btn_group}>
          <CustomLink to={'/news'}>новости</CustomLink>
          <CustomLink to={'/history'}>история</CustomLink>
          <CustomLink to={'/documents'}>документы</CustomLink>
          <CustomLink to={'/votes'}>голосования</CustomLink>
          <CustomLink to={'/tojevotes'}>опросы</CustomLink>
          <CustomLink to={'/projects'}>проекты</CustomLink>
        </div>
      </Container>
    </div>
  )
}

export default NavBar;