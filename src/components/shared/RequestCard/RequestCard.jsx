import React, { useContext, useState } from 'react';
import moment from 'moment';
import styles from './RequestCard.module.css';
import Button from '../Button/Button';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextAreaField from '../Forms/TextAreaField/TextAreaField';
import { Context } from '../../..';
import { createAnswerToRequest } from '../../../http/requestApi';

const RequestCard = ({id, date, text}) => {
  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '1rem',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const { userStore } = useContext(Context);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return ( 
    <div className={styles.request}>
      <div className={styles.request_header}>
        <div className={styles.request_date}>
          {moment(date).format('DD.MM.YYYY')}
        </div>
        <div className={styles.request_text}>
          {text}
        </div>
      </div>
      <div className={styles.button_column}>
        <Button
          className='primary-outline'
          onClick={openModal}
          >Ответить
        </Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <Formik
          initialValues={{
            response: '',
            frequent: false
          }}
          validationSchema={AnswerSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values) => {
            const request = new FormData();
            request.append('id', userStore.User.id);
            request.append('response', values.response);
            request.append('frequent', values.frequent);
            createAnswerToRequest(request, id).then((data) => {
              closeModal();
            })
          }}
        >
          {(formik) => (
            <Form className={styles.form_modal}>
              <div className={styles.request_modal}>
                <div className={styles.request_text}>{text}</div>
                <div className={styles.request_info}>
                  <div className={styles.request_date}>{moment(date).format('DD.MM.YYYY')}</div>
                </div>
              </div>
              <div className={styles.response}>
                <TextAreaField 
                  name='response'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.response}
                  type='textarea'
                  placeholder='Ваш ответ'
                />
              </div>
              <div className={styles.frequent_button}>
                <input 
                  id='frequent'
                  name='frequent'
                  value={formik.values.frequent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type='checkbox'
                />
                <label htmlFor='frequent'>Отметить как часто задаваемый</label>
              </div>
              <div className={styles.button_row}>
                <Button 
                  type='button'
                  onClick={closeModal}
                  className='secondary-outline'
                >Закрыть</Button>
                <Button 
                  type='submit'
                  className='primary'
                >Отправить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
 
export default observer(RequestCard);

const AnswerSchema = Yup.object({
  response: Yup.string()
    .min(12, 'Слишком короткий ответ')
    .required('Необходимое поле'),
  frequent: Yup.bool()
    .required()
})