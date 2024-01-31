import React from 'react';
import './Modal.css';


function Modal({ isOpen, onClose, onSave, children}) {
    
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          {children}
          <button onClick={onClose}>Fermer</button>
          <button onClick={onSave}>Sauvegarder</button>
        </div>
      </div>
      
      
    );

  }

function ConfirmationModal({ isOpen, onClose, message}){
  if (!isOpen) return null;
  
  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

  export default Modal;
  export { ConfirmationModal };