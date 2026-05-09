import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import andPin from '../images/andPin.png';
import orPin from '../images/orPin.png';
import notPin from '../images/notPin.png';
import nandPin from '../images/nandPin.png';
import norPin from '../images/norPin.png';
import xorPin from '../images/xorPin.png';
import ThreeIPgates from '../images/3IPgates.png';
import jkFF from '../images/JK Flip-Flop.png';
import dFF from '../images/dflipflop.png';
const HelpSection = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children?: React.ReactNode }) => {
  const [page, setPage] = useState(0);
  if (!isOpen) return null;
  const maxPage = 9;

  const modalContent = (
    <div
      onClick={onClose} 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10001 
      }}
    ><button
      onClick={(e) => {
        e.stopPropagation();
        setPage(page - 1)
      }
      }
      disabled={page === 0}
      className='botton'
      >{"<"}</button>
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: 'white',
          padding: '1.5rem',
          paddingTop: '0',
          borderRadius: '0.75rem',
          position: 'relative',
          width: '50%',
          height: "50%",
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
        {(page === 0) ? (<div><h3>Basics</h3>
        <ul>

          <li>Double tap or drag and drop the gates/flipflops you need and freely move them however you want.</li>
          <li>Input sources are provided in the bottom which can be turned on or off by tapping on them.</li>
          <li>Connect the inputs with the any gates and join them up with outputs at the top.</li>
          <li>Don't forget to connect the Power source and ground of each IC.</li>
          <li>Double tap on any IC or wire to remove them.</li>
          <li>Toggle Between Detailed mode (ICs) and Simplified (just gates) to your liking</li>
          <li>Click add clock button to add a clock to your circuit and use the slider on the right to change TimePeriod/frequency</li>
        </ul>
          {/* 1)Drag and drop the required gates into the canvas <br></br>
        2)Inputs are present in the bottom which can be turned on or off by clicking on them<br></br>
        3)Outputs are given at the top of the circuit ,Complete your circuit and check out how it works<br></br>
        4)Select unwanted wire or gate and click backspace to remove them */}
        </div>) : <></>
        }
        {(page === 2) ? (<div><h3>And gate</h3>
          <img src={andPin} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 1) ? (<div><h3>Pin Configuration for Three Input Gates</h3>
          <img src={ThreeIPgates} style={{ width: '50%' }}></img>
        </div>) : <></>
        }
        {(page === 3) ? (<div><h3>Or gate</h3>
          <img src={orPin} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 4) ? (<div><h3>Not gate</h3>
          <img src={notPin} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 5) ? (<div><h3>Nand gate</h3>
          <img src={nandPin} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 6) ? (<div><h3>Nor gate</h3>
          <img src={norPin} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 7) ? (<div><h3>Xor gate</h3>
          <img src={xorPin} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 8) ? (<div><h3>JK FlipFlop</h3>
          <img src={jkFF} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
        {(page === 9) ? (<div><h3>D FlipFlop</h3>
          <img src={dFF} style={{ width: '100%' }}></img>
        </div>) : <></>
        }
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPage(page + 1)
        }}
        disabled={page === maxPage}
              className='botton'
        >{">"}</button>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export default HelpSection;