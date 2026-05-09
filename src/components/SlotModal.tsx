import React from 'react';
import { createPortal } from 'react-dom';

interface SlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (slot: number) => void;
  mode: 'save' | 'load';
  occupiedSlots: number[];
}

const SlotModal = ({ isOpen, onClose, onSelect, mode, occupiedSlots }: SlotModalProps) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10002
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(25, 25, 30, 0.95)',
          backdropFilter: 'blur(25px)',
          padding: '2.5rem',
          borderRadius: '1.25rem',
          position: 'relative',
          width: '450px',
          maxWidth: '90%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            fontSize: '1.5rem',
            color: '#666',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
        >
          ✕
        </button>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '2rem', 
          textAlign: 'center', 
          fontSize: '1.75rem', 
          fontWeight: 700, 
          letterSpacing: '1px',
          background: 'linear-gradient(90deg, #fff, #aaa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {mode === 'save' ? 'Save Circuit' : 'Load Circuit'}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#aaa', 
          marginBottom: '2rem', 
          fontSize: '0.95rem' 
        }}>
          Select a slot to {mode} your progress
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(1, 1fr)', 
          gap: '1rem' 
        }}>
          {[1, 2, 3, 4, 5].map((slot) => {
            const isOccupied = occupiedSlots.includes(slot);
            const isDisabled = mode === 'load' && !isOccupied;
            
            return (
              <button
                key={slot}
                onClick={() => !isDisabled && onSelect(slot)}
                disabled={isDisabled}
                style={{
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  border: isOccupied ? '1px solid rgba(60, 255, 60, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isOccupied ? 'rgba(60, 255, 60, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                  color: isDisabled ? '#555' : '#fff',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isDisabled ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled) {
                    e.currentTarget.style.background = isOccupied ? 'rgba(60, 255, 60, 0.1)' : 'rgba(60, 130, 255, 0.15)';
                    e.currentTarget.style.borderColor = isOccupied ? 'rgba(60, 255, 60, 0.4)' : 'rgba(60, 130, 255, 0.3)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDisabled) {
                    e.currentTarget.style.background = isOccupied ? 'rgba(60, 255, 60, 0.05)' : 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = isOccupied ? 'rgba(60, 255, 60, 0.2)' : 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <span>Slot {slot}</span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '1rem', 
                  background: isOccupied ? 'rgba(60, 255, 60, 0.15)' : 'rgba(255,255,255,0.1)',
                  color: isOccupied ? '#4ade80' : '#888'
                }}>
                  {isOccupied ? 'Saved' : 'Empty'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default SlotModal;
