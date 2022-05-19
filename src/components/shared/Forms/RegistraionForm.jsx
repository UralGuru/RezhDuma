import React, { useContext, useState } from 'react';
import useInput from '../../../hooks/useInput';
import Button from '../Button/Button';
import styles from './Form.module.css';
import Input from '../Input/Input';

import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField/TextField';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {userStore} = useContext(Context);

  const [status, setStatus] = useState('');

  if (status == 'loading') {
    return (
      <div className={styles.auth_form}>Загрузка...</div>
    )
  }

  if (status == 'registrated') {
  return (
    <div className={styles.auth_form}>{`Ссылка на подтверждение отправлена на email`}</div>
  )}

  if (status == 'error') {
    return (
      <div className={styles.auth_form}>При авторизации произошла ошибка...</div>
    )
  }

  return ( 
    <Formik
      initialValues={{
        email: '',
        name: '',
        surname: '',
        fathername: '',
        telephone: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={RegistrationSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={(values) => {
        setStatus('loading');
        userStore.registration(
          values.email, 
          values.password,
          values.telephone,
          values.name,
          values.surname,
          values.fathername
          ).then(res => {
            setStatus('registrated');
          }).catch(res => {
            setStatus('error');
          })
      }}  
    >
    {formik => (
      <Form className={styles.auth_form}>
        <div className={styles.auth_title}>Регистрация</div>
        <TextField 
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            label='Введите Email'
            placeholder='example@mail.com'
          />
        <TextField 
            name='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type='text'
            label='Введите имя'
            placeholder='Иван'
          />
        <TextField 
            name='surname'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
            type='text'
            label='Введите фамилию'
            placeholder='Иванов'
          />
        <TextField 
            name='fathername'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fathername}
            type='text'
            label='Введите отчество'
            placeholder='Иванович'
          />
        <TextField 
            name='telephone'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone}
            type='text'
            label='Введите номер телефона'
            placeholder='+79991234567'
          />
        <TextField 
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            label='Введите пароль'
            placeholder='Пароль'
          />
        <TextField 
            name='passwordConfirm'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            type='password'
            label='Подтвердите пароль'
            placeholder='Пароль'
          />
        <div className={styles.btn_row}>
          <Button
            className='primary'
            type='submit'
          >Зарегистрироваться
          </Button>
        </div>
      </Form>
    )}
    </Formik>
  )
}

export default observer(RegistrationForm);

const phoneRegex = `/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/`;
const RegistrationSchema = Yup.object({
  email: Yup.string()
    .email('Неправильный формат Email')
    .required('Необходимое поле'),
  name: Yup.string()
    .min(2, 'Слишком короткое имя')
    .max(32, 'Слишком длинное имя')
    .required('Необходимое поле'),
  surname: Yup.string()
    .min(2, 'Слишком короткая фамилия')
    .max(32, 'Слишком длинная фамилия')
    .required('Необходимое поле'),
  fathername: Yup.string()
    .min(2, 'Слишком короткое отчество')
    .max(32, 'Слишком длинное отчество')
    .required('Необходимое поле'),
  telephone: Yup.string()
    .max(12, 'Неправильный номер телефона')
    .min(11, 'Неправильный номер телефона')
    .required('Необходимое поле'),
  password: Yup.string()
    .min(4, 'Пароль должен содержать не менее 5 символов')
    .max(30, 'Пароль не может содержать больше 30 символов')
    .required('Необходимое поле'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Необходимое поле'),
})