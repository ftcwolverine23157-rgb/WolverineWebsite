import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Star, 
  Trophy, 
  Download, 
  Share2, 
  Settings,
  Award,
  Bot,
  Zap,
  Eye,
  Repeat,
  Code,
  Target,
  Sparkles
} from 'lucide-react';

// Game state management
interface Level {
  id: number;
  title: string;
  concept: string;
  description: string;
  challenge: string;
  completed: boolean;
  stars: number;
  xp: number;
  unlocked: boolean;
}

interface GameState {
  currentLevel: number;
  completedLevels: number;
  totalXP: number;
  achievements: string[];
  robotCustomization: {
    color: string;
    wheels: string;
    sensors: string[];
    accessories: string[];
  };
}

// Drag and drop coding blocks
interface CodeBlock {
  id: string;
  type: 'move' | 'turn' | 'repeat' | 'repeat_until' | 'if' | 'sound' | 'light';
  label: string;
  color: string;
  icon: string;
  params?: {
    repeatCount?: number;
    [key: string]: unknown;
  };
  children?: CodeBlock[]; // For repeat blocks that wrap other blocks
}

const codeBlocks: CodeBlock[] = [
  { id: 'move-forward', type: 'move', label: 'Move Forward', color: 'bg-blue-500', icon: '↑' },
  { id: 'move-backward', type: 'move', label: 'Move Backward', color: 'bg-blue-500', icon: '↓' },
  { id: 'turn-left', type: 'turn', label: 'Turn Left', color: 'bg-green-500', icon: '↶' },
  { id: 'turn-right', type: 'turn', label: 'Turn Right', color: 'bg-green-500', icon: '↷' },
  { id: 'repeat', type: 'repeat', label: 'Repeat', color: 'bg-purple-500', icon: '🔄', params: { repeatCount: 3 } },
  { id: 'repeat-until-goal', type: 'repeat_until', label: 'Repeat Until Goal', color: 'bg-purple-600', icon: '🔁' },
  { id: 'play-sound', type: 'sound', label: 'Play Sound', color: 'bg-pink-500', icon: '🔊' },
  { id: 'turn-light-on', type: 'light', label: 'Turn Light On', color: 'bg-orange-500', icon: '💡' },
  { id: 'turn-light-off', type: 'light', label: 'Turn Light Off', color: 'bg-orange-500', icon: '💡' },
];

// Challenge data for different levels based on PRD
interface ChallengeData {
  type: 'quiz' | 'matching' | 'robot';
  instructions: string;
  target?: string[];
  grid?: string[][];
  startPos?: { x: number; y: number };
  robotDirection?: 'right' | 'left' | 'up' | 'down';
  quizData?: {
    items: Array<{ id: string; name: string; isRobot: boolean }>;
    correctCount: number;
  };
  matchingData?: {
    sensors: Array<{ id: string; name: string; icon: string }>;
    outputs: Array<{ id: string; name: string; icon: string }>;
    correctPairs: Array<{ sensor: string; output: string }>;
  };
}

