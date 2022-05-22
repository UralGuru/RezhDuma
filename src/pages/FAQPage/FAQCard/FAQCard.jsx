import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import styles from './FAQCard.module.css';
import { getRequestById } from '../../../http/requestApi';

const FAQCard = ({requestData}) => {

  return ( 
    <div className={styles.request_card}>
      <div className={styles.request}>
        <div className={styles.request_header}>
          <div className={styles.request_date}>
            {moment(requestData?.appealDate).format('DD.MM.YYYY')}
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
        </div>
      </div>
      {requestData?.response && 
        <div className={styles.response}>
          <div className={styles.response_author}>{requestData.responsibleName}</div>
          <div className={styles.response_text}>{requestData.response}</div>
        </div>}
    </div>
  );
}
 
export default FAQCard;