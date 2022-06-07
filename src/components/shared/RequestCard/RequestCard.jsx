import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import styles from './RequestCard.module.css';
import Button from '../Button/Button';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextAreaField from '../Forms/TextAreaField/TextAreaField';
import { Context } from '../../..';
import { createAnswerToRequest, getRequestById } from '../../../http/requestApi';
import AnswerModal from './AnswerModal/AnswerModal';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({id}) => {
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const {userStore} = useContext(Context);

  const [requestData, setRequestData] = useState({});

  useEffect(() => {
    getRequestById(id).then((data) => {
      setRequestData(data);
    });
  }, [modalIsOpen]);

  return ( 
    <div className={styles.request_card}>
      <div className={styles.request}>
        <div className={styles.request_header}>
          <button className={styles.request_link} onClick={() => navigate(`${id}`)}>Развернуть</button>
          <div className={styles.request_date}>
            {moment(requestData?.appealDate).format('DD.MM.YYYY')}
          </div>
          <div>
            От: {`${requestData?.requester?.lastName} ${requestData?.requester?.firstName}`}
          </div>
          <div className={styles.request_text}>
            {requestData?.text}
          </div>
          <div className={styles.request_topics}>
            {requestData?.district && <div className={styles.request_topic}>{requestData?.district}</div>}
            {requestData?.topic && <div className={styles.request_topic}>{requestData?.topic}</div>}
            {requestData?.type && <div className={styles.request_topic}>{requestData?.type}</div>}
          </div>
        </div>
        <div className={styles.button_column}>
          <Button
            className='primary-outline'
            onClick={requestData?.response ? () => {} : openModal}
            >{requestData?.response ? 'Рассмотрено' : 'Ответить'}
          </Button>
        </div>
        <AnswerModal 
          requestData={requestData}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </div>
      {requestData?.response && 
        <div className={styles.response}>
          <div className={styles.response_date}>{moment(requestData.responseDate).format('DD.MM.YYYY')}</div>
          <div className={styles.response_author}>Ответил {requestData.responsibleName}:</div>
          <div className={styles.response_text}>{requestData.response}</div>
          <div className={styles.edit_button} role={"button"} onClick={openModal}>Редактировать</div>
        </div>}
    </div>
  );
}
 
export default observer(RequestCard);