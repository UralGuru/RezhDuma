import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

let cx = classNames.bind(styles);


const Card = ({
  id, title, description, image, date, category=''
}) => {
  const navigate = useNavigate();

  return ( 
    <div className={styles.card}>
      <div className={styles.card_date}>{moment(date).format('DD.MM.YYYY')}</div>
      <div className={styles.card_content}>
        {image && 
        <div className={styles.card_img} onClick={() => navigate(`${category}${id}`)}>
          <img src={image} alt='Не удалось отобразить изображение'/>
        </div>}
        <div className={styles.card_text}>
          <div className={styles.card_title} onClick={() => navigate(`${category}${id}`)}>{title}</div>
          <div className={styles.card_description}>{description.slice(0, 400)}{description.length > 400 ? '...' : ''}</div>
          <div className={styles.card_link}>
            <Button className='secondary-outline' onClick={() => navigate(`${category}${id}`)}>Читать далее</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  date: PropTypes.string
};

Card.defaultProps = {
  id: 0,
  title: '',
  description: '',
  imageSrc: '',
  date: ''
};

export default Card;