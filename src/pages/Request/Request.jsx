import React, { useContext, useState } from 'react';
import Container from '../../components/shared/Container/Container';
import Button from '../../components/shared/Button/Button';

import styles from './Request.module.css';
import { useNavigate } from 'react-router-dom';
import { FAQ_ROUTE, REQUESTS_ROUTE, REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../utils/constants';
import { createRequest } from '../../http/requestApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import SelectField from '../../components/shared/Forms/SelectField/SelectField';
import TextAreaField from '../../components/shared/Forms/TextAreaField/TextAreaField';
import FilesField from '../../components/shared/Forms/FilesField/FilesField';
import Modal from 'react-modal/lib/components/Modal';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InformationModal from '../../components/shared/InformationModal/InformationModal';

const Request = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const [status, setStatus] = useState('')

  if (status == 'error') {
    return <div className={styles.outer}>При отправке обращения возникла ошибка...</div>
  }

  return (
    <Container>
      <Formik
        initialValues={{
          district: '',
          topic: '',
          type: '',
          text: '',
          files: '',
        }}
        validationSchema={RequestSchema}
        validateOnBlur={true}
        validateOnChange={false}
        
        onSubmit={(values, {resetForm}) => {
          setStatus('sending');
          const request = new FormData();
          request.append("district", values.district);
          request.append("topic", values.topic);
          request.append("type", values.type);
          request.append("text", values.text);
          for (let i = 0; i < values.files.length; i++) {
            request.append("files", values.files[i]);
          }
          createRequest(request).then((data) => {
            setStatus('sended');
            openModal();
            resetForm({values: ''});
          }).catch((data) => {
            setStatus('error')
          })
        }}
      > 
      { formik => (
        <Form className={styles.outer}>
          <BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Личный кабинет', 'path': '/profile'}, {'label': 'Отправить обращение', 'path': '/requests/create'}]}/>
          <h2>Обращение депутату</h2>
          <div className={styles.form}>
            <div>Перед тем, как задать вопрос, советуем Вам ознакомиться со списком <a onClick={() => navigate(FAQ_ROUTE)}><strong>часто задаваемых вопросов</strong></a></div>
            <SelectField
              name='district'
              onChange={option => formik.setFieldValue('district', option.value)}
              value={formik.values.district}
              options={REQUEST_DISTRICTS}
              label="Выберите район"
              placeholder="Выберите район"
              />
            <SelectField
              name='topic'
              onChange={option => formik.setFieldValue('topic', option.value)}
              value={formik.values.topic}
              options={REQUEST_TOPICS}
              label="Выберите сферу обращения"
              placeholder="Выберите сферу обращения"
              />
            <SelectField
              name='type'
              onChange={option => formik.setFieldValue('type', option.value)}
              value={formik.values.type}
              options={REQUEST_TYPES}
              label="Выберите тип обращения"
              placeholder="Выберите тип обращения"
              />
            <TextAreaField 
              name='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              type='textarea'
              label='Введите текст обращения'
              placeholder='Введите текст обращения'
            />
            <FilesField
              id="files"
              name="files"
              type="file"
              label="Прикрепить файлы"
              onChange={(event) => {
                const files = event.target.files;
                let myFiles = Array.from(files);
                formik.setFieldValue("files", myFiles);
              }}
              multiple
            />
            <div></div>
            <Button 
              className='primary' 
              type='submit'
            >Отправить обращение</Button>
          </div>
        </Form>
        )}
        </Formik>
        <InformationModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        >
          <div className={styles.submit_modal}>
            <div className={styles.submit_modal_header}>Ваше обращение отправлено</div>
            <div className={styles.submit_modal_content}>
              <div>Посмотреть статус обращения можно во вкладке</div>
              <button onClick={() => navigate(REQUESTS_ROUTE)}>Ваши вопросы и заявки</button>
            </div>
          </div>
        </InformationModal>
    </Container>
  );
}

export default observer(Request);

const RequestSchema = Yup.object().shape({
  district: Yup.string(),
  topic: Yup.string(),
  type: Yup.string(),
  text: Yup.string()
  .required('Введите текст обращения')
  .min(20, 'Текст обращения должен содержать не менее 20 символов'),
  files: Yup.mixed()
  .nullable()
  .notRequired()
  // .test("FILE_SIZE", "Uploaded file is too big.", 
  //     value => !value || (value && value.size <= FILE_SIZE))
  // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
  //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
});