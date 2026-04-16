import { Handle, Position } from "@xyflow/react";
import gateImg from "../../images/16PinIC.jpeg"
import './styles.css';

interface DetailedFlipFlopNodeProps {
  data: {
    type: string;
  };
}

const DetailedFlipFlopNode = ({ data }: DetailedFlipFlopNodeProps) => {

  const isD = data.type === "detailedDFlipFlop";

  const icName = isD ? "IC7474 (D)" : "IC74112 (JK)";

  return (
    <div>
      <img src={gateImg} className='icImg' />
      <div className="icName" style={{ left: '46%', top: '40%', color: '#ccc', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontSize: '0.8rem' }}>{icName}</div>

      {!isD ? (
        <>
          <Handle type="target" position={Position.Top} id="k1" className="handleStyle top p16_1" />
          <Handle type="source" position={Position.Top} id="q1" className="handleStyle top p16_2 " />
          <Handle type="source" position={Position.Top} id="notq1" className="handleStyle top p16_3 " />
          <Handle type="target" position={Position.Top} id="gnd" className="handleStyle top p16_4 " />
          <Handle type="target" position={Position.Top} id="k2" className="handleStyle top p16_5 " />
          <Handle type="source" position={Position.Top} id="q2" className="handleStyle top p16_6 " />
          <Handle type="source" position={Position.Top} id="notq2" className="handleStyle top p16_7 " />
          <Handle type="target" position={Position.Top} id="j2" className="handleStyle top p16_8 " />

          <Handle type="target" position={Position.Bottom} id="clock1" className="handleStyle bottom p16_1 " />
          <Handle type="target" position={Position.Bottom} id="preset1" className="handleStyle bottom p16_2" />
          <Handle type="target" position={Position.Bottom} id="clear1" className="handleStyle bottom p16_3 " />
          <Handle type="target" position={Position.Bottom} id="j1" className="handleStyle bottom p16_4 " />
          <Handle type="target" position={Position.Bottom} id="vcc" className="handleStyle bottom p16_5 " />
          <Handle type="target" position={Position.Bottom} id="clock2" className="handleStyle bottom p16_6 " />
          <Handle type="target" position={Position.Bottom} id="preset2" className="handleStyle bottom p16_7 " />
          <Handle type="target" position={Position.Bottom} id="clear2" className="handleStyle bottom p16_8 " />
        </>
      ) : (
        <>
          <Handle type="target" position={Position.Top} id="vcc" className="handleStyle top one" />
          <Handle type="target" position={Position.Top} id="reset2" className="handleStyle top two" />
          <Handle type="target" position={Position.Top} id="d2" className="handleStyle top three" />
          <Handle type="target" position={Position.Top} id="clock2" className="handleStyle top four" />
          <Handle type="target" position={Position.Top} id="set2" className="handleStyle top five" />
          <Handle type="source" position={Position.Top} id="q2" className="handleStyle top six" />
          <Handle type="source" position={Position.Top} id="notq2" className="handleStyle top seven" />

          <Handle type="target" position={Position.Bottom} id="reset1" className="handleStyle bottom one" />
          <Handle type="target" position={Position.Bottom} id="d1" className="handleStyle bottom two" />
          <Handle type="target" position={Position.Bottom} id="clock1" className="handleStyle bottom three" />
          <Handle type="target" position={Position.Bottom} id="set1" className="handleStyle bottom four" />
          <Handle type="source" position={Position.Bottom} id="q1" className="handleStyle bottom five" />
          <Handle type="source" position={Position.Bottom} id="notq1" className="handleStyle bottom six" />
          <Handle type="target" position={Position.Bottom} id="gnd" className="handleStyle bottom seven" />
        </>
      )}
    </div>
  );
};
export default DetailedFlipFlopNode;
