import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import Card from '../../../components/shared/Card/Card';
import { NEWS_ROUTE } from '../../../utils/constants';
import { observer } from 'mobx-react-lite';

import styles from "./News.module.css";
import { fetchNews } from '../../../http/newsApi';


const News = observer(() => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews(3, 1).then(data => {
      setNews(data);
    })
  }, [])

  return ( 
      <Container>
        <div className={styles.outer}>
          <div className={styles.button_row}>
            <Button 
              className='secondary-outline'
              onClick={() => navigate(NEWS_ROUTE)}
              >{"Все новости -->"}</Button>
          </div>
          <div className={styles.header}>Новости</div>
          <div className={styles.news_intro}>
            {news.map((n) => {
              return <Card 
                key={n.id}
                id={n.id}
                title={n.title}
                description={n.text}
                date={n.newsDate}
                image={n.filesNames[0]}
              />
            })}
          </div>
        </div>
      </Container>
  );
})

export default News;