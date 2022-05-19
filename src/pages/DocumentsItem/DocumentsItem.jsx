import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {Carousel} from 'react-carousel-minimal';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

import styles from './DocumentsItem.module.css';
import {fetchOneDocuments} from "../../http/documentsApi";

const DocumentsItem = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [document, setDocument] = useState({});

    useEffect(() => {
        fetchOneDocuments(params.id).then((data) => {
            setDocument(data);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <Spinner/>
        )
    }




    let data = document.filesNames.map((data) => {
            return <object>
                <embed src={data}
                       style={{
                           maxWidth: "100%",
                           width: "1000px",
                           height: "800px",
                           justifyContent: "center",
                       }}/>
            </object>
        })


    return (<>
            <ul className={styles.breadcrumb}>
                <li>
                    <div className={styles.notActive} onClick={() => navigate('/')}>Главная</div>
                </li>
                <li>/</li>
                <li>
                    <div className={styles.notActive} onClick={() => navigate('/documents')}>Документы</div>
                </li>
            </ul>
            <div className={styles.outer}>
                <div className={styles.date}>{moment(document.documentDate).format('DD.MM.YYYY')}</div>
                <div className={styles.title}>{document.title}</div>
                <div className={styles.description}>{document.text}</div>

                {data}

            </div>
        </>
    );
}

export default DocumentsItem;