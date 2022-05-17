import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_ROUTE } from '../../utils/constants';



const RequireAuth = () => {
  
  if (!localStorage.getItem('refresh-token')) {
    return (
      <Navigate to={LOGIN_ROUTE} replace={true}/>
    )
  }

  return <Outlet />;
}

export default observer(RequireAuth);