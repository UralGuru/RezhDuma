import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './ProjectsCard.module.css';
import {useNavigate} from 'react-router-dom';
import Button from '../Button/Button';

let cx = classNames.bind(styles);


const ProjectsCard = ({ id, title, description, imageSrc, date }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.card_date}>{moment(date).format('DD.MM.YYYY')}</div>
            <div className={styles.card_content}>
                {imageSrc &&
                    <div className={styles.card_img} onClick={() => navigate('/projectsitem/' + id)}>
                        <img src={imageSrc} alt='Не удалось отобразить изображение'/>
                    </div>}
                <div className={styles.card_text}>
                    <div className={styles.card_title} onClick={() => navigate('/projectsitem/' + id)}>{title}</div>
                    <div className={styles.card_description}>{description.slice(0, 400) + "..."}</div>
                    <div className={styles.card_link}>
                        <Button className='secondary-outline' onClick={ () => navigate('/projectsitem/' + id) }>
                          Читать далее
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProjectsCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    imageSrc: PropTypes.string,
    date: PropTypes.string
};

ProjectsCard.defaultProps = {
    id: 0,
    title: '',
    description: '',
    imageSrc: '',
    date: ''
};

export default ProjectsCard;