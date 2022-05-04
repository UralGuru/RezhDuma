import React, { useState } from 'react';
import Container from '../../components/shared/Container/Container';
import Dropdown from '../../components/shared/Dropdown/Dropdown';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';

import styles from './Request.module.css';

const Request = () => {

  const [district, setDistrict] = useState("");
  const [sphere, setSphere] = useState("");
  const [type, setType] = useState("");
  const [requestText, setRequestText] = useState("");
  const [files, setFiles] = useState("");

  const onSubmit = () => {
    const request = new FormData();
    request.append("district", district);
    request.append("sphere", sphere);
    request.append("type", type);
    request.append("requestText", requestText);
    request.append("files", files);
    console.log(request);
  }

  return (
    <div>
      <Container>
        <div className={styles.header}>Обращение депутату</div>
        <form className={styles.form}>
          <div>Перед тем, как задать вопрос, советуем Вам ознакомиться со списком <a href="#"><strong>часто задаваемых вопросов</strong></a></div>

          <Dropdown 
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
            />
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
              Прикрепить файлы
            </label>
          </div>
          <Button 
            className='primary' 
            onClick={() => onSubmit()}
          >Отправить обращение</Button>
        </form>
      </Container>
    </div>
  );
}

export default Request;