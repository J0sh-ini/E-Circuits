// src/nodes/XorGateNode.jsx
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

const XorGateNode = ({ data }) => {
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
      {/* --- INPUT HANDLES (Top Side) --- */}

    <Handle
        type="target"
        position={Position.Top}
        id="vcc"
        style={{ left:"7%", background: "#555" }}
      />     
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ left:"21%", background: "#555" }}
      />

  
      <Handle
        type="target"
        position={Position.Top}
        id="b"
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
        id="c"
        style={{ left: "63%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="d"
        style={{ left: "77%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="cd"
        style={{ left: "91%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="e"
        style={{ left:"7%", background: "#555" }}
      />     
      <Handle
        type="target"
        position={Position.Bottom}
        id="f"
        style={{ left:"21%", background: "#555" }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="ef"
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
        id="h"
        style={{ left: "63%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="gh"
        style={{ left: "77%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="gnd"
        style={{ left: "91%", background: "#555" }}
      />

      {/* --- NODE CONTENT --- */}
      <div>XOR</div>
      {/* Optional: Visualizing current state for debugging */}
      <div style={{ fontSize: "0.7em", marginTop: "5px", color: "#666" }}>
        <div>AB:{outputABVal} CD:{outputCDVal}</div>
        <div>EF:{outputEFVal} GH:{outputGHVal}</div>
      </div>
      
    </div>
  );
};

export default XorGateNode;
