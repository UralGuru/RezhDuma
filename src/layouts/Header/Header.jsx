import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { LOGIN_ROUTE, ROOT_ROUTE, PROFILE_ICON, PROFILE_ROUTE, REJH_ICON, USER_ROUTE } from '../../utils/constants';
import styles from './Header.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import classNames from 'classnames/bind';
import ProfileIcon from './assets/profile-icon.svg';
import RezhIcon from './assets/rejh-icon.svg';

const cx = classNames.bind(styles);

const Header = () => {
  const {userStore} = useContext(Context);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef()
  
  const collapseMenu = (callback) => {
    setIsExpanded(false);
    callback();
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isExpanded && ref.current && !ref.current.contains(e.target)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isExpanded])

  return ( 
    <div className={styles.header_outer}>
      <Container>
        <div className={styles.header__inner}>
          <a className={styles.header__logo} onClick={() => navigate(ROOT_ROUTE)}>
            <img className={styles.logo__image} src={RezhIcon}/>
            <div className={styles.logo__text}><div>Официальный сайт<br/>города Реж</div></div> 
          </a>
          <div className={styles.profile}>
            {userStore.User?.id ?
            <button className={styles.profile__text} onClick={() => setIsExpanded(!isExpanded)}>
              <img className={styles.profile__image} src={ProfileIcon}/>
              <div className={styles.authorizated}>
                <div>{`${userStore.User.lastName} ${userStore.User.firstName} ${userStore.User.patronymic}`}</div>
                <div>{isExpanded ? <RiArrowUpSLine/> : <RiArrowDownSLine/>}</div>
              </div> 
            </button>
            :
            <button className={styles.profile__text} onClick={() => collapseMenu(() => navigate(LOGIN_ROUTE))}>
              <img className={styles.profile__image} src={ProfileIcon}/>
              <div>{'Авторизоваться'}</div>
            </button>
            } 
            {/* {userStore.User.firstName && 
            <a className={styles.profile__link} onClick={() => userStore.logout()}>
              <div className={styles.profile__text}>
                Выйти
              </div>
            </a>} */}
          </div>
        </div>
        <div className={styles.menu_container}>
          <div ref={ref} className={cx('profile_menu', {'expanded': isExpanded}, {'not_expanded': !isExpanded})}>
            {userStore.User?.id && <>
                <button onClick={() => collapseMenu(() => navigate(PROFILE_ROUTE))} className={styles.menu_item}>Профиль</button>
                <button onClick={() => collapseMenu(() => navigate(USER_ROUTE))} className={styles.menu_item}>Личные данные</button>
                <button onClick={() => collapseMenu(() => {userStore.logout(); navigate(ROOT_ROUTE)})} className={styles.menu_item}>Выйти</button>
              </>
            }
          </div>
        </div>
      </Container>
    </div>
   );
}

export default observer(Header);