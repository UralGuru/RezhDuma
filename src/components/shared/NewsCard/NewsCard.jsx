import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './NewsCard.module.css';

let cx = classNames.bind(styles);

const NewsCard = ({
  title, description, image, date, className
}) => {

  const classes = cx(
    'card',
    className
  );
  
  return ( 
    <div className={styles.card}>
      <div className={styles.card_date}>{date}</div>
      <div className={styles.card_content}>
        {image && <img className={styles.card_img} src={"/images/header_icons/rejh-icon.svg"}/>}
        <div className={styles.card_text}>
          <div className={styles.card_header}>{title}</div>
          <div className={styles.card_description}>{description}</div>
        </div>
      </div>
    </div>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  className: PropTypes.string,
};

NewsCard.defaultProps = {
  title: '',
  description: '',
  image: '',
  date: '',
  className: '',
};

export default NewsCard;