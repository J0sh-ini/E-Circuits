import React, { useEffect, useCallback, useRef, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge, 
  useReactFlow,

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import sideBarIcon from "./images/sideMenuIcon.png"
import Sidebar from "./components/Sidebar";
import AndGateNode from "./components/gates/andGate";
import OrGateNode from "./components/gates/orGate";
import InputNode from "./components/gates/inputComponent";
import OutputNode from "./components/gates/outputComponent";
import NotGateNode from "./components/gates/notGate";

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
export default function CircuitBuilder() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sideBar,setSideBar]=useState(true);
  const { screenToFlowPosition } = useReactFlow();
  


  const nodeTypes = useMemo(
    () => ({
      andGate: AndGateNode,
      orGate: OrGateNode,
      notGate: NotGateNode,

      inputNode: InputNode,
      outputNode: OutputNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

    
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, vcc:0,a:0,b:0,ab:0,c:0,d:0,cd:0,e:0,f:0,ef:0,g:0,h:0,gnd:0,value:0}, 
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  useEffect(() => {
   
    const nodeValues = new Map();    
    nodes.forEach((node) => {
      if (node.type === "inputNode") {
        nodeValues.set(node.id, node.data.value ? 1 : 0);
      }
    });

  

    // 3. Propagate values (Breadth-First approach or Multi-pass)
    // We loop a few times to ensure signals travel through chains of gates (Input -> AND -> OR -> Output)
    // In a real app, you would use a Topological Sort, but a loop of 3-5 is fine for small circuits.
    for (let i = 0; i < 5; i++) {
      edges.forEach((edge) => {
        // Get source value - handle gates that have multiple outputs
        let sourceVal = 0;
        const sourceNode = nodes.find((n) => n.id === edge.source);
        
        if (sourceNode?.type === "andGate") {
          // For AND gates, the value depends on which output handle the edge comes from
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
        } else {
          sourceVal = nodeValues.get(edge.source) || 0;
        }

        // Find the target node in our nodes array to know its type
        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!targetNode) return;
        console.log(i + edge.source + " " + edge.target);
        console.log(targetNode);

        // Logic for Logic Gates
        if (targetNode.type === "andGate" || targetNode.type === "orGate") {
          // We need to store inputs "A" and "B" separately for the gate
          // We create a temporary object for this node in our map if it doesn't exist
          if (!nodeValues.has(edge.target + "_inputs")) {
            nodeValues.set(edge.target + "_inputs", { a: 0, b: 0 ,c:0,d:0,e:0,f:0,g:0,h:0,ab:0,cd:0,ef:0,gh:0});
          }

          const inputs = nodeValues.get(edge.target + "_inputs");

          // Assign value based on which handle was connected (id="a" or id="b")
          if (edge.targetHandle === "a") inputs.a = sourceVal;
          if (edge.targetHandle === "b") inputs.b = sourceVal;
          if (edge.targetHandle === "c") inputs.c = sourceVal;
          if (edge.targetHandle === "d") inputs.d = sourceVal;
          if (edge.targetHandle === "e") inputs.e = sourceVal;
          if (edge.targetHandle === "f") inputs.f = sourceVal;
          if (edge.targetHandle === "g") inputs.g = sourceVal;
          if (edge.targetHandle === "h") inputs.h = sourceVal;

          // Calculate Gate Output
          let ab,cd,ef,gh,output = 0;
          if (targetNode.type === "andGate") {
            ab = inputs.a && inputs.b ? 1 : 0;
            cd=inputs.c && inputs.d ?1:0;
            ef=inputs.e&&inputs.f?1:0;
            gh=inputs.g&&inputs.h?1:0;
          } else if (targetNode.type === "orGate") {
            output = inputs.a || inputs.b ? 1 : 0;
          }

          nodeValues.set(edge.target, {output,ab,cd,ef,gh});
        }

        if (targetNode.type === "notGate") {
          // Similar to andGate and orGate
          if (!nodeValues.has(edge.target + "_input")) {
            nodeValues.set(edge.target + "_input", { a: 0 });
          }
          const input = nodeValues.get(edge.target + "_input");
          input.a = sourceVal;
          const output = input.a ? 0 : 1;
          nodeValues.set(edge.target, output);
        }

        // Logic for Final Output Nodes
        if (targetNode.type === "outputNode") {
          nodeValues.set(edge.target, sourceVal);
        }
      });
    }

    // 4. Update the React Flow nodes with the new calculated data
    setNodes((nds) =>
      nds.map((node) => {
        // If it's an AND/OR gate, update its internal inputA/inputB data for visualization
        if (node.type === "andGate") {
          const outputs = nodeValues.get(node.id) || { ab: 0, cd: 0, ef: 0, gh: 0, output: 0 };
          // Optimization: Only return new object if data actually changed
          if (node.data.ab !== outputs.ab || node.data.cd !== outputs.cd || node.data.ef !== outputs.ef || node.data.gh !== outputs.gh) {
            return {
              ...node,
              data: { ...node.data, ab: outputs.ab, cd: outputs.cd, ef: outputs.ef, gh: outputs.gh },
            };
          }
        }

        if (node.type === "orGate") {
          const inputs = nodeValues.get(node.id + "_inputs") || { a: 0, b: 0 };
          // Optimization: Only return new object if data actually changed
          if (node.data.a !== inputs.a || node.data.b !== inputs.b) {
            return {
              ...node,
              data: { ...node.data, a: inputs.a, b: inputs.b },
            };
          }
        }

        if (node.type === "notGate") {
          const input = nodeValues.get(node.id + "_input") || { a: 0 };
          if (node.data.input !== input.a) {
            return {
              ...node,
              data: { ...node.data, input: input.a },
            };
          }
        }

        // If it's an Output Node, update its 'isLit' status
        if (node.type === "outputNode") {
          const val = nodeValues.get(node.id) || 0;
          if (node.data.inputVal !== val) {
            return { ...node, data: { ...node.data, inputVal: val } };
          }
        }

        return node;
      })
    );
    

  }, [edges, nodes.length, JSON.stringify(nodes.map((n) => n.data.value))]);
  // Dependency Note: We trigger this when edges change, node count changes,
  // or when an INPUT node's value changes.
  function toggleSidebar()
  {
    setSideBar(!sideBar);
  }
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <button 
      onClick={toggleSidebar} 
      style={
        {height: "50px",
        background: "#1a1a1a",
        border:"none",
        position: "absolute",
        zIndex:10000}}>
        <img src={sideBarIcon} style={{height: "30px"}}></img>
        </button>
      {sideBar && <Sidebar />}
      <div
        className="reactflow-wrapper"
        ref={reactFlowWrapper}
        style={{ width: "100%", height: "100%" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // onEdgeDoubleClick={onEdgeDoubleClick}
          // onNodeDragStart={onNodeDragStart}
          // onNodeDrag={onNodeDrag}
          // onNodeDragStop={onNodeDragStop}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <Controls />
        { /* <MiniMap position="Top-right"/>*/}
          <Background color="#000000ff" gap={12} size={1} />
        </ReactFlow>
        {/* Dustbin — appears while dragging a node *
        <div
          ref={dustbinRef}
          aria-hidden
          style={{
            position: "absolute",
            right: 24,
            bottom: 24,
            width: 72,
            height: 72,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: overDustbin ? "#ffe6e6" : "rgba(0,0,0,0.06)",
            boxShadow: overDustbin ? "0 6px 16px rgba(255,0,0,0.15)" : "0 6px 18px rgba(0,0,0,0.08)",
            transition: "background .12s, transform .12s",
            transform: overDustbin ? "scale(1.06)" : "scale(1)",
            zIndex: 9999,
            pointerEvents: isDraggingNode ? "auto" : "none",
          }}
          title={isDraggingNode ? "Drop here to delete node" : ""}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18" stroke={overDustbin ? '#c00' : '#333'} strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke={overDustbin ? '#c00' : '#333'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11v5" stroke={overDustbin ? '#c00' : '#333'} strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M14 11v5" stroke={overDustbin ? '#c00' : '#333'} strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M9 6l1-2h4l1 2" stroke={overDustbin ? '#c00' : '#333'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>*/}
      </div>
    </div>
  );
}
