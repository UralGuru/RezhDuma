import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Carousel } from 'react-carousel-minimal';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './ProjectItem.module.css';
import Button from '../../components/shared/Button/Button';
import EditNews from '../../components/shared/NewsModals/EditNews/EditNews';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import DeleteNews from '../../components/shared/NewsModals/DeleteNews/DeleteNews';
import Container from '../../components/shared/Container/Container';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { fetchOneProject } from '../../http/projectsApi';
import EditProject from '../../components/shared/ProjectModals/EditProject/EditProject';
import DeleteProject from '../../components/shared/ProjectModals/DeleteProject/DeleteProject';

const ProjectItem = () => {
  const {userStore} = useContext(Context);

  const params = useParams();

  const [editIsOpen, setEditIsOpen] = useState(false);
  const openEditModal = () => setEditIsOpen(true);
  const closeEditModal = () => setEditIsOpen(false);

  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const openDeleteModal = () => setDeleteIsOpen(true);
  const closeDeleteModal = () => setDeleteIsOpen(false);

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState({});

  useEffect(() => {
    fetchOneProject(params.id).then((data) => {
      setProjects(data);
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
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Проекты', 'path': '/projects'}]}/>
        <div className={styles.inner}>
          <div className={styles.date}>{moment(projects.projectsDate).format('DD.MM.YYYY')}</div>
          <div className={styles.title}>{projects.title}</div>
          {projects.filesNames.length != 0 &&
            <Carousel 
            data={projects.filesNames.map((data) => {
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
          <div className={styles.description}>{projects.text}</div>
          
          {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
            <div className={styles.button_row}>
              <Button
                onClick={openEditModal}
                className='primary-outline'
              >Редактировать</Button>
              <Button
                onClick={openDeleteModal}
                className='primary-outline'
              >Удалить проект</Button>
              <EditProject id={params.id} modalIsOpen={editIsOpen} closeModal={closeEditModal}/>
              <DeleteProject id={params.id} modalIsOpen={deleteIsOpen} closeModal={closeDeleteModal}/>
            </div>
          }
        </div>
      </div>
    </Container>
  );
}

export default observer(ProjectItem);