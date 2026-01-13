import React from "react";
import { Handle, Position } from "@xyflow/react";
import './styles.css';

const PowerNode = ({ data }) => {
  const isGND = data.type === "gnd";
  
  const style = {
    padding: "0.625rem",
    border: "2px solid #000000ff",
    borderRadius: "50%",
    background: isGND ? "#00aa00ff" : "#ff0000ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.5rem",
    width: "2.5rem",
    boxShadow: `0 0 0.625rem ${isGND ? "#00aa00ff" : "#ff0000ff"}`,
    transition: "all 0.3s ease",
    cursor: "not-allowed",
    fontWeight: "bold",
    color: "white",
    fontSize: "0.875rem",
  };

  return (
    <div style={style}>
      <div style={{
        position: "absolute",
        fontSize: "0.75rem",
        fontWeight: "bold",
      }}>
        {isGND ? "GND" : "VCC"}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: isGND ? "#00aa00ff" : "#ff0000ff", height: '0.9rem', width: '0.9rem' }}
      />
    </div>
  );
};

export default PowerNode;
