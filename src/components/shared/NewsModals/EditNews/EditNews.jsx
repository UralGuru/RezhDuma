import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { editNews, fetchOneNews } from '../../../../http/newsApi';
import Button from '../../Button/Button';
import FilesField from '../../Forms/FilesField/FilesField';
import SelectField from '../../Forms/SelectField/SelectField';
import TextAreaField from '../../Forms/TextAreaField/TextAreaField';
import { TextField } from '../../Forms/TextField/TextField';
import styles from './EditNews.module.css';
import { NEWS_TYPE } from '../../../../utils/constants';

const EditNews = ({id, modalIsOpen, closeModal}) => {
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

  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    fetchOneNews(id).then((data) => {
      setNewsData(data);
    })
  }, []);

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      >
      <Formik
        initialValues={{
          title: newsData.title,
          text: newsData.text,
          event: 0,
          files: newsData.files
        }}
        validationSchema={NewsSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values) => {
          const request = new FormData();
          request.append("title", values.title);
          request.append("text", values.text);
          request.append("event", values.event);
          for (let i = 0; i < values.files.length; i++) {
            request.append("files", values.files[i]);
          }
          editNews(request, id).then((data) => {
            closeModal()
          })}}
      >
        {(formik) => (
          <Form className={styles.form_modal}>
            <h2>Создать новость</h2>
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
                placeholder='Текст новости'
              />
              <SelectField 
                name='event'
                label="Тип"
                onChange={option => formik.setFieldValue('event', option.value)}
                onBlur={formik.handleBlur}
                value={formik.values.event}
                placeholder='Тип новости'
                options={NEWS_TYPE}
              />
              <FilesField 
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
 
export default EditNews;

const NewsSchema = Yup.object({
  title: Yup.string()
    .required('Необходимое поле')
    .min(12, 'Поле заголовка должно содержать не менее 12 символов'),
  text: Yup.string()
  .required('Необходимое поле')
  .min(20, 'Поле должно содержать не менее 20 символов')
})