import React from 'react';
import Modal from 'react-modal';
import Button from '../../../../../../components/shared/Button/Button';
import { deleteRequest } from '../../../../../../http/requestApi';

import styles from './DeleteModal.module.css';

const DeleteModal = ({reqId, modalIsOpen, closeModal, closeNextModal}) => {
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
    deleteRequest(reqId).then(data => {
      closeModal();
      closeNextModal();
    })
  }

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={styles.modal}>
        <div className={styles.modal_header}>Вы уверены что хотите удалить обращение?</div>
        <div className={styles.button_row}>
          <Button
            className='secondary-outline'
            onClick={closeModal}
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
 
export default DeleteModal;