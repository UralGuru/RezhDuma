import React from 'react';
import Container from '../../components/shared/Container/Container';
import { MAIN_ROUTE, PROFILE_ICON, REJH_ICON } from '../../utils/constants';
import styles from './Header.module.css';

const Header = () => {
  return ( 
      <Container>
        <div className={styles.header__inner}>
          <a className={styles.header__logo} href={MAIN_ROUTE}>
            <img className={styles.logo__image} src={REJH_ICON}/>
            <div className={styles.logo__text}><div>Официальный сайт</div><div>города Реж</div></div> 
          </a>
          <a className={styles.profile__link} href="/profile">
            <img className={styles.profile__image} src={PROFILE_ICON}/>
            <div className={styles.profile__text}>{"Личный кабинет"}</div>
          </a>
        </div>
      </Container>
   );
}

export default Header;