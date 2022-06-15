import React, { useEffect, useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import {BsArrowRight} from 'react-icons/bs';
import styles from './Documents.module.css';
import { DOCUMENTS_ROUTE } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/shared/Container/Container';
import Slider from '../../../components/shared/Slider/Slider';
import { fetchDocuments } from '../../../http/documentsApi';
import DocumentsCard from '../../../components/shared/DocumentsCard/DocumentsCard';

const Documents = () => {

  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus('loading')
    fetchDocuments(7, 1, '').then((data) => {
      setDocuments(data);
      setStatus('success');
    })
  }, [])

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

  if (status === 'success') {
  return ( 
    <Container>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <h2 className={styles.header}>Документы</h2>
          <div className={styles.slider_container}>
            <Slider 
              items={documents.map((document) => {
                return (
                  <DocumentsCard 
                    key={document.id}
                    id={document.id}
                    title={document.title}
                    description={document.text}
                    date={document.documentDate}/>
              )})}
              itemsPerPage={1}
              responsive={[
                {windowWidth: 0, items: 1},
                {windowWidth: 512, items: 2},
                {windowWidth: 1024, items: 3}
              ]}
              disableButtons
            />
          </div>
        </div>
        <div className={styles.button_row}>
          <Button 
            className='secondary-outline'
            onClick={() => navigate(DOCUMENTS_ROUTE)}
          ><div className={styles.button}>Перейти в раздел <BsArrowRight /></div></Button>
        </div>
      </div>
    </Container>
  )};

  return (
    <div></div>
  )
}
 
export default Documents;