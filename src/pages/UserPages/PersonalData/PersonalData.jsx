import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import Container from '../../../components/shared/Container/Container';
import { getUserData } from '../../../http/profileApi';

import styles from './PersonalData.module.css';

const PersonalData = () => {

  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
    })
  }, []);

  console.log(userData);

  return ( 
    <Container>
      <div className={styles.outer}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личные данные', 'path': '/user'}]}/>
        <h2>Личные данные</h2>
        <div className={styles.main}>
          <div className={styles.label}>Фамилия</div>
          <div className={styles.data_value}>{userData?.lastName}</div>
          <div className={styles.label}>Имя</div>
          <div className={styles.data_value}>{userData?.firstName}</div>
          <div className={styles.label}>Отчество</div>
          <div className={styles.data_value}>{userData?.patronymic}</div>
          <div className={styles.label}>Адрес электронной почты</div>
          <div className={styles.data_value}>{userData?.email}</div>
          <div className={styles.label}>Контактный телефон</div>
          <div className={styles.data_value}>{userData?.phone}</div>
        </div>
      </div>
    </Container>

  );
}
 
export default PersonalData;