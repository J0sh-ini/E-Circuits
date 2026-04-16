import React from "react";
import { Handle, Position } from "@xyflow/react";
import './styles.css';


const ClockNode = ({ data }: {data : { value : number } }) => {
  const isHigh = data.value === 1;

  return (
    <div className="clock-node-container" style={{
      width: '4.5rem',
      height: '3.5rem',
      background: isHigh ? 'rgba(60, 255, 100, 0.2)' : 'rgba(255, 40, 60, 0.1)',
      border: `2px solid ${isHigh ? '#2dce55' : '#444'}`,
      borderRadius: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: isHigh ? '0 0 12px rgba(60, 255, 100, 0.4)' : 'none',
      transition: 'all 0.1s ease-in-out',
      color: '#fff',
      fontFamily: 'Outfit, sans-serif'
    }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#bbb' }}>CLOCK</div>
      <div style={{ 
        fontWeight: 'bold', 
        fontSize: '1.2rem', 
        color: isHigh ? '#4dff77' : '#ff4d6d' 
      }}>
        {isHigh ? '1' : '0'}
      </div>

      <div style={{ position: 'relative', width: '24px', height: '12px', marginTop: '2px', opacity: 0.8 }}>
        <svg width="24" height="12" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 2 10 L 8 10 L 8 2 L 16 2 L 16 10 L 22 10" 
            stroke={isHigh ? "#2dce55" : "#666"} 
            strokeWidth="2" 
            fill="none" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      <Handle
        type="source"
        position={Position.Top}
        id="clock_out"
        style={{ top: '-0.3rem', background: isHigh ? '#2dce55' : '#555', border: 'none', width: '10px', height: '10px' }}
      />
    </div>
  );
};

export default ClockNode;
