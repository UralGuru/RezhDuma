import React from 'react';
import Select from 'react-select';
import { ErrorMessage } from 'formik';
import styles from './SelectField.module.css';

const SelectField = ( props ) => {

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      color: '#585858',
      fontWeight: '500',
    }),

    control: (provided, state) => ({
      ...provided,
      border: '1px solid #8B8B8B',
      borderRadius: '.5rem',
      color: '#585858',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      outline: state.isFocused ? '1px solid #1E6D98' : '0px solid #8B8B8B',
    }),

    menu: (provided, state) => ({
      ...provided,
      color: '#585858',
    }),

    option: (provided, state) => ({
      ...provided,
      color: '#585858',
      backgroundColor: (state.isSelected) ? '#E3E3E3' : 'white',
      backgroundColor: (state.isFocused) ? '#E3E3E3' : 'white',
      padding: '.5rem 1rem'
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
    }),
  }

  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : "";
  };

  return (
      <div className={styles.select_field}>
        <div className={styles.select_label}>{props.label}</div>
        <Select
          styles={customStyles}
          placeholder={props.placeholder}
          value={defaultValue(props.options, props.value)}
          onChange={value => {
            props.onChange(value)
          }} 
          options={props.options} />
        <ErrorMessage component="div" name={props.name} className={styles.error}/>
      </div>

  )
}

export default SelectField;