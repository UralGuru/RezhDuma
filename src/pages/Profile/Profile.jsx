import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/shared/Button/Button';
import Container from '../../components/shared/Container/Container';

import styles from './Profile.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_PROFILE_ROUTE, FAQ_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, REQUESTS_ROUTE, REQUEST_ROUTE } from '../../utils/constants';
import InfoCard from '../../components/shared/InfoCard/InfoCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import ProfileEntryCard from './ProfileEntryCard/ProfileEntryCard';


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
            {localStorage.getItem('access-token') ?
            <div>
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
              onClick={() => navigate(REQUESTS_ROUTE)}/>
            <InfoCard 
              title={"Обсуждения"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => {}}/>
            <InfoCard 
              title={"Голосования"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => navigate(REGISTRATION_ROUTE)}/>
          </div>
        </Container>
      </div>
    </>
   )
}

export default observer(Profile);