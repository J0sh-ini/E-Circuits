import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const HelpSection = ({ isOpen, onClose, children }) => {
  const [page,setPage]=useState(0);
  if (!isOpen) return null;
  const maxPage=2;

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
    ><button 
      onClick={(e)=>{
      e.stopPropagation();
      setPage(page-1)
      }
      }
      disabled={page===0}>{"<"}</button>
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          position: 'relative',
          width: '600px',
          height:"600px",
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
       { (page===0)?  (<div><h1>Basics</h1>
        1)Drag and drop the required gates into the canvas <br></br>
        2)Inputs are present in the bottom which can be turned on or off by clicking on them<br></br>
        3)Outputs are given at the top of the circuit ,Complete your circuit and check out how it works<br></br>
        4)Select unwanted wire or gate and click backspace to remove them</div>) :<></>
        }       
         { (page===1)?  (<div><h1>And gate</h1>
        1)Pin 2,3 input pin 4 output on top <br></br>
          </div>) :<></>
          }
          { (page===2)?  (<div><h1>Or gate</h1>
        1)gate <br></br>
          </div>) :<></>
          }
      </div>
      <button
       onClick={(e)=>{
      e.stopPropagation();
      setPage(page+1)}}
      disabled={page===maxPage}>{">"}</button>
    </div>
  );

  // Render into the body instead of the local parent
  return createPortal(modalContent, document.body);
};
export default HelpSection;