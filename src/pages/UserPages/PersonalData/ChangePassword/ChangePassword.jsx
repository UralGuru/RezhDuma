import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './ChangePassword.module.css';
import Modal from 'react-modal/lib/components/Modal';
import Container from '../../../../components/shared/Container/Container';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import Button from '../../../../components/shared/Button/Button';
import { TextField } from '../../../../components/shared/Forms/TextField/TextField';
import { USER_ROUTE } from '../../../../utils/constants';
import { changeUserPassword } from '../../../../http/profileApi';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';

const ChangePassword = () => {
  Modal.setAppElement('#root');

  const {userStore} = useContext(Context);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const navigate = useNavigate();

  return ( 
    <Container>
      <div className={styles.outer}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личные данные', 'path': '/user'}, {'label': 'Изменить пароль', 'path': '/user/edit'}]}/>
        <h2>Изменение пароля</h2>
        <Formik
          initialValues={{
            password: '',
            newPassword: '',
            passwordConfirm: ''
          }}
          validationSchema={EditSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values) => {
            const request = new FormData();
            request.append('password', values.password);
            request.append('newPassword', values.newPassword);
            changeUserPassword(request).then((data) => {
              userStore.logout();
              openModal();
            })
          }}  
        >
        {formik => (
          <Form className={styles.main}>
            <TextField 
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type='password'
              label='Старый пароль'
              placeholder='Старый пароль'
            />
            <TextField 
              name='newPassword'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              type='password'
              label='Новый пароль'
              placeholder='Пароль'
            />
            <TextField 
              name='passwordConfirm'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              type='password'
              label='Подтвердите новый пароль'
              placeholder='Подтвердите новый пароль'
            />
            <div className={styles.button_row}>
              <Button
                className='primary-outline'
                onClick={() => {navigate(-1)}}
              >Назад</Button>
              <Button
                className='primary'
                type='submit'
              >Сохранить
              </Button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                overlay: {position: 'fixed',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.4)'},
                content: {top: '50%',left: '50%',right: 'auto',bottom: 'auto',borderRadius: '1rem',marginRight: '-50%',transform: 'translate(-50%, -50%)'},
              }}>
              <div className={styles.modal}>
                <div className={styles.modal_header}>Ваши данные успешно изменены</div>
                <div className={styles.modal_content}>
                  <div>Письмо с подтверждением нового пароля выслано на вашу электронную почту</div>
                  <div>После подтверждения необходимо авторизоваться</div>
                  <button onClick={() => navigate(USER_ROUTE)}>Вернуться на главную</button>
                </div>
              </div>
            </Modal>
          </Form>
        )}
        </Formik>
      </div>
    </Container>
  );
}
 
export default observer(ChangePassword);

const EditSchema = Yup.object({
  password: Yup.string()
    .min(4, 'Пароль должен содержать не менее 5 символов')
    .max(30, 'Пароль не может содержать больше 30 символов')
    .required('Необходимое поле'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают')
    .required('Необходимое поле'),
  newPassword: Yup.string()
    .min(4, 'Пароль должен содержать не менее 5 символов')
    .max(30, 'Пароль не может содержать больше 30 символов')
    .notOneOf([Yup.ref('password'), null], 'Новый пароль не должен совпадать со старым')
    .required('Необходимое поле'),
})