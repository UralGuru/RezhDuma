import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Carousel } from 'react-carousel-minimal';
import { useParams } from 'react-router-dom';
import { deleteNews, fetchOneNews } from '../../http/newsApi';
import moment from 'moment';

import styles from './NewsItem.module.css';
import Button from '../../components/shared/Button/Button';
import EditNews from '../../components/shared/NewsModals/EditNews/EditNews';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import DeleteNews from '../../components/shared/NewsModals/DeleteNews/DeleteNews';
import Container from '../../components/shared/Container/Container';

// получает новость из бэка по id переданному в роуте.

const NewsItem = () => {
  const {userStore} = useContext(Context);

  const params = useParams();

  const [editIsOpen, setEditIsOpen] = useState(false);
  const openEditModal = () => setEditIsOpen(true);
  const closeEditModal = () => setEditIsOpen(false);

  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const openDeleteModal = () => setDeleteIsOpen(true);
  const closeDeleteModal = () => setDeleteIsOpen(false);

  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState({});

  useEffect(() => {
    fetchOneNews(params.id).then((data) => {
      setNews(data);
      setIsLoading(false);
    })
  }, [editIsOpen])

  if (isLoading) {
    return (
      <Spinner />
    )}

  return ( 
    <Container>
      <div className={styles.outer}>
        <div className={styles.date}>{moment(news.newsDate).format('DD.MM.YYYY')}</div>
        <div className={styles.title}>{news.title}</div>
        {news.filesNames.length != 0 &&
          <Carousel 
          data={news.filesNames.map((data) => {
            return {'image': data}
          })}
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
            margin: "0 auto"
          }}
        />}
        <div className={styles.description}>{news.text}</div>
        
        {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
          <div className={styles.button_row}>
            <Button
              onClick={openEditModal}
              className='primary-outline'
            >Редактировать</Button>
            <Button
              onClick={openDeleteModal}
              className='primary-outline'
            >Удалить новость</Button>
            <EditNews id={params.id} modalIsOpen={editIsOpen} closeModal={closeEditModal}/>
            <DeleteNews id={params.id} modalIsOpen={deleteIsOpen} closeModal={closeDeleteModal}/>
          </div>
        }
      </div>
    </Container>
  );
}

export default observer(NewsItem);