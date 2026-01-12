// src/nodes/InputNode.jsx
import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

const InputNode = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();
  const isOn = data.value || false;

  const toggleSwitch = () => {
    // This updates the main 'nodes' state in App.jsx automatically
    updateNodeData(id, { value: !isOn });
  };

  const style = {
    padding: "0.625rem",
    border: "1px solid #000000ff",
    borderRadius: "50%",
    background: "#9d9d9dff",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    height:"1.875rem",
    width:"1.875rem",
     boxShadow: isOn ? "0 0 1.25rem #fb2424ff" : "none",
      transition: "all 0.3s ease",
  };

  return (
    <div style={style}>
      

      {/* The Toggle Switch UI */}
      <div
        onClick={toggleSwitch}
        style={{
          cursor: "pointer",
         // padding: "0.625rem",
          height:"1.56rem",
          width:"1.56rem",
          background: isOn ? "#9d0000ff" : "#ccc", // Green if ON
          color: "white",
          borderRadius: "50%",
          userSelect: "none",
        }}
      >
        
      </div>

      {/* Source Handle (Right Side) */}
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default InputNode;
