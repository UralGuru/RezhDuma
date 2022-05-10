import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { LOGIN_ROUTE, ROOT_ROUTE, PROFILE_ICON, PROFILE_ROUTE, REJH_ICON } from '../../utils/constants';
import styles from './Header.module.css';

import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const Header = () => {
  const {userStore} = useContext(Context);
  const navigate = useNavigate();

  return ( 
    <div className={styles.header_outer}>
      <Container>
        <div className={styles.header__inner}>
          <a className={styles.header__logo} onClick={() => navigate(ROOT_ROUTE)}>
            <img className={styles.logo__image} src={REJH_ICON}/>
            <div className={styles.logo__text}><div>Официальный сайт<br/>города Реж</div></div> 
          </a>
          <div className={styles.profile}>
            <a className={styles.profile__link} onClick={() => navigate(PROFILE_ROUTE)}>
              <img className={styles.profile__image} src={PROFILE_ICON}/>
              <div className={styles.profile__text}>
                Личный кабинет
              </div>
            </a>
            {/* {userStore.User.firstName && 
            <a className={styles.profile__link} onClick={() => userStore.logout()}>
              <div className={styles.profile__text}>
                Выйти
              </div>
            </a>} */}
          </div>
        </div>
      </Container>
    </div>
   );
}

export default observer(Header);