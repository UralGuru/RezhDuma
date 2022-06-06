import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import styles from './AnswerModal.module.css';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createAnswerToRequest, getRequestById } from '../../../../http/requestApi';
import { Context } from '../../../..';
import TextAreaField from '../../../../components/shared/Forms/TextAreaField/TextAreaField';
import Button from '../../../../components/shared/Button/Button';

const AnswerModal = ({requestData, modalIsOpen, closeModal}) => {
  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      minWidth: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '1rem',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const {userStore} = useContext(Context);

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      >
      <Formik
        initialValues={{
          response: requestData.response ??  '',
          frequent: requestData.frequent ??  false
        }}
        validationSchema={AnswerSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values) => {
          const request = new FormData();
          request.append('id', userStore.User.id);
          request.append('response', values.response);
          request.append('frequent', values.frequent);
          createAnswerToRequest(request, requestData.id).then((data) => {
            closeModal();
          })
        }}
      >
        {(formik) => (
          <Form className={styles.form_modal}>
            <div className={styles.request_modal}>
              <div className={styles.request_text}>{requestData.text}</div>
              <div className={styles.request_info}>
                <div className={styles.request_date}>{moment(requestData.appealDate).format('DD.MM.YYYY')}</div>
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
  );
}
 
export default observer(AnswerModal);

const AnswerSchema = Yup.object({
  response: Yup.string()
    .min(12, 'Слишком короткий ответ')
    .required('Необходимое поле'),
  frequent: Yup.bool()
    .required()
})