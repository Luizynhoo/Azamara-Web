import { useCallback, useState } from 'react';
import ToastContext from './Context';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);

    // Remove o toast automaticamente
    const duration = type === 'success' ? 3000 : 5000;
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <>
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
};

const Toast = ({ type, message, onClose }) => {
  const isSuccess = type === "success";
  const cleanMessage = typeof message === 'string' 
    ? message.replace(/<[^>]*>/g, '') 
    : message;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {isSuccess ? '✓' : '✕'}
        </span>
        <span className="toast-message">
          {cleanMessage}
        </span>
      </div>
      <button onClick={onClose} className="toast-close" aria-label="Fechar">
        ×
      </button>
    </div>
  );
};