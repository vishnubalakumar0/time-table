import React, { useEffect } from 'react';

export function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-icon">
                {type === 'success' ? '✅' : '❌'}
            </div>
            <div className="toast-text">{message}</div>
        </div>
    );
}

export function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="toast-container">
            {toasts.map((toast, index) => (
                <Toast
                    key={index}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(index)}
                />
            ))}
        </div>
    );
}