import React, { useEffect } from 'react';
export const Toast = ({ id, message, type, onRemove, undoAction }) => {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '10px',
        background: type === 'error' ? '#ff4444' : type === 'success' ? '#00C851' : '#ffbb33',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <span>{message}</span>
      <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
        {undoAction && (
          <button
            onClick={() => {
              if (typeof undoAction === 'function') {
                undoAction();
              }
              if (typeof onRemove === 'function') {
                onRemove(id);
              }
            }}
            style={{
              background: 'white',
              color: type === 'success' ? '#00C851' : '#333',
              border: 'none',
              padding: '4px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            UNDO
          </button>
        )}
        <button
          onClick={() => {
            if (typeof onRemove === 'function') {
              onRemove(id);
            }
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0 4px'
          }}
          >
          ×
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '500px'
      }}
    >
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onRemove={onRemove}
          undoAction={toast.undoAction}
        />
      ))}
    </div>
  );
};