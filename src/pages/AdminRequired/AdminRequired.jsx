import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Context } from '../..';

import styles from './AdminRequired.module.css';

function AdminRequired() {

  const { userStore } = useContext(Context);

  if (userStore.User.role.indexOf('ADMIN') == -1) {
    return (
      <div>У вас недостаточно прав для просмотра этой страницы</div>
    )
  }

  return ( 
    <Outlet/>
  );
}

export default observer(AdminRequired);