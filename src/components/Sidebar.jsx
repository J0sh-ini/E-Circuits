// src/components/Sidebar.jsx
import React from "react";
import HelpSection from "./HelpSection";
import { useState } from "react";
import './styles.css';

export default function Sidebar({ onSpawnNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <aside
      style={{
        width: "12.5rem",
        background: "#6c6c6c",
      }}
    >
      <HelpSection isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}}>
        
        </HelpSection>
      <h3
        style={{
          background: "#1a1a1a",
          color: "#a4a4a4",
          margin: "0",
          padding: "3.125rem 0.625rem 1.625rem 0.625rem",
          
        }}
      ><a 
      href="https://github.com/J0sh-ini/E-Circuits" 
      target="_blank"
      style={{color:"#a4a4a4",
              fontSize:'1.4rem'
      }}
      >E-Circuits</a> 
      </h3>
      <div
        style={{
          padding: "0.93rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          maxHeight: "calc(100vh - 8rem)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <h3>Components</h3>

       
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("andGate")}
          style={{cursor: 'pointer'}}
        >
          AND Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("andGate3")}
          style={{cursor: 'pointer'}}
        >
         3AND Gate
        </div>
        {/* Draggable OR Gate */}
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("orGate")}
          style={{cursor: 'pointer'}}
        >
          OR Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("orGate3")}
          style={{cursor: 'pointer'}}
        >
          3OR Gate
        </div>
        {/* Draggable NOT Gate */}
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("notGate")}
          style={{cursor: 'pointer'}}
        >
          NOT Gate
        </div>
          <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("nandGate")}
          style={{cursor: 'pointer'}}
        >
          NAND Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("nandGate3")}
          style={{cursor: 'pointer'}}
        >
          3NAND Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("norGate")}
          style={{cursor: 'pointer'}}
        >
          NOR Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("norGate3")}
          style={{cursor: 'pointer'}}
        >
          3NOR Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("xorGate")}
          style={{cursor: 'pointer'}}
        >
          XOR Gate
        </div>
        <div
          className="dndnode"
          onDoubleClick={() => onSpawnNode("xorGate3")}
          style={{cursor: 'pointer'}}
        >
          3XOR Gate
        </div>
        <div
          className="help dndnode"
          style={{marginTop:'auto',cursor:'pointer'}}
          onClick={()=>{setIsModalOpen(true)}}
        >
          Help
        </div>
      </div>
    </aside>
  );
}

