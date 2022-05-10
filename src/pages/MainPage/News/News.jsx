import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import NewsCard from '../../../components/shared/NewsCard/NewsCard';
import { NEWS_ROUTE } from '../../../utils/constants';
import { observer } from 'mobx-react-lite';

import styles from "./News.module.css";
import { fetchNewsWithPagination } from '../../../http/newsApi';


const News = observer(() => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNewsWithPagination(3, 1).then(data => {
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
              return <NewsCard 
                id={n.id}
                title={n.title}
                description={n.text}
                date={n.newsDate}
                imageSrc={n.filesNames[0]}
              />
            })}
          </div>
        </div>
      </Container>
  );
})

export default News;