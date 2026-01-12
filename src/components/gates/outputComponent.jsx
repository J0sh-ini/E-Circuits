// src/nodes/OutputNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

const OutputNode = ({ data }) => {
  // We check inputVal (which our future engine will update)
  const isLit = data.inputVal === 1;

  const style = {
    padding: "0.625rem",
    border: "1px solid #333",
    borderRadius: "50%", // Circular shape
    background: "#9d9d9dff",
    width: "1.875rem",
    height: "1.875rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: isLit ? "0 0 1.25rem #fbbf24" : "none", // Glow effect
    transition: "all 0.3s ease",
  };

  const bulbStyle = {
    width: "1.56rem",
    height: "1.56rem",
    borderRadius: "50%",
    background: isLit ? "#fbbf24" : "#eee", // Yellow if ON, Gray if OFF
    border: "1px solid #999",
  };

  return (
    <div style={style}>
      {/* Target Handle (Left Side) */}
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      {/* Visual Bulb */}
      <div style={bulbStyle} />
    </div>
  );
};

export default OutputNode;
