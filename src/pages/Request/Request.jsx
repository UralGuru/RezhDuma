import React, { useContext, useState } from 'react';
import Container from '../../components/shared/Container/Container';
import Dropdown from '../../components/shared/Dropdown/Dropdown';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import {HiOutlinePaperClip} from 'react-icons/hi'
import Select from 'react-select';

import styles from './Request.module.css';
import { useNavigate } from 'react-router-dom';
import { FAQ_ROUTE, REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../utils/constants';
import { createRequest } from '../../http/requestApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import SelectField from '../../components/shared/Forms/SelectField/SelectField';
import TextAreaField from '../../components/shared/Forms/TextAreaField/TextAreaField';

const Request = () => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const [status, setStatus] = useState('')

  // const [district, setDistrict] = useState(null);
  // const [topic, setTopic] = useState(null);
  // const [type, setType] = useState(null);
  // const [requestText, setRequestText] = useState("");
  // const [files, setFiles] = useState(null);

  // const onSubmit = () => {
  //   const request = new FormData();
  //   request.append("district", district);
  //   request.append("topic", topic);
  //   request.append("type", type);
  //   request.append("requestText", requestText);
  //   request.append("files", files);
  //   // createRequest(request, userStore.User.id).then((data) => {
  //   //   console.log(data);
  //     console.log(request.getAll('files'));
  //   // });
  // }
  if (status == 'sending') {
    return <div className={styles.outer}>Обращение отправляется...</div>
  }

  if (status == 'sended') {
    return <div className={styles.outer}>Обращение отправлено...</div>
  }

  if (status == 'error') {
    return <div className={styles.outer}>При отправке обращения возникла ошибка...</div>
  }

  return (
    <Container>
      <div className={styles.outer}>
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
        
        onSubmit={(values) => {
          setStatus('sending');
          const request = new FormData();
          request.append("district", values.district);
          request.append("topic", values.topic);
          request.append("type", values.type);
          request.append("requestText", values.text);
          request.append("files", values.files);
          createRequest(request, userStore.User.id).then((data) => {
            setStatus('sended');
          }).catch((data) => {
            setStatus('error')
          })
        }}
      > 
      { formik => (
        <Form>
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
            <input
              id="files"
              name="profile"
              type="file"
              onChange={(event) => {
                const files = event.target.files;
                let myFiles = Array.from(files);
                formik.setFieldValue("files", myFiles);
              }}
              multiple
            />
            {/* <div className={styles.input_box}>
              <div className={styles.label}>Содержание обращения</div>
              <textarea 
                className={styles.text_field}
                value={formik.values.text}
                placeholder="Введите содержание Вашего сообщения"
                onChange={formik.handleChange}
                type="text"
                />
            </div>
            <div className={styles.input_box}>
              <div className={styles.label}>Приложения к обращению</div>
              <label className={styles.files_field}>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <div>Прикрепить файлы</div><HiOutlinePaperClip />
              </label>
            </div> */}
            <Button 
              className='primary' 
              type='submit'
            >Отправить обращение</Button>
          </div>
        </Form>
        )}
        </Formik>
      </div>
    </Container>
  );
}

export default observer(Request);

const RequestSchema = Yup.object().shape({
  district: Yup.string()
  .required('Необходимое поле'),
  topic: Yup.string()
  .required('Необходимое поле'),
  type: Yup.string()
  .required('Необходимое поле'),
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