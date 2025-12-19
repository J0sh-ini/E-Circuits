// src/nodes/AndGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

// Basic CSS styling for the node look
const nodeStyle = {
  padding: "15px",
  width:"90px",
  height:"40px",
  //borderRadius: "5px 55px 55px 5px", // Rounded right side like a D shape
  border: "2px solid #333",
  backgroundColor: "#9d9d9dff",
  textAlign: "center",
  minWidth: "60px",
  fontWeight: "bold",
};

const AndGateNode = ({ data }) => {
  // We expect the main app to pass the current state in the data object
  const inputAVal = data.pin2 || 0;
  const inputBVal = data.pin3 || 0;
   const inputCVal = data.pin5 || 0;
  const inputDVal = data.pin6 || 0;
   const inputEVal = data.pin8 || 0;
  const inputFVal = data.pin9 || 0;
  const inputGVal = data.pin11 || 0;
  const inputHVal = data.pin12 || 0;
  // Logic is technically calculated elsewhere, but we visualize it here
  const outputABVal = inputAVal && inputBVal ? 1 : 0;
const outputCDVal = inputCVal && inputDVal ? 1 : 0;
const outputEFVal = inputEVal && inputFVal ? 1 : 0;
const outputGHVal = inputGVal && inputHVal ? 1 : 0;
  // Change border color if output is ON
  const dynamicStyle = {
    ...nodeStyle,
    borderColor: outputABVal === 1 ? "#22c55e" : "#333", // Green if ON
  };

  return (
    <div style={dynamicStyle}>
      {/* --- INPUT HANDLES (Left Side) --- */}

      {/* Input A (Top Left) */}
    <Handle
        type="target"
        position={Position.Top}
        id="Vcc" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"7%", background: "#555" }}
      />     
      <Handle
        type="target"
        position={Position.Top}
        id="a" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"21%", background: "#555" }}
      />

      {/* Input B (Bottom Left) */}
      <Handle
        type="target"
        position={Position.Top}
        id="b" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "35%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="ab"
        style={{ left: "49%",background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="c" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "63%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="d" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "77%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.top}
        id="cd" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "91%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="e" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"7%", background: "#555" }}
      />     
      <Handle
        type="target"
        position={Position.Bottom}
        id="f" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"21%", background: "#555" }}
      />

      {/* Input B (Bottom Left) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="ef" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "35%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="g"
        style={{ left: "49%",background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="h" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "63%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="gh" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "77%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="gnd" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left: "91%", background: "#555" }}
      />

      {/* --- NODE CONTENT --- */}
      <div>AND</div>
      {/* Optional: Visualizing current state for debugging */}
      <div style={{ fontSize: "0.7em", marginTop: "5px", color: "#666" }}>
        IC 7408
      </div>

      {/* --- OUTPUT HANDLE (Right Side) --- */}
      {/* We only have one output, so an ID isn't strictly necessary here */}
      
    </div>
  );
};

export default AndGateNode;
