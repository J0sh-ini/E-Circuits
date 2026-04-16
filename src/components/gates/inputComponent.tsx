import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { InputNodeData } from "../../types";
const InputNode = ({ id, data }:{id:string,data:InputNodeData}) => {
  const { updateNodeData } = useReactFlow();
  const isOn = data.value || false;

  const toggleSwitch = () => {
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
    <div style={style}
     onClick={toggleSwitch}
    >
      

      <div
       
        style={{
          cursor: "pointer",
          height:"1.56rem",
          width:"1.56rem",
          background: isOn ? "#9d0000ff" : "#ccc", 
          color: "white",
          borderRadius: "50%",
          userSelect: "none",
        }}
      >
        
      </div>

  
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "#00000000",borderColor:'#00000000',height:'3rem', width:'3rem ',top:'50%' }}
      />
    </div>
  );
};

export default InputNode;
