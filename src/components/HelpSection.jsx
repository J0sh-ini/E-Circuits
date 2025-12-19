import React from 'react';
import { createPortal } from 'react-dom';

const HelpSection = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Define the modal content
  const modalContent = (
    <div 
      onClick={onClose} // Close when clicking the backdrop
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10001 // High z-index to stay above React Flow
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          position: 'relative',
          width: '400px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            fontSize: '18px'
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );

  // Render into the body instead of the local parent
  return createPortal(modalContent, document.body);
};
export default HelpSection;