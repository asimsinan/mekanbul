import React from "react";

const Modal = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
};

export default Modal;
