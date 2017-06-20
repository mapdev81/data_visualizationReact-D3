import React, { PropTypes } from 'react';

const Modal = ({ content, toggleAction }) => {
  return (
    <div className="modal">
      <div className="modal-inner">{content}</div>
      <div className="modal-background" onClick={toggleAction}></div>
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.object.isRequired,
  toggleAction: PropTypes.func.isRequired,
};

export default Modal;
