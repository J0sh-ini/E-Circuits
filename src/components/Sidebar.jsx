// src/components/Sidebar.jsx
import React from "react";
import HelpSection from "./HelpSection";
import { useState } from "react";
import './styles.css';

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    // Record which type of node is being dragged
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
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
          padding: "3.125rem 0.625rem 0.625rem 0.625rem",
          
        }}
      > Simple Circuit Designer
      </h3>
      <div
        style={{
          padding: "0.93rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <h3>Components</h3>

        {/* Draggable Input Node 
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "inputNode")}
          draggable
          style={dndStyle}
        >
          Input (Switch)
        </div>

        {/* Draggable Output Node *
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "outputNode")}
          draggable
          style={dndStyle}
        >
          Output (Bulb)
        </div>

        {/* Draggable AND Gate */}
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "andGate")}
          draggable
         
        >
          AND Gate
        </div>

        {/* Draggable OR Gate */}
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "orGate")}
          draggable
         
        >
          OR Gate
        </div>

        {/* Draggable NOT Gate */}
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "notGate")}
          draggable
         
        >
          NOT Gate
        </div>
          <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "nandGate")}
          draggable
    
        >
          NAND Gate
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "norGate")}
          draggable
          
        >
          NOR Gate
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "xorGate")}
          draggable
          
        >
          XOR Gate
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

