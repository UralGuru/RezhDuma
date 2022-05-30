import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../Button/Button';
import FilesField from '../../Forms/FilesField/FilesField';
import TextAreaField from '../../Forms/TextAreaField/TextAreaField';
import { TextField } from '../../Forms/TextField/TextField';
import styles from './EditHistory.module.css';
import { editHistory, fetchOneHistory } from '../../../../http/historyApi';

const EditHistory = ({id, modalIsOpen, closeModal}) => {
  Modal.setAppElement('#root');
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '1rem',
      marginRight: '-50%',
      minWidth: '60%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    fetchOneHistory(id).then((data) => {
      setHistoryData(data);
    })
  }, [closeModal]);

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      >
      <Formik
        initialValues={{
          title: historyData.title,
          text: historyData.text,
          event: 0,
          files: ''
        }}
        validationSchema={HistorySchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values) => {
          const request = new FormData();
          request.append("title", values.title);
          request.append("text", values.text);
          for (let i = 0; i < values.files.length; i++) {
            request.append("files", values.files[i]);
          }
          editHistory(request, id).then((data) => {
            closeModal()
          })}}
      >
        {(formik) => (
          <Form className={styles.modal}>
            <h2>Редактирование истории</h2>
            <div className={styles.create_fields}>
              <TextField 
                name='title'
                label="Заголовок"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                type='text'
                placeholder='Заголовок'
                />
              <TextAreaField 
                name='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.text}
                type='textarea'
                placeholder='Текст'
              />
              <FilesField 
                accept='image/*'
                name='files'
                type='file'
                onBlur={formik.handleBlur}
                value={formik.values.files}
                onChange={(event) => {
                  const files = event.target.files;
                  let myFiles = Array.from(files);
                  formik.setFieldValue("files", myFiles);
                }}
                label='Прикрепить файлы'
              />
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
              >Применить</Button>
            </div>
          </Form>
          )}
        </Formik>
      </Modal>
  );
}
 
export default EditHistory;

const HistorySchema = Yup.object({
  title: Yup.string()
    .required('Необходимое поле')
    .min(12, 'Поле заголовка должно содержать не менее 12 символов'),
  text: Yup.string()
  .required('Необходимое поле')
  .min(20, 'Поле должно содержать не менее 20 символов')
})