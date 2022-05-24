import React, { useEffect } from 'react';
import {useState} from 'react';
import {AiOutlineClose, AiOutlinePlus} from 'react-icons/ai';

import styles from './CreateQuestion.module.css';

const CreateQuestion = ({id, questions, setQuestions }) => {

  const addAnswer = () => {
    const newArr = questions;
    newArr[id].answers.push({'answer': 'fdf'});
    setQuestions([...newArr]);
  }

  const deleteAnswer = () => {
    console.log(questions[id]);
    if (questions[id].answers.length < 3) {
      return;
    }
    const newArr = questions;
    newArr[id].answers.pop();
    setQuestions([...newArr]);
  }

  return ( 
    <div>
      <div>Вопрос</div>
      <div>{questions[id].question}</div>
      <div>
        {questions[id].answers.map((answer) => {
          return (
            <input 
              type='text'
              value={answer.answer}
            />
          )
        })}
      </div>
      <div className={styles.add_question_row}>
        <button 
          type='button'
          className={styles.add_question_button}
          onClick={() => deleteAnswer()}
          ><AiOutlineClose /> <div>Удалить вариант ответа</div></button>
      </div>
      <div className={styles.add_question_row}>
        <button 
          type='button'
          className={styles.add_question_button}
          onClick={() => addAnswer()}
          ><AiOutlinePlus /> <div>Добавить вариант ответа</div></button>
      </div>
    </div>
  );
}
 
export default CreateQuestion;