import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './DocumentsCard.module.css';
import {useNavigate} from 'react-router-dom';
import Button from '../Button/Button';

let cx = classNames.bind(styles);

const DocumentsCard = ({ id, title, description, files, date }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.card_content}>
                <div className={styles.card_text}>
                    <div className={styles.card_title} onClick={() => navigate(`${id}`)}>{title}</div>
                    <div className={styles.card_description}>{description.slice(0, 100) + "..."}</div>
                    <div className={styles.card_link}>
                        <Button className='secondary-outline' onClick={ () => navigate(`${id}`) }>
                          Подробнее
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

DocumentsCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    imageSrc: PropTypes.string,
    date: PropTypes.string
};

DocumentsCard.defaultProps = {
    id: 0,
    title: '',
    description: '',
    imageSrc: '',
    date: ''
};

export default DocumentsCard;