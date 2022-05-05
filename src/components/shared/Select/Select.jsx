import React, { useState } from 'react';
import useInput from '../../../hooks/useInput';
import Input from '../Input/Input';
import PropTypes, { string } from 'prop-types';
import RS from 'react-select'

const Select = ({ placeholder, options, setValue, value, isSearchable = true }) => {

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
    }),

    control: (provided, state) => ({
      ...provided,
      border: '1px solid #8B8B8B',
      borderRadius: '.5rem',
    }),

    menu: (provided, state) => ({
      ...provided,
      
    }),

    option: (provided, state) => ({
      ...provided,
      color: '#585858',
      backgroundColor: (state.isSelected) ? '#E3E3E3' : 'white',
      padding: '.5rem 1rem'
    })
  }


  const onChange = (newValue) => {
    setValue(newValue.value);
  }

  const getValue = () => {
    return value ? options.find(c => c.value === value) : "";
  }

  return ( 
    <RS 
      styles={customStyles}
      isSearchable={isSearchable}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      value={getValue()}
    />
  )
}

// Select.propTypes = {
//   title: PropTypes.string,
//   placeholder: PropTypes.string,
//   items: PropTypes.array
// };

// Select.defaultProps = {
//   title: "",
//   placeholder: "",
//   items: []
// };

export default Select;