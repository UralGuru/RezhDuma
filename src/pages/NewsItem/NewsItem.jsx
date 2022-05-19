import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Carousel } from 'react-carousel-minimal';
import { useParams } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { fetchOneNews } from '../../http/newsApi';
import moment from 'moment';

import styles from './NewsItem.module.css';

// получает новость из бэка по id переданному в роуте.

const NewsItem = () => {

  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState({});

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
      <div className={styles.date}>{moment(news.newsDate).format('DD.MM.YYYY')}</div>
      <div className={styles.title}>{news.title}</div>
      {news.filesNames.length != 0 &&
        <Carousel 
        data={news.filesNames.map((data) => {
          return {'image': data}
        })}
        width="700px"
        height="400px"
        captionStyle={{
          fontSize: '2rem',
          fontWeight: '700',
        }}
        radius="1rem"
        slideNumber={true}
        slideNumberStyle={{
          fontSize: '1.5rem',
          fontWeight: '700',
        }}
        captionPosition="bottom"
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={true}
        thumbnailWidth="100px"
        style={{
          textAlign: "center",
          maxWidth: "100%",
        }}
      />}
      <div className={styles.description}>{news.text}</div>
    </div>
  );
}

export default NewsItem;