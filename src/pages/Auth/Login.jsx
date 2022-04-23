import React from 'react';
import Container from '../../components/shared/Container/Container';
import LoginForm from '../../components/shared/Forms/LoginForm';

import styles from './Auth.module.css';

const Login = () => {
  return ( 
    <div className={styles.outer}>
      <Container>
        <LoginForm />
      </Container>
    </div>
   );
}

export default Login;