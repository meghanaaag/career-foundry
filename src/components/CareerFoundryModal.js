import Modal from "react-modal";
import React, { Component }  from 'react';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

export const CareerFoundryModal = ({ isOpen, closeModal, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      {children}
    </Modal>
  );
};
