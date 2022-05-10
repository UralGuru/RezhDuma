import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../../components/shared/Container/Container';

import styles from './NewsItemLayout.module.css';

const NewsItemLayout = () => {
  return ( 
    <Container>
      <div className={styles.layout}>
        <Outlet />
      </div>
    </Container>
    
  );
}

export default NewsItemLayout;