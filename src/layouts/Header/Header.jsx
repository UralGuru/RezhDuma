import React from 'react';
import Container from '../../components/shared/Container/Container';
import styles from './Header.module.css';

const Header = () => {
  return ( 
      <Container>
        <div className={styles.header__inner}>
          <a className={styles.header__logo} href="/main">
            <img className={styles.logo__image} src="/images/rejh-icon.svg"/>
            <div className={styles.logo__text}>{"Официальный сайт города Реж"}</div> 
          </a>
          <a className={styles.profile__link} href="/profile">
            <img className={styles.profile__image} src="/images/auth-icon.svg"/>
            <div className={styles.profile__text}>{"Личный кабинет"}</div>
          </a>
        </div>
      </Container>
   );
}

export default Header;