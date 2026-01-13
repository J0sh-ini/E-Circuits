import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import andPin from '../images/andPin.png';
import orPin from '../images/orPin.png';
import notPin from '../images/notPin.png';
import nandPin from '../images/nandPin.png';
import norPin from '../images/norPin.png';
import xorPin from '../images/xorPin.png';
const HelpSection = ({ isOpen, onClose, children }) => {
  const [page,setPage]=useState(0);
  if (!isOpen) return null;
  const maxPage=6;

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
          padding: '1.5rem',
          paddingTop:'0',
          borderRadius: '0.75rem',
          position: 'relative',
          width: '50%',
          height:"50%",
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0.625rem 1.56rem rgba(0,0,0,0.2)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            fontSize: '1.125rem'
          }}
        >
          ✕
        </button>
        {children}
       { (page===0)?  (<div><h3>Basics</h3>
        <p>1)Double tap on the gate you need and freely move them however you want.</p>
        <p>2)Input sources are provided in the bottom which can be turned on or off by tapping on them.</p>
        <p>3)Connect the inputs with the any gates and join them up with outputs at the top.</p>
        <p>4)Don't forget to connect the Power source and ground of each IC.</p>
        <p>5)Double tap on any IC or wire to remove them.</p> 
        {/* 1)Drag and drop the required gates into the canvas <br></br>
        2)Inputs are present in the bottom which can be turned on or off by clicking on them<br></br>
        3)Outputs are given at the top of the circuit ,Complete your circuit and check out how it works<br></br>
        4)Select unwanted wire or gate and click backspace to remove them */}
        </div>) :<></>
        }       
         { (page===1)?  (<div><h3>And gate</h3>
        <img src={andPin} style={{width:'100%'}}></img>
          </div>) :<></>
          }
          { (page===2)?  (<div><h3>Or gate</h3>
        <img src={orPin} style={{width:'100%'}}></img>
          </div>) :<></>
          }
          { (page===3)?  (<div><h3>Not gate</h3>
        <img src={notPin} style={{width:'100%'}}></img>
          </div>) :<></>
          }
          { (page===4)?  (<div><h3>Nand gate</h3>
        <img src={nandPin} style={{width:'100%'}}></img>
          </div>) :<></>
          }
          { (page===5)?  (<div><h3>Nor gate</h3>
        <img src={norPin} style={{width:'100%'}}></img>
          </div>) :<></>
          }
          { (page===6)?  (<div><h3>Xor gate</h3>
        <img src={xorPin} style={{width:'100%'}}></img>
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