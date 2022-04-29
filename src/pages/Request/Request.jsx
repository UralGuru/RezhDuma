import React from 'react';
import Container from '../../components/shared/Container/Container';
import Dropdown from '../../components/shared/Dropdown/Dropdown';

import styles from './Request.module.css';

const Request = () => {
  return (
    <div>
      <Container>
        <div className={styles.header}>Обращение депутату</div>
        <div className={styles.form}>
          <Dropdown 
            title={"Выбрать"}
            placeholder={"Выберите район"}
            items={["первый район", "второй район", "третий район", "четвертый район", "пятый район"]}
            />
          <Dropdown 
            title={"Выбрать"}
            placeholder={"Выберите район"}
            items={["первый район", "второй район", "третий район", "четвертый район", "пятый район"]}
            />
          <Dropdown 
            title={"Выбрать"}
            placeholder={"Выберите район"}
            items={["первый район", "второй район", "третий район", "четвертый район", "пятый район"]}
            />
        </div>
      </Container>
    </div>
  );
}

export default Request;