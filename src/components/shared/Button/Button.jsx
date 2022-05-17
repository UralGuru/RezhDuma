import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.css'

let cx = classNames.bind(styles);

const Button = ({
  children, onClick, className, disabled, active, type
}) => {

  const classes = cx(
    'btn',
    className,
    {active: active}
  );

  return ( 
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >{children}</button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  type: PropTypes.string
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  className: '',
  disabled: false,
  active: false,
  type: 'button'
};

export default Button;