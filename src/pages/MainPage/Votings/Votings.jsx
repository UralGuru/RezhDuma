import React, { useEffect, useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import { fetchVotings } from '../../../http/votingsApi';
import {BsArrowRight} from 'react-icons/bs';

import styles from './Votings.module.css';
import { VOTINGS_ROUTE } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/shared/Container/Container';
import VotingCard from '../../../components/shared/VotingCard/VotingCard';

const Votings = () => {

  const navigate = useNavigate();

  const [votings, setVotings] = useState([]);

  useEffect(() => {
    fetchVotings('', 7, '').then((data) => {
      setVotings(data);
    })
  }, [])

  return ( 
    <Container>
      <div className={styles.inner}>
        <h2 className={styles.header}>Голосования</h2>
        <div className={styles.main}>
          {/* {votings.map((voting) => {
            return (
              <VotingCard 
                  key={voting.id}
                  id={voting.id}
                  topic={voting.topic}
                  votingDate={voting.votingDate}
                  expirationDate={voting.expirationDate}
              />
            )
          })} */}
        </div>
      </div>
      <div className={styles.button_row}>
        <Button 
          className='secondary-outline'
          onClick={() => navigate(VOTINGS_ROUTE)}
        ><div className={styles.button}>Перейти в раздел <BsArrowRight /></div></Button>
      </div>
    </Container>
  );
}
 
export default Votings;