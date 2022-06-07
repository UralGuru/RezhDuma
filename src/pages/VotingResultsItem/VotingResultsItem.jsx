import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { deleteVotingById, fetchVotingByIdFromUser } from '../../http/votingsApi';
import moment from 'moment';
import Container from '../../components/shared/Container/Container';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

import styles from './VotingResultsItem.module.css';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import InformationModal from '../../components/shared/InformationModal/InformationModal';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import Button from '../../components/shared/Button/Button';

const VotingResultsItem = () => {
  const {userStore} = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('loading');
  const [voting, setVoting] = useState({});

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const deleteAndClose = () => {
    deleteVotingById(voting.id).then(data => {
      closeModal();
      navigate('/votings');
    })
  }

  const findMaximum = (q) => {
    let max = -1;
    for (let a in q.answers) {
      if (q.answers[a].count > max) {
        max = q.answers[a].count;
      }
    }
    return max;
  }

  useEffect(() => {
    setStatus('loading');
    fetchVotingByIdFromUser(params.id).then((data) => {
      if (data.canVote) {
        setStatus('unvoted'); // если не проголосовал, то результаты не показываем, но если дата истекла, то пофиг)))
        if (data.expirationDate && moment(data.expirationDate) < moment()) {
          setStatus('success');
          setVoting(data);
        }
      } else {
        setStatus('success');
        setVoting(data);
      }
    }).catch((data) => {
      setStatus('error')
    })
  }, []) 

  if (status === 'unvoted') {
    return (
    <Container>
      <div className={styles.inner}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Голосования', 'path': '/votings'}, {'label': `Голосование`, 'path': `/votings/${params.id}`}, , {'label': 'Результаты', 'path': `/votings/${params.id}/results`}]}/>
        <h2>{voting.topic}</h2>
        <div className={styles.main}>
          Чтобы посмотреть результаты, необходимо проголосовать
        </div>
      </div>
    </Container>
    )
  }

  if (status === 'loading') {
    return (
      <Container>
      <div className={styles.inner}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Голосования', 'path': '/votings'}, {'label': `Голосование`, 'path': `/votings/${params.id}`}, , {'label': 'Результаты', 'path': `/votings/${params.id}/results`}]}/>
        <h2>{voting.topic}</h2>
        <div className={styles.main}>
          Подождите идет загрузка...
        </div>
      </div>
    </Container>
    )
  }

  if (status === 'error') {
    return (
      <Container>
      <div className={styles.inner}>
        <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Голосования', 'path': '/votings'}, {'label': `Голосование`, 'path': `/votings/${params.id}`}, , {'label': 'Результаты', 'path': `/votings/${params.id}/results`}]}/>
        <h2>{voting.topic}</h2>
        <div className={styles.main}>
          Произошла ошибка, попробуйте еще раз
        </div>
      </div>
    </Container>
    )
  }

  if (status === 'success') {
    return ( 
      <Container>
        <div className={styles.inner}>
          <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Голосования', 'path': '/votings'}, {'label': `Голосование`, 'path': `/votings/${params.id}`}, , {'label': 'Результаты', 'path': `/votings/${params.id}/results`}]}/>
          <h2>{voting.topic}</h2>
          <div className={styles.main}>
            <div className={styles.date}>{moment(voting.votingDate).format('DD.MM.YYYY')}</div>
            <div className={styles.questions}>
              {voting.questions?.map((q, i) => {
                return (
                <div className={styles.question}>
                  <div className={styles.question_label}>{i + 1}. {q.question}</div>
                  <div className={styles.answers}>
                    {q.answers?.map((a) => {
                      return (
                        <div className={styles.answer}>
                          <div className={styles.answer_label}>{a.answer}</div>
                            <div className={styles.answer_stats}>
                              <ProgressBar done={Math.round((a.count * 100 / voting.usersCount))} isMaximum={findMaximum(q) == a.count}/>
                            </div> 
                        </div>
                      )})}
                  </div>
                </div>
              )})}
            </div>
            <div className={styles.votes_number}> {/*Подставить из базы в виде allcount*/}
              {`Проголосовало: ${voting.usersCount} человек(а)`}
            </div>
            {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
              <div>
                <Button
                  className='secondary-outline'
                  onClick={openModal}
                  role='button'
                >Удалить голосование</Button>
              </div>
            }
          </div>
        </div>
        {(userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) && 
        <InformationModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        >
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              Вы уверены что хотите удалить это голосование?
            </div>
            <div className={styles.modal_content}>
              Вместе с голосованием удалятся голоса и вся информация об участниках голосования
            </div>
            <div className={styles.button_row}>
              <Button
                className='secondary-outline'
                role='button'
                onClick={() => closeModal()}
              >Нет</Button>
              <Button
                className='primary'
                role='button'
                onClick={() => deleteAndClose()}
              >Да</Button>
            </div>
          </div>
        </InformationModal>
      }
      </Container>
    );
  }
}

export default observer(VotingResultsItem);