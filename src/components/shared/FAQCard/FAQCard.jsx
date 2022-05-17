import moment from 'moment';
import React from 'react';

import styles from './FAQCard.module.css';

const FAQCard = ({id, text, appealDate, responsibleName, response, responseDate, filesNames}) => {
  return ( 
    <div className={styles.card}>
      <div className={styles.question}>
        <div className={styles.date}>{moment(appealDate).format('DD.MM.YYYY')}</div>
        <div className={styles.question_text}>{text}</div>
      </div>
      <div className={styles.answer}>
        <div className={styles.date}>{moment(responseDate).format('DD.MM.YYYY')}</div>
        <div className={styles.username}>{responsibleName}</div>
        <div className={styles.text}>{response}</div>
      </div>
    </div>
  );
}

export default FAQCard;