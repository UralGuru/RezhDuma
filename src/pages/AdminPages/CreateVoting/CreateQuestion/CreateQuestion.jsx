import React, { useEffect } from 'react';
import {useState} from 'react';
import {AiOutlineClose, AiOutlinePlus} from 'react-icons/ai';

import styles from './CreateQuestion.module.css';

const CreateQuestion = ({id, questions, setQuestions, setError}) => {

  const addAnswer = () => {
    const newArr = questions;
    newArr[id].answers.push({'id': questions[id].answers.length, 'answer': ''});
    setQuestions([...newArr]);
  }

  const deleteAnswer = () => {
    if (questions[id].answers.length < 2) {
      return;
    }
    const newArr = questions;
    newArr[id].answers.pop();
    setQuestions([...newArr]);
  }

  const changeQuestionText = (value) => {
    const newArr = questions;
    newArr[id].question = value;
    setQuestions([...newArr]);
  }

  const changeQuestionMultiple = (value) => {
    const newArr = questions;
    newArr[id].checkbox = !questions[id].checkbox;
    setQuestions([...newArr]);
  }

  const changeAnswerText = (answerId, value) => {
    const newArr = questions;
    newArr[id].answers[answerId].answer = value;
    setQuestions([...newArr]);
  }

  const checkField = (value) => {
    if (value) {
      setError('');
      return;
    } else {
      setError('Все поля голосования должны быть заполнены');
      return;
    }
  }

  return ( 
    <div className={styles.question}>
      <div className={styles.question_container}>
        <div className={styles.label}>Вопрос</div>
        <input 
          className={styles.question_text}
          type='text'
          placeholder='Новый вопрос'
          value={questions[id].question}
          onChange={(event) => {changeQuestionText(event.target.value)}}
          onBlur={(event) => {checkField(event.target.value)}}
        />
        <label>
          Множественный выбор?
          <input 
            className={styles.question_text}
            type='checkbox'
            value={questions[id].checkbox}
            onChange={(event) => {changeQuestionMultiple(event.target.value)}}
          />
        </label>
      </div>
      <div className={styles.answers_container}>
        <div className={styles.label}>Варианты ответа</div>
        <div className={styles.answers}>
          {questions[id].answers.map((answer) => {
            return (
              <input 
                className={styles.answer}
                type='text'
                placeholder='Ответ'
                value={questions[id].answers[answer.id].answer}
                onChange={(event) => {changeAnswerText(answer.id, event.target.value)}}
                onBlur={(event) => {checkField(event.target.value)}}
              />
            )
          })}
          <div className={styles.button_row}>
          <button 
            type='button'
            className={styles.question_button}
            onClick={() => deleteAnswer()}
            ><AiOutlineClose /> <div>Удалить вариант ответа</div></button>
          </div>
          <div className={styles.button_row}>
            <button 
              type='button'
              className={styles.question_button}
              onClick={() => addAnswer()}
              ><AiOutlinePlus /> <div>Добавить вариант ответа</div></button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CreateQuestion;