import React from 'react';

import styles from './FAQCard.module.css';

const FAQCard = ({date, question, user, text}) => {
  return ( 
    <div className={styles.card}>
      <div className={styles.question}>
        <div className={styles.date}>{date}</div>
        <div className={styles.question_text}>{question}</div>
      </div>
      <div className={styles.answer}>
        <div className={styles.username}>{user}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
}

export default FAQCard;