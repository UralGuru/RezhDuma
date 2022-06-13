import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import Container from '../../../components/shared/Container/Container';
import { fetchRequests } from '../../../http/requestApi';
import styles from './Analytics.module.css';
import { REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../../utils/constants';
import CircleDiagram from '../../../components/CircleDiagram/CircleDiagram';
import BarDiagram from '../../../components/BarDiagram/BarDiagram';

function Counter(array) {
  var count = {};
  array.forEach(val => count[val] = (count[val] || 0) + 1);
  var items = Object.keys(count).map(function(key) {
    return [key, count[key]];
  });
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  return items;
} // функция Counter из python

const Analytics = () => {

  const [requests, setRequests] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [districtCounter, setDistrictCounter] = useState([]);
  const [topicCounter, setTopicCounter] = useState([]);
  const [typeCounter, setTypeCounter] = useState([]);

  useEffect(() => {
    fetchRequests().then((data) => {
      setRequests(data.length);
    })
    fetchRequests('', '', '', 'Рассмотренные').then((data) => {
      setAnswered(data.length);
    })
    fetchRequests().then(data => {
      setDistrictCounter(Counter(data.filter((e) => REQUEST_DISTRICTS.map(v => v.label).indexOf( e.district) !== -1).map((e) => e.district)));
      setTypeCounter(Counter(data.filter((e) => REQUEST_TYPES.map(v => v.label).indexOf( e.type) !== -1).map((e) => e.type)));
      setTopicCounter(Counter(data.filter((e) => REQUEST_TOPICS.map(v => v.label).indexOf( e.topic) !== -1).map((e) => e.topic)));
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
          <div className={styles.diagramm}>
            <CircleDiagram
              data={{
                labels: districtCounter.map((item) => item[0]),
                datasets: [{
                    data: districtCounter.map((item) => item[1]),
                    label: "Микрорайон",
                    backgroundColor: ["#2F6FAABB", "#01CC9BBB", "#81D62ABB", "#3EB1EABB", "#2FCD52BB", "#476AE4BB"],
                    hoverBackgroundColor: ["#2F6FAA", "#01CC9B", "#81D62A", "#3EB1EA", "#2FCD52", "#476AE4"]
                }]
              }}
              title="По микрорайонам"
            />  
          </div>
          <div className={styles.diagramm}>
            <CircleDiagram
              data={{
                labels: typeCounter.map((item) => item[0]),
                datasets: [{
                    data: typeCounter.map((item) => item[1]),
                    label: "Тип обращения",
                    backgroundColor: ["#2F6FAABB", "#01CC9BBB", "#81D62ABB", "#3EB1EABB"],
                    hoverBackgroundColor: ["#2F6FAA", "#01CC9B", "#81D62A", "#3EB1EA"]
                }]
              }}
              title="По типу обращения"
            />
          </div>
          <div className={styles.diagramm}>
            <BarDiagram
              data={{
                labels: topicCounter.map((item) => item[0]),
                datasets: [{
                  barPercentage: 0.3,
                  data: topicCounter.map((item) => item[1]),
                  backgroundColor: [
                    '#3EB1EA',
                  ],
                  borderWidth: 1
                }]}}
              title="По сфере обращения"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
 
export default Analytics;