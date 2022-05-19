import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Context } from '../..';
import Container from '../../components/shared/Container/Container';

import styles from './AdminRequired.module.css';

function AdminRequired() {

  const { userStore } = useContext(Context);
  if (userStore.User.roles && userStore.User.roles.indexOf("ADMIN") != -1) {
    return ( 
      <Outlet/>
    );
  } 
  return (
    <div className={styles.outer}>
      <Container>
        У вас недостаточно прав для просмотра этой страницы
      </Container>
    </div>
  )
}

export default observer(AdminRequired);