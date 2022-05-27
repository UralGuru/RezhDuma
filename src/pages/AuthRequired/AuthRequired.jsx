import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { Context } from '../..';
import { LOGIN_ROUTE } from '../../utils/constants';



const RequireAuth = () => {
  const {userStore} = useContext(Context);
  
  if (!localStorage.getItem('refresh-token') || !userStore.User || !userStore.User.id) {
    return (
      <Navigate to={LOGIN_ROUTE} replace={true}/>
    )
  }

  return <Outlet />;
}

export default observer(RequireAuth);