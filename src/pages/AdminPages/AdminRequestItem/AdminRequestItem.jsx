import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './AdminRequestItem.module.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import { getRequestById } from '../../../http/requestApi';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';

const AdminRequestItem = () => {
  const params = useParams();
  const [request, setRequest] = useState({});

  useEffect(() => {
    getRequestById(params.id).then((data) => {
      setRequest(data);
    })
  }, [])

  return ( 
    <Container>
      <div className={styles.outer}>
        <div className={styles.main}>
          <div className={styles.field}>
            <div className={styles.label}>Микрорайон</div>
            <div className={styles.field_value}>{request.district ? request.district : 'Не указано'}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Сфера деятельности</div>
            <div className={styles.field_value}>{request.topic ? request.topic : 'Не указано'}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Вид обращения</div>
            <div className={styles.field_value}>{request.type ? request.type : 'Не указано'}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Содержание обращения</div>
            <div className={styles.field_value}>{request.text ? request.text : 'Не указано'}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Приложения к обращению</div>
            <div className={styles.field_value}>
              {request.filesNames?.lenght 
              ? 
              <div className={styles.request_files}>
                {request?.filesNames?.map((file) => {
                  return <a className={styles.request_file} target="_ blank" href={file} download>{file.split('/').pop()}</a>
                })}
              </div>
              :
              'Не прикреплены'
            }
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>Личные данные</div>
            <div className={styles.personal_data}>
              <div className={styles.personal_field}>
                <div className={styles.label}>ФИО</div>
                <div className={styles.field_value}>
                  {request.requester ? 
                  `${request.requester.lastName} ${request.requester.firstName} ${request.requester.patronymic}` : 'Не указано'}
                </div>
              </div>
              <div className={styles.personal_field}>
                <div className={styles.label}>Адрес электронной почты</div>
                <div className={styles.field_value}>{request.requester?.email ? request.requester.email : 'Не указано'}</div>
              </div>
              <div className={styles.personal_field}>
                <div className={styles.label}>Контактный номер</div>
                <div className={styles.field_value}>{request.requester?.phone ? request.requester.phone : 'Не указано'}</div>
              </div>
            </div>
          </div>
        </div>
        {request.response ?
        <div className={styles.button_row}>
          <Button 
            className='primary-outline'
          >Рассмотренно</Button>
        </div>
        :
        <div className={styles.button_row}>
          <Button
            className='secondary-outline'
          >Ждет ответа</Button>
        </div>
        }
      </div>
    </Container>
  );
}

export default observer(AdminRequestItem);