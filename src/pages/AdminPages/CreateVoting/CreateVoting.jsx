import { Form, Formik } from 'formik';
import React from 'react';
import {useState} from 'react';
import Button from '../../../components/shared/Button/Button';
import Container from '../../../components/shared/Container/Container';
import { TextField } from '../../../components/shared/Forms/TextField/TextField';
import {AiOutlinePlus, AiOutlineClose} from 'react-icons/ai';

import styles from './CreateVoting.module.css'
import CreateQuestion from './CreateQuestion/CreateQuestion';

const CreateVoting = () => {

  const [questions, setQuestions] = useState([{'id': 0, 'question': '', 'checkbox': false, 'answers': [{'answer': 'Вариант ответа'}]}]);

  const addQuestion = () => {
    setQuestions([...questions, {'id': questions.length, 'question': '', 'checkbox': false, 'answers': [{'answer': 'Вариант ответа'}]}]);
  }

  const deleteQuestion = () => {
    if (questions.length < 2) {
      return;
    }
    const newArr = questions;
    newArr.pop();
    setQuestions([...newArr]);
  }

  return ( 
    <Container>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>Новое голосование</h2>
        </div> 
        <Formik
          initialValues={{
            topic: '',
            questions: questions,
          }}
          
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values) => {
            console.log(values);  
          }}
        > 
        { formik => (
          <Form className={styles.main}>
            <TextField
              name='theme'
              label='Тема опроса'
              placeholder='Введите тему опроса'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
            />
            <div className={styles.questions_container}>
              {questions.map((q) => {
                return <CreateQuestion id={q.id} questions={questions} setQuestions={setQuestions} key={q.id}/>
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
            <div className={styles.params_row}>
              <div className={styles.params_header}>Параметры</div>
              <div className={styles.params}>
                <div>Ограниченное время голосования</div>
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
    </Container>
  );
}
 
export default CreateVoting;