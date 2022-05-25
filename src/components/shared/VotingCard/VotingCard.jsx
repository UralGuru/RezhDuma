import React from 'react';
import Button from '../Button/Button';
import moment from 'moment';
import styles from './VotingCard.module.css';
import { useNavigate } from 'react-router-dom';

const VotingCard = ({id, topic, votingDate, expirationDate}) => {
  const navigate = useNavigate();

  return ( 
    <div className={styles.card}>
      <div className={styles.topic}>{topic}</div>
      {expirationDate && 
      <div className={styles.dates}>
        <div className={styles.dates_title}>Срок проведения:</div>
        <div className={styles.date}>
          {`с ${moment(votingDate).format('DD.MM.YYYY')} по ${moment(expirationDate).format('DD.MM.YYYY')}`}
        </div>
      </div>}
      <div className={styles.button_row}>
        <Button
          onClick={() => {navigate('/admin/votings/' + id)}}
          className="secondary-outline"
        >Открыть
        </Button>
      </div>
    </div>
  );
}
 
export default VotingCard;