import React, { useContext } from 'react';
import Button from '../../components/shared/Button/Button';
import Container from '../../components/shared/Container/Container';

import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { FAQ_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, REQUEST_ROUTE } from '../../utils/constants';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import ProfileEntryCard from './ProfileEntryCard/ProfileEntryCard';

// сделать адаптивным
const Profile = () => {
  const navigate = useNavigate();
  const {userStore} = useContext(Context);

  return ( 
    <>
      <div className={styles.header_outer}>
        <Container>
          <div className={styles.header_inner}>
            <div className={styles.info}>
              <div className={styles.info_title}>Электронная приемная обращений граждан</div>
              <div className={styles.info_description}>
                Сервис предоставляет возможность отправить сообщение в форме электронного документа и 
                получить информацию о ходе расссмотрения поданных ранее обращений
              </div>
              <div className={styles.info_description}>
                Если у вас есть вопросы, то можете посмотреть 
                <a onClick={() => navigate(FAQ_ROUTE)}> <strong>список часто задаваемых вопросов</strong> </a> 
                либо задать его самостоятельно
              </div>
              <Button
                className='primary'
                onClick={() => {navigate(REQUEST_ROUTE)}}
                >Отправить обращение
              </Button>
            </div>  
            {userStore.User.id != null ?
            <div className={styles.profile}>
              <div className={styles.profile_text}>{`${userStore.User.lastName} ${userStore.User.firstName} ${userStore.User.patronymic}`}</div>
              <a className={styles.profile_link} onClick={() => userStore.logout()}>Выйти</a>
            </div> 
            :
            <ProfileEntryCard />
            }
          </div>
        </Container>
      </div>
      <div className={styles.main}>
        <Container>
          <div className={styles.card_row}>
            <InfoCard 
              title={"Мои вопросы и заявки"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => navigate(REGISTRATION_ROUTE)}/>
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

export default observer(Profile);