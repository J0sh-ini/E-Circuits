import { useEffect, useMemo } from "react";
import type { CircuitNode, CircuitEdge } from "../types";

export function useSimpleCircuitSimulation(
  nodes: CircuitNode[],
  edges: CircuitEdge[],
  setNodes: React.Dispatch<React.SetStateAction<CircuitNode[]>>
) {
  const inputValuesDependency = useMemo(() => {
    return nodes
      .filter(n => n.type === "inputNode" || n.type === "clockNode")
      .map(n => `${n.id}:${n.data.value}`)
      .join("|");
  }, [nodes]);

  useEffect(() => {
    setNodes((currentNodes) => {
      const nodeValues = new Map<string, any>();
      currentNodes.forEach((node) => {
        if (node.type === "inputNode" || node.type === "clockNode") {
          nodeValues.set(node.id, node.data.value ? 1 : 0);
        }
      });

      for (let i = 0; i < 5; i++) {
        edges.forEach((edge) => {
          let sourceVal = 0;
          const sourceNode = currentNodes.find((n) => n.id === edge.source);

          if (sourceNode?.type === "simpleNotGate") {
            const nodeData = nodeValues.get(edge.source);
            if (edge.sourceHandle === "nota") {
              sourceVal = nodeData?.nota || 0;
            }
          } else if (sourceNode?.type === "simpleAndGate" || sourceNode?.type === "simpleOrGate" || sourceNode?.type === "simpleNandGate" || sourceNode?.type === "simpleNorGate" || sourceNode?.type === "simpleXorGate") {
            const nodeData = nodeValues.get(edge.source);
            if (edge.sourceHandle === "ab") sourceVal = nodeData?.ab || 0;
          } else if (sourceNode?.type === "simpleAndGate3" || sourceNode?.type === "simpleOrGate3" || sourceNode?.type === "simpleNandGate3" || sourceNode?.type === "simpleNorGate3" || sourceNode?.type === "simpleXorGate3") {
            const nodeData = nodeValues.get(edge.source);
            if (edge.sourceHandle === "abc") sourceVal = nodeData?.abc || 0;
          } else if (sourceNode?.type === "detailedDFlipFlop" || sourceNode?.type === "detailedJkFlipFlop") {
            const nodeData = nodeValues.get(edge.source);
            if (edge.sourceHandle === "q1") {
              sourceVal = nodeData?.q1 ?? (sourceNode.data as any).q1 ?? 0;
            } else if (edge.sourceHandle === "notq1") {
              sourceVal = nodeData?.notq1 ?? (sourceNode.data as any).notq1 ?? 1;
            } else if (edge.sourceHandle === "q2") {
              sourceVal = nodeData?.q2 ?? (sourceNode.data as any).q2 ?? 0;
            } else if (edge.sourceHandle === "notq2") {
              sourceVal = nodeData?.notq2 ?? (sourceNode.data as any).notq2 ?? 1;
            }
          } else if (sourceNode?.type === "dFlipFlop" || sourceNode?.type === "tFlipFlop" || sourceNode?.type === "jkFlipFlop") {
            const nodeData = nodeValues.get(edge.source);
            if (edge.sourceHandle === "q") {
              sourceVal = nodeData?.q ?? (sourceNode.data as any).q ?? 0;
            } else if (edge.sourceHandle === "qNot") {
              sourceVal = nodeData?.qNot ?? (sourceNode.data as any).qNot ?? 1;
            }
          } else {
            sourceVal = nodeValues.get(edge.source) || 0;
          }

          const targetNode = currentNodes.find((n) => n.id === edge.target);
          if (!targetNode) return;

          if (targetNode.type === "simpleAndGate" || targetNode.type === "simpleOrGate" || targetNode.type === "simpleNandGate" || targetNode.type === "simpleNorGate" || targetNode.type === "simpleXorGate") {
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", { a: 0, b: 0 });
            }
            const inputs = nodeValues.get(edge.target + "_inputs");

            if (edge.targetHandle === "a") inputs.a = sourceVal;
            if (edge.targetHandle === "b") inputs.b = sourceVal;

            let ab = 0;
            if (targetNode.type === "simpleAndGate") {
              ab = inputs.a && inputs.b ? 1 : 0;
            } else if (targetNode.type === "simpleOrGate") {
              ab = inputs.a || inputs.b ? 1 : 0;
            } else if (targetNode.type === "simpleNandGate") {
              ab = (inputs.a && inputs.b) ? 0 : 1;
            } else if (targetNode.type === "simpleNorGate") {
              ab = (inputs.a || inputs.b) ? 0 : 1;
            } else if (targetNode.type === "simpleXorGate") {
              ab = (inputs.a !== inputs.b) ? 1 : 0;
            }
            nodeValues.set(edge.target, { ab });
          }

          if (targetNode.type === "simpleAndGate3" || targetNode.type === "simpleOrGate3" || targetNode.type === "simpleNandGate3" || targetNode.type === "simpleNorGate3" || targetNode.type === "simpleXorGate3") {
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", { a: 0, b: 0, c: 0 });
            }
            const inputs = nodeValues.get(edge.target + "_inputs");

            if (edge.targetHandle === "a") inputs.a = sourceVal;
            if (edge.targetHandle === "b") inputs.b = sourceVal;
            if (edge.targetHandle === "c") inputs.c = sourceVal;

            let abc = 0;
            if (targetNode.type === "simpleAndGate3") {
              abc = inputs.a && inputs.b && inputs.c ? 1 : 0;
            } else if (targetNode.type === "simpleOrGate3") {
              abc = inputs.a || inputs.b || inputs.c ? 1 : 0;
            } else if (targetNode.type === "simpleNandGate3") {
              abc = inputs.a && inputs.b && inputs.c ? 0 : 1;
            } else if (targetNode.type === "simpleNorGate3") {
              abc = inputs.a || inputs.b || inputs.c ? 0 : 1;
            } else if (targetNode.type === "simpleXorGate3") {
              abc = (inputs.a !== inputs.b ? 1 : 0) !== inputs.c ? 1 : 0;
            }
            nodeValues.set(edge.target, { abc });
          }

          if (targetNode.type === "simpleNotGate") {
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", { a: 0 });
            }
            const inputs = nodeValues.get(edge.target + "_inputs");
            if (edge.targetHandle === "a") inputs.a = sourceVal;
            const nota = inputs.a ? 0 : 1;
            nodeValues.set(edge.target, { nota });
          }

          if (targetNode.type === "dFlipFlop" || targetNode.type === "tFlipFlop" || targetNode.type === "jkFlipFlop") {
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", { d: 0, t: 0, j: 0, k: 0, clk: 0 });
            }
            const inputs = nodeValues.get(edge.target + "_inputs");

            if (edge.targetHandle === "d") inputs.d = sourceVal;
            if (edge.targetHandle === "t") inputs.t = sourceVal;
            if (edge.targetHandle === "j") inputs.j = sourceVal;
            if (edge.targetHandle === "k") inputs.k = sourceVal;
            if (edge.targetHandle === "clk") inputs.clk = sourceVal;

            let q = (targetNode.data as any).q || 0;
            let qNot = (targetNode.data as any).qNot !== undefined ? (targetNode.data as any).qNot : 1;
            const prevClk = (targetNode.data as any).prevClk || 0;

            if (prevClk === 0 && inputs.clk === 1) {
              if (targetNode.type === "dFlipFlop") {
                q = inputs.d ? 1 : 0;
                qNot = inputs.d ? 0 : 1;
              } else if (targetNode.type === "tFlipFlop") {
                if (inputs.t === 1) {
                  q = q ? 0 : 1;
                  qNot = q ? 0 : 1;
                }
              } else if (targetNode.type === "jkFlipFlop") {
                if (inputs.j === 0 && inputs.k === 1) {
                  q = 0; qNot = 1;
                } else if (inputs.j === 1 && inputs.k === 0) {
                  q = 1; qNot = 0;
                } else if (inputs.j === 1 && inputs.k === 1) {
                  q = q ? 0 : 1;
                  qNot = q ? 0 : 1;
                }
              }
            }
            nodeValues.set(edge.target, { q, qNot, prevClk: inputs.clk });
          }

          if (targetNode.type === "outputNode") {
            nodeValues.set(edge.target, sourceVal);
          }
        });
      }

      let hasChanges = false;
      const nextNodes = currentNodes.map((node) => {
        if (node.type === "simpleAndGate" || node.type === 'simpleOrGate' || node.type === "simpleNorGate" || node.type === "simpleNandGate" || node.type === "simpleXorGate") {
          const outputs = nodeValues.get(node.id) || { ab: 0 };
          if ((node.data as any).ab !== outputs.ab) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, ab: outputs.ab },
            };
          }
        }
        if (node.type === "simpleAndGate3" || node.type === 'simpleOrGate3' || node.type === "simpleNorGate3" || node.type === "simpleNandGate3" || node.type === "simpleXorGate3") {
          const outputs = nodeValues.get(node.id) || { abc: 0 };
          if ((node.data as any).abc !== outputs.abc) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, abc: outputs.abc },
            };
          }
        }
        if (node.type === "simpleNotGate") {
          const outputs = nodeValues.get(node.id) || { nota: 0 };
          if ((node.data as any).nota !== outputs.nota) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, nota: outputs.nota },
            };
          }
        }
        if (node.type === "dFlipFlop" || node.type === "tFlipFlop" || node.type === "jkFlipFlop") {
          const outputs = nodeValues.get(node.id) || { q: (node.data as any).q, qNot: (node.data as any).qNot, prevClk: (node.data as any).prevClk };
          if ((node.data as any).q !== outputs.q || (node.data as any).qNot !== outputs.qNot || (node.data as any).prevClk !== outputs.prevClk) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, q: outputs.q, qNot: outputs.qNot, prevClk: outputs.prevClk },
            };
          }
        }
        if (node.type === "outputNode") {
          const val = nodeValues.get(node.id) || 0;
          if ((node.data as any).inputVal !== val) {
            hasChanges = true;
            return { ...node, data: { ...node.data, inputVal: val } };
          }
        }

        return node;
      });

      return hasChanges ? nextNodes : currentNodes;
    });
  }, [edges, inputValuesDependency, setNodes]);
}
