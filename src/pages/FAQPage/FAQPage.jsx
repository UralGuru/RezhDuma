import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import styles from './FAQPage.module.css';
import axios from 'axios';
import classNames from 'classnames/bind';
import { fetchPopularRequests } from '../../http/requestApi';
import Input from '../../components/shared/Input/Input';
import Select from '../../components/shared/Select/Select';
import { REQUESTS_PER_ONE_PAGE, REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../utils/constants';
import Container from '../../components/shared/Container/Container';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Pagination from '../../components/shared/Pagination/Pagination';
import FAQCard from './FAQCard/FAQCard';

let cx = classNames.bind(styles);

const FAQPage = () => {

  const [requests, setRequests] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [page, setPage] = useState(1);

  const [statusQuery, setStatusQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [districtQuery, setDistrictQuery] = useState('');
  const [topicQuery, setTopicQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');

  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    let unmounted = false;
    fetchPopularRequests(
      typeQuery, 
      topicQuery, 
      districtQuery,
      searchQuery, 
      '', 
      '')
    .then(data => {
      if (!unmounted) {
        setRequestsCount(data.length);
      }
    });
    return () => unmounted = true;
  }, [searchQuery, districtQuery, topicQuery, typeQuery])

  useEffect(() => {
    let unmounted = false;
    fetchPopularRequests(
      typeQuery, 
      topicQuery, 
      districtQuery,
      searchQuery, 
      page, 
      REQUESTS_PER_ONE_PAGE)
    .then(data => {
      if (!unmounted) {
        setRequests(data);
      }
    });
    return () => unmounted = true;
  }, [page, searchQuery, districtQuery, topicQuery, typeQuery])

  useEffect(() => {
    setPage(1);
  }, [searchQuery, districtQuery, topicQuery, typeQuery]);

  return ( 
    <>
      <div className={cx('sidebar', {'expanded': sidebarToggle}, {'not_expanded': !sidebarToggle})}>
          <div className={styles.sidebar_inner}>
            <h2>Вопросы</h2>
            <Input
              className="page_search-input"
              placeholder="Поиск"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className={styles.filter_select}>
              <div className={styles.filter_header}>Микрорайон</div>
              <Select
                options={REQUEST_DISTRICTS}
                value={districtQuery}
                setValue={setDistrictQuery}
                placeholder={"Район обращения"}
              />
            </div>
            <div className={styles.filter_select}>
              <div className={styles.filter_header}>Сфера обращения</div>
              <Select
                options={REQUEST_TOPICS}
                value={topicQuery}
                setValue={setTopicQuery}
                placeholder={"Сфера деятельности"}
              />
            </div>
            <div className={styles.filter_select}>
              <div className={styles.filter_header}>Тип обращения</div>
              <Select
                options={REQUEST_TYPES}
                value={typeQuery}
                setValue={setTypeQuery}
                placeholder={"Тип обращения"}
              />
            </div>
          </div>
          <div 
            role={'button'}
            onClick={() => setSidebarToggle(false)}
            className={styles.toggle_close}
            ><FiChevronLeft />
          </div>
        </div>
    <Container>
      <div className={styles.container}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личный кабинет', 'path': '/profile'}, {'label': 'Часто задаваемые вопросы', 'path': '/faq'}]}/> 
        <h2>Вопросы</h2>
        <div className={styles.selectors}>
          <div 
            role={'button'}
            onClick={() => setSidebarToggle(true)}
            className={styles.toggle_open}
            ><FiChevronRight />
          </div>
          <div>

          </div>
        </div>
        <div className={styles.wrapper}>  
          <div className={styles.filtration}>
            <Input
              className="page_search-input"
              placeholder="Поиск"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className={styles.filter_select}>
              <div className={styles.filter_header}>Микрорайон</div>
              <Select
                options={REQUEST_DISTRICTS}
                value={districtQuery}
                setValue={setDistrictQuery}
                placeholder={"Район обращения"}
              />
            </div>
            <div className={styles.filter_select}>
              <div className={styles.filter_header}>Сфера обращения</div>
              <Select
                options={REQUEST_TOPICS}
                value={topicQuery}
                setValue={setTopicQuery}
                placeholder={"Сфера деятельности"}
              />
            </div>
            <div className={styles.filter_select}>
              <div className={styles.filter_header}>Тип обращения</div>
              <Select
                options={REQUEST_TYPES}
                value={typeQuery}
                setValue={setTypeQuery}
                placeholder={"Тип обращения"}
              />
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.requests}>
              {requests.map((req) => {
                return <FAQCard requestData={req} key={req.id}/>
              })}
            </div>
            <Pagination 
              page={page}
              setPage={setPage}
              totalCount={requestsCount}
              itemsPerPage={REQUESTS_PER_ONE_PAGE}
            />
          </div>
        </div>
      </div>
    </Container>
    </>
  );
}

export default FAQPage;