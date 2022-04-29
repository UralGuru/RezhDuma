import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { REGISTRATION_ROUTE } from '../../../utils/constants';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';

const LoginForm = ({}) => {
  const navigate = useNavigate();

  const email = useInput('', true);
  const password = useInput('', true);

  const onLogin = () => {
    console.log(email.value, password.value);
  }

  return ( 
    <form className={styles.auth_form}>
      <div className={styles.auth_title}>{"Личный кабинет"}</div>
      <Input
        className=""
        type='email'
        placeholder='Введите Email'
        {...email}
      >Email</Input>
      <Input
        className=""
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
    </form>
   );
}

export default LoginForm;