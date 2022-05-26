import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/shared/Container/Container';
import { fetchVotingById } from '../../../http/votingsApi';
import moment from 'moment';
import styles from './UserVotingItem.module.css';
import { Formik } from 'formik';
import Button from '../../../components/shared/Button/Button';

const UserVotingItem = () => {
  const params = useParams();
  const [voting, setVoting] = useState({});
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetchVotingById(params.id).then((data) => {
      setVoting(data);
      setVotes(data.questions.map((q) => { return {'question': q.question, 'answers': []}}))
    });
  }, [])

  const onSubmit = () => {
    console.log(votes);
  }

  const onChangeVote = (value, q, ans) => {
    const newArr = votes;
    let vote = newArr.find((vote) => vote.question === q.question);
    if (vote.answers.indexOf(value) === -1) {
      vote.answers.push(value);
    } else {
      vote = vote.answers.filter((a) => a !== value);
    }
    console.log(newArr);
  }

  // {(votes.find((vote) => vote === q.question)).answers.indexOf(ans.id) !== -1 ? true : false}
  
  return ( 
    <Container>
      <div className={styles.inner}>
        <h2>{voting.topic}</h2>
        <form className={styles.main} onSubmit={onSubmit}>
          <div className={styles.date}>{moment(voting.votingDate).format('DD.MM.YYYY')}</div>
          <div className={styles.questions}>
              {voting?.questions?.map((q, i) => {
                return (
                <div className={styles.question} key={q.id}>
                  <div className={styles.question_label}>{i+1}. {q.question}</div>
                  <div className={styles.answers}>
                    {q?.answers?.map((ans) => {
                      return (
                      <label key={ans.id} className={styles.answer}>
                        <input 
                          name={q.question}
                          value={ans.id}
                          type={q.checkbox ? 'checkbox' : 'radio'}
                          onChange = {(e) => {onChangeVote(e.target.value, q, ans)}}
                        />
                        <span>{ans.answer}</span>
                      </label>)
                    })}
                  </div>
                </div>
              )})}
          </div>
          <div className={styles.button_row}>
            <Button
              className='primary-outline'
            >Результаты</Button>
            <Button
              className='primary'
              type='submit'
            >Отправить</Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
 
export default UserVotingItem;