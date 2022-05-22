import React from 'react';
import styles from './FilesField.module.css';
import {HiOutlinePaperClip} from 'react-icons/hi'
import { useField } from 'formik';

const FilesField = ( props ) => {
  const field = useField(props.name);

  return ( 
    <div className={styles.files_form}>
      <label className={styles.field_label}>
        {props.label} <HiOutlinePaperClip />
        <input
          className={styles.files_field}
          id={props.id}
          name={props.name}
          type={props.type}
          onChange={props.onChange}
          multiple
        />
      </label>
      {field[0].value && <div className={styles.files}>{field[0].value.map((file) => {
        return <div key={file.name}>{file.name}</div>
        })}
      </div>}
    </div>
  );
}

export default FilesField;