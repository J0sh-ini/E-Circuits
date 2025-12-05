// src/nodes/OutputNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

const OutputNode = ({ data }) => {
  // We check inputVal (which our future engine will update)
  const isLit = data.inputVal === 1;

  const style = {
    padding: "10px",
    border: "1px solid #333",
    borderRadius: "50%", // Circular shape
    background: "#9d9d9dff",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: isLit ? "0 0 20px #fbbf24" : "none", // Glow effect
    transition: "all 0.3s ease",
  };

  const bulbStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: isLit ? "#fbbf24" : "#eee", // Yellow if ON, Gray if OFF
    border: "1px solid #999",
  };

  return (
    <div style={style}>
      {/* Target Handle (Left Side) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />

      {/* Visual Bulb */}
      <div style={bulbStyle} />
    </div>
  );
};

export default OutputNode;
