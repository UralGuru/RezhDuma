import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import Container from '../../components/shared/Container/Container';
import RegistrationForm from '../../components/shared/Forms/RegistraionForm';
import { PROFILE_ROUTE } from '../../utils/constants';

import styles from './Auth.module.css';

const Registration = () => {
  const navigate = useNavigate();
  const { userStore } = useContext(Context);

  return ( 
    <div className={styles.outer}>
      <Container>
      {userStore.IsAuth 
        ?
        <div className={styles.authorizated}>
          <h2>Вы авторизованы</h2>
          <a onClick={() => navigate(PROFILE_ROUTE)}>Перейти в профиль</a>
        </div>
        :
        <RegistrationForm />}
      </Container>
    </div>
   );
}

export default observer(Registration);