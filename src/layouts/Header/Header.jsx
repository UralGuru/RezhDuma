import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { LOGIN_ROUTE, ROOT_ROUTE, PROFILE_ICON, PROFILE_ROUTE, REJH_ICON } from '../../utils/constants';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();

  return ( 
      <Container>
        <div className={styles.header__inner}>
          <a className={styles.header__logo} href={ROOT_ROUTE}>
            <img className={styles.logo__image} src={REJH_ICON}/>
            <div className={styles.logo__text}><div>Официальный сайт</div><div>города Реж</div></div> 
          </a>
          <a className={styles.profile__link} href={PROFILE_ROUTE}>
            <img className={styles.profile__image} src={PROFILE_ICON}/>
            <div className={styles.profile__text}>{"Личный кабинет"}</div>
          </a>
        </div>
      </Container>
   );
}

export default Header;