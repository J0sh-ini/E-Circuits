import { ReactFlowProvider } from "@xyflow/react";
import CircuitBuilder from "./CircuitBuilder.tsx";
export default function App() {
  return (
    <ReactFlowProvider>
      <CircuitBuilder />
    </ReactFlowProvider>
  );
}
