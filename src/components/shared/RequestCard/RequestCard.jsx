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
          <div className={styles.topics_column}>
            <div className={styles.request_topics}>
              <div className={styles.request_date}>
                {moment(requestData?.appealDate).format('DD.MM.YY')}
              </div>
              {requestData?.district && <div className={styles.request_topic}>{requestData?.district}</div>}
              {requestData?.topic && <div className={styles.request_topic}>{requestData?.topic}</div>}
              {requestData?.type && <div className={styles.request_topic}>{requestData?.type}</div>}
            </div>
          </div>
          <div className={styles.request_status}>
            {requestData?.response ? 'Рассмотрено' : 'Ответить'}
          </div>
        </div>
        <div className={styles.request_content}>
          <div className={styles.request_text}>
            {requestData?.text}
          </div>
          <div className={styles.request_author}>
            Автор: {`${requestData?.requester?.lastName} ${requestData?.requester?.firstName} ${requestData?.requester?.patronymic}`}
          </div>
        </div>
      </div>
      <div className={styles.response}>
        <div className={styles.response_header}>
          <div className={styles.response_date}>
            {moment(requestData.responseDate).format('DD.MM.YYYY')}
          </div>
          <div className={styles.response_author}>
            Ответил: {requestData.responsibleName}
          </div>
        </div>
        <div className={styles.response_text}>
          {requestData.response}
        </div>
      </div>
      <div className={styles.button_row}>
        <button
          onClick={() => navigate(`${id}`)}
        >Развернуть</button>
        <button
          onClick={() => openModal()}
        >Редактировать</button>
      </div>
      <AnswerModal 
          requestData={requestData}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
    </div>
  );
}
 
export default observer(RequestCard);