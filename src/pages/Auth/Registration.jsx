import React from 'react';
import Container from '../../components/shared/Container/Container';
import RegistrationForm from '../../components/shared/Forms/RegistraionForm';

import styles from './Auth.module.css';

const Registration = () => {
  return ( 
    <div className={styles.outer}>
      <Container>
        <RegistrationForm />
      </Container>
    </div>
   );
}

export default Registration;