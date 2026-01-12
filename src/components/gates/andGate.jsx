// src/nodes/AndGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import gateImg from "../../images/ic_images(1).png"
import './styles.css';


const AndGateNode = () => {
  
  return (
    
    
    <div >
    <img src={gateImg} className='icImg'/> 
    <div className="icName">IC7408</div>
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
