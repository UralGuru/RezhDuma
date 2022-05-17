import React, { useEffect, useState } from 'react';
import Container from '../../components/shared/Container/Container';
import FAQCard from '../../components/shared/FAQCard/FAQCard';
import Input from '../../components/shared/Input/Input';
import Pagination from '../../components/shared/Pagination/Pagination';
import Select from '../../components/shared/Select/Select';
import useInput from '../../hooks/useInput';
import { fetchPopularRequests } from '../../http/requestApi';
import { REQUESTS_PER_ONE_PAGE, REQUEST_TOPICS } from '../../utils/constants';

import styles from './FAQPage.module.css';

const FAQPage = () => {

  const [requests, setRequests] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [page, setPage] = useState(1);

  const [sphere, setSphere] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const getRequests = () => {
    // fetchRequestsWithPagination(REQUESTS_PER_ONE_PAGE, page).then(data => {
    //   setRequests(data);
    // });
    fetchPopularRequests().then(data => setRequests(data))
  }

  useEffect(() => {
    getRequests();
  }, [page])

  useEffect(() => {
    fetchPopularRequests().then(data => setRequestsCount(data.length))
  }, [])

  return ( 
    <Container>
      <div className={styles.inner}>
        <h2>Часто задаваемые вопросы</h2>
        <div className={styles.navigation}>
          <div className={styles.dropdown}>
            <Select 
              placeholder={'Выберите сферу вопроса'}
              options={REQUEST_TOPICS}
                value={sphere}
                setValue={setSphere}
              />
          </div>
          <Input 
            className='page_search-input'
            placeholder='Поиск'
            value={searchQuery}
            onChange={onSearchChange}
            />
        </div>
        <div className={styles.outer}>
          {requests.map((n) => {
            return <FAQCard 
              key={n.id}
              id={n.id} 
              text={n.text} 
              appealDate={n.appealDate}
              responsibleName={n.responsibleName} 
              response={n.response} 
              responseDate={n.responseDate}
              filesNames={n.filesNames}
            />
          })}
          <Pagination
            page={page}
            setPage={setPage}
            totalCount={requestsCount}
            itemsPerPage={REQUESTS_PER_ONE_PAGE}
            />
        </div>
      </div>
    </Container>
  );
}

export default FAQPage;