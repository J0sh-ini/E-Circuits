import React, { useMemo } from "react";
import { Handle, Position } from "@xyflow/react";
import './styles.css';



const SimpleGateNode = ({ type }: {type:string}) => {

  const label = useMemo(() => {
    switch (type) {
      case "andGate": return "AND";
      case "andGate3": return "AND (3)";
      case "orGate": return "OR";
      case "orGate3": return "OR (3)";
      case "notGate": return "NOT";
      case "nandGate": return "NAND";
      case "nandGate3": return "NAND (3)";
      case "norGate": return "NOR";
      case "norGate3": return "NOR (3)";
      case "xorGate": return "XOR";
      case "xorGate3": return "XOR (3)";
      default: return type.replace("Gate", "").replace("simple", "").toUpperCase();
    }
  }, [type]);


  return (
    <div style={{
      minWidth: '4.5rem',
      height: '3.5rem',
      background: 'rgba(30, 30, 36, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.4rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      position: 'relative'
    }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>{label}</div>

      {type === "notGate" ? (
        <div style={{ position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', marginRight: '4px' }}>A</span>
          <Handle type="target" position={Position.Left} id="a" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
        </div>
      ) : type.includes("3") ? (
        <>
          <div style={{ position: 'absolute', left: '-12px', top: '20%', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', marginRight: '4px' }}>A</span>
            <Handle type="target" position={Position.Left} id="a" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
          </div>
          <div style={{ position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', marginRight: '4px' }}>B</span>
            <Handle type="target" position={Position.Left} id="b" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
          </div>
          <div style={{ position: 'absolute', left: '-12px', top: '80%', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', marginRight: '4px' }}>C</span>
            <Handle type="target" position={Position.Left} id="c" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
          </div>
        </>
      ) : (
        <>
          <div style={{ position: 'absolute', left: '-12px', top: '25%', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', marginRight: '4px' }}>A</span>
            <Handle type="target" position={Position.Left} id="a" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
          </div>
          <div style={{ position: 'absolute', left: '-12px', top: '75%', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', marginRight: '4px' }}>B</span>
            <Handle type="target" position={Position.Left} id="b" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
          </div>
        </>
      )}

      <div style={{ position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
        <Handle
          type="source"
          position={Position.Right}
          id={type==='notGate' ? "nota" : type.includes("3") ? "abc" : "ab"}
          style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }}
        />
        <span style={{ fontSize: '0.65rem', marginLeft: '4px' }}>Y</span>
      </div>
    </div>
  );
};

export default SimpleGateNode;
