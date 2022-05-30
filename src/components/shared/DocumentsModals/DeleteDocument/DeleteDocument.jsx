import React from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../../../../http/documentsApi';
import { deleteHistory } from '../../../../http/historyApi';
import Button from '../../Button/Button';

import styles from './DeleteDocument.module.css';

const DeleteDocument = ({modalIsOpen, closeModal, id}) => {
  const navigate = useNavigate();
  Modal.setAppElement('#root');
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '1rem',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const deleteAndClose = () => {
    deleteDocument(id).then(data => {
      closeModal();
      navigate(-1);
    })
  }

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={styles.modal}>
        <div className={styles.modal_header}>Вы уверены что хотите удалить этот документ?</div>
        <div className={styles.button_row}>
          <Button
            className='secondary-outline'
            onClick={() => closeModal()}
          >Нет</Button>
          <Button
            className='primary'
            onClick={() => deleteAndClose()}
          >Да</Button>
        </div>
      </div>
    </Modal>
  );
}
 
export default DeleteDocument;