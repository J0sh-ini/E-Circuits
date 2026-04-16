import type { Node, Edge } from '@xyflow/react';


export interface BaseGateData extends Record<string, unknown> {
  label: string;
  vcc: number;
  gnd: number;
  value: number;
}

export interface GateNodeData2Input extends BaseGateData {
  a: number;
  b: number;
  ab: number;
  c: number;
  d: number;
  cd: number;
  e: number;
  f: number;
  ef: number;
  g: number;
  h: number;
  gh: number;
}

export interface GateNodeData3Input extends BaseGateData {
  a: number;
  b: number;
  c: number;
  abc: number;
  d: number;
  e: number;
  f: number;
  def: number;
  g: number;
  h: number;
  i: number;
  ghi: number;
}

export interface NotGateData extends BaseGateData {
  a: number;
  nota: number;
  b: number;
  notb: number;
  c: number;
  notc: number;
  d: number;
  notd: number;
  e: number;
  note: number;
  f: number;
  notf: number;
}

export interface InputNodeData extends Record<string, unknown> {
  value: number;
}

export interface ClockNodeData extends Record<string, unknown> {
  value: number;
}

export interface OutputNodeData extends Record<string, unknown> {
  value: number;
  inputVal?: number;
}

export interface PowerNodeData extends Record<string, unknown> {
  type: 'vcc' | 'gnd';
  label: string;
}

export interface SequentialBaseData extends BaseGateData {
  clk: number;
  prevClk: number;
  q: number;
  qNot: number;
}

export interface DFlipFlopData extends SequentialBaseData {
  d: number;
}

export interface TFlipFlopData extends SequentialBaseData {
  t: number;
}

export interface JKFlipFlopData extends SequentialBaseData {
  j: number;
  k: number;
}

export interface SimpleGateData2Input extends Record<string, unknown> {
  type: string;
  label: string;
  a: number;
  b: number;
  ab: number;
}

export interface SimpleGateData3Input extends Record<string, unknown> {
  type: string;
  label: string;
  a: number;
  b: number;
  c: number;
  abc: number;
}

export interface SimpleNotGateData extends Record<string, unknown> {
  type: string;
  label: string;
  a: number;
  nota: number;
}

export interface DetailedDFlipFlopData extends BaseGateData {
  clock1: number;
  prevClk1: number;
  q1: number;
  notq1: number;
  d1: number;
  set1: number;
  reset1: number;
  clock2: number;
  prevClk2: number;
  q2: number;
  notq2: number;
  d2: number;
  set2: number;
  reset2: number;
}

export interface DetailedJKFlipFlopData extends BaseGateData {
  clock1: number;
  prevClk1: number;
  q1: number;
  notq1: number;
  jk1: number;
  preset1: number;
  clear1: number;
  j1: number;
  clock2: number;
  prevClk2: number;
  q2: number;
  notq2: number;
  preset2: number;
  clear2: number;
  j2: number;
  k2: number;
}

export type CircuitNodeData =
  | GateNodeData2Input
  | GateNodeData3Input
  | NotGateData
  | InputNodeData
  | ClockNodeData
  | OutputNodeData
  | DFlipFlopData
  | TFlipFlopData
  | JKFlipFlopData
  | SimpleGateData2Input
  | SimpleGateData3Input
  | SimpleNotGateData
  | DetailedDFlipFlopData
  | DetailedJKFlipFlopData
  | PowerNodeData;

export type CircuitNode = Node<CircuitNodeData>;
export type CircuitEdge = Edge;
