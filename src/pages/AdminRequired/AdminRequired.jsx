import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Context } from '../..';
import Container from '../../components/shared/Container/Container';

import styles from './AdminRequired.module.css';

function AdminRequired() {

  const { userStore } = useContext(Context);

  if (!userStore.User.roles || userStore.User.roles.indexOf("ADMIN") == -1) {
    return (
      <div className={styles.outer}>
        <Container>
          <div className={styles.inner}>У вас недостаточно прав для просмотра этой страницы</div>
        </Container>
      </div>
    )
  } 
  
  return ( 
    <Outlet/>
  );
}

export default observer(AdminRequired);