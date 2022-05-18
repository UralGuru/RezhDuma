import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../../utils/constants';
import Button from '../Button/Button';
import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField/TextField';

const LoginForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('unauthorizated');
  const { userStore } = useContext(Context);

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
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      validateOnBlur={true}
      validateOnChange={false}
      
      onSubmit={(values) => {
        setStatus('loading');
        const data = new FormData();
        data.append('email', values.email);
        data.append('password', values.password);
        userStore.login(data).then(res => {
          setStatus('authorizated');
        }).catch(res => {
          console.log('error');
          setStatus('error');
        })
      }}
    >
      {formik => (
        <Form className={styles.auth_form}>
          <div className={styles.auth_title}>{"Личный кабинет"}</div>
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
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            label='Введите пароль'
            placeholder='Пароль'
          />
          <a href="#" className={styles.auth_forgot}>Забыли пароль?</a>
          {formik.errors && formik.submitCount != 0 && <div className={styles.error}>Неверный Email или пароль</div>}
          <div className={styles.btn_row}>
            <Button 
              className='primary'
              type="submit"
              >Войти
            </Button>
            <Button
              className=''
              type="button"
              onClick={() => navigate(REGISTRATION_ROUTE)}
            >Регистрация
            </Button>
          </div>
        </Form>
        
      )}
        {/* <Form className={styles.auth_form} onSubmit={handleSubmit}>
          <div className={styles.auth_title}>{"Личный кабинет"}</div>
          <Input
            name="email"
            className="form-input"
            type='email'
            placeholder='Введите Email'
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
          >Email</Input>
          <Input
            name="password"
            className="form-input"
            type='password'
            placeholder='Введите пароль'
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
          >Пароль</Input>
          <a href="#" className={styles.auth_forgot}>Забыли пароль?</a>
          <div className={styles.btn_row}>
            <Button 
              className='primary'
              type="submit"
              >Войти
            </Button>
            <Button
              className=''
              onClick={() => navigate(REGISTRATION_ROUTE)}
            >Регистрация
            </Button>
          </div>
        </Form> */}
    </Formik>
  );
}

export default observer(LoginForm);


const LoginSchema = Yup.object({
  email: Yup.string()
    .email('Неправильный формат Email')
    .required('Необходимое поле'),
  password: Yup.string()
    .min(5, 'Пароль должен содержать не менее 5 символов')
    .max(30, 'Пароль не может содержать больше 30 символов')
    .required('Необходимое поле'),
})
  