import React, { useEffect, useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import { fetchVotings } from '../../../http/votingsApi';
import {BsArrowRight} from 'react-icons/bs';
import styles from './Votings.module.css';
import { VOTINGS_ROUTE } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/shared/Container/Container';
import VotingCard from '../../../components/shared/VotingCard/VotingCard';
import Slider from '../../../components/shared/Slider/Slider';

const Votings = () => {

  const navigate = useNavigate();

  const [votings, setVotings] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus('loading')
    fetchVotings(1, 7, '').then((data) => {
      setVotings(data);
      setStatus('success');
    })
  }, [])

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

  if (status === 'success') {
  return ( 
    <Container>
      <div className={styles.inner}>
        <h2 className={styles.header}>Голосования</h2>
        <div className={styles.slider_container}>
          <Slider 
            items={votings.map((voting) => {
              return (
                <VotingCard 
                  key={voting.id}
                  id={voting.id}
                  topic={voting.topic}
                  votingDate={voting.votingDate}
                  expirationDate={voting.expirationDate}
                />
            )})}
            itemsPerPage={1}
            responsive={[
              {windowWidth: 0, items: 1},
              {windowWidth: 512, items: 2},
              {windowWidth: 1024, items: 3}
            ]}
          />
      </div>
      </div>
      <div className={styles.button_row}>
        <Button 
          className='secondary-outline'
          onClick={() => navigate(VOTINGS_ROUTE)}
        ><div className={styles.button}>Перейти в раздел <BsArrowRight /></div></Button>
      </div>
    </Container>
  )};

  return (
    <div></div>
  )
}
 
export default Votings;