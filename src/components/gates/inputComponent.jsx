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
    padding: "10px",
    border: "1px solid #000000ff",
    borderRadius: "50%",
    background: "#9d9d9dff",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    height:"30px",
    width:"30px",
     boxShadow: isOn ? "0 0 20px #fb2424ff" : "none",
      transition: "all 0.3s ease",
  };

  return (
    <div style={style}>
      

      {/* The Toggle Switch UI */}
      <div
        onClick={toggleSwitch}
        style={{
          cursor: "pointer",
         // padding: "10px",
          height:"25px",
          width:"25px",
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
