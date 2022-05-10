import React from 'react';
import Button from '../../../components/shared/Button/Button';

import styles from './ProfileEntryCard.module.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../../utils/constants';


const ProfileEntryCard = () => {
  const navigate = useNavigate();

  return ( 
    <div className={styles.profile_entry}>
      <div className={styles.profile_entry_title}>Вход в личный кабинет</div>
      <div className={styles.profile_entry_description}>Войдите или зарегистрируйтесь, чтобы получить доступ ко всем возможностям сайта</div>
        <Button
          className='primary'
          onClick={() => navigate(LOGIN_ROUTE)}
        >Войти
        </Button>
        <Button
          className='secondary-outline'
          onClick={() => navigate(REGISTRATION_ROUTE)}
        >Зарегистрироваться
        </Button>
    </div>
   );
}

export default ProfileEntryCard;