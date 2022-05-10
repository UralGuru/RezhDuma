import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { REGISTRATION_ROUTE } from '../../../utils/constants';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import UserStore from '../../../store/UserStore';

const LoginForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('unauthorizated');

  const { userStore } = useContext(Context);
  

  const email = useInput('', true);
  const password = useInput('', true);

  const onLogin = () => {
    setStatus('loading');
    if (email.value == '' || password.value == '') {
      alert('Email или пароль некорректны');
      return;
    }
    const data = new FormData();
    data.append('email', email.value);
    data.append('password', password.value);
    userStore.login(data).then(res => {
      setStatus('authorizated');
    }).catch(res => {
      console.log('error');
      setStatus('error');
    })
  }
  
  if (status == 'loading') {
    return (
      <div className={styles.auth_form}>Загрузка...</div>
    )
  }

  if (status == 'error') {
    return (
      <div className={styles.auth_form}>При авторизации произошла ошибка...</div>
    )
  }

  return ( 
    <div className={styles.auth_form}>
      <div className={styles.auth_title}>{"Личный кабинет"}</div>
      <Input
        className="form-input"
        type='email'
        placeholder='Введите Email'
        {...email}
      >Email</Input>
      <Input
        className="form-input"
        type='password'
        placeholder='Введите пароль'
        {...password}
      >Пароль</Input>
      <a href="#" className={styles.auth_forgot}>Забыли пароль?</a>
      <div className={styles.btn_row}>
        <Button 
          className='primary'
          onClick={() => onLogin()}
          >Войти
        </Button>
        <Button
          className=''
          onClick={() => navigate(REGISTRATION_ROUTE)}
        >Регистрация
        </Button>
      </div>
    </div>
  );
}

export default observer(LoginForm);