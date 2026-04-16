import { useEffect, useMemo, useCallback } from "react";
import type { CircuitNode, CircuitEdge } from "../types";

export function useCircuitSimulation(
  nodes: CircuitNode[],
  edges: CircuitEdge[],
  setNodes: React.Dispatch<React.SetStateAction<CircuitNode[]>>
) {
  const hasVccAndGnd = useCallback((nodeId: string, edgesList: CircuitEdge[]) => {
    const hasVcc = edgesList.some(edge => edge.target === nodeId && edge.source === "vcc");
    const hasGnd = edgesList.some(edge => edge.target === nodeId && edge.source === "gnd");
    return hasVcc && hasGnd;
  }, []);

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

          if (targetNode.type === "andGate" || targetNode.type === "orGate" || targetNode.type === "nandGate" || targetNode.type === "norGate" || targetNode.type === "xorGate") {
            const hasPower = hasVccAndGnd(edge.target, edges);
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, ab: 0, cd: 0, ef: 0, gh: 0 });
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

            let ab, cd, ef, gh, output = 0;

            if (hasPower) {
              if (targetNode.type === "andGate") {
                ab = inputs.a && inputs.b ? 1 : 0;
                cd = inputs.c && inputs.d ? 1 : 0;
                ef = inputs.e && inputs.f ? 1 : 0;
                gh = inputs.g && inputs.h ? 1 : 0;
              } else if (targetNode.type === "orGate") {
                ab = inputs.a || inputs.b ? 1 : 0;
                cd = inputs.c || inputs.d ? 1 : 0;
                ef = inputs.e || inputs.f ? 1 : 0;
                gh = inputs.g || inputs.h ? 1 : 0;
              } else if (targetNode.type === "nandGate") {
                ab = (inputs.a && inputs.b) ? 0 : 1;
                cd = (inputs.c && inputs.d) ? 0 : 1;
                ef = (inputs.e && inputs.f) ? 0 : 1;
                gh = (inputs.g && inputs.h) ? 0 : 1;
              } else if (targetNode.type === "norGate") {
                ab = (inputs.a || inputs.b) ? 0 : 1;
                cd = (inputs.c || inputs.d) ? 0 : 1;
                ef = (inputs.e || inputs.f) ? 0 : 1;
                gh = (inputs.g || inputs.h) ? 0 : 1;
              } else if (targetNode.type === "xorGate") {
                ab = (inputs.a !== inputs.b) ? 1 : 0;
                cd = (inputs.c !== inputs.d) ? 1 : 0;
                ef = (inputs.e !== inputs.f) ? 1 : 0;
                gh = (inputs.g !== inputs.h) ? 1 : 0;
              }
            }
            nodeValues.set(edge.target, { output, ab, cd, ef, gh });
          }

          if (targetNode.type === "andGate3" || targetNode.type === "orGate3" || targetNode.type === "nandGate3" || targetNode.type === "norGate3" || targetNode.type === "xorGate3") {
            const hasPower = hasVccAndGnd(edge.target, edges);
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, abc: 0, def: 0, ghi: 0 });
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

            let abc, def, ghi, output = 0;

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
                abc = (inputs.a !== inputs.b ? 1 : 0) !== inputs.c ? 1 : 0;
                def = (inputs.d !== inputs.e ? 1 : 0) !== inputs.f ? 1 : 0;
                ghi = (inputs.g !== inputs.h ? 1 : 0) !== inputs.i ? 1 : 0;
              }
            }
            nodeValues.set(edge.target, { output, abc, def, ghi });
          }

          if (targetNode.type === "notGate") {
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

          if (targetNode.type === "detailedDFlipFlop" || targetNode.type === "detailedJkFlipFlop") {
            const hasPower = hasVccAndGnd(edge.target, edges);
            if (!nodeValues.has(edge.target + "_inputs")) {
              nodeValues.set(edge.target + "_inputs", {
                d1: 0, set1: 0, reset1: 0, clock1: 0,
                d2: 0, set2: 0, reset2: 0, clock2: 0,
                jk1: 0, preset1: 0, clear1: 0, j1: 0,
                preset2: 0, clear2: 0, j2: 0, k2: 0
              });
            }
            const inputs = nodeValues.get(edge.target + "_inputs");

            if (edge.targetHandle === "d1") inputs.d1 = sourceVal;
            if (edge.targetHandle === "set1") inputs.set1 = sourceVal;
            if (edge.targetHandle === "reset1") inputs.reset1 = sourceVal;
            if (edge.targetHandle === "clock1") inputs.clock1 = sourceVal;
            if (edge.targetHandle === "d2") inputs.d2 = sourceVal;
            if (edge.targetHandle === "set2") inputs.set2 = sourceVal;
            if (edge.targetHandle === "reset2") inputs.reset2 = sourceVal;
            if (edge.targetHandle === "clock2") inputs.clock2 = sourceVal;

            if (edge.targetHandle === "jk1") inputs.jk1 = sourceVal;
            if (edge.targetHandle === "preset1") inputs.preset1 = sourceVal;
            if (edge.targetHandle === "clear1") inputs.clear1 = sourceVal;
            if (edge.targetHandle === "j1") inputs.j1 = sourceVal;
            if (edge.targetHandle === "preset2") inputs.preset2 = sourceVal;
            if (edge.targetHandle === "clear2") inputs.clear2 = sourceVal;
            if (edge.targetHandle === "j2") inputs.j2 = sourceVal;
            if (edge.targetHandle === "k2") inputs.k2 = sourceVal;

            let q1 = (targetNode.data as any).q1 || 0;
            let notq1 = (targetNode.data as any).notq1 !== undefined ? (targetNode.data as any).notq1 : 1;
            const prevClk1 = (targetNode.data as any).prevClk1 || 0;

            let q2 = (targetNode.data as any).q2 || 0;
            let notq2 = (targetNode.data as any).notq2 !== undefined ? (targetNode.data as any).notq2 : 1;
            const prevClk2 = (targetNode.data as any).prevClk2 || 0;

            if (hasPower) {
              if (targetNode.type === "detailedDFlipFlop") {
                if (inputs.reset1) { q1 = 0; notq1 = 1; }
                else if (inputs.set1) { q1 = 1; notq1 = 0; }
                else if (prevClk1 === 0 && inputs.clock1 === 1) {
                  q1 = inputs.d1 ? 1 : 0;
                  notq1 = inputs.d1 ? 0 : 1;
                }
                if (inputs.reset2) { q2 = 0; notq2 = 1; }
                else if (inputs.set2) { q2 = 1; notq2 = 0; }
                else if (prevClk2 === 0 && inputs.clock2 === 1) {
                  q2 = inputs.d2 ? 1 : 0;
                  notq2 = inputs.d2 ? 0 : 1;
                }
              } else if (targetNode.type === "detailedJkFlipFlop") {
                if (inputs.clear1) { q1 = 0; notq1 = 1; }
                else if (inputs.preset1) { q1 = 1; notq1 = 0; }
                else if (prevClk1 === 0 && inputs.clock1 === 1) {
                  if (inputs.j1 === 0 && inputs.jk1 === 1) { q1 = 0; notq1 = 1; }
                  else if (inputs.j1 === 1 && inputs.jk1 === 0) { q1 = 1; notq1 = 0; }
                  else if (inputs.j1 === 1 && inputs.jk1 === 1) { q1 = q1 ? 0 : 1; notq1 = q1 ? 0 : 1; }
                }
                if (inputs.clear2) { q2 = 0; notq2 = 1; }
                else if (inputs.preset2) { q2 = 1; notq2 = 0; }
                else if (prevClk2 === 0 && inputs.clock2 === 1) {
                  if (inputs.j2 === 0 && inputs.k2 === 1) { q2 = 0; notq2 = 1; }
                  else if (inputs.j2 === 1 && inputs.k2 === 0) { q2 = 1; notq2 = 0; }
                  else if (inputs.j2 === 1 && inputs.k2 === 1) { q2 = q2 ? 0 : 1; notq2 = q2 ? 0 : 1; }
                }
              }
            }
            nodeValues.set(edge.target, { q1, notq1, prevClk1: inputs.clock1, q2, notq2, prevClk2: inputs.clock2 });
          }

          if (targetNode.type === "outputNode") {
            nodeValues.set(edge.target, sourceVal);
          }
        });
      }

      let hasChanges = false;
      const nextNodes = currentNodes.map((node) => {
        if (node.type === "andGate" || node.type === 'orGate' || node.type === "norGate" || node.type === "nandGate" || node.type === "xorGate") {
          const outputs = nodeValues.get(node.id) || { ab: 0, cd: 0, ef: 0, gh: 0, output: 0 };
          if ((node.data as any).ab !== outputs.ab || (node.data as any).cd !== outputs.cd || (node.data as any).ef !== outputs.ef || (node.data as any).gh !== outputs.gh) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, ab: outputs.ab, cd: outputs.cd, ef: outputs.ef, gh: outputs.gh },
            };
          }
        }
        if (node.type === "andGate3" || node.type === 'orGate3' || node.type === "norGate3" || node.type === "nandGate3" || node.type === "xorGate3") {
          const outputs = nodeValues.get(node.id) || { abc: 0, def: 0, ghi: 0, output: 0 };
          if ((node.data as any).abc !== outputs.abc || (node.data as any).def !== outputs.def || (node.data as any).ghi !== outputs.ghi) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, abc: outputs.abc, def: outputs.def, ghi: outputs.ghi },
            };
          }
        }
        if (node.type === "notGate") {
          const outputs = nodeValues.get(node.id) || { nota: 0, notb: 0, notc: 0, notd: 0, note: 0, notf: 0 };
          if ((node.data as any).nota !== outputs.nota || (node.data as any).notb !== outputs.notb || (node.data as any).notc !== outputs.notc || (node.data as any).notd !== outputs.notd || (node.data as any).note !== outputs.note || (node.data as any).notf !== outputs.notf) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, nota: outputs.nota, notb: outputs.notb, notc: outputs.notc, notd: outputs.notd, note: outputs.note, notf: outputs.notf },
            };
          }
        }
        if (node.type === "detailedDFlipFlop" || node.type === "detailedJkFlipFlop") {
          const outputs = nodeValues.get(node.id) || {
            q1: (node.data as any).q1, notq1: (node.data as any).notq1, prevClk1: (node.data as any).prevClk1,
            q2: (node.data as any).q2, notq2: (node.data as any).notq2, prevClk2: (node.data as any).prevClk2
          };
          if ((node.data as any).q1 !== outputs.q1 || (node.data as any).notq1 !== outputs.notq1 || (node.data as any).prevClk1 !== outputs.prevClk1 ||
            (node.data as any).q2 !== outputs.q2 || (node.data as any).notq2 !== outputs.notq2 || (node.data as any).prevClk2 !== outputs.prevClk2) {
            hasChanges = true;
            return {
              ...node,
              data: { ...node.data, q1: outputs.q1, notq1: outputs.notq1, prevClk1: outputs.prevClk1, q2: outputs.q2, notq2: outputs.notq2, prevClk2: outputs.prevClk2 },
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

  }, [edges, inputValuesDependency, hasVccAndGnd, setNodes]);
}
