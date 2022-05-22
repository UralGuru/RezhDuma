import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { LOGIN_ROUTE, ROOT_ROUTE, PROFILE_ICON, PROFILE_ROUTE, REJH_ICON } from '../../utils/constants';
import styles from './Header.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = () => {
  const {userStore} = useContext(Context);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const collapseMenu = (callback) => {
    setIsExpanded(false);
    callback();
  }

  return ( 
    <div className={styles.header_outer}>
      <Container>
        <div className={styles.header__inner}>
          <a className={styles.header__logo} onClick={() => navigate(ROOT_ROUTE)}>
            <img className={styles.logo__image} src={REJH_ICON}/>
            <div className={styles.logo__text}><div>Официальный сайт<br/>города Реж</div></div> 
          </a>
          <div className={styles.profile}>
            <button className={styles.profile__text} onClick={() => setIsExpanded(!isExpanded)}>
              <img className={styles.profile__image} src={PROFILE_ICON}/>
              {userStore.User?.id 
              ? 
              <>
                <span>{`${userStore.User.firstName} ${userStore.User.lastName} ${userStore.User.patronymic}`}</span>
                <span>{isExpanded ? <RiArrowUpSLine/> : <RiArrowDownSLine/>}</span>
              </>
              : 
              <div onClick={() => collapseMenu(() => navigate(LOGIN_ROUTE))}>{'Авторизоваться'}</div>} 
            </button>
            {/* {userStore.User.firstName && 
            <a className={styles.profile__link} onClick={() => userStore.logout()}>
              <div className={styles.profile__text}>
                Выйти
              </div>
            </a>} */}
          </div>
        </div>
        <div className={styles.menu_container}>
          <div className={cx('profile_menu', {'expanded': isExpanded}, {'not_expanded': !isExpanded})}>
            {userStore.User?.id 
              ? 
              <>
                <div role="button" onBlur={() => setIsExpanded(false)} onClick={() => collapseMenu(() => navigate(PROFILE_ROUTE))} className={styles.menu_item}>Профиль</div>
                <div role="button" onBlur={() => setIsExpanded(false)} onClick={() => collapseMenu(() => navigate())} className={styles.menu_item}>Личные данные</div>
                <div role="button" onBlur={() => setIsExpanded(false)} onClick={() => collapseMenu(() => userStore.logout())} className={styles.menu_item}>Выйти</div>
              </>
              :
              <>
              </>
            }
            
          </div>
        </div>
      </Container>
    </div>
   );
}

export default observer(Header);