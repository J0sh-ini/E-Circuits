import React, { useState, useEffect } from "react";
import HelpSection from "./HelpSection";
import LoginSection from "./LoginSection";
import SlotModal from "./SlotModal";
import './styles.css';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { CircuitNode, CircuitEdge } from "../types";
import { supabase } from "../utils/supabase";
interface SidebarProps {
  onSpawnNode: (type: string) => void;
  isOpen: boolean;
  hasClockNode: boolean;
  onToggleClockNode: () => void;
  isSimplifiedMode: boolean;
  nodes: CircuitNode[];
  edges: CircuitEdge[];
  onLoad: (nodes: CircuitNode[], edges: CircuitEdge[]) => void;
}

export default function Sidebar({ onSpawnNode, isOpen, hasClockNode, onToggleClockNode, isSimplifiedMode, nodes, edges, onLoad }: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const isLoggedIn = (loggedInUser !== null && loggedInEmail !== null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [slotAction, setSlotAction] = useState<'save' | 'load'>('save');
  const [occupiedSlots, setOccupiedSlots] = useState<number[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOccupiedSlots();
    } else {
      setOccupiedSlots([]);
    }
  }, [loggedInEmail, isLoggedIn]);

  const fetchOccupiedSlots = async () => {
    if (!loggedInEmail) return;
    try {
      const { data, error } = await supabase
        .from('mainData')
        .select('slot')
        .eq('email', loggedInEmail);
      
      if (error) throw error;
      if (data) {
        setOccupiedSlots(data.map(row => row.slot));
      }
    } catch (err) {
      console.error("Error fetching slot status:", err);
    }
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      alert("Please login to save your circuit.");
      return;
    }
    setSlotAction('save');
    setIsSlotModalOpen(true);
  };

  const handleLoadClick = () => {
    if (!isLoggedIn) {
      alert("Please login to load your circuit.");
      return;
    }
    setSlotAction('load');
    setIsSlotModalOpen(true);
  };

  const onSelectSlot = async (slot: number) => {
    if (slotAction === 'load' && !occupiedSlots.includes(slot)) {
      alert("This slot is empty!");
      return;
    }

    if (slotAction === 'save' && occupiedSlots.includes(slot)) {
      const confirmOverwrite = window.confirm(`Slot ${slot} already has data. Overwrite it?`);
      if (!confirmOverwrite) return;
    }

    setIsSlotModalOpen(false);
    if (slotAction === 'save') {
      await executeSave(slot);
    } else {
      await executeLoad(slot);
    }
  };

  const executeSave = async (slot: number) => {
    try {
      console.log(`Saving circuit to slot ${slot} for:`, loggedInEmail);
      
      const { error } = await supabase
        .from('mainData')
        .upsert({
          email: loggedInEmail,
          slot: slot,
          data: {
            nodes: nodes,
            edges: edges
          }
        }, { onConflict: 'email,slot' });

      if (error) throw error;
      alert(`Successfully saved to Slot ${slot}!`);
      fetchOccupiedSlots();
    } catch (err: any) {
      console.error("Save Error:", err);
      alert("Error saving: " + err.message);
    }
  };

  const executeLoad = async (slot: number) => {
    try {
      console.log(`Loading circuit from slot ${slot} for:`, loggedInEmail);
      const { data, error } = await supabase
        .from('mainData')
        .select('data')
        .eq('email', loggedInEmail)
        .eq('slot', slot)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          alert(`No saved circuit found in Slot ${slot}.`);
          return;
        }
        throw error;
      }

      if (data && data.data) {
        onLoad(data.data.nodes, data.data.edges);
        alert(`Successfully loaded from Slot ${slot}!`);
      }
    } catch (err: any) {
      console.error("Load Error:", err);
      alert("Error loading: " + err.message);
    }
  };

  return (
    <aside className={`modern-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <HelpSection isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
      </HelpSection>
      <LoginSection
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(username, email) => {
          setLoggedInUser(username);
          setLoggedInEmail(email);
        }}
      />
      <SlotModal 
        isOpen={isSlotModalOpen} 
        onClose={() => setIsSlotModalOpen(false)} 
        onSelect={onSelectSlot}
        mode={slotAction}
        occupiedSlots={occupiedSlots}
      />
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
            <Accordion>
              <AccordionItem header="2-Input Gates">
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleAndGate")} onDragStart={(event) => onDragStart(event, "simpleAndGate")} draggable>
                  AND Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleOrGate")} onDragStart={(event) => onDragStart(event, "simpleOrGate")} draggable>
                  OR Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNotGate")} onDragStart={(event) => onDragStart(event, "simpleNotGate")} draggable>
                  NOT Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNandGate")} onDragStart={(event) => onDragStart(event, "simpleNandGate")} draggable>
                  NAND Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNorGate")} onDragStart={(event) => onDragStart(event, "simpleNorGate")} draggable>
                  NOR Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleXorGate")} onDragStart={(event) => onDragStart(event, "simpleXorGate")} draggable>
                  XOR Gate
                </div>

              </AccordionItem>
              <AccordionItem header="3-Input Gates ">
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleAndGate3")} onDragStart={(event) => onDragStart(event, "simpleAndGate3")} draggable>
                  3-In AND
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleOrGate3")} onDragStart={(event) => onDragStart(event, "simpleOrGate3")} draggable>
                  3-In OR
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNandGate3")} onDragStart={(event) => onDragStart(event, "simpleNandGate3")} draggable>
                  3-In NAND
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleNorGate3")} onDragStart={(event) => onDragStart(event, "simpleNorGate3")} draggable>
                  3-In NOR
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("simpleXorGate3")} onDragStart={(event) => onDragStart(event, "simpleXorGate3")} draggable>
                  3-In XOR
                </div>
              </AccordionItem>
              <AccordionItem header="FlipFlops">
                <div className="dndnode" onDoubleClick={() => onSpawnNode("dFlipFlop")} onDragStart={(event) => onDragStart(event, "dFlipFlop")} draggable>
                  D Flip-Flop
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("tFlipFlop")} onDragStart={(event) => onDragStart(event, "tFlipFlop")} draggable>
                  T Flip-Flop
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("jkFlipFlop")} onDragStart={(event) => onDragStart(event, "jkFlipFlop")} draggable>
                  JK Flip-Flop
                </div>
              </AccordionItem>
            </Accordion>
          </>
        ) : (
          <>
            <Accordion>
              <AccordionItem header="2-Input Gates" >
                <div className="dndnode" onDoubleClick={() => onSpawnNode("andGate")} onDragStart={(event) => onDragStart(event, "andGate")} draggable>
                  AND Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("orGate")} onDragStart={(event) => onDragStart(event, "orGate")} draggable>
                  OR Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("notGate")} onDragStart={(event) => onDragStart(event, "notGate")} draggable>
                  NOT Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("nandGate")} onDragStart={(event) => onDragStart(event, "nandGate")} draggable>
                  NAND Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("norGate")} onDragStart={(event) => onDragStart(event, "norGate")} draggable>
                  NOR Gate
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("xorGate")} onDragStart={(event) => onDragStart(event, "xorGate")} draggable>
                  XOR Gate
                </div>
              </AccordionItem>
              <AccordionItem header="3-Input Gates ">
                <div className="dndnode" onDoubleClick={() => onSpawnNode("andGate3")} onDragStart={(event) => onDragStart(event, "andGate3")} draggable>
                  3-In AND
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("orGate3")} onDragStart={(event) => onDragStart(event, "orGate3")} draggable>
                  3-In OR
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("nandGate3")} onDragStart={(event) => onDragStart(event, "nandGate3")} draggable>
                  3-In NAND
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("norGate3")} onDragStart={(event) => onDragStart(event, "norGate3")} draggable>
                  3-In NOR
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("xorGate3")} onDragStart={(event) => onDragStart(event, "xorGate3")} draggable>
                  3-In XOR
                </div>
              </AccordionItem>
              <AccordionItem header="FlipFlops">
                <div className="dndnode" onDoubleClick={() => onSpawnNode("detailedDFlipFlop")} onDragStart={(event) => onDragStart(event, "detailedDFlipFlop")} draggable>
                  D FlipFlop
                </div>
                <div className="dndnode" onDoubleClick={() => onSpawnNode("detailedJkFlipFlop")} onDragStart={(event) => onDragStart(event, "detailedJkFlipFlop")} draggable>
                  JK FlipFlop
                </div>
              </AccordionItem>
            </Accordion>
          </>
        )}
        <button className={`dndnode ${!isLoggedIn ? 'action-btn' : ''}`} style={{ justifyContent: 'center', marginTop: 'auto' }}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? "login to save your circuit" : undefined}
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button className={`dndnode ${!isLoggedIn ? 'action-btn' : ''}`} style={{ justifyContent: 'center' }}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? "login to load your circuit" : undefined}
          onClick={handleLoadClick}
        >
          Load
        </button>
        <div
          className={`help dndnode`}
          onClick={() => { setIsModalOpen(true) }}
          style={{ marginTop: 0, cursor: 'pointer' }}
        >
          Help Manual
        </div>
        <button className={`dndnode`} style={{ justifyContent: 'center', cursor: 'pointer' }} onClick={() => {
          if (isLoggedIn) {
            import('../utils/supabase').then(({ supabase }) => supabase.auth.signOut());
            setLoggedInUser(null);
            setLoggedInEmail(null);
          } else {
            setIsLoginOpen(true);
          }
        }}>
          {isLoggedIn ? `Logout (${loggedInUser})` : "Login"}
        </button>
      </div>
    </aside>
  );
}
