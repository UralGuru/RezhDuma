import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { REGISTRATION_ROUTE } from '../../../utils/constants';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';

const LoginForm = () => {
  const navigate = useNavigate();

  const { userStore } = useContext(Context);

  const email = useInput('', true);
  const password = useInput('', true);

  const onLogin = () => {
    if (email.value == '' || password.value == '') {
      alert('Email или пароль некорректны');
      return;
    }
    const data = new FormData();
    data.append('email', email.value);
    data.append('password', password.value);
    userStore.login(data);
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