import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import Container from '../../../components/shared/Container/Container';
import { fetchRequests } from '../../../http/requestApi';
import styles from './Analytics.module.css';

const Analytics = () => {

  const [requests, setRequests] = useState(0);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    fetchRequests().then((data) => {
      setRequests(data.length);
    })
    fetchRequests('', '', '', 'Рассмотренные').then((data) => {
      setAnswered(data.length);
    })
  }, [])

  return ( 
    <Container>
      <div className={styles.outer}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личный кабинет', 'path': '/profile'}, {'label': 'Статистика', 'path': '/admin/analytics'}]}/>
        <h2>Статистика</h2>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.all_count}>{requests}</div>
            <div className={styles.all_count_text}>вопросов поступило депутатам за все время, из которых:</div>
            <div className={styles.separator}></div>
            <div className={styles.answered_count}>{answered}</div>
            <div className={styles.answered_text}>Были рассмотрены</div>
            <div className={styles.not_answered_count}>{requests - answered}</div>
            <div className={styles.not_answered_text}>Находятся на стадии рассмотрения</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
 
export default Analytics;