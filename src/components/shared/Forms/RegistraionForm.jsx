import React, { useContext, useState } from 'react';
import useInput from '../../../hooks/useInput';
import Button from '../Button/Button';
import styles from './Form.module.css';
import Input from '../Input/Input';

import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import { Navigate } from 'react-router-dom';

const RegistrationForm = () => {

  
  const {userStore} = useContext(Context);

  const email = useInput('', true);
  const name = useInput('', true);
  const surname = useInput('', true);
  const fathername = useInput('', false);
  const telephone = useInput('', true);
  const password = useInput('', true);
  const confirmPassword = useInput('', true);

  const onRegistration = () => {
    userStore.registration(
      email.value, 
      password.value,
      telephone.value,
      name.value,
      surname.value,
      fathername.value
      );
      
  }

  return ( 
    <form className={styles.auth_form}>
      <div className={styles.auth_title}>{"Регистрация"}</div>
      <Input
        className="form-input"
        type='email'
        placeholder='Введите Email'
        {...email}
      >Email</Input>
      <Input
        className="form-input"
        type='text'
        placeholder='Введите имя'
        {...name}
      >Имя</Input>
      <Input
        className="form-input"
        type='text'
        placeholder='Введите фамилию'
        {...surname}
      >Фамилия</Input>
      <Input
        className="form-input"
        type='text'
        placeholder='Введите отчество'
        {...fathername}
      >Отчество</Input>
      <Input
        className="form-input"
        type='tel'
        placeholder='Введите телефон'
        {...telephone}
      >Телефон</Input>
      <Input
        className="form-input"
        type='password'
        placeholder='Введите пароль'
        {...password}
      >Пароль</Input>
      <Input
        className="form-input"
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

export default observer(RegistrationForm);