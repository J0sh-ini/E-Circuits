// src/nodes/AndGateNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import gateImg from "../../images/ic_images(1).png"
import './styles.css';


  const AndGateNode3 = () => {
    return (
    <div >
      <img src={gateImg} className='icImg'/> 
      <div className="icName">IC7411</div>
      <Handle
        type="target"
        position={Position.Top}
        id="vcc" 
        className="handleStyle top one"
      />     
      <Handle
        type="target"
        position={Position.Top}
        id="c" 
        className="handleStyle top two"
      />
      {/* Input B (Bottom Left) */}
      <Handle
        type="source"
        position={Position.Top}
        id="abc" 
        className="handleStyle top three"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="g"
        className="handleStyle top four"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="h"
        className="handleStyle top five"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="i" 
        className="handleStyle top six"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="ghi"     
        className="handleStyle top seven"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="a" 
        className="handleStyle bottom one"
      />     
      <Handle
        type="target"
        position={Position.Bottom}
        id="b" 
        className="handleStyle bottom two"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="d"
        className="handleStyle bottom three"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="e"
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
        id="def" 
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

export default AndGateNode3;
