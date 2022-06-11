import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import InfoCard from '../../../components/shared/InfoCard/InfoCard';
import { REGISTRATION_ROUTE, ADMIN_REQUESTS_ROUTE, FAQ_ROUTE, ADMIN_VOTINGS_ROUTE, VOTINGS_ROUTE, ANALYTICS_ROUTE } from '../../../utils/constants';

import styles from './AdminProfile.module.css';

function AdminProfile() {
  const navigate = useNavigate();
  const { userStore } = useContext(Context);

  return ( 
    <div className={styles.profile_outer}>
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
                onClick={() => {navigate(ADMIN_REQUESTS_ROUTE)}}
                >Посмотреть обращения граждан
              </Button>
            </div>  
          </div>
        </Container>
      </div>
      <div className={styles.main}>
        <Container>
          <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личный кабинет', 'path': '/profile'}]} /> 
          <div className={styles.card_row}>
            <InfoCard 
              title={"Вопросы и заявки"}
              description={"Контроль за ходом рассмотрения обращения"}
              onClick={() => navigate(ADMIN_REQUESTS_ROUTE)}/>
            <InfoCard 
              title={"Статистика"}
              description={"Просмотр статистики по обращениям"}
              onClick={() => navigate(ANALYTICS_ROUTE)}/>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default observer(AdminProfile);