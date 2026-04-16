import React, { useEffect, useCallback, useRef, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import sideBarIcon from "./images/sidemenuIcon.png"
import Sidebar from "./components/Sidebar";
import DetailedGateNode from "./components/gates/detailedGateNode";
import SimpleGateNode from "./components/gates/simpleGateNode";
import InputNode from "./components/gates/inputComponent";

import { useSimpleCircuitSimulation } from "./hooks/useSimpleCircuitSimulation";
import { useCircuitSimulation } from "./hooks/useCircuitSimulation";
import PowerNode from "./components/gates/powerNode";
import OutputNode from "./components/gates/outputComponent";
import './App.css';
import { CircuitNode, CircuitEdge } from "./types";

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes :CircuitNode[] =[];
for(let i=1;i<9;i++)
{
      initialNodes.push({
        id: "ip"+String(i),
        type:'inputNode',
        position:{x:100+(100*i),y:500},
        data: {  value:0 }, 
        deletable:false,
        draggable:false,
      });
      initialNodes.push({
        id: "op"+String(i),
        type:'outputNode',
        position:{x:100+(100*i),y:100},
        data: {  value:0 }, 
        deletable:false,
        draggable:false,
      });
}

initialNodes.push({
  id: "gnd",
  type: "powerNode",
  position: { x: 8, y: 350 },
  data: { type: "gnd", label: "GND" },
  deletable: false,
  draggable: false,
});

initialNodes.push({
  id: "vcc",
  type: "powerNode",
  position: { x: 8, y: 250 },
  data: { type: "vcc", label: "VCC" },
  deletable: false,
  draggable: false,
});
export default function CircuitBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CircuitNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CircuitEdge>([]);
  const [sideBar,setSideBar]=useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isSimplifiedMode, setIsSimplifiedMode] = useState<boolean>(true);

  useCircuitSimulation(nodes, edges, setNodes);
  useSimpleCircuitSimulation(nodes, edges, setNodes);

  const nodeTypes = useMemo(
    () => ({
      andGate: DetailedGateNode,
      andGate3: DetailedGateNode,
      orGate: DetailedGateNode,
      orGate3: DetailedGateNode,
      notGate: DetailedGateNode,
      nandGate: DetailedGateNode,
      nandGate3: DetailedGateNode,
      norGate: DetailedGateNode,
      norGate3: DetailedGateNode,
      xorGate: DetailedGateNode,
      xorGate3: DetailedGateNode,
      powerNode: PowerNode,
      inputNode: InputNode,
      outputNode: OutputNode,
      clockNode: ClockNode,
      dFlipFlop: DFlipFlopNode,
      tFlipFlop: TFlipFlopNode,
      jkFlipFlop: JKFlipFlopNode,
      detailedDFlipFlop: DetailedFlipFlopNode,
      detailedJkFlipFlop: DetailedFlipFlopNode,
      simpleAndGate: SimpleGateNode,
      simpleAndGate3: SimpleGateNode,
      simpleOrGate: SimpleGateNode,
      simpleOrGate3: SimpleGateNode,
      simpleNotGate: SimpleGateNode,
      simpleNandGate: SimpleGateNode,
      simpleNandGate3: SimpleGateNode,
      simpleNorGate: SimpleGateNode,
      simpleNorGate3: SimpleGateNode,
      simpleXorGate: SimpleGateNode,
      simpleXorGate3: SimpleGateNode,
    } as any),
    []
  );

  const onConnect = useCallback(
    (params :Connection | Edge) => {
      let strokeColor = '#222';
      if (params.source === "vcc" || params.target === "vcc") {
        strokeColor = '#ff0000';
      } else if (params.source === "gnd" || params.target === "gnd") {
        strokeColor = '#00aa00';
      }
      setEdges((eds ) => addEdge({ ...params, style: { stroke: strokeColor, strokeWidth: 3 } } as Edge, eds));
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (event :React.MouseEvent, node :CircuitNode) => {
      if (node.type === "inputNode" || node.type === "outputNode" || node.type === "powerNode") {
        return;
      }
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => 
        eds.filter((e) => e.source !== node.id && e.target !== node.id)
      );
    },
    [setNodes, setEdges]
  );

  const onEdgeDoubleClick = useCallback(
    (event :React.MouseEvent, edge :Edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const spawnNode = useCallback(
    (nodeType: string, position?: { x: number; y: number }) => {
      const finalPosition = position || { x: 300, y: 250 };

      let newNode: CircuitNode;
      if (nodeType === "andGate" || nodeType === "orGate" || nodeType === "norGate" || nodeType === "nandGate" || nodeType === "xorGate") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `${nodeType} node`, vcc: 0, a: 0, b: 0, ab: 0, c: 0, d: 0, cd: 0, e: 0, f: 0, ef: 0, g: 0, h: 0, gh: 0, gnd: 0, value: 0 },
        };
      }
      else if (nodeType === "andGate3" || nodeType === "orGate3" || nodeType === "norGate3" || nodeType === "nandGate3" || nodeType === "xorGate3") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `${nodeType} node`, vcc: 0, a: 0, b: 0, c: 0, abc: 0, d: 0, e: 0, f: 0, def: 0, g: 0, h: 0, i: 0, ghi: 0, gnd: 0, value: 0 },
        };
      }
      else if (nodeType === "notGate") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `${nodeType} node`, vcc: 0, a: 0, nota: 0, b: 0, notb: 0, c: 0, notc: 0, d: 0, notd: 0, e: 0, note: 0, f: 0, notf: 0, gnd: 0, value: 0 },
        };
      }
      else if (nodeType === "dFlipFlop" || nodeType === "tFlipFlop" || nodeType === "jkFlipFlop") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { label: `${nodeType} node`, clk: 0, prevClk: 0, q: 0, qNot: 1, d: 0, t: 0, j: 0, k: 0, value: 0 },
        };
      }
      else if (nodeType === "detailedDFlipFlop") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `D FlipFlop node`, vcc: 0, gnd: 0, clock1: 0, prevClk1: 0, q1: 0, notq1: 1, d1: 0, set1: 0, reset1: 0, clock2: 0, prevClk2: 0, q2: 0, notq2: 1, d2: 0, set2: 0, reset2: 0, value: 0 },
        };
      }
      else if (nodeType === "detailedJkFlipFlop") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `JK FlipFlop node`, vcc: 0, gnd: 0, clock1: 0, prevClk1: 0, q1: 0, notq1: 1, jk1: 0, preset1: 0, clear1: 0, j1: 0, clock2: 0, prevClk2: 0, q2: 0, notq2: 1, preset2: 0, clear2: 0, j2: 0, k2: 0, value: 0 },
        };
      }
      else if (nodeType === "simpleAndGate" || nodeType === "simpleOrGate" || nodeType === "simpleNorGate" || nodeType === "simpleNandGate" || nodeType === "simpleXorGate") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `${nodeType} node`, a: 0, b: 0, ab: 0 },
        };
      }
      else if (nodeType === "simpleAndGate3" || nodeType === "simpleOrGate3" || nodeType === "simpleNorGate3" || nodeType === "simpleNandGate3" || nodeType === "simpleXorGate3") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `${nodeType} node`, a: 0, b: 0, c: 0, abc: 0 },
        };
      }
      else if (nodeType === "simpleNotGate") {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { type: nodeType, label: `${nodeType} node`, a: 0, nota: 0 },
        };
      }
      else {
        newNode = {
          id: getId(),
          type: nodeType,
          position: finalPosition,
          data: { label: `${nodeType} node`, vcc: 0, a: 0, nota: 0, b: 0, notb: 0, c: 0, notc: 0, d: 0, notd: 0, e: 0, note: 0, f: 0, notf: 0, gnd: 0, value: 0 },
        };
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );
 const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowInstance) {
        spawnNode(type);
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      spawnNode(type, position);
    },
    [reactFlowInstance, spawnNode]
  );
  function toggleSidebar()
  {
    setSideBar(!sideBar);
  }
  
 function clearAllNodes() {
    const nodesToSet = [...initialNodes];
    if (!isSimplifiedMode) {
      nodesToSet.push({ id: "gnd", type: "powerNode", position: { x: 8, y: 350 }, data: { type: "gnd", label: "GND" }, deletable: false, draggable: false });
      nodesToSet.push({ id: "vcc", type: "powerNode", position: { x: 8, y: 250 }, data: { type: "vcc", label: "VCC" }, deletable: false, draggable: false });
    }
    setNodes(nodesToSet);
    setEdges([]);
    setIsClockRunning(false);
  }

  
  return (
    <div className="main-div">
      <button 
      onClick={toggleSidebar} 
      className="sideBar-button">
        <img src={sideBarIcon} style={{height: "1.875rem"}}></img>
      </button>
      <button
        onClick={clearAllNodes}
        className="clearAll-button"
      >
        Clear All
      </button>
      {sideBar && <Sidebar onSpawnNode={spawnNode}
              isSimplifiedMode={isSimplifiedMode}
 />}
      <div
        className="reactflow-wrapper"
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          translateExtent={[[0,0],[1200,720]]}
        >
          
        
          <Background  />
        </ReactFlow>
      
      </div>
    </div>
  );
}
