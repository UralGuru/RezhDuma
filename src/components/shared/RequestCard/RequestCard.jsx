import React from 'react';
import moment from 'moment';
import styles from './RequestCard.module.css';
import Button from '../Button/Button';

const RequestCard = ({id, date, text}) => {
  return ( 
    <div className={styles.request}>
      <div className={styles.request_header}>
        <div className={styles.request_date}>
          {moment(date).format('DD.MM.YYYY')}
        </div>
        <div className={styles.request_text}>
          {text}
        </div>
      </div>
      <div className={styles.button_column}>
        <Button
          className='primary-outline'
          >Ответить
        </Button>
      </div>
    </div>
  );
}
 
export default RequestCard;