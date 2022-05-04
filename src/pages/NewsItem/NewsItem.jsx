import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';

import styles from './NewsItem.module.css';

// получает новость из бэка по id переданному в роуте.

const NewsItem = () => {
  const params = useParams();

  return ( 
    <Container>
      <div className={styles.outer}>
        <div>NewsItem number: {params.id}</div>
        <div className={styles.date}></div>
        <div className={styles.title}></div>
        <div className={styles.image}></div>
        <div className={styles.description}></div>
      </div>
    </Container>
  );
}

export default NewsItem;