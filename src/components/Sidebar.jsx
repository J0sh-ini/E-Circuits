// src/components/Sidebar.jsx
import React from "react";
import HelpSection from "./HelpSection";
import { useState } from "react";


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
        width: "200px",
        background: "#6c6c6c",
      }}
    >
      <HelpSection isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}}>
        1)Drag and drop the required gates into the canvas <br></br>
        2)Select unwanted element wire or gate and click backspace to remove them
        </HelpSection>
      <h3
        style={{
          background: "#1a1a1a",
          color: "#a4a4a4",
          margin: "0",
          padding: "50px 10px 10px 10px",
          
        }}
      > Simple Circuit Designer
      </h3>
      <div
        style={{
          padding: "15px",
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
          style={dndStyle}
        >
          AND Gate
        </div>

        {/* Draggable OR Gate */}
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "orGate")}
          draggable
          style={dndStyle}
        >
          OR Gate
        </div>

        {/* Draggable NOT Gate */}
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "notGate")}
          draggable
          style={dndStyle}
        >
          NOT Gate
        </div>

        {/* Help */}
        <div
          className="help"
          style={{ ...dndStyle, cursor: "pointer", marginTop: "auto" }}
          onClick={()=>{setIsModalOpen(true)}}
        >
          Help
        </div>
      </div>
    </aside>
  );
}

// Simple styling for the draggable items
const dndStyle = {
  height: "40px",
  border: "1px solid #333",
  borderRadius: "5px",
  padding: "5px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab",
  backgroundColor: "#a8a8a8ff",
};
