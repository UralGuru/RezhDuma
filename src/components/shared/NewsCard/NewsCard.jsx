import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './NewsCard.module.css';
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

// показывается картинка и короткое описание(ограничить до 100-150 букв), ссылка ведующая на страницу одной новости, где
// по id новости будет прогружаться нужная новость.
// нужно по прежнему думать над адаптивностью
const NewsCard = ({
  id, title, description, imageSrc, date
}) => {
  const navigate = useNavigate();
  
  return ( 
    <a className={styles.card}
      onClick={() => navigate('/newsitem/' + id)}>
      <div className={styles.card_date}>{date}</div>
      <div className={styles.card_content}>
        {imageSrc && 
        <div className={styles.card_img}>
          <img src={"/images/header_icons/rejh-icon.svg"}/>
        </div>}
        <div className={styles.card_text}>
          <div className={styles.card_header}>{title}</div>
          <div className={styles.card_description}>{description}</div>
          
        </div>
      </div>
    </a>
  );
}

NewsCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  className: PropTypes.string,
};

NewsCard.defaultProps = {
  id: 0,
  title: '',
  description: '',
  image: '',
  date: '',
  className: '',
};

export default NewsCard;