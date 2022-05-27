import React, { useContext, useEffect, useState } from 'react';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import Container from '../../../../components/shared/Container/Container';
import { editUserData, getUserData } from '../../../../http/profileApi';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import styles from './PersonalDataEdit.module.css';
import { TextField } from '../../../../components/shared/Forms/TextField/TextField';
import Button from '../../../../components/shared/Button/Button';
import { ROOT_ROUTE, USER_ROUTE } from '../../../../utils/constants';
import Modal from 'react-modal/lib/components/Modal';
import { Context } from '../../../..';
import { observer } from 'mobx-react-lite';

const PersonalDataEdit = () => {
  Modal.setAppElement('#root');

  const {userStore} = useContext(Context);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const navigate = useNavigate();

  const [userData, setUserData] = useState();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
      setStatus('success')
    })
  }, []);

  if (status === 'loading') {
    return (
      <Container>
        <div className={styles.outer}>
          <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личные данные', 'path': '/user'}, {'label': 'Редактирование', 'path': '/user/edit'}]}/>
          <h2>Редактирование профиля</h2>
          <div className={styles.main}></div>
        </div>
      </Container>
    )
  }

  if (status === 'success') {
  return ( 
    <Container>
      <div className={styles.outer}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личные данные', 'path': '/user'}, {'label': 'Редактирование', 'path': '/user/edit'}]}/>
        <h2>Редактирование профиля</h2>
        <Formik
          initialValues={{
            email: userData.email,
            name: userData.firstName,
            surname: userData.lastName,
            fathername: userData.patronymic,
            telephone: userData.phone,
          }}
          validationSchema={EditSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values) => {
            editUserData({
              'email': values.email,
              "phone": values.telephone,
              "firstName": values.name,
              "lastName": values.surname,
              "patronymic": values.fathername
            }).then((data) => {
              if (values.email !==  userData.email) {
                userStore.logout();
              } else {
                userStore.checkAuth();
              }
              openModal()
            })
          }}  
        >
        {formik => (
          <Form className={styles.main}>
            <TextField 
                name='surname'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surname}
                type='text'
                label='Фамилия'
              />
            <TextField 
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                type='text'
                label='Имя'
              />
            <TextField 
                name='fathername'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathername}
                type='text'
                label='Отчество'
              />
            <TextField 
                name='telephone'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telephone}
                type='text'
                label='Контактный номер'
              />
              <TextField 
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type='email'
                label='Адрес электронной почты'
              />
              <div>Внимание: при изменении адреса электронной почты, его нужно будет подтвердить</div>
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
                  {(formik.values.email ===  userData.email) 
                  ?
                    <button onClick={() => navigate(USER_ROUTE)}>Вернуться в профиль</button>
                  :
                    <>
                      <div>Необходимо подтвердить новый email</div>
                      <div>Письмо подтверждения выслано на новую почту: <strong className={styles.email}>{formik.values.email}</strong></div>
                      <div>После подтверждения необходимо авторизоваться</div>
                      <button onClick={() => navigate(ROOT_ROUTE)}>Вернуться на главную</button>
                    </>
                  }
                </div>
              </div>
            </Modal>
          </Form>
        )}
        </Formik>
      </div>
    </Container>
  )};
}
 
export default observer(PersonalDataEdit);

const EditSchema = Yup.object({
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
    .required('Необходимое поле')
})