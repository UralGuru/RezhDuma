import React, { useState } from 'react';
import useInput from '../../../hooks/useInput';
import Input from '../Input/Input';
import PropTypes, { string } from 'prop-types';

import styles from './Dropdown.module.css';

const Dropdown = ({title, placeholder, items, value, setValue}) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleValue = (newValue) => {
    setValue(newValue);
  }

  const handleOpen = (bool) => {
    setIsOpen(bool);
  }

  return ( 
    <div className={styles.dropdown}>
      <div
        className={styles.dropdown_label}
      >{title}</div>
      <input
        className={styles.dropdown_input}
        placeholder={placeholder}
        onClick={() => handleOpen(true)}
        onBlur={() => handleOpen(false)}
        onChange={(e) => handleValue(e.target.value)}
        value={value}
      />
      {isOpen && (
      <div className={styles.dropdown_content}>
        {items
          .filter((dropdownItem) => dropdownItem.toLowerCase().indexOf(value.toLowerCase()) !== -1)
          .map((dropdownItem) => {
            return (
              <button 
                key={dropdownItem}
                className={styles.dropdown_item}
                onMouseDown={() => handleValue(dropdownItem)}
                >{dropdownItem}
              </button>
            )
        })}
      </div>)}
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  items: PropTypes.array
};

Dropdown.defaultProps = {
  title: "",
  placeholder: "",
  items: []
};

export default Dropdown;