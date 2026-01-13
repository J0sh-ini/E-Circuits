// src/nodes/AndGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import gateImg from "../../images/ic_images(1).png"
import './styles.css';

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
        id="vcc" 
        className="handleStyle top one"
      />     
      <Handle
        type="target"
        position={Position.Top}
        id="a" 
        className="handleStyle top two"
      />
      {/* Input B (Bottom Left) */}
      <Handle
        type="target"
        position={Position.Top}
        id="b" 
        className="handleStyle top three"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="ab"
        className="handleStyle top four"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="c"
        className="handleStyle top five"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="d" 
        className="handleStyle top six"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="cd"     
        className="handleStyle top seven"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="e" 
        className="handleStyle bottom one"
      />     
      <Handle
        type="target"
        position={Position.Bottom}
        id="f" 
        className="handleStyle bottom two"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="ef"
        className="handleStyle bottom three"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="g"
        className="handleStyle bottom four"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="h" 
        className="handleStyle bottom five"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="gh" 
        className="handleStyle bottom six"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="gnd" 
        className="handleStyle bottom seven"
      />
    </div>
    
  );
};

export default AndGateNode;
