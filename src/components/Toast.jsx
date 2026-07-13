import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: var(--spacing-lg);
          right: var(--spacing-lg);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          pointer-events: none;
        }
        .toast {
          padding: var(--spacing-sm) var(--spacing-md);
          border: 2px solid var(--color-black);
          background: var(--color-black);
          color: var(--color-white);
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          animation: toast-in 0.25s ease-out;
          pointer-events: auto;
        }
        .toast-success {
          background: var(--color-primary);
          border-color: var(--color-primary);
        }
        .toast-error {
          background: #DC2626;
          border-color: #DC2626;
        }
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
