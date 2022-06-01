import React from 'react';
import Modal from 'react-modal/lib/components/Modal';

const InformationModal = (
  {modalIsOpen, closeModal, children}
  ) => {
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
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '1rem',
      marginRight: '-50%',
      minWidth: '60%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return ( 
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      >
        {children}
    </Modal>
  );
}
 
export default InformationModal;