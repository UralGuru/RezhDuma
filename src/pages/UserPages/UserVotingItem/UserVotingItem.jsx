import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/shared/Container/Container';
import { fetchVotingById } from '../../../http/votingsApi';
import moment from 'moment';
import styles from './UserVotingItem.module.css';

const UserVotingItem = () => {
  const params = useParams();
  const [voting, setVoting] = useState({});

  useEffect(() => {
    fetchVotingById(params.id).then((data) => {
      setVoting(data);
    });
  }, [])

  return ( 
    <Container>
      <div className={styles.inner}>
        <h2>{voting.topic}</h2>
        <div className={styles.main}>
          <div className={styles.date}>{moment(voting.votingDate).format('DD.MM.YYYY')}</div>
          <div className={styles.questions}>
            {voting?.questions?.map((q, i) => {
              return (
              <div className={styles.question}>
                <div className={styles.question_label}>{i+1}. {q.question}</div>
                <div className={styles.answers}>
                  {q?.answers?.map((ans) => {
                    return (
                    <label className={styles.answer}>
                      <input 
                        type={'radio'}
                      />
                      <div>{ans.answer}</div>
                    </label>)
                  })}
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </Container>
  );
}
 
export default UserVotingItem;