import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, onConfirm, title, message, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .modal-content {
            background: var(--bg-secondary);
            border: 1px solid var(--glass-border);
            border-radius: 15px;
            padding: 20px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            color: var(--text-main);
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            z-index: 10000;
          }
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          .modal-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: var(--text-main);
          }
          .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-main);
          }
          .modal-body {
            margin-bottom: 20px;
          }
          .modal-body p {
            color: var(--text-main);
            margin: 0;
          }
          .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
          .btn-cancel, .btn-confirm {
            padding: 8px 16px;
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            cursor: pointer;
            background: var(--bg-primary);
            color: var(--text-main);
            transition: var(--transition);
          }
          .btn-cancel:hover, .btn-confirm:hover {
            background: var(--primary);
            color: white;
          }
          .btn-confirm {
            background: #dc3545;
            color: white;
          }
          .btn-confirm:hover {
            background: #c82333;
          }
        `}
      </style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body">
            {children ? children : <p>{message}</p>}
          </div>
          {!children && (
            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
