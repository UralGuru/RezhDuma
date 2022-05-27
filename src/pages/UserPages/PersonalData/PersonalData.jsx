import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import Container from '../../../components/shared/Container/Container';
import { getUserData } from '../../../http/profileApi';
import { PASSWORD_EDIT_ROUTE, USER_EDIT_ROUTE } from '../../../utils/constants';

import styles from './PersonalData.module.css';

const PersonalData = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
      setStatus('success')
    })
  }, []);

  console.log(userData);

  if (status === 'loading') {
    return (
      <Container>
        <div className={styles.outer}>
          <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личные данные', 'path': '/user'}]}/>
          <h2>Личные данные</h2>
          <div className={styles.main}></div>
        </div>
      </Container>
    )
  }

  if (status === 'success') {

  return ( 
    <Container>
      <div className={styles.outer}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личные данные', 'path': '/user'}]}/>
        <h2>Личные данные</h2>
        <div className={styles.main}>
          <div className={styles.mobile_data}>
            <div className={styles.data_row}>
              <div className={styles.data_label}>Фамилия</div>
              <div className={styles.data_value}>{userData?.lastName}</div>
            </div>
            <div className={styles.data_row}>
              <div className={styles.data_label}>Имя</div>
              <div className={styles.data_value}>{userData?.firstName}</div>
            </div>
            <div className={styles.data_row}>
              <div className={styles.data_label}>Отчество</div>
              <div className={styles.data_value}>{userData?.patronymic}</div>
            </div>
            <div className={styles.data_row}>
              <div className={styles.data_label}>Адрес электронной почты</div>
              <div className={styles.data_value}>{userData?.email}</div>
            </div>
            <div className={styles.data_row}>
              <div className={styles.data_label}>Контактный телефон</div>
              <div className={styles.data_value}>{userData?.phone}</div>
            </div>
            <div className={styles.button_row}>
              <button onClick={() => {navigate(USER_EDIT_ROUTE)}}>Редактировать профиль</button>
              <button onClick={() => {navigate(PASSWORD_EDIT_ROUTE)}}>Сменить пароль</button>
            </div>
          </div>
          <div className={styles.data_column}>
            <div className={styles.data_label}>Фамилия</div>
            <div className={styles.data_label}>Имя</div>
            <div className={styles.data_label}>Отчество</div>
            <div className={styles.data_label}>Адрес электронной почты</div>
            <div className={styles.data_label}>Контактный телефон</div>
          </div>
          <div className={styles.data_column}>
            <div className={styles.data_value}>{userData?.lastName}</div>
            <div className={styles.data_value}>{userData?.firstName}</div>
            <div className={styles.data_value}>{userData?.patronymic}</div>
            <div className={styles.data_value}>{userData?.email}</div>
            <div className={styles.data_value}>{userData?.phone}</div>
            <div className={styles.button_row}>
              <button onClick={() => {navigate(USER_EDIT_ROUTE)}}>Редактировать профиль</button>
              <button onClick={() => {navigate(PASSWORD_EDIT_ROUTE)}}>Сменить пароль</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )};
}
 
export default PersonalData;