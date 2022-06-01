import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './DocumentsItem.module.css';
import Button from '../../components/shared/Button/Button';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Container from '../../components/shared/Container/Container';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { fetchOneDocuments } from '../../http/documentsApi';
import EditDocument from '../../components/shared/DocumentsModals/EditDocument/EditDocument';
import DeleteDocument from '../../components/shared/DocumentsModals/DeleteDocument/DeleteDocument';

const DocumentsItem = () => {
  const {userStore} = useContext(Context);

  const params = useParams();

  const [editIsOpen, setEditIsOpen] = useState(false);
  const openEditModal = () => setEditIsOpen(true);
  const closeEditModal = () => setEditIsOpen(false);

  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const openDeleteModal = () => setDeleteIsOpen(true);
  const closeDeleteModal = () => setDeleteIsOpen(false);

  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState({});

  useEffect(() => {
    fetchOneDocuments(params.id).then((data) => {
      setDocument(data);
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
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Документы', 'path': '/documents'}]}/>
        <div className={styles.inner}>
          <div className={styles.date}>{moment(document.projectsDate).format('DD.MM.YYYY')}</div>
          <div className={styles.title}>{document.title}</div>
          <div className={styles.description}>{document.text}</div>
          {document.filesNames.length != 0 && document.filesNames.map((data) => {
              return (
                <div key={data} className={styles.files_container}><iframe src={data}/></div>
              )
            })
            }
          {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
            <div className={styles.button_row}>
              <Button
                onClick={openEditModal}
                className='primary-outline'
              >Редактировать</Button>
              <Button
                onClick={openDeleteModal}
                className='primary-outline'
              >Удалить документ</Button>
              <EditDocument id={params.id} modalIsOpen={editIsOpen} closeModal={closeEditModal}/>
              <DeleteDocument id={params.id} modalIsOpen={deleteIsOpen} closeModal={closeDeleteModal}/>
            </div>
          }
        </div>
      </div>
    </Container>
  );
}

export default observer(DocumentsItem);