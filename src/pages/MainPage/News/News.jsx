import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import NewsCard from '../../../components/shared/NewsCard/NewsCard';
import { NEWS_ROUTE } from '../../../utils/constants';

import styles from "./News.module.css";


const News = () => {
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
          <NewsCard 
            title="Кинолог рассказал, как помочь собаке снять стресс" 
            description="Также жизнь собаки стоит окружить привычными для нее ритуалами, чтобы она понимала, что ее сейчас ждет. Выгуливать и кормить питомца лучше всегда в одно и то же время. Кроме того, не стоитзабывать хвалить собаку за соблюдение правил.Похвала – это еще один фактор, который создает вжизни питомца предсказуемость."
            date="22.03.2022"
            image="dsadas"
            />
          <NewsCard 
            title="Кинолог рассказал, как помочь собаке снять стресс" 
            description="Также жизнь собаки стоит окружить привычными для нее ритуалами, чтобы она понимала, что ее сейчас ждет. Выгуливать и кормить питомца лучше всегда в одно и то же время. Кроме того, не стоитзабывать хвалить собаку за соблюдение правил.Похвала – это еще один фактор, который создает вжизни питомца предсказуемость."
            date="22.03.2022"
            image="dsad"
            />
        </div>
      </Container>
  );
}

export default News;