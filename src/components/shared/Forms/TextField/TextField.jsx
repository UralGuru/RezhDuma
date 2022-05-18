import React from 'react';
import { ErrorMessage, useField } from 'formik';
import styles from './TextField.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.text_field}>
      <label htmlFor={field.name} className={styles.label}>{label}</label>
      <input
        className={cx({'is-invalid': meta.touched && meta.error})}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className={styles.error}/>
    </div>
  )
}