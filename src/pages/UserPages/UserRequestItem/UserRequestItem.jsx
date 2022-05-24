import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Carousel } from 'react-carousel-minimal';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './UserRequestItem.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';

// получает новость из бэка по id переданному в роуте.

const UserRequestItem = () => {
  const {userStore} = useContext(Context);

  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState({});

  useEffect(() => {
    fetchOneNews(params.id).then((data) => {
      setNews(data);
      setIsLoading(false);
    })
  }, [])

  if (isLoading) {
    return (
      <Spinner />
    )}

  return ( 
    <div className={styles.outer}>
      
    </div>
  );
}

export default observer(NewsItem);