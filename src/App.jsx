// src/App.jsx
import { ReactFlowProvider } from "@xyflow/react";
import CircuitBuilder from "./CircuitBuilder";
// Wrap the whole thing in the Provider
export default function App() {
  return (
    <ReactFlowProvider>
      <CircuitBuilder />
    </ReactFlowProvider>
  );
}
