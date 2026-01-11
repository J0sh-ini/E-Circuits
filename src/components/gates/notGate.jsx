// src/nodes/NotGateNode.jsx
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

const NotGateNode = ({ data }) => {
  // Receive calculated outputs from CircuitBuilder
  const outputAVal = data.nota || 0;
  const outputBVal = data.notb || 0;
  const outputCVal = data.notc || 0;
  const outputDVal = data.notd || 0;
  const outputEVal = data.note || 0;
  const outputFVal = data.notf || 0;
  
  // Change border color if any output is ON
  const dynamicStyle = {
    ...nodeStyle,
    borderColor: (outputAVal === 1 || outputBVal === 1 || outputCVal === 1 || outputDVal === 1 || outputEVal === 1 || outputFVal === 1) ? "#22c55e" : "#333", // Green if any ON
  };

  return (
    <div style={dynamicStyle}>
      {/* --- INPUT HANDLES (Top Side) --- */}

      <Handle
        type="target"
        position={Position.Top}
        id="vcc" // <--- IMPORTANT: Unique ID for this specific port
        style={{ left:"7%", background: "#555" }}
      />    
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ left:"21%", background: "#555" }}
      />     
       <Handle
        type="source"
        position={Position.Top}
        id="nota"
        style={{ left:"35%", background: "#555" }}
      />    
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        style={{ left:"49%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="notb"
        style={{ left:"63%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="c"
        style={{ left:"77%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="notc"
        style={{ left:"91%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="d"
        style={{ left:"7%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="notd"
        style={{ left:"21%", background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="e"
        style={{ left:"35%", background: "#555" }}
      />
       <Handle
        type="source"
        position={Position.Bottom}
        id="note"
        style={{ left:"49%", background: "#555" }}
      />
         
      
      
      
     
      <Handle
        type="target"
        position={Position.Bottom}
        id="f"
        style={{ left:"63%", background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="notf"
        style={{ left:"77%", background: "#555" }}
      />
      <Handle
              type="target"
              position={Position.Bottom}
              id="gnd" // <--- IMPORTANT: Unique ID for this specific port
              style={{ left: "91%", background: "#555" }}
            />
      {/* --- NODE CONTENT --- */}
      <div>NOT</div>
      {/* Optional: Visualizing current state for debugging */}
      <div style={{ fontSize: "0.7em", marginTop: "5px", color: "#666" }}>
          IC7404
      </div>
    </div>
  );
};

export default NotGateNode;
