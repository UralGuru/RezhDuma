import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../components/shared/Container/Container';
import { fetchVotingById, fetchVotingByIdFromUser, putVote } from '../../http/votingsApi';
import moment from 'moment';
import styles from './VotingItem.module.css';
import Button from '../../components/shared/Button/Button';
import QuestionRadioItem from './QuestionRadioItem/QuestionsRadioItem';
import QuestionCheckboxItem from './QuestionCheckboxItem/QuestionCheckboxItem';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

const VotingItem = () => {

  const {userStore} = useContext(Context);

  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState('');
  const [voting, setVoting] = useState({});
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setStatus('loading');
    if(localStorage.getItem('access-token')) {
      fetchVotingByIdFromUser(params.id).then((data) => {
        setVoting(data);
        setVotes(data.questions.map((q) => { return {'id': q.id, 'answers': []}}))
        setStatus('success');
        setDisabled(!(data.canVote));
        if (data.expirationDate) {
          setDisabled((moment(data.expirationDate) < moment()));
        }
        if (!(data.canVote) || (moment(data.expirationDate) < moment())) {
          navigate('results');
        }
      });
    } else {
      fetchVotingById(params.id).then((data) => {
        setVoting(data);
        setVotes(data.questions.map((q) => { return {'id': q.id, 'answers': []}}))
        setStatus('success');
        setDisabled(true);
      });
    }
  }, [])

  const onSubmit = () => {
    let initialError = error;
    for (let vote in votes) {
      if (!votes[vote].answers.length) {
        initialError = true;
        setError(true);
        return;
      }
      initialError = false;
      setError(false);
    }
    if (initialError) {
      return; // или вывести соответствующую модалку
    }
    let answerData = [].concat(...votes.map((vote) => vote.answers))

    putVote(voting.id, answerData).then((data) => {
      navigate('results');
    });
  }

  if (status === 'loading') {
    return (
      <Container>
        <div className={styles.inner}>
          <h2>{voting.topic}</h2>
          <div className={styles.main}>
            
          </div>
        </div>
      </Container>
    );
  }
  
  return ( 
    <Container>
      <div className={styles.inner}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Голосования', 'path': '/votings'}, {'label': `Голосование`, 'path': `/votings/${params.id}`}]}/>
        <h2>{voting.topic}</h2>
        <div className={styles.main}>
          {!localStorage.getItem('access-token') &&
            <div className={styles.error}>Чтобы проголосовать необходимо авторизоваться</div>
          } 
          {!voting.canVote &&
            <div className={styles.error}>Вы уже участвовали в этом голосовании.</div>
          }
          {voting.expirationDate && (moment(voting.expirationDate) < moment()) &&
            <div className={styles.error}>Время на голосование истекло {moment(voting.expirationDate).format('DD.MM.YYYY')}</div>
          }
          <div className={styles.date}>{moment(voting.votingDate).format('DD.MM.YYYY')}</div>
          <div className={styles.questions}>
              {voting?.questions?.map((q, i) => {
                if (q.checkbox) {
                  return (<QuestionCheckboxItem 
                    key={q.id} 
                    number={i}
                    question={q}
                    votes={votes}
                    setVotes={setVotes}
                    disabled={disabled}
                  />)
                } else {
                  return (<QuestionRadioItem 
                    key={q.id} 
                    number={i}
                    question={q}
                    votes={votes}
                    setVotes={setVotes}
                    disabled={disabled}
                  />)
                }
              })}
          </div>
          { error &&
            <div className={styles.error}>
              Ответьте на все вопросы голосования
            </div>}
          <div className={styles.button_row}>
            <Button
              className='primary-outline'
              onClick={() => {navigate('results')}}
            >Результаты</Button>
            <Button
              className='primary'
              onClick={onSubmit}
              disabled={disabled}
            >Отправить</Button>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}

        style={{
          overlay: {position: 'fixed',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.4)'},
          content: {top: '50%',left: '50%',right: 'auto',bottom: 'auto',borderRadius: '1rem',marginRight: '-50%',transform: 'translate(-50%, -50%)'},
        }}>
        <div className={styles.modal}>
          Вы успешно проголосовали
          Перейти на страницу результатов???
        </div>
      </Modal> */}
    </Container>
  );
}
 
export default observer(VotingItem);