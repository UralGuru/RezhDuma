import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import Container from '../../../components/shared/Container/Container';
import InfoCard from '../../../components/shared/InfoCard/InfoCard';
import { REGISTRATION_ROUTE, REQUESTS_ROUTE } from '../../../utils/constants';

import styles from './AdminProfile.module.css';

function AdminProfile() {
  const navigate = useNavigate();
  const { userStore } = useContext(Context);

  return ( 
    <>
      <div className={styles.header}>
        <Container>
          {userStore.User.id != null &&
          <div className={styles.profile}>
            <div className={styles.profile_text}>{`${userStore.User.lastName} ${userStore.User.firstName} ${userStore.User.patronymic}`}</div>
            <a className={styles.profile_link} onClick={() => userStore.logout()}>Выйти</a>
          </div> 
          }
        </Container>
      </div>
      <div className={styles.main}>
        <Container>
          <div className={styles.card_row}>
            <InfoCard 
              title={"Вопросы и заявки"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => navigate(REQUESTS_ROUTE)}/>
            <InfoCard 
              title={"Обсуждения"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => navigate(REGISTRATION_ROUTE)}/>
            <InfoCard 
              title={"Голосования"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => navigate(REGISTRATION_ROUTE)}/>
          </div>
        </Container>
      </div>
    </>
  );
}

export default observer(AdminProfile);