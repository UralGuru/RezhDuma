import React, { useState } from 'react';
import useInput from '../../../hooks/useInput';
import Button from '../Button/Button';
import styles from './Form.module.css';
import Input from '../Input/Input';

const RegistrationForm = ({}) => {

  const email = useInput('', true);
  const name = useInput('', true);
  const surname = useInput('', true);
  const fathername = useInput('', false);
  const telephone = useInput('', true);
  const password = useInput('', true);
  const confirmPassword = useInput('', true);

  const onRegistration = () => {
    console.log(email.value, password.value);
  }

  return ( 
    <form className={styles.auth_form}>
      <div className={styles.auth_title}>{"Регистрация"}</div>
      <Input
        className=""
        type='email'
        placeholder='Введите Email'
        {...email}
      >Email</Input>
      <Input
        className=""
        type='text'
        placeholder='Введите имя'
        {...name}
      >Имя</Input>
      <Input
        className=""
        type='text'
        placeholder='Введите фамилию'
        {...surname}
      >Фамилия</Input>
      <Input
        className=""
        type='email'
        placeholder='Введите отчество'
        {...fathername}
      >Отчество</Input>
      <Input
        className=""
        type='phone'
        placeholder='Введите телефон'
        {...telephone}
      >Телефон</Input>
      <Input
        className=""
        type='password'
        placeholder='Введите пароль'
        {...password}
      >Пароль</Input>
      <Input
        className=""
        type='password'
        placeholder='Подтвердите пароль'
        {...confirmPassword}
      >Подтверждение пароля</Input>
      <div className={styles.btn_row}>
        <Button
          className='primary'
          onClick={() => onRegistration()}
        >Зарегистрироваться
        </Button>
      </div>
    </form>
   );
}

export default RegistrationForm;