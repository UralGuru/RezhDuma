import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import { ADMIN_CREATE_VOTING_ROUTE } from '../../../utils/constants';

import styles from './Votings.module.css'

const Votings = () => {
  const navigate = useNavigate();

  return ( 
    <Container>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>Опросы и голосования</h2>
          <Button
            className='primary'
            onClick={() => navigate(ADMIN_CREATE_VOTING_ROUTE)}
          >Создать</Button>
        </div>  
        <div className={styles.main}>
          {/* тут будут другие голосования */}
        </div>
      </div>
    </Container>
  );
}
 
export default Votings;