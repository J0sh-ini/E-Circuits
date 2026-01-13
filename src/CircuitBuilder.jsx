import React, { useEffect, useCallback, useRef, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import sideBarIcon from "./images/sideMenuIcon.png"
import Sidebar from "./components/Sidebar";
import AndGateNode from "./components/gates/andGate";
import AndGateNode3 from "./components/gates/andgate3";
import OrGateNode from "./components/gates/orGate";
import OrGateNode3 from "./components/gates/orGate3";
import NotGateNode from "./components/gates/notGate";
import NandGateNode from "./components/gates/nandGate";
import NandGateNode3 from "./components/gates/nandGate3";
import NorGateNode from "./components/gates/norGate";
import NorGateNode3 from "./components/gates/norGate3";
import XorGateNode from "./components/gates/xorGate";
import XorGateNode3 from "./components/gates/xorGate3";
import InputNode from "./components/gates/inputComponent";
import OutputNode from "./components/gates/outputComponent";
import PowerNode from "./components/gates/powerNode";
import './App.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes =[];
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

// Add permanent power nodes
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
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sideBar,setSideBar]=useState(true);
  


  const nodeTypes = useMemo(
    () => ({
      andGate: AndGateNode,
      andGate3: AndGateNode3,
      orGate: OrGateNode,
      orGate3: OrGateNode3,
      notGate: NotGateNode,
      nandGate: NandGateNode,
      nandGate3: NandGateNode3,
      norGate: NorGateNode,
      norGate3: NorGateNode3,
      xorGate: XorGateNode,
      xorGate3: XorGateNode3,
      powerNode: PowerNode,
      inputNode: InputNode,
      outputNode: OutputNode,      
    }),
    []
  );

  const onConnect = useCallback(
    (params) => {
      let strokeColor = '#222';
      if (params.source === "vcc" || params.target === "vcc") {
        strokeColor = '#ff0000';
      } else if (params.source === "gnd" || params.target === "gnd") {
        strokeColor = '#00aa00';
      }
      setEdges((eds) => addEdge({ ...params, style: { stroke: strokeColor, strokeWidth: 3 } }, eds));
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (event, node) => {
      // Prevent deletion of input, output, and power nodes
      if (node.type === "inputNode" || node.type === "outputNode" || node.type === "powerNode") {
        return;
      }
      // Remove the node and any connected edges
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => 
        eds.filter((e) => e.source !== node.id && e.target !== node.id)
      );
    },
    [setNodes, setEdges]
  );

  const onEdgeDoubleClick = useCallback(
    (event, edge) => {
      // Remove the edge
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const spawnNode = useCallback(
    (nodeType) => {
      // Spawn node at a default center position
      let newNode;
      if(nodeType === "andGate" || nodeType === "orGate" || nodeType === "norGate" || nodeType === "nandGate" ||nodeType === "xorGate" ) {
        newNode = {
        id: getId(),
        type: nodeType,
        position: { x: 300, y: 250 },
        data: { label: `${nodeType} node`, vcc:0,a:0,b:0,ab:0,c:0,d:0,cd:0,e:0,f:0,ef:0,g:0,h:0,gh:0,gnd:0,value:0}, 
        };
      }
      else if(nodeType === "andGate3" || nodeType === "orGate3" || nodeType === "norGate3" || nodeType === "nandGate3" ||nodeType === "xorGate3" ) {
        newNode = {
        id: getId(),
        type: nodeType,
        position: { x: 300, y: 250 },
        data: { label: `${nodeType} node`, vcc:0,a:0,b:0,c:0,abc:0,d:0,e:0,f:0,def:0,g:0,h:0,i:0,ghi:0,gnd:0,value:0}, 
        };
      }
      else  {
        newNode = {
        id: getId(),
        type: nodeType,
        position: { x: 300, y: 250 },
        data: { label: `${nodeType} node`, vcc:0,a:0,nota:0,b:0,notb:0,c:0,notc:0,d:0,notd:0,e:0,note:0,f:0,notf:0,gnd:0,value:0}, 
        };
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // Helper function to check if a gate has both VCC and GND connected
  const hasVccAndGnd = useCallback((nodeId, edgesList) => {
    const hasVcc = edgesList.some(edge => edge.target === nodeId && edge.source === "vcc");
    const hasGnd = edgesList.some(edge => edge.target === nodeId && edge.source === "gnd");
    return hasVcc && hasGnd;
  }, []);

  // Create a dependency value that changes when input values change
  const inputValuesDependency = useMemo(() => {
    return nodes
      .filter(n => n.type === "inputNode")
      .map(n => `${n.id}:${n.data.value}`)
      .join("|");
  }, [nodes]);

  useEffect(() => {
   
    const nodeValues = new Map();    
    nodes.forEach((node) => {
      if (node.type === "inputNode") {
        nodeValues.set(node.id, node.data.value ? 1 : 0);
      }
    });

    for (let i = 0; i < 5; i++) {
      edges.forEach((edge) => {
        let sourceVal = 0;
        const sourceNode = nodes.find((n) => n.id === edge.source);
        
        if (sourceNode?.type === "notGate") {
          const nodeData = nodeValues.get(edge.source);
          if (edge.sourceHandle === "nota") {
            sourceVal = nodeData?.nota || 0;
          } else if (edge.sourceHandle === "notb") {
            sourceVal = nodeData?.notb || 0;
          } else if (edge.sourceHandle === "notc") {
            sourceVal = nodeData?.notc || 0;
          } else if (edge.sourceHandle === "notd") {
            sourceVal = nodeData?.notd || 0;
          } else if (edge.sourceHandle === "note") {
            sourceVal = nodeData?.note || 0;
          } else if (edge.sourceHandle === "notf") {
            sourceVal = nodeData?.notf || 0;
          }
        } else if (sourceNode?.type === "andGate" || sourceNode?.type === "orGate" || sourceNode?.type === "nandGate" || sourceNode?.type === "norGate" || sourceNode?.type === "xorGate") {
          const nodeData = nodeValues.get(edge.source);
          if (edge.sourceHandle === "ab") {
            sourceVal = nodeData?.ab || 0;
          } else if (edge.sourceHandle === "cd") {
            sourceVal = nodeData?.cd || 0;
          } else if (edge.sourceHandle === "ef") {
            sourceVal = nodeData?.ef || 0;
          } else if (edge.sourceHandle === "gh") {
            sourceVal = nodeData?.gh || 0;
          }
        } 
        else if (sourceNode?.type === "andGate3" || sourceNode?.type === "orGate3" || sourceNode?.type === "nandGate3" || sourceNode?.type === "norGate3" || sourceNode?.type === "xorGate3") {
          const nodeData = nodeValues.get(edge.source);
          if (edge.sourceHandle === "abc") {
            sourceVal = nodeData?.abc || 0;
          } else if (edge.sourceHandle === "def") {
            sourceVal = nodeData?.def || 0;
          } else if (edge.sourceHandle === "ghi") {
            sourceVal = nodeData?.ghi || 0;
          }
        }else {
          sourceVal = nodeValues.get(edge.source) || 0;
        }

        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!targetNode) return;
        console.log(i + edge.source + " " + edge.target);
        console.log(targetNode);

        if (targetNode.type === "andGate" || targetNode.type === "orGate" || targetNode.type === "nandGate" || targetNode.type === "norGate" || targetNode.type === "xorGate") {
        
          // Check if gate has both VCC and GND connected
          const hasPower = hasVccAndGnd(edge.target, edges);
          
          if (!nodeValues.has(edge.target + "_inputs")) {
            nodeValues.set(edge.target + "_inputs", { a: 0, b: 0 ,c:0,d:0,e:0,f:0,g:0,h:0,ab:0,cd:0,ef:0,gh:0});
          }

          const inputs = nodeValues.get(edge.target + "_inputs");

          if (edge.targetHandle === "a") inputs.a = sourceVal;
          if (edge.targetHandle === "b") inputs.b = sourceVal;
          if (edge.targetHandle === "c") inputs.c = sourceVal;
          if (edge.targetHandle === "d") inputs.d = sourceVal;
          if (edge.targetHandle === "e") inputs.e = sourceVal;
          if (edge.targetHandle === "f") inputs.f = sourceVal;
          if (edge.targetHandle === "g") inputs.g = sourceVal;
          if (edge.targetHandle === "h") inputs.h = sourceVal;

          let ab,cd,ef,gh,output = 0;
          
          // Only compute outputs if gate has power connections
          if (hasPower) {
            if (targetNode.type === "andGate") {
              ab = inputs.a && inputs.b ? 1 : 0;
              cd=inputs.c && inputs.d ?1:0;
              ef=inputs.e&&inputs.f?1:0;
              gh=inputs.g&&inputs.h?1:0;
            } else if (targetNode.type === "orGate") {
              ab = inputs.a || inputs.b ? 1 : 0;
              cd=inputs.c || inputs.d ?1:0;
              ef=inputs.e||inputs.f?1:0;
              gh=inputs.g||inputs.h?1:0;
            } else if (targetNode.type === "nandGate") {
              ab = (inputs.a && inputs.b) ? 0 : 1;
              cd=(inputs.c && inputs.d) ? 0 : 1;
              ef=(inputs.e&&inputs.f) ? 0 : 1;
              gh=(inputs.g&&inputs.h) ? 0 : 1;
            } else if (targetNode.type === "norGate") {
              ab = (inputs.a || inputs.b) ? 0 : 1;
              cd=(inputs.c || inputs.d) ? 0 : 1;
              ef=(inputs.e||inputs.f) ? 0 : 1;
              gh=(inputs.g||inputs.h) ? 0 : 1;
            } else if (targetNode.type === "xorGate") {
              ab = (inputs.a !== inputs.b) ? 1 : 0;
              cd=(inputs.c !== inputs.d) ? 1 : 0;
              ef=(inputs.e!==inputs.f) ? 1 : 0;
              gh=(inputs.g!==inputs.h) ? 1 : 0;
            }
          }

          nodeValues.set(edge.target, {output,ab,cd,ef,gh});
        }
        if (targetNode.type === "andGate3" || targetNode.type === "orGate3" || targetNode.type === "nandGate3" || targetNode.type === "norGate3" || targetNode.type === "xorGate3") {
          const hasPower = hasVccAndGnd(edge.target, edges);
          
          if (!nodeValues.has(edge.target + "_inputs")) {
            nodeValues.set(edge.target + "_inputs", { a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,abc:0,def:0,ghi:0});
          }

          const inputs = nodeValues.get(edge.target + "_inputs");

          if (edge.targetHandle === "a") inputs.a = sourceVal;
          if (edge.targetHandle === "b") inputs.b = sourceVal;
          if (edge.targetHandle === "c") inputs.c = sourceVal;
          if (edge.targetHandle === "d") inputs.d = sourceVal;
          if (edge.targetHandle === "e") inputs.e = sourceVal;
          if (edge.targetHandle === "f") inputs.f = sourceVal;
          if (edge.targetHandle === "g") inputs.g = sourceVal;
          if (edge.targetHandle === "h") inputs.h = sourceVal;
          if (edge.targetHandle === "i") inputs.i = sourceVal;

          let abc,def,ghi,output = 0;
          
          // Only compute outputs if gate has power connections
          if (hasPower) {
            if (targetNode.type === "andGate3") {
              abc = inputs.a && inputs.b && inputs.c ? 1 : 0;
              def = inputs.d && inputs.e && inputs.f ? 1 : 0;
              ghi = inputs.g && inputs.h && inputs.i ? 1 : 0;
            } else if (targetNode.type === "orGate3") {
              abc = inputs.a || inputs.b || inputs.c ? 1 : 0;
              def = inputs.d || inputs.e || inputs.f ? 1 : 0;
              ghi = inputs.g || inputs.h || inputs.i ? 1 : 0;
            } else if (targetNode.type === "nandGate3") {
              abc = inputs.a && inputs.b && inputs.c ? 0 : 1;
              def = inputs.d && inputs.e && inputs.f ? 0 : 1;
              ghi = inputs.g && inputs.h && inputs.i ? 0 : 1;
            } else if (targetNode.type === "norGate3") {
              abc = inputs.a || inputs.b || inputs.c ? 0 : 1;
              def = inputs.d || inputs.e || inputs.f ? 0 : 1;
              ghi = inputs.g || inputs.h || inputs.i ? 0 : 1;
            } else if (targetNode.type === "xorGate3") {
              abc = (inputs.a !== inputs.b ? 1 : 0 ) !== inputs.c ? 1 : 0;
              def = (inputs.d !== inputs.e ? 1 : 0 ) !== inputs.f ? 1 : 0;
              ghi = (inputs.g !== inputs.h ? 1 : 0 ) !== inputs.i ? 1 : 0;
            }
          }

          nodeValues.set(edge.target, {output,abc,def,ghi});
        }
        if (targetNode.type === "notGate") {
          // Check if gate has both VCC and GND connected
          const hasPower = hasVccAndGnd(edge.target, edges);
          
          if (!nodeValues.has(edge.target + "_inputs")) {
            nodeValues.set(edge.target + "_inputs", { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 });
          }
          const inputs = nodeValues.get(edge.target + "_inputs");
          if (edge.targetHandle === "a") inputs.a = sourceVal;
          if (edge.targetHandle === "b") inputs.b = sourceVal;
          if (edge.targetHandle === "c") inputs.c = sourceVal;
          if (edge.targetHandle === "d") inputs.d = sourceVal;
          if (edge.targetHandle === "e") inputs.e = sourceVal;
          if (edge.targetHandle === "f") inputs.f = sourceVal;

          let nota = 0, notb = 0, notc = 0, notd = 0, note = 0, notf = 0;
          
          // Only compute outputs if gate has power connections
          if (hasPower) {
            nota = inputs.a ? 0 : 1;
            notb = inputs.b ? 0 : 1;
            notc = inputs.c ? 0 : 1;
            notd = inputs.d ? 0 : 1;
            note = inputs.e ? 0 : 1;
            notf = inputs.f ? 0 : 1;
          }

          nodeValues.set(edge.target, { nota, notb, notc, notd, note, notf });
        }

        if (targetNode.type === "outputNode") {
          nodeValues.set(edge.target, sourceVal);
        }
      });
    }

    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "andGate" || node.type==='orGate' || node.type==="norGate" || node.type==="nandGate" || node.type==="xorGate" ) {
          const outputs = nodeValues.get(node.id) || { ab: 0, cd: 0, ef: 0, gh: 0, output: 0 };
      
          if (node.data.ab !== outputs.ab || node.data.cd !== outputs.cd || node.data.ef !== outputs.ef || node.data.gh !== outputs.gh) {
            return {
              ...node,
              data: { ...node.data, ab: outputs.ab, cd: outputs.cd, ef: outputs.ef, gh: outputs.gh },
            };
          }
        }
        if (node.type === "andGate3" || node.type==='orGate3' || node.type==="norGate3" || node.type==="nandGate3" || node.type==="xorGate3" ) {
          const outputs = nodeValues.get(node.id) || { abc: 0,def: 0, ghi: 0, output: 0 };
      
          if (node.data.abc !== outputs.abc || node.data.def !== outputs.def || node.data.ghi !== outputs.ghi) {
            return {
              ...node,
              data: { ...node.data, abc: outputs.abc, def: outputs.def, ghi: outputs.ghi },
            };
          }
        }
        if (node.type === "notGate") {
          const outputs = nodeValues.get(node.id) || { nota: 0, notb: 0, notc: 0, notd: 0, note: 0, notf: 0 };
          if (node.data.nota !== outputs.nota || node.data.notb !== outputs.notb || node.data.notc !== outputs.notc || node.data.notd !== outputs.notd || node.data.note !== outputs.note || node.data.notf !== outputs.notf) {
            return {
              ...node,
              data: { ...node.data, nota: outputs.nota, notb: outputs.notb, notc: outputs.notc, notd: outputs.notd, note: outputs.note, notf: outputs.notf },
            };
          }
        }
        if (node.type === "outputNode") {
          const val = nodeValues.get(node.id) || 0;
          if (node.data.inputVal !== val) {
            return { ...node, data: { ...node.data, inputVal: val } };
          }
        }

        return node;
      })
    );
    

  }, [edges, inputValuesDependency]);
  function toggleSidebar()
  {
    setSideBar(!sideBar);
  }
  
  function clearAllNodes()
  {
    setNodes(initialNodes);
    setEdges([]);
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
      {sideBar && <Sidebar onSpawnNode={spawnNode} />}
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
        >
          
        
          <Background  />
        </ReactFlow>
      
      </div>
    </div>
  );
}
