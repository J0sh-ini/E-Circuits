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
    border: "1px solid #333",
    borderRadius: "5px",
    background: "#9d9d9dff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "60px",
  };

  return (
    <div style={style}>
      <div
        style={{ marginBottom: "5px", fontSize: "12px", fontWeight: "bold" }}
      >
        INPUT
      </div>

      {/* The Toggle Switch UI */}
      <div
        onClick={toggleSwitch}
        style={{
          cursor: "pointer",
          padding: "5px 10px",
          background: isOn ? "#22c55e" : "#ccc", // Green if ON
          color: "white",
          borderRadius: "15px",
          fontSize: "12px",
          userSelect: "none",
        }}
      >
        {isOn ? "ON (1)" : "OFF (0)"}
      </div>

      {/* Source Handle (Right Side) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default InputNode;
