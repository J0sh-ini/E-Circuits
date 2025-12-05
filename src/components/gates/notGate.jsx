// src/nodes/AndGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

// Basic CSS styling for the node look
const nodeStyle = {
  padding: "15px",
  borderRadius: "5px 15px 15px 5px",
  border: "2px solid #333",
  backgroundColor: "#9d9d9dff",
  textAlign: "center",
  minWidth: "60px",
  fontWeight: "bold",
};

const NotGateNode = ({ data }) => {
  // We expect the main app to pass the current state in the data object
  const inputVal = data.input || 0;
  // Logic is technically calculated elsewhere, but we visualize it here
  const outputVal = inputVal ? 0 : 1;

  // Change border color if output is ON
  const dynamicStyle = {
    ...nodeStyle,
    borderColor: outputVal === 1 ? "#22c55e" : "#333", // Green if ON
  };

  return (
    <div style={dynamicStyle}>
      {/* --- INPUT HANDLE (Left Side) --- */}

      {/* Input (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "50%", background: "#555" }}
      />

      {/* --- NODE CONTENT --- */}
      <div>NOT</div>
      {/* Optional: Visualizing current state for debugging */}
      <div style={{ fontSize: "0.7em", marginTop: "5px", color: "#666" }}>
        In: {inputVal} <br />
        Out: <strong>{outputVal}</strong>
      </div>

      {/* --- OUTPUT HANDLE (Right Side) --- */}
      {/* We only have one output, so an ID isn't strictly necessary here */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default NotGateNode;
