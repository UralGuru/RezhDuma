import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './InfoCard.module.css'
import Button from '../Button/Button';

const InfoCard = ({
  title, description, onClick
}) => {
  return ( 
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <Button
        onClick={onClick}
        className="secondary-outline"
      >Подробнее
      </Button>
    </div>
  );
}

InfoCard.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool
};

InfoCard.defaultProps = {
  children: '',
  onClick: () => {},
  className: '',
  disabled: false,
  active: false
};

export default InfoCard;