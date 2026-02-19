import { useState, useEffect } from 'react';
import './Toast.css';

let toastTimeout;
let toastCallback = null;

export const showToast = (message, type = 'info') => {
  if (toastCallback) {
    toastCallback(message, type);
  }
};

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    toastCallback = (message, type) => {
      clearTimeout(toastTimeout);
      setToast({ message, type });
      toastTimeout = setTimeout(() => setToast(null), 3000);
    };
    return () => {
      toastCallback = null;
    };
  }, []);

  if (!toast) return null;

  return (
    <div className={`toast-container ${toast ? 'visible' : ''}`}>
      <div className={`toast ${toast.type}`}>
        {toast.type === 'success' && <span className="toast-icon">✓</span>}
        {toast.type === 'error' && <span className="toast-icon">✕</span>}
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
