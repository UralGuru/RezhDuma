import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './RequestCard.module.css';
import RequestModal from './RequestModal/EditModal/RequestModal';
import { getUserRequestById } from '../../../../http/requestApi';

const RequestCard = ({id}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const [request, setRequest] = useState({});

  useEffect(() => {
    getUserRequestById(id).then((data) => {
      setRequest(data);
    })
  }, [modalIsOpen]);

  return ( 
    <div className={styles.request_card}>
      <div className={styles.request}>
        <div className={styles.request_header}>
          <div>Ваш вопрос</div>
          <div className={styles.request_date}>{moment(request.appealDate).format('DD.MM.YYYY')}</div>
        </div>
        <div className={styles.request_text}>{request.text}</div>
      </div>
      {request?.response ? 
        <div className={styles.response}>
          <div className={styles.response_header}>
            <div className={styles.answered}>{'Вам ответил'}</div>
            <div className={styles.response_author}>{request.responsibleName}</div>
          </div>
          <div className={styles.response_text}>{request.response}</div>
        </div>
        :
        <div className={styles.response}>
          <div className={styles.response_header}>
            <div className={styles.waiting}>{'Ожидает ответа'}</div>
          </div>
          <button className={styles.edit_button} onClick={openModal}>Редактировать вопрос</button>
          <RequestModal modalIsOpen={modalIsOpen} closeModal={closeModal} requestData={request}/>
        </div>
        }
    </div>
  );
}
 
export default RequestCard;