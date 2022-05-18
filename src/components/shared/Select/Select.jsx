import React, { useState } from 'react';
import useInput from '../../../hooks/useInput';
import Input from '../Input/Input';
import PropTypes, { string } from 'prop-types';
import RS from 'react-select'

const Select = ({ placeholder, options, setValue, value, isSearchable = true }) => {

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
      backgroundColor: (state.isFocused) ? '#E3E3E3' : 'white',
      padding: '.5rem 1rem'
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
    }),
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

Select.propTypes = {
  placeholder: PropTypes.string,
  setValue: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
  isSearchable: PropTypes.bool,
};

Select.defaultProps = {
  placeholder: "",
  setValue: () => {},
  options: [],
  value: "",
  isSearchable: true,
};

export default Select;