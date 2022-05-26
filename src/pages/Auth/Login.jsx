import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Container from '../../components/shared/Container/Container';
import LoginForm from '../../components/shared/Forms/LoginForm';
import { PROFILE_ROUTE } from '../../utils/constants';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { userStore } = useContext(Context);

  return ( 
    <div className={styles.outer}>
      <Container>
        <div className={styles.inner}>
          <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Вход', 'path': '/login'}]} className={'white'}/>
          {userStore.IsAuth 
          ?
          <div className={styles.authorizated}>
            <h2>Вы авторизованы</h2>
            <a onClick={() => navigate(PROFILE_ROUTE)}>Перейти в профиль</a>
          </div>
          :
          <div>
            <LoginForm />
          </div>}
        </div>
      </Container>
    </div>
   );
}

export default observer(Login);