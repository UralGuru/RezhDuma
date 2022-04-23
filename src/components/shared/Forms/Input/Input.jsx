import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Input.module.css'

let cx = classNames.bind(styles);

const Input = ({
  children, placeholder, className, type, onChange, value, onBlur, error
}) => {

  const classes = cx(
    'inp',
    className
  );

  return ( 
    <div className={styles.inp_field}>
      {children && <div className={styles.inp_label}>{children}</div>}
      <input
      className={classes}
      type={type}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
    /> 
    {error && <div className={styles.inp_error}>{error}</div>}
    </div>
  );
}

Input.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  children: null,
  placeholder: '',
  onChange: () => {},
  value: '',
  className: '',
  type: ''
};

export default Input;