import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#111827' }}>Confirm Delete</h3>
        <p style={{ color: '#4b5563', margin: '1rem 0 2rem' }}>
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button 
            onClick={onClose}
            style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{ padding: '0.5rem 1rem', border: 'none', background: '#ef4444', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
