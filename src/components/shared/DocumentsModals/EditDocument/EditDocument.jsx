import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../Button/Button';
import FilesField from '../../Forms/FilesField/FilesField';
import TextAreaField from '../../Forms/TextAreaField/TextAreaField';
import { TextField } from '../../Forms/TextField/TextField';
import styles from './EditDocument.module.css';
import { editDocuments, fetchOneDocuments } from '../../../../http/documentsApi';

const EditDocument = ({id, modalIsOpen, closeModal}) => {
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

  const [documentData, setDocumentData] = useState({});

  useEffect(() => {
    fetchOneDocuments(id).then((data) => {
      setDocumentData(data);
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
          title: documentData.title,
          text: documentData.text,
          event: 0,
          files: ''
        }}
        validationSchema={DocumentSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values) => {
          const request = new FormData();
          request.append("title", values.title);
          request.append("text", values.text);
          for (let i = 0; i < values.files.length; i++) {
            request.append("files", values.files[i]);
          }
          editDocuments(request, id).then((data) => {
            closeModal()
          })}}
      >
        {(formik) => (
          <Form className={styles.modal}>
            <h2>Редактирование документа</h2>
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
              <FilesField accept='application/pdf'
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
 
export default EditDocument;

const DocumentSchema = Yup.object({
  title: Yup.string()
    .required('Необходимое поле')
    //.min(12, 'Поле заголовка должно содержать не менее 12 символов')
  ,
  text: Yup.string()
  .required('Необходимое поле')
  //.min(20, 'Поле должно содержать не менее 20 символов')
})