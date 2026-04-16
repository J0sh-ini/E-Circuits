import React, { useState } from "react";
import HelpSection from "./HelpSection";
import './styles.css';

interface SidebarProps {
  onSpawnNode: (type: string) => void;
  isOpen: boolean;
  hasClockNode: boolean;
  onToggleClockNode: () => void;
  isSimplifiedMode: boolean;
}

export default function Sidebar({ onSpawnNode, isOpen, hasClockNode, onToggleClockNode, isSimplifiedMode }: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className={`modern-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <HelpSection isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
      </HelpSection>
      <h3 className="sidebar-header">
        <a
          href="https://github.com/J0sh-ini/E-Circuits"
          target="_blank"
          className="sidebar-title"
          rel="noreferrer"
        >
          E-Circuits
        </a>
      </h3>
      <div className="sidebar-content">
        <h3>Components</h3>

        <div
          className="dndnode"
          onClick={onToggleClockNode}
          style={{
            background: hasClockNode ? 'rgba(255, 60, 60, 0.25)' : 'rgba(60, 255, 60, 0.25)',
            borderColor: hasClockNode ? '#ff3c3c' : '#3cff3c',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {hasClockNode ? 'Remove Clock' : 'Add Clock'}
        </div>

        {isSimplifiedMode ? (
          <>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleAndGate")} onDragStart={(event) => onDragStart(event, "simpleAndGate")} draggable>
              AND Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleAndGate3")} onDragStart={(event) => onDragStart(event, "simpleAndGate3")} draggable>
              3-In AND
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleOrGate")} onDragStart={(event) => onDragStart(event, "simpleOrGate")} draggable>
              OR Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleOrGate3")} onDragStart={(event) => onDragStart(event, "simpleOrGate3")} draggable>
              3-In OR
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNotGate")} onDragStart={(event) => onDragStart(event, "simpleNotGate")} draggable>
              NOT Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNandGate")} onDragStart={(event) => onDragStart(event, "simpleNandGate")} draggable>
              NAND Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNandGate3")} onDragStart={(event) => onDragStart(event, "simpleNandGate3")} draggable>
              3-In NAND
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNorGate")} onDragStart={(event) => onDragStart(event, "simpleNorGate")} draggable>
              NOR Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNorGate3")} onDragStart={(event) => onDragStart(event, "simpleNorGate3")} draggable>
              3-In NOR
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleXorGate")} onDragStart={(event) => onDragStart(event, "simpleXorGate")} draggable>
              XOR Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleXorGate3")} onDragStart={(event) => onDragStart(event, "simpleXorGate3")} draggable>
              3-In XOR
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("dFlipFlop")} onDragStart={(event) => onDragStart(event, "dFlipFlop")} draggable>
              D Flip-Flop
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("tFlipFlop")} onDragStart={(event) => onDragStart(event, "tFlipFlop")} draggable>
              T Flip-Flop
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("jkFlipFlop")} onDragStart={(event) => onDragStart(event, "jkFlipFlop")} draggable>
              JK Flip-Flop
            </div>
          </>
        ) : (
          <>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("andGate")} onDragStart={(event) => onDragStart(event, "andGate")} draggable>
              AND Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("andGate3")} onDragStart={(event) => onDragStart(event, "andGate3")} draggable>
              3-In AND
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("orGate")} onDragStart={(event) => onDragStart(event, "orGate")} draggable>
              OR Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("orGate3")} onDragStart={(event) => onDragStart(event, "orGate3")} draggable>
              3-In OR
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("notGate")} onDragStart={(event) => onDragStart(event, "notGate")} draggable>
              NOT Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("nandGate")} onDragStart={(event) => onDragStart(event, "nandGate")} draggable>
              NAND Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("nandGate3")} onDragStart={(event) => onDragStart(event, "nandGate3")} draggable>
              3-In NAND
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("norGate")} onDragStart={(event) => onDragStart(event, "norGate")} draggable>
              NOR Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("norGate3")} onDragStart={(event) => onDragStart(event, "norGate3")} draggable>
              3-In NOR
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("xorGate")} onDragStart={(event) => onDragStart(event, "xorGate")} draggable>
              XOR Gate
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("xorGate3")} onDragStart={(event) => onDragStart(event, "xorGate3")} draggable>
              3-In XOR
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("detailedDFlipFlop")} onDragStart={(event) => onDragStart(event, "detailedDFlipFlop")} draggable>
              D FlipFlop
            </div>
            <div className="dndnode" onDoubleClick={() => onSpawnNode("detailedJkFlipFlop")} onDragStart={(event) => onDragStart(event, "detailedJkFlipFlop")} draggable>
              JK FlipFlop
            </div>
          </>
        )}
        <div
          className="help dndnode"
          onClick={() => { setIsModalOpen(true) }}
        >
          Help Manual
        </div>
      </div>
    </aside>
  );
}
