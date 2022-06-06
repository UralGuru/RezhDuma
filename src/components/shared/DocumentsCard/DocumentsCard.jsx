import React from 'react';
import moment from 'moment';
import styles from './DocumentsCard.module.css';
import {useNavigate} from 'react-router-dom';
import Button from '../Button/Button';

const DocumentsCard = ({ id, title, description, date }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.card_title}>{title}</div>
            <div className={styles.card_description}>{description.slice(0 ,70)}...</div>
            <div className={styles.card_date}>Дата загрузки: {moment(date).format('DD.MM.YYYY')}</div>
            <div className={styles.button_row}>
                <Button
                    className={'secondary-outline'}
                    onClick={() => {navigate(`/documents/${id}`)}}
                >Открыть</Button>
            </div>
        </div>
    );
}

export default DocumentsCard;