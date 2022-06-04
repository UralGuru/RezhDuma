import { Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import {useState} from 'react';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import { TextField } from '../../../components/shared/Forms/TextField/TextField';
import {AiOutlinePlus, AiOutlineClose} from 'react-icons/ai';
import * as Yup from 'yup';
import styles from './CreateVoting.module.css'
import CreateQuestion from './CreateQuestion/CreateQuestion';
import TextError from '../../../components/shared/Forms/TextError/TextError';
import { createVoting } from '../../../http/votingsApi';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import InformationModal from '../../../components/shared/InformationModal/InformationModal';

const CreateVoting = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addQuestion = () => {
    setQuestions([...questions, {'id': questions.length, 'question': '', 'checkbox': false, 'answers': [{'id': 0, 'answer': ''}]}]);
  }

  const deleteQuestion = () => {
    if (questions.length < 2) {
      return;
    }
    const newArr = questions;
    newArr.pop();
    setQuestions([...newArr]);
  }

  const [questions, setQuestions] = useState([{'id': 0, 'question': '', 'checkbox': false, 'answers': [{'id': 0, 'answer': ''}]}]);
  const [questionsError, setQuestionsError] = useState('Все поля голосования должны быть заполнены');

  const [expirationTimeCheckbox, setExpirationTimeCheckbox] = useState(false);
  const changeCheckBox = () => {setExpirationTimeCheckbox(!expirationTimeCheckbox)}

  return ( 
    <Container>
      <div className={styles.inner}><BreadCrumbs data={[{'label': 'Главная', 'path': '/'}, {'label': 'Голосования', 'path': '/admin/votings'}, {'label': 'Новое голосование', 'path': '/admin/votings/create'}]}/>
        
        <div className={styles.header}>
          <h2>Новое голосование</h2>
        </div> 
        <Formik
          initialValues={{
            topic: '',
            expirationDate: null,
          }}
          validationSchema={VotingSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values, {resetForm}) => {
            questions.forEach((question) => {
              if (!question.question) {
                alert('Все поля голосования должны быть заполнены');
                return;
              }
              question.answers.forEach((answer) => {
                if (!answer.answer) {
                  alert('Все поля голосования должны быть заполнены');
                  return;
                }
              })
            })
            if (values.expirationDate) {
              if (moment(values.expirationDate) < moment()) {
                alert('Дата конца голосования должна быть позже даты начала');
                return;
              }
            }
            const data = {
              'topic': values.topic,
              'expirationDate': (values.expirationDate && expirationTimeCheckbox) 
              ?
                new Date(values.expirationDate).toISOString().slice(0, -1) 
              : 
                null,
              'questions': questions
            } 
            createVoting(data).then((data) => {
              setQuestions([{'id': 0, 'question': '', 'checkbox': false, 'answers': [{'id': 0, 'answer': ''}]}]);
              openModal();
              resetForm();
            })
          }}
        > 
        { formik => (
          <Form className={styles.main}>
            <TextField
              name='topic'
              label='Тема опроса'
              placeholder='Введите тему опроса'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.topic}
            />
            <div className={styles.questions_container}>
              {questions.map((q) => {
                return <CreateQuestion id={q.id} questions={questions} setQuestions={setQuestions} setError={setQuestionsError} key={q.id}/>
              })}
            </div>
            <div className={styles.add_question_row}>
              <button 
                type='button'
                className={styles.add_question_button}
                onClick={() => deleteQuestion()}
                ><AiOutlineClose /> <div>Удалить вопрос</div></button>
            </div>
            <div className={styles.add_question_row}>
              <button 
                type='button'
                className={styles.add_question_button}
                onClick={() => addQuestion()}
                ><AiOutlinePlus /> <div>Добавить вопрос</div></button>
            </div>
            <TextError>
              {questionsError}
            </TextError>
            <div className={styles.params_row}>
              <div className={styles.params_header}>Параметры</div>
              <div className={styles.params}>
                <label className={styles.param}>
                  <input
                    type='checkbox'
                    onChange={changeCheckBox}
                  /> Ограниченное время голосования
                </label>
                {expirationTimeCheckbox && 
                <label className={styles.date_input}>
                  Укажите дату конца голосования
                  <input 
                    name='expirationDate'
                    type='date'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expirationDate}
                  />
                </label>}
              </div>
            </div>
            <div className={styles.button_row}>
              <Button
                type='submit'
                className='primary'
              >Создать</Button>
            </div>
          </Form>
        )}
        </Formik>
      </div>
      <InformationModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        <div className={styles.submit_modal}>
          <div className={styles.submit_modal_header}>Голосование успешно создано</div>
          <div className={styles.submit_modal_content}>
            <div>Вы можете увидеть его во вкладке Голосования</div>
          </div>
        </div>
      </InformationModal>
    </Container>
  );
}
 
export default CreateVoting;

const VotingSchema = Yup.object({
  topic: Yup.string()
    .required('Необходимое поле')
    .min(8, 'Слишком короткое название'),
})
  
