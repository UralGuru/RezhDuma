import React, { useEffect, useState } from 'react';
import Container from '../../../components/shared/Container/Container';
import Input from '../../../components/shared/Input/Input';
import Select from '../../../components/shared/Select/Select';
import { fetchAllRequests } from '../../../http/requestApi';
import { REQUEST_DISTRICTS, REQUEST_STATUS, REQUEST_TOPICS, REQUEST_TYPES } from '../../../utils/constants';

import styles from './Requests.module.css';

const Requests = () => {

  const [requests, setRequests] = useState([]);
  const [statusQuery, setStatusQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [districtQuery, setDistrictQuery] = useState('');
  const [topicQuery, setTopicQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');

  useEffect(() => {
    fetchAllRequests(typeQuery, topicQuery, districtQuery).then(data => {
      console.log(data);
      setRequests(data);
    })
  }, [])


  return ( 
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Вопросы</h2>
          <Input
            className="page_search-input"
            placeholder="Поиск"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Select
            options={REQUEST_DISTRICTS}
            value={districtQuery}
            setValue={setDistrictQuery}
            placeholder={"Выберите район"}
          />
          <Select
            options={REQUEST_TOPICS}
            value={topicQuery}
            setValue={setTopicQuery}
            placeholder={"Выберите сферу"}
          />
          <Select
            options={REQUEST_TYPES}
            value={typeQuery}
            setValue={setTypeQuery}
            placeholder={"Выберите тип"}
          />
        </div>
        <div className={styles.main}>
          <Select
            options={REQUEST_STATUS}
            isSearchable={false}
            value={statusQuery}
            setValue={setStatusQuery}
          />
          <div className={styles.requests}>
            {requests.map((req) => {
              return <div>{req.id} {req.text}</div>
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Requests;