// src/nodes/OrGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

// Basic CSS styling for the node look
const nodeStyle = {
  padding: "15px",
  width:"90px",
  height:"40px",
  border: "2px solid #333",
  backgroundColor: "#9d9d9dff",
  textAlign: "center",
  minWidth: "60px",
  fontWeight: "bold",
};

const OrGateNode = ({ data }) => {
  // Receive calculated outputs from CircuitBuilder
  const outputABVal = data.ab || 0;
  const outputCDVal = data.cd || 0;
  const outputEFVal = data.ef || 0;
  const outputGHVal = data.gh || 0;
  
  // Change border color if any output is ON
  const dynamicStyle = {
    ...nodeStyle,
    borderColor: (outputABVal === 1 || outputCDVal === 1 || outputEFVal === 1 || outputGHVal === 1) ? "#22c55e" : "#333", // Green if any ON
  };

  return (
    <div style={dynamicStyle}>
      {/* --- INPUT HANDLES (Left Side) --- */}

      {/* Input A (Top Left) */}
    <Handle
        type="target"
        position={Position.Top}
        id="vcc" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"7%", background: "#555" }}
      />     
      <Handle
        type="target"
        position={Position.Top}
        id="a" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"21%", background: "#555" }}
      />

  
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
        position={Position.Top}
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
      <div>OR</div>
      {/* Optional: Visualizing current state for debugging */}
      <div style={{ fontSize: "0.7em", marginTop: "5px", color: "#666" }}>
        IC7432
      </div>

      {/* --- OUTPUT HANDLE (Right Side) --- */}
      {/* We only have one output, so an ID isn't strictly necessary here */}
      
    </div>
  );
};

export default OrGateNode;
