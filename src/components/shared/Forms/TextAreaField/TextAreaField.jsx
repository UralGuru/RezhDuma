import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError/TextError'
import styles from './TextAreaField.module.css';

const TextAreaField = (props) => {
  const { label, name, ...rest } = props
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default TextAreaField;