const challenges: Record<number, ChallengeData> = {
  1: {
    type: 'quiz',
    instructions: "Click on all the items that are ROBOTS. A robot has sensors (to sense), actuators (to move/act), and a control system (to make decisions). Regular machines like phones, computers, or cars without autonomous control are NOT robots.",
    quizData: {
      items: [
        { id: '1', name: 'Autonomous Vacuum', isRobot: true },
        { id: '2', name: 'Smartphone', isRobot: false },
        { id: '3', name: 'Mars Rover', isRobot: true },
        { id: '4', name: 'Laptop Computer', isRobot: false },
        { id: '5', name: 'Industrial Robot Arm', isRobot: true },
        { id: '6', name: 'Drone with Auto-Pilot', isRobot: true },
        { id: '7', name: 'Remote Control Car', isRobot: false },
        { id: '8', name: 'Washing Machine', isRobot: false },
      ],
      correctCount: 4
    }
  },
  2: {
    type: 'matching',
    instructions: "Drag each sensor to its matching output. Sensors are INPUTS (they detect things). Outputs like motors and lights are ACTUATORS (they do actions). Match them correctly to complete the level!",
    matchingData: {
      sensors: [
        { id: 'distance', name: 'Distance Sensor', icon: '📡' },
        { id: 'light', name: 'Light Sensor', icon: '💡' },
        { id: 'sound', name: 'Sound Sensor', icon: '🔊' },
        { id: 'touch', name: 'Touch Sensor', icon: '👆' },
      ],
      outputs: [
        { id: 'motor', name: 'Motor', icon: '⚙️' },
        { id: 'light', name: 'Light', icon: '💡' },
        { id: 'speaker', name: 'Speaker', icon: '🔊' },
        { id: 'stop', name: 'Stop Motor', icon: '🛑' },
      ],
      correctPairs: [
        { sensor: 'distance', output: 'motor' },
        { sensor: 'light', output: 'light' },
        { sensor: 'sound', output: 'speaker' },
        { sensor: 'touch', output: 'stop' },
      ]
    }
  },
  3: {
    type: 'robot',
    instructions: "Program your robot to move in a perfect SQUARE. Start by moving forward, then turn right. Repeat this pattern 4 times to complete one full square. Your goal: Move Forward → Turn Right → Move Forward → Turn Right → Move Forward → Turn Right → Move Forward → Turn Right",
    target: ["move-forward", "turn-right", "move-forward", "turn-right", "move-forward", "turn-right", "move-forward", "turn-right"],
    grid: [
      ['🎯', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['🤖', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 3 },
    robotDirection: 'right'
  },
  4: {
    type: 'robot',
    instructions: "Navigate through the maze to reach the exit door (🚪). Use Move Forward to advance and Turn Right when you hit a wall. Your path: Move Forward → Move Forward → Turn Right → Move Forward → Move Forward",
    target: ["move-forward", "move-forward", "turn-right", "move-forward", "move-forward"],
    grid: [
      ['🤖', '⬜', '⬜', '🚪'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  },
  5: {
    type: 'robot',
    instructions: "Use the REPEAT block to create a patrol route! Wrap 'Move Forward' and 'Turn Right' inside a Repeat block set to 4 times. This creates a loop that makes the robot patrol in a square pattern. Goal: Repeat 4 times: [Move Forward, Turn Right]",
    target: ["repeat", "move-forward", "turn-right"],
    grid: [
      ['🤖', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  },
  6: {
    type: 'robot',
    instructions: "Navigate to the target (🎯) while avoiding obstacles. The robot should move forward, check for obstacles, turn right if blocked, then continue forward to reach the goal. Path: Move Forward → Move Forward → Turn Right → Move Forward",
    target: ["move-forward", "move-forward", "turn-right", "move-forward"],
    grid: [
      ['🤖', '⬜', '⬜', '🎯'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  },
  7: {
    type: 'robot',
    instructions: "Combine multiple sensors! Use a sound sensor first, then move based on light sensor input. Sequence: Play Sound → Turn Right → Move Forward",
    target: ["play-sound", "turn-right", "move-forward"],
    grid: [
      ['🤖', '⬜', '⬜', '🎯'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  },
  8: {
    type: 'robot',
    instructions: "Automate a factory task! The robot must pick up an item, move it to a processing station, then return. Create a sequence: Move Forward → Turn Right → Move Forward → Turn Right → Move Forward → Turn Right → Move Forward",
    target: ["move-forward", "turn-right", "move-forward", "turn-right", "move-forward", "turn-right", "move-forward"],
    grid: [
      ['🤖', '⬜', '📦', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⚙️', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  },
  9: {
    type: 'robot',
    instructions: "Optimize your code! Instead of repeating Move Forward 4 times separately, use a Repeat block to make it more efficient. Goal: Use Repeat 4x with Move Forward inside to reach the target in fewer total blocks.",
    target: ["repeat", "move-forward"],
    grid: [
      ['🤖', '⬜', '⬜', '🎯'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  },
  10: {
    type: 'robot',
    instructions: "FINAL MISSION: Complete a rescue mission using ALL your skills! Combine movement, turns, sensors, and loops. The robot must navigate to the target, avoiding obstacles. Path: Move Forward → Turn Right → Move Forward → Turn Left → Move Forward",
    target: ["move-forward", "turn-right", "move-forward", "turn-left", "move-forward"],
    grid: [
      ['🤖', '⬜', '⬜', '🎯'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '⬜']
    ],
    startPos: { x: 0, y: 0 },
    robotDirection: 'right'
  }
};

// Simple Robot Simulation Component
const RobotSimulation = ({ levelId, codeBlocks }: { levelId: number, codeBlocks: CodeBlock[] }) => {
  // Get level challenge data for start position
  const levelChallenge = challenges[levelId];
  const startX = levelChallenge?.startPos?.x ?? 0;
  const startY = levelChallenge?.startPos?.y ?? 0;
  const startDir = levelChallenge?.robotDirection ?? 'right';
  const levelGrid = levelChallenge?.grid ?? [
    ['🤖', '⬜', '⬜', '🎯'],
    ['⬜', '⬜', '⬜', '⬜'],
    ['⬜', '⬜', '⬜', '⬜'],
    ['⬜', '⬜', '⬜', '⬜']
  ];

  const [robotX, setRobotX] = useState(startX);
  const [robotY, setRobotY] = useState(startY);
  const [robotDir, setRobotDir] = useState(startDir);
  const [isRunning, setIsRunning] = useState(false);
  const stopRequestedRef = useRef(false);

  // Reset robot position when level changes
  useEffect(() => {
    setRobotX(startX);
    setRobotY(startY);
    setRobotDir(startDir);
    setIsRunning(false);
  }, [levelId, startX, startY, startDir]);

  const resetRobot = () => {
    setRobotX(startX);
    setRobotY(startY);
    setRobotDir(startDir);
    setIsRunning(false);
  };

  const isAtGoal = (x: number, y: number) => levelGrid[y] && levelGrid[y][x] === '🎯';

  const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

  const executeBlock = async (
    block: CodeBlock,
    ctx: { x: number; y: number; dir: 'right' | 'down' | 'left' | 'up' }
  ) => {
    if (stopRequestedRef.current) return ctx;
    // Primitive step pacing
    await sleep(200);
    if (stopRequestedRef.current) return ctx;

    if (block.id.startsWith('move-forward')) {
      if (ctx.dir === 'right') ctx.x = Math.min(3, ctx.x + 1);
      else if (ctx.dir === 'left') ctx.x = Math.max(0, ctx.x - 1);
      else if (ctx.dir === 'up') ctx.y = Math.max(0, ctx.y - 1);
      else if (ctx.dir === 'down') ctx.y = Math.min(3, ctx.y + 1);
      setRobotX(ctx.x); setRobotY(ctx.y);
      return ctx;
    }
    if (block.id.startsWith('move-backward')) {
      if (ctx.dir === 'right') ctx.x = Math.max(0, ctx.x - 1);
      else if (ctx.dir === 'left') ctx.x = Math.min(3, ctx.x + 1);
      else if (ctx.dir === 'up') ctx.y = Math.min(3, ctx.y + 1);
      else if (ctx.dir === 'down') ctx.y = Math.max(0, ctx.y - 1);
      setRobotX(ctx.x); setRobotY(ctx.y);
      return ctx;
    }
    if (block.id.startsWith('turn-right')) {
      const dirs: ('right' | 'down' | 'left' | 'up')[] = ['right', 'down', 'left', 'up'];
      const current = dirs.indexOf(ctx.dir);
      ctx.dir = dirs[(current + 1) % 4];
      setRobotDir(ctx.dir);
      await sleep(150);
      return ctx;
    }
    if (block.id.startsWith('turn-left')) {
      const dirs: ('right' | 'down' | 'left' | 'up')[] = ['right', 'down', 'left', 'up'];
      const current = dirs.indexOf(ctx.dir);
      ctx.dir = dirs[(current - 1 + 4) % 4];
      setRobotDir(ctx.dir);
      await sleep(150);
      return ctx;
    }
    if (block.type === 'repeat' && block.children && block.children.length > 0) {
      const n = Math.max(1, Math.floor(block.params?.repeatCount as number || 1));
      for (let i = 0; i < n && !stopRequestedRef.current; i++) {
        for (const child of block.children) {
          ctx = await executeBlock(child, ctx);
          if (stopRequestedRef.current) break;
        }
      }
      return ctx;
    }
    if (block.type === 'repeat_until' && block.children && block.children.length > 0) {
      let guard = 0;
      while (!isAtGoal(ctx.x, ctx.y) && !stopRequestedRef.current && guard < 200) {
        for (const child of block.children) {
          ctx = await executeBlock(child, ctx);
          if (isAtGoal(ctx.x, ctx.y) || stopRequestedRef.current) break;
        }
        guard++;
      }
      return ctx;
    }
    return ctx;
  };

  const runSimulation = async () => {
    if (isRunning || codeBlocks.length === 0) {
      console.log('Cannot run: isRunning =', isRunning, 'codeBlocks.length =', codeBlocks.length);
      return;
    }
    
    console.log('Starting simulation with blocks:', codeBlocks);
    setIsRunning(true);
    
    // Reset robot position
    let currentX = startX;
    let currentY = startY;
    let currentDir: 'right' | 'down' | 'left' | 'up' = startDir as 'right' | 'down' | 'left' | 'up';
    
    // Update React state for display
    setRobotX(startX);
    setRobotY(startY);
    setRobotDir(startDir);
    
    // small delay
    await sleep(100);
    stopRequestedRef.current = false;
    let ctx = { x: currentX, y: currentY, dir: currentDir };
    for (const block of codeBlocks) {
      ctx = await executeBlock(block, ctx);
      if (stopRequestedRef.current) break;
    }
    
    console.log('Simulation completed');
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-white font-bold mb-2">Robot Simulation</h3>
        <p className="text-blue-200 text-sm mb-2">
          Robot Position: ({robotX}, {robotY}) | Direction: {robotDir}
        </p>
        <p className="text-gray-400 text-xs mb-4">
          Code Blocks: {codeBlocks.length} | {codeBlocks.map(b => b.label).join(', ')}
        </p>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto">
          {levelGrid.map((row, rowIndex) => 
            row.map((cell, colIndex) => {
              const isRobot = rowIndex === robotY && colIndex === robotX;
              const cellContent = isRobot ? '🤖' : cell;
              return (
                <div 
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-12 h-12 flex items-center justify-center text-2xl border border-gray-600 rounded relative ${
                    isRobot ? 'bg-blue-500 animate-pulse' : 'bg-gray-800'
                  }`}
                >
                  {cellContent}
                  {isRobot && (
                    <div className="absolute -top-1 -right-1 text-xs bg-blue-600 rounded-full px-1">
                      {robotDir === 'right' && '→'}
                      {robotDir === 'left' && '←'}
                      {robotDir === 'up' && '↑'}
                      {robotDir === 'down' && '↓'}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <div className="text-center space-x-2">
        <Button 
          size="sm" 
          variant="outline"
          className="text-white border-2 border-white hover:bg-white hover:text-gray-800 bg-transparent"
          onClick={resetRobot}
        >
          Reset
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-gray-800 bg-transparent"
          onClick={() => {
            console.log('Test move - current position:', robotX, robotY, 'direction:', robotDir);
            if (robotDir === 'right') setRobotX(prev => Math.min(3, prev + 1));
            else if (robotDir === 'left') setRobotX(prev => Math.max(0, prev - 1));
            else if (robotDir === 'up') setRobotY(prev => Math.max(0, prev - 1));
            else if (robotDir === 'down') setRobotY(prev => Math.min(3, prev + 1));
          }}
        >
          Test Move
        </Button>
        <Button 
          size="sm" 
          className="bg-green-500 hover:bg-green-600 text-white border-2 border-green-400"
          onClick={runSimulation}
          disabled={isRunning || codeBlocks.length === 0}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="text-white border-2 border-red-400 hover:bg-red-400 hover:text-gray-800 bg-transparent"
          onClick={() => { stopRequestedRef.current = true; setIsRunning(false); }}
          disabled={!isRunning}
        >
          Stop
        </Button>
      </div>
    </div>
  );
};

// Drag and Drop Coding Interface Component
const CodingInterface = ({ levelId, onCodeChange }: { levelId: number, onCodeChange: (code: CodeBlock[]) => void }) => {
  const [draggedBlock, setDraggedBlock] = useState<CodeBlock | null>(null);
  const [draggedFromIndex, setDraggedFromIndex] = useState<number | null>(null);
  const [draggedFromPath, setDraggedFromPath] = useState<number[] | null>(null);
  const [codeSequence, setCodeSequence] = useState<CodeBlock[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverPath, setDragOverPath] = useState<number[] | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Get repeat count from block id
  const getRepeatCount = (block: CodeBlock): number => {
    if (block.params && typeof block.params.repeatCount === 'number') {
      return Math.max(1, Math.floor(block.params.repeatCount));
    }
    // Back-compat if id encoded the count
    const parts = block.id.split('-');
    const maybeNum = parseInt(parts[1]);
    return Number.isFinite(maybeNum) ? Math.max(1, maybeNum) : 1;
  };

  // Flatten code blocks for simulation (expand repeat blocks)
  const flattenCodeBlocks = (blocks: CodeBlock[]): CodeBlock[] => {
    const result: CodeBlock[] = [];
    for (const block of blocks) {
      if (block.type === 'repeat' && block.children && block.children.length > 0) {
        const repeatCount = getRepeatCount(block);
        for (let i = 0; i < repeatCount; i++) {
          result.push(...flattenCodeBlocks(block.children));
        }
      } else {
        result.push(block);
      }
    }
    return result;
  };

  const handleDragStart = (e: React.DragEvent, block: CodeBlock, index?: number, path?: number[]) => {
    setDraggedBlock(block);
    setIsDragging(true);
    setDraggedFromIndex(index ?? null);
    setDraggedFromPath(path ?? null);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setIsDragging(false);
    setDraggedFromIndex(null);
    setDraggedFromPath(null);
    setDragOverIndex(null);
    setDragOverPath(null);
  };

  const handleDragOver = (e: React.DragEvent, index?: number, path?: number[]) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index ?? null);
    setDragOverPath(path ?? null);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
    setDragOverPath(null);
  };

  // Scratch-like insertion slot between blocks
  const renderInsertionSlot = (path: number[], insertIndex: number) => {
    const isActive = dragOverPath && JSON.stringify(dragOverPath) === JSON.stringify([...path, insertIndex, -1]);
    return (
      <div
        key={`slot-${[...path, insertIndex].join('-')}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverIndex(-1);
          setDragOverPath([...path, insertIndex, -1]);
        }}
        onDrop={(e) => handleDrop(e, insertIndex, path)}
        className={`h-3 my-1 rounded ${
          isActive ? 'bg-yellow-400/40' : 'bg-transparent'
        } border-dashed ${isActive ? 'border-yellow-400' : 'border-transparent'} border-2 transition-colors`}
      />
    );
  };

  const insertBlockAtPath = (blocks: CodeBlock[], block: CodeBlock, insertIndex: number, insertPath: number[]): CodeBlock[] => {
    // Deep clone to avoid mutation
    const newBlocks = JSON.parse(JSON.stringify(blocks)) as CodeBlock[];
    const newBlock = { ...block, id: `${block.id}-${Date.now()}` };
    
    if (insertPath.length === 0) {
      // Insert at top level
      const clampedIndex = Math.max(0, Math.min(insertIndex, newBlocks.length));
      newBlocks.splice(clampedIndex, 0, newBlock);
      return newBlocks;
    }
    
    // Navigate to nested path and insert
    let current = newBlocks;
    for (let i = 0; i < insertPath.length - 1; i++) {
      const pathIndex = insertPath[i];
      if (current[pathIndex] && current[pathIndex].children) {
        current = current[pathIndex].children!;
      } else {
        return newBlocks; // Invalid path
      }
    }
    
    const finalIndex = insertPath[insertPath.length - 1];
    if (finalIndex < current.length) {
      current.splice(finalIndex, 0, newBlock);
    } else {
      current.push(newBlock);
    }
    
    return newBlocks;
  };

  const removeBlockAtPath = (blocks: CodeBlock[], removeIndex: number, removePath: number[]): CodeBlock[] => {
    if (removePath.length === 0) {
      return blocks.filter((_, i) => i !== removeIndex);
    }
    
    // Deep clone to avoid mutation
    const newBlocks = JSON.parse(JSON.stringify(blocks)) as CodeBlock[];
    
    // Navigate to the parent block
    let current = newBlocks;
    for (let i = 0; i < removePath.length - 1; i++) {
      const pathIndex = removePath[i];
      if (current[pathIndex] && current[pathIndex].children) {
        current = current[pathIndex].children!;
      } else {
        return newBlocks; // Invalid path
      }
    }
    
    // Remove the block from the children array
    const finalIndex = removePath[removePath.length - 1];
    if (current.length > finalIndex) {
      current.splice(finalIndex, 1);
    }
    
    return newBlocks;
  };

  const handleDrop = (e: React.DragEvent, dropIndex?: number, dropPath?: number[]) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedBlock) return;
    
    // Deep clone to avoid mutation
    let newCodeSequence = JSON.parse(JSON.stringify(codeSequence)) as CodeBlock[];
    const insertPath = dropPath || [];
    
    // If dragging from within editor, remove from original position first
    let adjustInsertIndex = 0;
    if (draggedFromIndex !== null && draggedFromPath !== null) {
      const removePath = draggedFromPath;
      const removeIndex = draggedFromIndex;
      
      // Don't allow dropping on itself
      if (JSON.stringify(dropPath || []) === JSON.stringify(removePath) && 
          dropIndex === removeIndex) {
        setDraggedBlock(null);
        setIsDragging(false);
        setDraggedFromIndex(null);
        setDraggedFromPath(null);
        setDragOverIndex(null);
        setDragOverPath(null);
        return;
      }
      
      // Check if we need to adjust the insert index
      if (removePath.length === 0 && dropPath && dropPath.length === 0 && removeIndex < (dropIndex ?? newCodeSequence.length)) {
        adjustInsertIndex = -1;
      }
      
      newCodeSequence = removeBlockAtPath(newCodeSequence, removeIndex, removePath);
    }
    
    const insertIndex = (dropIndex !== undefined ? dropIndex + adjustInsertIndex : newCodeSequence.length);
    
    // Special handling for repeat blocks - they should wrap blocks dropped into them
    if (draggedBlock.type === 'repeat') {
      const repeatBlock: CodeBlock = {
        ...draggedBlock,
        id: `${draggedBlock.id}-${Date.now()}`,
        children: [],
        params: { repeatCount: (draggedBlock.params?.repeatCount as number) || 3 }
      };
      newCodeSequence.splice(insertIndex, 0, repeatBlock);
    } else {
      // Check if dropping into a repeat block
      if (dropPath && dropPath.length > 0) {
        // Navigate to the repeat block
        let target = newCodeSequence;
        let validPath = true;
        for (let i = 0; i < dropPath.length - 1; i++) {
          const idx = dropPath[i];
          if (target[idx] && target[idx].children) {
            target = target[idx].children!;
          } else {
            validPath = false;
            break;
          }
        }
        
        if (validPath) {
          const targetIdx = dropPath[dropPath.length - 1];
          if (target[targetIdx] && target[targetIdx].type === 'repeat') {
            // Dropping into repeat block - add to children
            if (!target[targetIdx].children) {
              target[targetIdx].children = [];
            }
            target[targetIdx].children!.push({ 
              ...draggedBlock, 
              id: `${draggedBlock.id}-${Date.now()}` 
            });
          } else {
            // Not dropping into repeat, insert at position
            newCodeSequence = insertBlockAtPath(newCodeSequence, draggedBlock, insertIndex, insertPath);
          }
        } else {
          // Invalid path, insert at top level
          newCodeSequence = insertBlockAtPath(newCodeSequence, draggedBlock, insertIndex, []);
        }
      } else {
        // Dropping at top level
        newCodeSequence = insertBlockAtPath(newCodeSequence, draggedBlock, insertIndex, insertPath);
      }
    }
    
    setCodeSequence(newCodeSequence);
    onCodeChange(newCodeSequence);
    setDraggedBlock(null);
    setIsDragging(false);
    setDraggedFromIndex(null);
    setDraggedFromPath(null);
    setDragOverIndex(null);
    setDragOverPath(null);
  };

  const removeBlock = (index: number, path: number[] = []) => {
    const newCodeSequence = removeBlockAtPath(codeSequence, index, path);
    setCodeSequence(newCodeSequence);
    onCodeChange(newCodeSequence);
  };

  const clearCode = () => {
    setCodeSequence([]);
    onCodeChange([]);
  };

  // Recursive component to render blocks with nesting
  const renderBlock = (block: CodeBlock, index: number, path: number[] = [], isInRepeat = false) => {
    const isRepeat = block.type === 'repeat' || block.type === 'repeat_until';
    const isDragged = draggedFromIndex === index && JSON.stringify(draggedFromPath) === JSON.stringify(path);
    const isDragOver = dragOverIndex === index && JSON.stringify(dragOverPath) === JSON.stringify(path);
    
    if (isRepeat) {
      return (
        <div
          key={`${block.id}-${index}`}
          className="relative"
        >
          <div className={`${block.color} text-white rounded-lg border-2 relative overflow-hidden ${
            (isDragOver || (dragOverPath && JSON.stringify([...path, index]) === JSON.stringify(dragOverPath))) 
              ? 'border-yellow-400' : 'border-purple-600'
          } ${isDragged ? 'opacity-50' : ''}`}>
            {/* Repeat block header */}
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, block, index, path)}
              onDragEnd={handleDragEnd}
              className="p-3 flex items-center space-x-2 font-bold text-sm cursor-grab active:cursor-grabbing"
            >
              {/* Top puzzle tab for repeat */}
              <div className="absolute -top-1 left-6 w-6 h-2 bg-white/20 rounded-t-md" />
              <span className="text-lg">{block.icon}</span>
              <span>{block.label}</span>
              {block.type === 'repeat' && (
                <div className="flex items-center space-x-1 ml-2">
                  <span className="text-xs opacity-80">x</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={getRepeatCount(block)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(20, parseInt((e.target as HTMLInputElement).value || '1')));
                      const newBlocks = JSON.parse(JSON.stringify(codeSequence)) as CodeBlock[];
                      let target = newBlocks as CodeBlock[];
                      for (let i = 0; i < path.length; i++) {
                        target = target[path[i]].children || [];
                      }
                      if (!target[index].params) target[index].params = {} as any;
                      target[index].params!.repeatCount = val;
                      setCodeSequence(newBlocks);
                      onCodeChange(newBlocks);
                    }}
                    className="w-12 h-6 text-xs text-black rounded px-1"
                  />
                  <span className="text-xs opacity-80">times</span>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBlock(index, path);
                }}
                className="text-red-300 hover:text-red-100 ml-auto"
              >
                ×
              </button>
            </div>
            
            {/* Repeat block children container */}
            <div 
              className={`min-h-12 p-2 rounded-b-lg border-t-2 relative ${
                (dragOverPath && JSON.stringify([...path, index]) === JSON.stringify(dragOverPath))
                  ? 'bg-yellow-400/20 border-yellow-400' 
                  : 'bg-purple-600/20 border-purple-600/50'
              }`}
            >
              {/* Bottom puzzle notch for repeat */}
              <div className="absolute -bottom-1 left-6 w-6 h-2 bg-black/20 rounded-b-md" />
              {/* Insertion slot at the start of children */}
              {renderInsertionSlot([...path, index], 0)}
              {block.children && block.children.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {block.children.map((child, childIndex) => (
                    <div key={`wrap-${[...path, index].join('-')}-${child.id}-${childIndex}`}>
                      {renderBlock(child, childIndex, [...path, index], true)}
                      {renderInsertionSlot([...path, index], childIndex + 1)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-xs text-center py-2">
                  Drop blocks here
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={`${block.id}-${index}`}
          draggable
          onDragStart={(e) => handleDragStart(e, block, index, path)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDragOver(e, index, path);
          }}
          onDrop={(e) => handleDrop(e, index, path)}
          className={`${block.color} text-white p-3 rounded-lg flex items-center space-x-2 font-bold text-sm cursor-grab active:cursor-grabbing relative overflow-hidden ${
            isDragOver ? 'ring-2 ring-yellow-400' : ''
          } ${isDragged ? 'opacity-50' : ''} hover:opacity-90 transition-opacity`}
        >
          {/* Top puzzle tab */}
          <div className="absolute -top-1 left-6 w-6 h-2 bg-white/20 rounded-t-md" />
          <span className="text-lg">{block.icon}</span>
          <span>{block.label}</span>
          {/* Bottom puzzle notch */}
          <div className="absolute -bottom-1 left-6 w-6 h-2 bg-black/20 rounded-b-md" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(index, path);
            }}
            className="text-red-300 hover:text-red-100 ml-auto"
          >
            ×
          </button>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Code Blocks Palette */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-bold mb-4 text-lg">Code Blocks</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {codeBlocks.map((block) => (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, block)}
              onDragEnd={handleDragEnd}
              className={`${block.color} text-white p-3 rounded-lg cursor-grab active:cursor-grabbing text-center font-bold text-sm hover:opacity-80 transition-opacity`}
            >
              <div className="text-2xl mb-1">{block.icon}</div>
              <div className="text-xs">{block.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Sequence Area */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-white font-bold text-lg">Your Code</h4>
          <div className="space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="text-white border-2 border-white hover:bg-white hover:text-gray-800 bg-transparent"
              onClick={clearCode}
            >
              Clear
            </Button>
          </div>
        </div>
        
        <div
          ref={dropZoneRef}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e)}
          className={`min-h-32 border-2 border-dashed rounded-lg p-4 ${
            isDragging ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-600'
          }`}
        >
          {codeSequence.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              <Code className="h-12 w-12 mx-auto mb-2" />
              <p>Drag code blocks here to build your program!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {/* Top-level start slot */}
              {renderInsertionSlot([], 0)}
              {codeSequence.map((block, index) => (
                <div key={`top-wrap-${block.id}-${index}`}>
                  {renderBlock(block, index, [])}
                  {renderInsertionSlot([], index + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Robot Simulation */}
      <RobotSimulation levelId={levelId} codeBlocks={codeSequence} />
    </div>
  );
};

const initialLevels: Level[] = [
  {
    id: 1,
    title: "What is a Robot?",
    concept: "Robot Basics",
    description: "Learn what makes a robot (sensors, actuators, control system).",
    challenge: "Identify which machines are robots in a quiz.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: true
  },
  {
    id: 2,
    title: "Inputs & Outputs",
    concept: "Sensors & Actuators",
    description: "Understand how robots sense and act.",
    challenge: "Match sensors to motors or lights correctly.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 3,
    title: "Movement Basics",
    concept: "Robot Motion",
    description: "Learn how robots move.",
    challenge: "Program your robot to move in a square path.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 4,
    title: "Sensors",
    concept: "Environmental Sensing",
    description: "Explore distance and light sensors.",
    challenge: "Navigate a maze using a distance sensor.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 5,
    title: "Loops",
    concept: "Repetition in Code",
    description: "Introduce repetition in code.",
    challenge: "Make your robot patrol a looped route.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 6,
    title: "Conditionals",
    concept: "Logic & Decision Making",
    description: "Introduce logic ('if/else').",
    challenge: "Make robot stop when it detects an obstacle.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 7,
    title: "Combining Sensors",
    concept: "Multi-Sensor Integration",
    description: "Integrate multiple inputs.",
    challenge: "Use both light and sound sensors to complete a task.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 8,
    title: "Task Automation",
    concept: "Sequence Building",
    description: "Learn sequence building.",
    challenge: "Automate a simple factory task.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 9,
    title: "Optimization",
    concept: "Code Efficiency",
    description: "Learn to make code efficient.",
    challenge: "Reduce the number of commands to finish faster.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 10,
    title: "Final Mission",
    concept: "Complete Integration",
    description: "Combine all learned skills.",
    challenge: "Complete a robotics rescue mission using full logic.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  }
];

const RoboQuest = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    completedLevels: 0,
    totalXP: 0,
    achievements: [],
    robotCustomization: {
      color: 'blue',
      wheels: 'standard',
      sensors: [],
      accessories: []
    }
  });

  const [currentView, setCurrentView] = useState<'menu' | 'hub' | 'level' | 'certificate'>('menu');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [levels, setLevels] = useState<Level[]>(initialLevels);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('roboquest-save');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setGameState(parsed.gameState);
      setLevels(parsed.levels);
    }
  }, []);

  // Save game state to localStorage
  const saveGame = () => {
    const saveData = {
      gameState,
      levels,
      timestamp: Date.now()
    };
    localStorage.setItem('roboquest-save', JSON.stringify(saveData));
  };

  // Complete a level
  const completeLevel = (levelId: number, stars: number, xp: number) => {
    const updatedLevels = levels.map(level => {
      if (level.id === levelId) {
        return {
          ...level,
          completed: true,
          stars,
          xp,
          unlocked: true
        };
      } else if (level.id === levelId + 1) {
        return {
          ...level,
          unlocked: true
        };
      }
      return level;
    });

    setLevels(updatedLevels);
    setGameState(prev => ({
      ...prev,
      completedLevels: prev.completedLevels + 1,
      totalXP: prev.totalXP + xp,
      currentLevel: Math.min(levelId + 1, 10)
    }));

    // Check for certification
    if (levelId === 10) {
      setCurrentView('certificate');
    } else {
      setCurrentView('hub');
    }

    saveGame();
  };

  // Start a level
  const startLevel = (level: Level) => {
    setSelectedLevel(level);
    setCurrentView('level');
  };

  // Main Menu Component
  const MainMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Bot className="h-16 w-16 text-yellow-400" />
            <h1 className="text-6xl font-bold text-white">RoboRun</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Learn Robotics Through Play! Complete 10 exciting levels and earn your 
            Junior Robotics Runner certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button 
            size="lg" 
            className="h-20 text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-2 border-yellow-400"
            onClick={() => setCurrentView('hub')}
          >
            <Play className="mr-2 h-6 w-6" />
            Play Game
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-20 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
            onClick={() => {/* Progress tracker */}}
          >
            <Trophy className="mr-2 h-6 w-6" />
            Progress Tracker
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-20 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
            onClick={() => {/* Achievements */}}
          >
            <Award className="mr-2 h-6 w-6" />
            Achievements
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-20 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
            onClick={() => {/* Settings */}}
          >
            <Settings className="mr-2 h-6 w-6" />
            Settings
          </Button>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Your Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-white">
              <span>Levels Completed</span>
              <span className="font-bold">{gameState.completedLevels}/10</span>
            </div>
            <Progress value={(gameState.completedLevels / 10) * 100} className="h-3" />
            <div className="flex justify-between text-white">
              <span>Total XP</span>
              <span className="font-bold">{gameState.totalXP}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Level Hub Component
  const LevelHub = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">RoboRun Levels</h1>
          <p className="text-xl text-blue-200 mb-6">Choose your next robotics adventure!</p>
          <div className="max-w-2xl mx-auto text-left bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between text-white text-sm mb-2">
              <span>Progress</span>
              <span className="font-bold">{gameState.completedLevels}/10 levels</span>
            </div>
            <Progress value={(gameState.completedLevels / 10) * 100} className="h-3" />
            <div className="text-blue-200 text-sm mt-2 text-center">
              {gameState.completedLevels >= 5 ? "You're halfway to your robotics certificate!" : "Keep going! Your certificate is getting closer."}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 mb-12">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className={`p-4 text-center cursor-pointer transition-all duration-300 ${
                level.unlocked 
                  ? 'bg-white hover:bg-yellow-50 hover:scale-105' 
                  : 'bg-gray-600 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => level.unlocked && startLevel(level)}
            >
              <CardContent className="p-0">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-900">
                    {level.id}
                  </div>
                  {level.completed ? (
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  ) : level.unlocked ? (
                    <Play className="h-8 w-8 text-blue-500 mx-auto" />
                  ) : (
                    <Lock className="h-8 w-8 text-gray-400 mx-auto" />
                  )}
                  <div className="text-xs font-medium text-gray-700">
                    {level.title}
                  </div>
                  {level.stars > 0 && (
                    <div className="flex justify-center space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < level.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="text-white border-2 border-white hover:bg-white hover:text-blue-900 bg-transparent"
            onClick={() => setCurrentView('menu')}
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );

  // Quiz Component for Level 1
  const QuizComponent = ({ levelId, onComplete }: { levelId: number, onComplete: (stars: number, xp: number) => void }) => {
    const challenge = challenges[levelId];
    const quizData = challenge?.quizData;
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');

    if (!quizData) return null;

    const handleToggle = (id: string) => {
      if (isSubmitted) return;
      const newSet = new Set(selectedItems);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setSelectedItems(newSet);
    };

    const handleSubmit = () => {
      const correctItems = quizData.items.filter(item => item.isRobot).map(item => item.id);
      const selectedCorrect = Array.from(selectedItems).filter(id => correctItems.includes(id));
      const correctCount = selectedCorrect.length;
      const totalCorrect = quizData.correctCount;

      setIsSubmitted(true);
      if (correctCount === totalCorrect && selectedItems.size === totalCorrect) {
        setFeedback('Perfect! You identified all the robots correctly! 🎉');
        onComplete(3, 100);
      } else if (correctCount === totalCorrect) {
        setFeedback('Good job! You got all robots, but you also selected some non-robots. Try again!');
        setTimeout(() => {
          setIsSubmitted(false);
          setSelectedItems(new Set());
          setFeedback('');
        }, 2000);
      } else {
        setFeedback(`You found ${correctCount} out of ${totalCorrect} robots. Keep trying!`);
        setTimeout(() => {
          setIsSubmitted(false);
          setSelectedItems(new Set());
          setFeedback('');
        }, 2000);
      }
    };

    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Quiz: Identify Robots</h3>
          <p className="text-blue-200 mb-6">{challenge?.instructions}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quizData.items.map((item) => {
              const isSelected = selectedItems.has(item.id);
              const isCorrect = item.isRobot;
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  disabled={isSubmitted}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? isCorrect
                        ? 'bg-green-500/30 border-green-400'
                        : 'bg-red-500/30 border-red-400'
                      : 'bg-white/10 border-white/20 hover:border-white/40'
                  } ${isSubmitted && isCorrect ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  <div className="text-4xl mb-2">🤖</div>
                  <div className="text-white font-semibold text-sm">{item.name}</div>
                </button>
              );
            })}
          </div>

          <div className="text-center space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={selectedItems.size === 0 || isSubmitted}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              {isSubmitted ? 'Checking...' : 'Submit Answer'}
            </Button>
            {feedback && (
              <div className={`text-lg font-semibold ${feedback.includes('Perfect') ? 'text-green-400' : 'text-yellow-400'}`}>
                {feedback}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Matching Component for Level 2
  const MatchingComponent = ({ levelId, onComplete }: { levelId: number, onComplete: (stars: number, xp: number) => void }) => {
    const challenge = challenges[levelId];
    const matchingData = challenge?.matchingData;
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [draggedSensor, setDraggedSensor] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');

    if (!matchingData) return null;

    const handleDragStart = (sensorId: string) => {
      setDraggedSensor(sensorId);
    };

    const handleDrop = (outputId: string) => {
      if (draggedSensor) {
        setMatches(prev => ({ ...prev, [draggedSensor]: outputId }));
        setDraggedSensor(null);
      }
    };

    const handleSubmit = () => {
      const correctPairs = matchingData.correctPairs;
      let correctCount = 0;
      
      correctPairs.forEach(pair => {
        if (matches[pair.sensor] === pair.output) {
          correctCount++;
        }
      });

      setIsSubmitted(true);
      if (correctCount === correctPairs.length) {
        setFeedback('Perfect! All matches are correct! 🎉');
        onComplete(3, 100);
      } else {
        setFeedback(`You got ${correctCount} out of ${correctPairs.length} matches. Try again!`);
        setTimeout(() => {
          setIsSubmitted(false);
          setMatches({});
          setFeedback('');
        }, 2000);
      }
    };

    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Match Sensors to Outputs</h3>
          <p className="text-blue-200 mb-6">{challenge?.instructions}</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Sensors (INPUTS)</h4>
              <div className="space-y-3">
                {matchingData.sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    draggable
                    onDragStart={() => handleDragStart(sensor.id)}
                    className="p-4 bg-blue-600/30 border-2 border-blue-400 rounded-lg cursor-grab active:cursor-grabbing"
                  >
                    <div className="text-3xl mb-2">{sensor.icon}</div>
                    <div className="text-white font-semibold">{sensor.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">Outputs (ACTUATORS)</h4>
              <div className="space-y-3">
                {matchingData.outputs.map((output) => {
                  const matchedSensor = Object.entries(matches).find(([, outId]) => outId === output.id)?.[0];
                  const sensor = matchedSensor ? matchingData.sensors.find(s => s.id === matchedSensor) : null;
                  return (
                    <div
                      key={output.id}
                      onDragOver={(e) => { e.preventDefault(); }}
                      onDrop={() => handleDrop(output.id)}
                      className={`p-4 border-2 rounded-lg min-h-20 ${
                        sensor
                          ? 'bg-green-600/30 border-green-400'
                          : 'bg-purple-600/30 border-purple-400'
                      }`}
                    >
                      {sensor ? (
                        <div>
                          <div className="text-3xl mb-2">{sensor.icon} → {output.icon}</div>
                          <div className="text-white font-semibold">{sensor.name} → {output.name}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl mb-2">{output.icon}</div>
                          <div className="text-white font-semibold">{output.name}</div>
                          <div className="text-xs text-gray-300 mt-2">Drop a sensor here</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(matches).length < matchingData.sensors.length || isSubmitted}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              {isSubmitted ? 'Checking...' : 'Check Matches'}
            </Button>
            {feedback && (
              <div className={`text-lg font-semibold ${feedback.includes('Perfect') ? 'text-green-400' : 'text-yellow-400'}`}>
                {feedback}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Level Component
  const LevelView = () => {
    // Track mission code and grading result for the current level
    const [missionCode, setMissionCode] = useState<CodeBlock[]>([]);
    const [missionFeedback, setMissionFeedback] = useState<string>('');
    const [isGrading, setIsGrading] = useState(false);

    if (!selectedLevel) return null;

    // Helpers to evaluate mission completion against PRD targets
    const getRepeatCountFromBlock = (block: CodeBlock): number => {
      if (block.params && typeof block.params.repeatCount === 'number') {
        return Math.max(1, Math.floor(block.params.repeatCount));
      }
      // Back-compat if id encoded the count
      const parts = block.id.split('-');
      const maybeNum = parseInt(parts[1]);
      return Number.isFinite(maybeNum) ? Math.max(1, maybeNum) : 1;
    };

    const flattenForEvaluation = (blocks: CodeBlock[]): string[] => {
      const result: string[] = [];
      for (const block of blocks) {
        if (block.type === 'repeat' && block.children && block.children.length > 0) {
          // For repeat blocks, we check if it matches the pattern: ["repeat", "child1", "child2"]
          // First add 'repeat' marker, then the children as a group
          result.push('repeat');
          const childrenSequence = block.children.map(b => b.id.split('-').slice(0, 2).join('-'));
          result.push(...childrenSequence);
        } else {
          // Normalize id to base command (e.g., move-forward) for comparison
          const base = block.id.split('-').slice(0, 2).join('-');
          result.push(base);
        }
      }
      return result;
    };

    const evaluateMission = (levelId: number, code: CodeBlock[]) => {
      const challenge = challenges[levelId];
      const target: string[] = challenge?.target || [];
      const executed = flattenForEvaluation(code);

      // Check if target sequence appears in executed (in order, but can have extra steps)
      if (executed.length < target.length) {
        return {
          success: false,
          stars: 0,
          xp: 0,
          feedback: `Add more steps. You need at least ${target.length} step(s).`
        };
      }

      // Check if target sequence appears in order within executed
      let targetIndex = 0;
      for (let i = 0; i < executed.length && targetIndex < target.length; i++) {
        if (executed[i] === target[targetIndex]) {
          targetIndex++;
        }
      }

      const success = targetIndex === target.length;

      if (!success) {
        return {
          success: false,
          stars: 0,
          xp: 0,
          feedback: 'Try again: make sure your code includes all required steps in the correct order.'
        };
      }

      // Calculate efficiency: check how close to target length
      const extra = Math.max(0, executed.length - target.length);
      let stars = 3;
      if (extra > 0 && extra <= 2) stars = 2; 
      else if (extra > 2) stars = 1;
      
      const xpBase = 100;
      const xpPenalty = Math.min(50, extra * 5);
      const xp = Math.max(50, xpBase - xpPenalty);

      const feedback = stars === 3
        ? 'Perfect! Exact solution achieved. 🎉'
        : stars === 2
          ? 'Nice! You solved it with a few extra steps.'
          : 'Good job! Can you make it more efficient?';

      return { success: true, stars, xp, feedback };
    };

    const challenge = challenges[selectedLevel.id];
    const goalTokens = (challenge?.target || []) as string[];
    const formatToken = (token: string) => {
      const base = token.split('-').slice(0, 2).join('-');
      switch (base) {
        case 'move-forward': return 'Move Forward';
        case 'move-backward': return 'Move Backward';
        case 'turn-right': return 'Turn Right';
        case 'turn-left': return 'Turn Left';
        case 'repeat': return 'Repeat (wrap steps)';
        case 'play-sound': return 'Play Sound';
        case 'turn-light-on': return 'Turn Light On';
        case 'turn-light-off': return 'Turn Light Off';
        case 'wait-1': return 'Wait 1s';
        case 'wait-2': return 'Wait 2s';
        default: return base;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="text-white border-2 border-white hover:bg-white hover:text-blue-900 mb-4 bg-transparent"
              onClick={() => setCurrentView('hub')}
            >
              ← Back to Hub
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">{selectedLevel.title}</h1>
            <p className="text-xl text-blue-200">{selectedLevel.description}</p>
          </div>

          <Tabs defaultValue="tutorial" className="space-y-6">
            <TabsList className={`grid w-full bg-white/10 ${challenge?.type === 'robot' ? 'grid-cols-4' : 'grid-cols-3'}`}>
              <TabsTrigger value="tutorial" className="text-white">Tutorial</TabsTrigger>
              {challenge?.type === 'robot' && (
                <TabsTrigger value="practice" className="text-white">Practice</TabsTrigger>
              )}
              <TabsTrigger value="mission" className="text-white">Mission</TabsTrigger>
              <TabsTrigger value="summary" className="text-white">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="tutorial" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Learning: {selectedLevel.concept}</h3>
                  <div className="text-blue-200 space-y-4">
                    <p className="text-lg">{selectedLevel.description}</p>
                    <div className="bg-blue-800/50 rounded-lg p-6">
                      <h4 className="font-bold text-white text-xl mb-3">Instructions</h4>
                      <p className="mb-4 text-blue-100">{challenge?.instructions}</p>
                      {challenge?.type === 'robot' && goalTokens.length > 0 && (
                        <div className="text-blue-100 mt-4">
                          <div className="font-semibold mb-2">Level Goal (Steps to Complete)</div>
                          <div className="flex flex-wrap gap-2">
                            {goalTokens.map((t, i) => (
                              <span key={i} className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-200 border border-yellow-400/40 text-sm font-medium">
                                {formatToken(t)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {challenge?.type === 'robot' && (
              <>
                <TabsContent value="practice" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Practice Mode</h3>
                      <p className="text-blue-200 mb-6">Drag and drop code blocks to build your robot program!</p>
                      <CodingInterface 
                        levelId={selectedLevel.id} 
                        onCodeChange={(code) => console.log('Code changed:', code)} 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="mission" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Mission Challenge</h3>
                      <div className="bg-blue-800/50 rounded-lg p-6 mb-6">
                        <h4 className="font-bold text-white text-xl mb-2">Challenge Goal</h4>
                        <p className="text-blue-200 mb-4">{challenge?.instructions}</p>
                        {goalTokens.length > 0 && (
                          <div className="text-blue-100">
                            <div className="font-semibold mb-2">Required Sequence (Must Match Exactly)</div>
                            <div className="flex flex-wrap gap-2">
                              {goalTokens.map((t, i) => (
                                <span key={i} className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-200 border border-yellow-400/40 text-sm font-medium">
                                  {formatToken(t)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <CodingInterface 
                        levelId={selectedLevel.id} 
                        onCodeChange={(code) => setMissionCode(code)} 
                      />
                      <div className="mt-6 text-center">
                        <div className="space-y-3">
                          <Button 
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                            disabled={isGrading || missionCode.length === 0}
                            onClick={() => {
                              setIsGrading(true);
                              const result = evaluateMission(selectedLevel.id, missionCode);
                              setMissionFeedback(result.feedback);
                              setIsGrading(false);
                              if (result.success) {
                                completeLevel(selectedLevel.id, result.stars, result.xp);
                              }
                            }}
                          >
                            {isGrading ? 'Grading...' : 'Run & Grade Mission'}
                          </Button>
                          {missionCode.length === 0 && (
                            <div className="text-blue-300 text-sm">Add blocks first, then grade.</div>
                          )}
                          {missionFeedback && (
                            <div className={`text-lg font-semibold ${
                              missionFeedback.includes('Perfect') ? 'text-green-400' : 
                              missionFeedback.includes('Try again') ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                              {missionFeedback}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}

            {challenge?.type === 'quiz' && (
              <TabsContent value="mission" className="space-y-6">
                <QuizComponent 
                  levelId={selectedLevel.id}
                  onComplete={(stars, xp) => completeLevel(selectedLevel.id, stars, xp)}
                />
              </TabsContent>
            )}

            {challenge?.type === 'matching' && (
              <TabsContent value="mission" className="space-y-6">
                <MatchingComponent 
                  levelId={selectedLevel.id}
                  onComplete={(stars, xp) => completeLevel(selectedLevel.id, stars, xp)}
                />
              </TabsContent>
            )}

            <TabsContent value="summary" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Level Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-white">
                      <span>Concept Learned:</span>
                      <span className="font-bold">{selectedLevel.concept}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Challenge Completed:</span>
                      <span className="font-bold">{selectedLevel.challenge}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Stars Earned:</span>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < (selectedLevel.stars || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };

  // Certificate Component
  const CertificateView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
            <h1 className="text-6xl font-bold text-white">Congratulations!</h1>
            <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-2xl text-blue-200">
            You've completed all 10 levels and earned your
          </p>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-2xl inline-block">
            <h2 className="text-3xl font-bold">Junior Robotics Runner Certificate</h2>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
          <CardContent className="space-y-6">
            <div className="text-center text-white">
              <Trophy className="h-20 w-20 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Certificate Details</h3>
              <div className="space-y-2 text-lg">
                <p><strong>Name:</strong> RoboRun Explorer</p>
                <p><strong>Completion Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Verification ID:</strong> RR-{Date.now().toString().slice(-8)}</p>
                <p><strong>Total XP Earned:</strong> {gameState.totalXP}</p>
                <p><strong>Levels Completed:</strong> {gameState.completedLevels}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={() => {/* Download certificate */}}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Certificate
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-blue-900"
            onClick={() => {/* Share on social media */}}
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Achievement
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-blue-900"
            onClick={() => setCurrentView('menu')}
          >
            Return to Menu
          </Button>
        </div>
      </div>
    </div>
  );

  // Render current view
  switch (currentView) {
    case 'menu':
      return <MainMenu />;
    case 'hub':
      return <LevelHub />;
    case 'level':
      return <LevelView />;
    case 'certificate':
      return <CertificateView />;
    default:
      return <MainMenu />;
  }
};

export default RoboQuest;
