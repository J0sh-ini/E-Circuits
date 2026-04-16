
import { Handle, Position } from "@xyflow/react";
import './styles.css';

const SimplifiedFlipFlopNodes = ({data}:{data:{type:string}}) => {
    const isJK=data.type==='jkFlipFlop';
    const isD=data.type==='dFlipFlop';
    const isT=data.type==='tFlipFlop';
    const lable=isJK?'J K Flipflop' :isD?'D Flipflop':'T FlipFlop'
  return (
    <div style={{
      width: '5rem',
      height: '6rem',
      background: '#232329',
      border: '2px solid #555',
      borderRadius: '0.4rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
      position: 'relative'
    }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em' }}>{lable}</div>

        {
            isD &&
            <div style={{ position: 'absolute', left: '-12px', top: '25%', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', marginRight: '4px', textShadow: 'none', background: 'transparent' }}>D</span>
                <Handle type="target" position={Position.Left} id="d" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
            </div>
        }
        {
            isT && 
            <div style={{ position: 'absolute', left: '-12px', top: '25%', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', marginRight: '4px' }}>T</span>
                <Handle type="target" position={Position.Left} id="t" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
            </div>
        }
        {
            isJK &&
            <div style={{ position: 'absolute', left: '-12px', top: '20%', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', marginRight: '4px' }}>J</span>
                <Handle type="target" position={Position.Left} id="j" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
            </div>
        }

      <div style={{ position: 'absolute', left: '-12px', top: isJK?'50%':'76%', display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '0.6rem', marginRight: '4px', display: 'flex', alignItems: 'center' }}>
          <svg width="8" height="10" viewBox="0 0 10 10">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#999" />
          </svg>
        </span>
        <Handle type="target" position={Position.Left} id="clk" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
      </div>

      {
        isJK &&
         <div style={{ position: 'absolute', left: '-12px', top: '80%', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', marginRight: '4px' }}>K</span>
            <Handle type="target" position={Position.Left} id="k" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
        </div>
      }

      <div style={{ position: 'absolute', right: '-12px', top: '25%', display: 'flex', alignItems: 'center' }}>
        <Handle type="source" position={Position.Right} id="q" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
        <span style={{ fontSize: '0.7rem', marginLeft: '4px' }}>Q</span>
      </div>

      <div style={{ position: 'absolute', right: '-12px', top: '75%', display: 'flex', alignItems: 'center' }}>
        <Handle type="source" position={Position.Right} id="qNot" style={{ top: 'auto', bottom: 'auto', position: 'relative', transform: 'none' }} />
        <span style={{ fontSize: '0.7rem', marginLeft: '4px' }}>Q̅</span>
      </div>
    </div>
  );
};

export default SimplifiedFlipFlopNodes;
