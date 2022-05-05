import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import NewsCard from '../../../components/shared/NewsCard/NewsCard';
import { NEWS_ROUTE } from '../../../utils/constants';
import { observer } from 'mobx-react-lite';

import styles from "./News.module.css";
import { Context } from '../../..';


const News = observer(() => {
  const {newsStore} = useContext(Context);
  const navigate = useNavigate();

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
            {newsStore.News.map((newsItem) => {
              return <NewsCard 
                  id={newsItem.id}
                  title={newsItem.title}
                  description={newsItem.text}
                  imageSrc={newsItem.imageSrc}
                  date={newsItem.date}
                  key={newsItem.id}
                />
              })}
          </div>
        </div>
      </Container>
  );
})

export default News;