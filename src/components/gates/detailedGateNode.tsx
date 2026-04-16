import React, { useMemo } from "react";
import { Handle, Position } from "@xyflow/react";
import gateImg from "../../images/ic_images(1).png"
import './styles.css';


const DetailedGateNode = ({ data }: {data: { type: string}}) => {

  const icName = useMemo(() => {
    switch (data.type) {
      case "andGate": return "IC7408";
      case "andGate3": return "IC7411";
      case "orGate": return "IC7432";
      case "orGate3": return "IC7427"; 
      case "notGate": return "IC7404";
      case "nandGate": return "IC7400";
      case "nandGate3": return "IC7410";
      case "norGate": return "IC7402";
      case "norGate3": return "IC7427";
      case "xorGate": return "IC7486";
      case "xorGate3": return "IC74xx"; 
      default: return "IC0000";
    }
  }, [data.type]);



  const powerHandles = (
    <>
      <Handle type="target" position={Position.Top} id="vcc" className="handleStyle top one" />     
      <Handle type="target" position={Position.Bottom} id="gnd" className="handleStyle bottom seven" />
    </>
  );

  return (
    <div>
      <img src={gateImg} className='icImg'/> 
      <div className="icName">{icName}</div>
      {powerHandles}

      {(data.type === "notGate") ? (
        <>
          <Handle type="target" position={Position.Top} id="a" className="handleStyle top two" />     
          <Handle type="source" position={Position.Top} id="nota" className="handleStyle top three" />    
          <Handle type="target" position={Position.Top} id="b" className="handleStyle top four" />
          <Handle type="source" position={Position.Top} id="notb" className="handleStyle top five" />
          <Handle type="target" position={Position.Top} id="c" className="handleStyle top six" />
          <Handle type="source" position={Position.Top} id="notc" className="handleStyle top seven" />
          
          <Handle type="target" position={Position.Bottom} id="d" className="handleStyle bottom one" />
          <Handle type="source" position={Position.Bottom} id="notd" className="handleStyle bottom two" />
          <Handle type="target" position={Position.Bottom} id="e" className="handleStyle bottom three" />
          <Handle type="source" position={Position.Bottom} id="note" className="handleStyle bottom four" />
          <Handle type="target" position={Position.Bottom} id="f" className="handleStyle bottom five" />
          <Handle type="source" position={Position.Bottom} id="notf" className="handleStyle bottom six" />
        </>
      ) : data.type === "norGate3" ? (
        <>
          <Handle type="target" position={Position.Top} id="f" className="handleStyle top two" />
          <Handle type="source" position={Position.Top} id="abc" className="handleStyle top three" />
          <Handle type="source" position={Position.Top} id="ghi" className="handleStyle top four" />
          <Handle type="target" position={Position.Top} id="i" className="handleStyle top five" />
          <Handle type="target" position={Position.Top} id="h" className="handleStyle top six" />
          <Handle type="target" position={Position.Top} id="g" className="handleStyle top seven" />
          
          <Handle type="target" position={Position.Bottom} id="a" className="handleStyle bottom one" />     
          <Handle type="target" position={Position.Bottom} id="b" className="handleStyle bottom two" />
          <Handle type="target" position={Position.Bottom} id="c" className="handleStyle bottom three" />
          <Handle type="target" position={Position.Bottom} id="d" className="handleStyle bottom four" />
          <Handle type="target" position={Position.Bottom} id="e" className="handleStyle bottom five" />
          <Handle type="source" position={Position.Bottom} id="def" className="handleStyle bottom six" />
        </>
      ) : (data?.type?.includes("3")) ? (
        <>
          <Handle type="target" position={Position.Top} id="c" className="handleStyle top two" />
          <Handle type="source" position={Position.Top} id="abc" className="handleStyle top three" />
          <Handle type="target" position={Position.Top} id="g" className="handleStyle top four" />
          <Handle type="target" position={Position.Top} id="h" className="handleStyle top five" />
          <Handle type="target" position={Position.Top} id="i" className="handleStyle top six" />
          <Handle type="source" position={Position.Top} id="ghi" className="handleStyle top seven" />
          
          <Handle type="target" position={Position.Bottom} id="a" className="handleStyle bottom one" />     
          <Handle type="target" position={Position.Bottom} id="b" className="handleStyle bottom two" />
          <Handle type="target" position={Position.Bottom} id="d" className="handleStyle bottom three" />
          <Handle type="target" position={Position.Bottom} id="e" className="handleStyle bottom four" />
          <Handle type="target" position={Position.Bottom} id="f" className="handleStyle bottom five" />
          <Handle type="source" position={Position.Bottom} id="def" className="handleStyle bottom six" />
        </>
      ) : data.type === "norGate" ? (
        <>
          <Handle type="source" position={Position.Top} id="ab" className="handleStyle top two" />
          <Handle type="target" position={Position.Top} id="a" className="handleStyle top three" />
          <Handle type="target" position={Position.Top} id="b" className="handleStyle top four" />
          <Handle type="source" position={Position.Top} id="cd" className="handleStyle top five" />
          <Handle type="target" position={Position.Top} id="c" className="handleStyle top six" />
          <Handle type="target" position={Position.Top} id="d" className="handleStyle top seven" />
          
          <Handle type="source" position={Position.Bottom} id="ef" className="handleStyle bottom one" />     
          <Handle type="target" position={Position.Bottom} id="f" className="handleStyle bottom two" />
          <Handle type="target" position={Position.Bottom} id="e" className="handleStyle bottom three" />
          <Handle type="source" position={Position.Bottom} id="gh" className="handleStyle bottom four" />
          <Handle type="target" position={Position.Bottom} id="h" className="handleStyle bottom five" />
          <Handle type="target" position={Position.Bottom} id="g" className="handleStyle bottom six" />
        </>
      ) : (
        <>
          <Handle type="target" position={Position.Top} id="a" className="handleStyle top two" />
          <Handle type="target" position={Position.Top} id="b" className="handleStyle top three" />
          <Handle type="source" position={Position.Top} id="ab" className="handleStyle top four" />
          <Handle type="target" position={Position.Top} id="c" className="handleStyle top five" />
          <Handle type="target" position={Position.Top} id="d" className="handleStyle top six" />
          <Handle type="source" position={Position.Top} id="cd" className="handleStyle top seven" />
          
          <Handle type="target" position={Position.Bottom} id="e" className="handleStyle bottom one" />     
          <Handle type="target" position={Position.Bottom} id="f" className="handleStyle bottom two" />
          <Handle type="source" position={Position.Bottom} id="ef" className="handleStyle bottom three" />
          <Handle type="target" position={Position.Bottom} id="g" className="handleStyle bottom four" />
          <Handle type="target" position={Position.Bottom} id="h" className="handleStyle bottom five" />
          <Handle type="source" position={Position.Bottom} id="gh" className="handleStyle bottom six" />
        </>
      )}
    </div>
  );
};

export default DetailedGateNode;
