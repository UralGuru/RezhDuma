import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button/Button';
import Container from '../../components/shared/Container/Container';
import Pagination from '../../components/shared/Pagination/Pagination';
import VotingCard from '../../components/shared/VotingCard/VotingCard';
import { fetchAllVotings } from '../../http/votingsApi';
import { VOTINGS_PER_ONE_PAGE } from '../../utils/constants';

import styles from './VotingsPage.module.css'

const VotingsPage = () => {
  const navigate = useNavigate();

  const [votings, setVotings] = useState([]);
  const [votingsCount, setVotingsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllVotings().then((data) => {
      setVotingsCount(data.length);
    })
  }, [])

  useEffect(() => {
    fetchAllVotings(page, VOTINGS_PER_ONE_PAGE).then((data) => {
      setVotings(data);
    });
  }, [page])

  return ( 
    <Container>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>Опросы и голосования</h2>
        </div>  
        <div className={styles.main}>
          <div className={styles.votings}>
            {votings.map((voting) => {
              return (<VotingCard 
                  key={voting.id}
                  id={voting.id}
                  topic={voting.topic}
                  votingDate={voting.votingDate}
                  expirationDate={voting.expirationDate}
              />)
            })}
          </div>
          <Pagination 
            page={page}
            setPage={setPage}
            totalCount={votingsCount}
            itemsPerPage={VOTINGS_PER_ONE_PAGE}
          />
        </div>
      </div>
    </Container>
  );
}
 
export default VotingsPage;