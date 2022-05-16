import React, { useState } from 'react';
import Container from '../../components/shared/Container/Container';
import Dropdown from '../../components/shared/Dropdown/Dropdown';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import {HiOutlinePaperClip} from 'react-icons/hi'
import Select from '../../components/shared/Select/Select';

import styles from './Request.module.css';
import { useNavigate } from 'react-router-dom';
import { FAQ_ROUTE, REQUEST_DISTRICTS, REQUEST_TOPICS, REQUEST_TYPES } from '../../utils/constants';

const Request = () => {
  const navigate = useNavigate();

  const [district, setDistrict] = useState(null);
  const [topic, setTopic] = useState(null);
  const [type, setType] = useState(null);
  const [requestText, setRequestText] = useState("");
  const [files, setFiles] = useState("");

  const onSubmit = () => {
    const request = new FormData();
    request.append("district", district);
    request.append("topic", topic);
    request.append("type", type);
    request.append("requestText", requestText);
    request.append("files", files);
    
  }

  return (
    <Container>
      <div className={styles.outer}>
        <h2>Обращение депутату</h2>
        <form className={styles.form}>
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

          {/* <Dropdown 
            title={"Микрорайон"}
            placeholder={"Выберите, к кому хотите обратиться"}
            items={["первый район", "второй район", "третий район", "четвертый район", "пятый район"]}
            value={district}
            setValue={setDistrict}
            />
          <Dropdown 
            title={"Сфера обращения"}
            placeholder={"Выберите сферу обращения"}
            items={["Образование", "Дороги", "Трубы", "Коммунальные услуги", "Другое"]}
            value={sphere}
            setValue={setSphere}
            />
          <Dropdown 
            title={"Вид обращения"}
            placeholder={"Выберите вид обращения"}
            items={["Предложение", "Заявление", "Жалоба"]}
            value={type}
            setValue={setType}
            /> */}

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
                value={files}
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.value)}
              />
              <div>Прикрепить файлы</div><HiOutlinePaperClip />
            </label>
          </div>
          <Button 
            className='primary' 
            onClick={() => onSubmit()}
          >Отправить обращение</Button>
        </form>
      </div>
    </Container>
  );
}

export default Request;