import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {Carousel} from 'react-carousel-minimal';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

import styles from './HistoryItem.module.css';
import {fetchOneHistory} from "../../http/historyApi";

// получает новость из бэка по id переданному в роуте.

const HistoryItem = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState({});

    useEffect(() => {
        fetchOneHistory(params.id).then((data) => {
            setHistory(data);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    return (<>
            <ul className={styles.breadcrumb}>
                <li>
                    <div className={styles.notActive} onClick={() => navigate('/')}>Главная</div>
                </li>
                <li>/</li>
                <li>
                    <div className={styles.notActive} onClick={() => navigate('/history')}>История думы</div>
                </li>
            </ul>
            <div className={styles.outer}>
                <div className={styles.date}>{moment(history.historyDate).format('DD.MM.YYYY')}</div>
                <div className={styles.title}>{history.title}</div>
                {history.filesNames.length != 0 &&
                    <Carousel
                        data={history.filesNames.map((data) => {
                            return {'image': data}
                        })}
                        width="700px"
                        height="400px"
                        captionStyle={{
                            fontSize: '2rem',
                            fontWeight: '700',
                        }}
                        radius="1rem"
                        slideNumber={true}
                        slideNumberStyle={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                        }}
                        captionPosition="bottom"
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={true}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "100%",
                            margin: "0 auto"
                        }}
                    />}
                <div className={styles.description}>{history.text}</div>
            </div>
        </>
    );
}

export default HistoryItem;