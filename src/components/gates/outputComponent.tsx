import React from "react";
import { Handle, Position } from "@xyflow/react";
import { OutputNodeData } from "../../types";
const OutputNode = ({ data } : {  data  :  OutputNodeData  }) => {
  const isLit = data.inputVal === 1;

  const style = {
    padding: "0.625rem",
    border: "1px solid #333",
    borderRadius: "50%", 
    background: "#9d9d9dff",
    width: "1.875rem",
    height: "1.875rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: isLit ? "0 0 1.25rem #fbbf24" : "none", 
    transition: "all 0.3s ease",
  };

  const bulbStyle = {
    width: "1.56rem",
    height: "1.56rem",
    borderRadius: "50%",
    background: isLit ? "#fbbf24" : "#eee", 
    border: "1px solid #999",
  };

  return (
    <div style={style}>
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "#00000000",borderColor:'#00000000',height:'3rem', width:'3rem ',bottom:'50%' }}
      />
      <div style={bulbStyle} />
    </div>
  );
};

export default OutputNode;
