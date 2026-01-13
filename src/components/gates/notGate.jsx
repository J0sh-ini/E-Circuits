// src/nodes/NotGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import gateImg from "../../images/ic_images(1).png"
import './styles.css';


const NotGateNode = () => {
  
  return (
    
    
    <div >
    <img src={gateImg} className='icImg'/> 
    <div className="icName">IC7404</div>
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
       <Handle
        type="source"
        position={Position.Top}
        id="nota"
        className="handleStyle top three"
      />    
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        className="handleStyle top four"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="notb"
        className="handleStyle top five"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="c"
        className="handleStyle top six"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="notc"
        className="handleStyle top seven"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="d"
        className="handleStyle bottom one"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="notd"
        className="handleStyle bottom two"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="e"
        className="handleStyle bottom three"
      />
       <Handle
        type="source"
        position={Position.Bottom}
        id="note"
        className="handleStyle bottom four"
      />
         
      
      
      
     
      <Handle
        type="target"
        position={Position.Bottom}
        id="f"
        className="handleStyle bottom five"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="notf"
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

export default NotGateNode;
