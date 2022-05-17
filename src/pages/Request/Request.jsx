import React, { useContext, useState } from 'react';
import Container from '../../components/shared/Container/Container';
import Dropdown from '../../components/shared/Dropdown/Dropdown';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import {HiOutlinePaperClip} from 'react-icons/hi'
import Select from '../../components/shared/Select/Select';

import styles from './Request.module.css';
import { useNavigate } from 'react-router-dom';
import { FAQ_ROUTE, REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../utils/constants';
import { createRequest } from '../../http/requestApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import * as Yup from 'yup';

const Request = () => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();

  const [district, setDistrict] = useState(null);
  const [topic, setTopic] = useState(null);
  const [type, setType] = useState(null);
  const [requestText, setRequestText] = useState("");
  const [files, setFiles] = useState(null);

  const onSubmit = () => {
    const request = new FormData();
    request.append("district", district);
    request.append("topic", topic);
    request.append("type", type);
    request.append("requestText", requestText);
    request.append("files", files);
    // createRequest(request, userStore.User.id).then((data) => {
    //   console.log(data);
      console.log(request.getAll('files'));
    // });
  }

  return (
    <Container>
      <div className={styles.outer}>
        <h2>Обращение депутату</h2>
        <div className={styles.form}>
          <div>Перед тем, как задать вопрос, советуем Вам ознакомиться со списком <a onClick={() => navigate(FAQ_ROUTE)}><strong>часто задаваемых вопросов</strong></a></div>
          
          <div className={styles.dropdown}>
            <div className={styles.dropdown_label}>Выберите район</div>
            <Select
              placeholder="Выберите район обращения" 
              options={REQUEST_DISTRICTS}
              setValue={setDistrict}
              value={district}
              />
          </div>
          
          <div className={styles.dropdown}>
            <div className={styles.dropdown_label}>Выберите сферу</div>
            <Select
              placeholder="Выберите сферу обращения" 
              options={REQUEST_TOPICS}
              setValue={setTopic}
              value={topic}
              />
          </div>

          <div className={styles.dropdown}>
            <div className={styles.dropdown_label}>Выберите тип</div>
            <Select
              placeholder="Выберите тип обращения" 
              options={REQUEST_TYPES}
              setValue={setType}
              value={type}
              />
          </div>
          <div className={styles.input_box}>
            <div className={styles.label}>Содержание обращения</div>
            <textarea 
              className={styles.text_field}
              value={requestText}
              placeholder="Введите содержание Вашего сообщения"
              onChange={(e) => setRequestText(e.target.value)}
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
          </div>
          <Button 
            className='primary' 
            onClick={() => onSubmit()}
          >Отправить обращение</Button>
        </div>
      </div>
    </Container>
  );
}

export default observer(Request);

const RequestSchema = Yup.object().shape({
  district: Yup.string(),
  topic: Yup.string(),
  type: Yup.string(),
  text: Yup.string()
  .required("Required"),
  files: Yup.mixed()
  .nullable()
  .notRequired()
  // .test("FILE_SIZE", "Uploaded file is too big.", 
  //     value => !value || (value && value.size <= FILE_SIZE))
  // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
  //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
});