import React, { useState } from 'react';
import moment from 'moment';
import styles from './RequestCard.module.css';
import RequestModal from './RequestModal/EditModal/RequestModal';

const RequestCard = ({requestData}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return ( 
    <div className={styles.request_card}>
      <div className={styles.request}>
        <div className={styles.request_header}>
          <div>Ваш вопрос</div>
          <div className={styles.request_date}>{moment(requestData.appealDate).format('DD.MM.YYYY')}</div>
        </div>
        <div className={styles.request_text}>{requestData.text}</div>
      </div>
      {requestData?.response ? 
        <div className={styles.response}>
          <div className={styles.response_header}>
            <div className={styles.answered}>{'Вам ответил'}</div>
            <div className={styles.response_author}>{requestData.responsibleName}</div>
          </div>
          <div className={styles.response_text}>{requestData.response}</div>
        </div>
        :
        <div className={styles.response}>
          <div className={styles.response_header}>
            <div className={styles.waiting}>{'Ожидает ответа'}</div>
          </div>
          <button className={styles.edit_button} onClick={openModal}>Редактировать вопрос</button>
          <RequestModal modalIsOpen={modalIsOpen} closeModal={closeModal} requestData={requestData}/>
        </div>
        }
    </div>
  );
}
 
export default RequestCard;