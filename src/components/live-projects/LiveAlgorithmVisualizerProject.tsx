import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Settings, 
  BarChart3, 
  Clock,
  Zap,
  Target,
  Shuffle,
  FastForward,
  SkipBack,
  SkipForward,
  Activity,
  TrendingUp,
  Brain,
  Cpu,
  Timer,
  Award,
  Eye,
  Info,
  BookOpen,
  Code,
  PieChart,
  LineChart,
  Hash,
  Grid3X3,
  Route,
  Layers,
  Binary,
  Search,
  Filter,
  Download,
  Upload,
  Share2,
  Save,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock
} from "lucide-react";

interface ArrayElement {
  value: number;
  id: string;
  comparing?: boolean;
  swapping?: boolean;
  sorted?: boolean;
  pivot?: boolean;
  left?: boolean;
  right?: boolean;
  minimum?: boolean;
  accessing?: boolean;
}

interface AlgorithmStep {
  array: ArrayElement[];
  comparisons: number;
  swaps: number;
  accesses: number;
  description: string;
  highlightedIndices: number[];
  currentIndices: number[];
  pivotIndex?: number;
}

interface PathNode {
  x: number;
  y: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
  isVisited: boolean;
  isCurrentlyExploring: boolean;
  gCost: number;
  hCost: number;
  fCost: number;
  parent?: PathNode;
  id: string;
}

interface AlgorithmStats {
  timeComplexity: string;
  spaceComplexity: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
  stable: boolean;
  inPlace: boolean;
  adaptive: boolean;
}

const SORTING_ALGORITHMS = {
  bubbleSort: {
    name: "Bubble Sort",
    stats: {
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      stable: true,
      inPlace: true,
      adaptive: true
    }
  },
  selectionSort: {
    name: "Selection Sort",
    stats: {
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n²)",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      stable: false,
      inPlace: true,
      adaptive: false
    }
  },
  insertionSort: {
    name: "Insertion Sort",
    stats: {
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      averageCase: "O(n²)",
      worstCase: "O(n²)",
      stable: true,
      inPlace: true,
      adaptive: true
    }
  },
  quickSort: {
    name: "Quick Sort",
    stats: {
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n²)",
      stable: false,
      inPlace: true,
      adaptive: false
    }
  },
  mergeSort: {
    name: "Merge Sort",
    stats: {
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      stable: true,
      inPlace: false,
      adaptive: false
    }
  },
  heapSort: {
    name: "Heap Sort",
    stats: {
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      stable: false,
      inPlace: true,
      adaptive: false
    }
  }
};

export function LiveAlgorithmVisualizerProject() {
  const [activeTab, setActiveTab] = useState("sorting");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [arraySize, setArraySize] = useState([20]);
  const [speed, setSpeed] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    accesses: 0,
    timeElapsed: 0,
    operationsPerSecond: 0
  });
  const [showComplexity, setShowComplexity] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  // Pathfinding specific states
  const [grid, setGrid] = useState<PathNode[][]>([]);
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState("dijkstra");
  const [isDrawingWalls, setIsDrawingWalls] = useState(false);
  const [startNode, setStartNode] = useState<{x: number, y: number}>({x: 5, y: 5});
  const [endNode, setEndNode] = useState<{x: number, y: number}>({x: 15, y: 15});
  const [isPathfinding, setIsPathfinding] = useState(false);
  const [pathfindingStats, setPathfindingStats] = useState({
    nodesVisited: 0,
    pathLength: 0,
    timeElapsed: 0
  });

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize[0] }, (_, i) => ({
      value: Math.floor(Math.random() * 400) + 10,
      id: `element-${i}`,
      comparing: false,
      swapping: false,
      sorted: false
    }));
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setStats({
      comparisons: 0,
      swaps: 0,
      accesses: 0,
      timeElapsed: 0,
      operationsPerSecond: 0
    });
  }, [arraySize]);

  // Generate array from custom input
  const generateCustomArray = () => {
    try {
      const values = customInput.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      if (values.length > 0) {
        const newArray = values.map((value, i) => ({
          value: Math.max(10, Math.min(400, value)),
          id: `element-${i}`,
          comparing: false,
          swapping: false,
          sorted: false
        }));
        setArray(newArray);
        setArraySize([newArray.length]);
        setSteps([]);
        setCurrentStep(0);
      }
    } catch (error) {
      console.error("Invalid input");
    }
  };

  // Initialize grid for pathfinding
  const initializeGrid = useCallback(() => {
    const rows = 20;
    const cols = 30;
    const newGrid: PathNode[][] = [];
    
    for (let row = 0; row < rows; row++) {
      const currentRow: PathNode[] = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push({
          x: col,
          y: row,
          isWall: Math.random() < 0.3,
          isStart: col === startNode.x && row === startNode.y,
          isEnd: col === endNode.x && row === endNode.y,
          isPath: false,
          isVisited: false,
          isCurrentlyExploring: false,
          gCost: 0,
          hCost: 0,
          fCost: 0,
          id: `node-${row}-${col}`
        });
      }
      newGrid.push(currentRow);
    }
    
    // Ensure start and end nodes are not walls
    newGrid[startNode.y][startNode.x].isWall = false;
    newGrid[endNode.y][endNode.x].isWall = false;
    
    setGrid(newGrid);
  }, [startNode, endNode]);

  // Bubble Sort Implementation
  const bubbleSort = (arr: ArrayElement[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const workingArray = [...arr];
    let comparisons = 0, swaps = 0, accesses = 0;
    
    for (let i = 0; i < workingArray.length - 1; i++) {
      for (let j = 0; j < workingArray.length - i - 1; j++) {
        comparisons++;
        accesses += 2;
        
        // Mark elements being compared
        const stepArray = workingArray.map((el, idx) => ({
          ...el,
          comparing: idx === j || idx === j + 1,
          sorted: idx >= workingArray.length - i
        }));
        
        steps.push({
          array: stepArray,
          comparisons,
          swaps,
          accesses,
          description: `Comparing elements at positions ${j} and ${j + 1}`,
          highlightedIndices: [j, j + 1],
          currentIndices: [j, j + 1]
        });
        
        if (workingArray[j].value > workingArray[j + 1].value) {
          // Swap elements
          [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
          swaps++;
          
          const swapArray = workingArray.map((el, idx) => ({
            ...el,
            swapping: idx === j || idx === j + 1,
            sorted: idx >= workingArray.length - i
          }));
          
          steps.push({
            array: swapArray,
            comparisons,
            swaps,
            accesses,
            description: `Swapped elements at positions ${j} and ${j + 1}`,
            highlightedIndices: [j, j + 1],
            currentIndices: [j, j + 1]
          });
        }
      }
      
      // Mark the last element as sorted
      const sortedArray = workingArray.map((el, idx) => ({
        ...el,
        sorted: idx >= workingArray.length - i - 1
      }));
      
      steps.push({
        array: sortedArray,
        comparisons,
        swaps,
        accesses,
        description: `Element at position ${workingArray.length - i - 1} is now in its correct position`,
        highlightedIndices: [workingArray.length - i - 1],
        currentIndices: []
      });
    }
    
    // Final step - all elements sorted
    const finalArray = workingArray.map(el => ({ ...el, sorted: true }));
    steps.push({
      array: finalArray,
      comparisons,
      swaps,
      accesses,
      description: "Array is completely sorted!",
      highlightedIndices: [],
      currentIndices: []
    });
    
    return steps;
  };

  // Quick Sort Implementation
  const quickSort = (arr: ArrayElement[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const workingArray = [...arr];
    let comparisons = 0, swaps = 0, accesses = 0;
    
    const partition = (low: number, high: number): number => {
      const pivot = workingArray[high];
      let i = low - 1;
      
      // Mark pivot
      steps.push({
        array: workingArray.map((el, idx) => ({
          ...el,
          pivot: idx === high,
          left: idx >= low && idx < high,
          right: false
        })),
        comparisons,
        swaps,
        accesses,
        description: `Pivot selected: ${pivot.value} at position ${high}`,
        highlightedIndices: [high],
        currentIndices: [],
        pivotIndex: high
      });
      
      for (let j = low; j < high; j++) {
        comparisons++;
        accesses += 2;
        
        if (workingArray[j].value < pivot.value) {
          i++;
          [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
          swaps++;
          
          steps.push({
            array: workingArray.map((el, idx) => ({
              ...el,
              swapping: idx === i || idx === j,
              pivot: idx === high
            })),
            comparisons,
            swaps,
            accesses,
            description: `Swapped elements at positions ${i} and ${j}`,
            highlightedIndices: [i, j],
            currentIndices: [i, j],
            pivotIndex: high
          });
        }
      }
      
      [workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]];
      swaps++;
      
      steps.push({
        array: workingArray.map((el, idx) => ({
          ...el,
          swapping: idx === i + 1 || idx === high,
          sorted: idx === i + 1
        })),
        comparisons,
        swaps,
        accesses,
        description: `Placed pivot in correct position: ${i + 1}`,
        highlightedIndices: [i + 1],
        currentIndices: [],
        pivotIndex: i + 1
      });
      
      return i + 1;
    };
    
    const quickSortRecursive = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    };
    
    quickSortRecursive(0, workingArray.length - 1);
    
    // Final step
    const finalArray = workingArray.map(el => ({ ...el, sorted: true }));
    steps.push({
      array: finalArray,
      comparisons,
      swaps,
      accesses,
      description: "Quick Sort completed!",
      highlightedIndices: [],
      currentIndices: []
    });
    
    return steps;
  };

  // Dijkstra's Algorithm for Pathfinding
  const dijkstra = async () => {
    const visitedNodesInOrder: PathNode[] = [];
    const unvisitedNodes = getAllNodes();
    const startNodeObj = grid[startNode.y][startNode.x];
    startNodeObj.gCost = 0;
    
    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift()!;
      
      if (closestNode.isWall) continue;
      if (closestNode.gCost === Infinity) break;
      
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      
      // Animate the exploration
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[closestNode.y][closestNode.x] = {
          ...closestNode,
          isCurrentlyExploring: true
        };
        return newGrid;
      });
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      if (closestNode.isEnd) {
        const shortestPath = getShortestPath(closestNode);
        animatePath(shortestPath);
        return;
      }
      
      updateUnvisitedNeighbors(closestNode, grid);
    }
  };

  const getAllNodes = (): PathNode[] => {
    const nodes: PathNode[] = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const sortNodesByDistance = (unvisitedNodes: PathNode[]) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.gCost - nodeB.gCost);
  };

  const updateUnvisitedNeighbors = (node: PathNode, grid: PathNode[][]) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.gCost = node.gCost + 1;
      neighbor.parent = node;
    }
  };

  const getUnvisitedNeighbors = (node: PathNode, grid: PathNode[][]): PathNode[] => {
    const neighbors: PathNode[] = [];
    const { x, y } = node;
    
    if (y > 0) neighbors.push(grid[y - 1][x]);
    if (y < grid.length - 1) neighbors.push(grid[y + 1][x]);
    if (x > 0) neighbors.push(grid[y][x - 1]);
    if (x < grid[0].length - 1) neighbors.push(grid[y][x + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
  };

  const getShortestPath = (finishNode: PathNode): PathNode[] => {
    const nodesInShortestPathOrder: PathNode[] = [];
    let currentNode: PathNode | undefined = finishNode;
    
    while (currentNode !== undefined) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.parent;
    }
    
    return nodesInShortestPathOrder;
  };

  const animatePath = async (shortestPath: PathNode[]) => {
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[node.y][node.x] = {
          ...node,
          isPath: true
        };
        return newGrid;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setPathfindingStats(prev => ({
      ...prev,
      pathLength: shortestPath.length,
      nodesVisited: getAllNodes().filter(node => node.isVisited).length
    }));
  };

  // Start sorting algorithm
  const startSorting = () => {
    if (array.length === 0) return;
    
    setIsPlaying(true);
    setIsPaused(false);
    setCurrentStep(0);
    startTimeRef.current = Date.now();
    
    let algorithmSteps: AlgorithmStep[] = [];
    
    switch (selectedAlgorithm) {
      case 'bubbleSort':
        algorithmSteps = bubbleSort(array);
        break;
      case 'quickSort':
        algorithmSteps = quickSort(array);
        break;
      default:
        algorithmSteps = bubbleSort(array);
    }
    
    setSteps(algorithmSteps);
    animateSteps(algorithmSteps);
  };

  // Animate sorting steps
  const animateSteps = (algorithmSteps: AlgorithmStep[]) => {
    let stepIndex = 0;
    const delay = 1000 - (speed[0] * 10);
    
    const animate = () => {
      if (stepIndex < algorithmSteps.length && isPlaying && !isPaused) {
        const step = algorithmSteps[stepIndex];
        setArray(step.array);
        setStats({
          comparisons: step.comparisons,
          swaps: step.swaps,
          accesses: step.accesses,
          timeElapsed: Date.now() - startTimeRef.current,
          operationsPerSecond: Math.round((step.comparisons + step.swaps) / ((Date.now() - startTimeRef.current) / 1000))
        });
        setCurrentStep(stepIndex);
        stepIndex++;
        
        animationRef.current = setTimeout(animate, delay);
      } else if (stepIndex >= algorithmSteps.length) {
        setIsPlaying(false);
      }
    };
    
    animate();
  };

  // Control functions
  const pauseSorting = () => {
    setIsPaused(true);
    clearTimeout(animationRef.current);
  };

  const resumeSorting = () => {
    setIsPaused(false);
    if (currentStep < steps.length) {
      animateSteps(steps.slice(currentStep));
    }
  };

  const stopSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    clearTimeout(animationRef.current);
    generateRandomArray();
  };

  const resetSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    clearTimeout(animationRef.current);
    generateRandomArray();
  };

  // Initialize on mount
  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  useEffect(() => {
    if (activeTab === "pathfinding") {
      initializeGrid();
    }
  }, [activeTab, initializeGrid]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(animationRef.current);
    };
  }, []);

  const currentAlgorithmStats = SORTING_ALGORITHMS[selectedAlgorithm as keyof typeof SORTING_ALGORITHMS]?.stats;

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 rounded-lg overflow-hidden border shadow-2xl">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AlgoViz Pro
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Interactive Algorithm Visualizer
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <Activity className="w-3 h-3 mr-1" />
                {isPlaying ? 'Running' : 'Ready'}
              </Badge>
              <Button size="sm" variant="outline" onClick={() => setShowComplexity(!showComplexity)}>
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 rounded-none h-12">
              <TabsTrigger 
                value="sorting" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <BarChart3 className="w-4 h-4" />
                Sorting Algorithms
              </TabsTrigger>
              <TabsTrigger 
                value="pathfinding" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Route className="w-4 h-4" />
                Pathfinding
              </TabsTrigger>
              <TabsTrigger 
                value="datastructures" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Layers className="w-4 h-4" />
                Data Structures
              </TabsTrigger>
              <TabsTrigger 
                value="complexity" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <TrendingUp className="w-4 h-4" />
                Complexity Analysis
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            
            {/* Sorting Algorithms Tab */}
            <TabsContent value="sorting" className="h-full mt-0 flex">
              
              {/* Controls Panel */}
              <div className="w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Algorithm Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Algorithm
                    </label>
                    <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SORTING_ALGORITHMS).map(([key, algo]) => (
                          <SelectItem key={key} value={key}>
                            {algo.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Array Size */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Array Size: {arraySize[0]}
                    </label>
                    <Slider
                      value={arraySize}
                      onValueChange={setArraySize}
                      max={100}
                      min={5}
                      step={1}
                      className="w-full"
                      disabled={isPlaying}
                    />
                  </div>

                  {/* Speed Control */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Speed: {speed[0]}%
                    </label>
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Custom Input */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Custom Array (comma-separated)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="e.g., 64,34,25,12,22"
                        disabled={isPlaying}
                      />
                      <Button size="sm" onClick={generateCustomArray} disabled={isPlaying}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={generateRandomArray}
                      disabled={isPlaying}
                      variant="outline"
                      size="sm"
                    >
                      <Shuffle className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                    <Button
                      onClick={resetSorting}
                      disabled={isPlaying}
                      variant="outline"
                      size="sm"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {!isPlaying && !isPaused && (
                      <Button onClick={startSorting} className="bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4 mr-2" />
                        Start Sorting
                      </Button>
                    )}
                    {isPlaying && !isPaused && (
                      <Button onClick={pauseSorting} className="bg-yellow-600 hover:bg-yellow-700">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    {isPaused && (
                      <Button onClick={resumeSorting} className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    )}
                    {(isPlaying || isPaused) && (
                      <Button onClick={stopSorting} variant="outline">
                        <Square className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    )}
                  </div>

                  {/* Algorithm Stats */}
                  {currentAlgorithmStats && (
                    <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Algorithm Properties
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Time Complexity:</span>
                          <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">
                            {currentAlgorithmStats.timeComplexity}
                          </code>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Space Complexity:</span>
                          <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">
                            {currentAlgorithmStats.spaceComplexity}
                          </code>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Stable:</span>
                          <Badge variant={currentAlgorithmStats.stable ? "default" : "secondary"}>
                            {currentAlgorithmStats.stable ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">In-Place:</span>
                          <Badge variant={currentAlgorithmStats.inPlace ? "default" : "secondary"}>
                            {currentAlgorithmStats.inPlace ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Live Statistics */}
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Live Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="font-semibold text-blue-600">{stats.comparisons}</div>
                        <div className="text-gray-600 dark:text-gray-400">Comparisons</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <div className="font-semibold text-green-600">{stats.swaps}</div>
                        <div className="text-gray-600 dark:text-gray-400">Swaps</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <div className="font-semibold text-purple-600">{stats.accesses}</div>
                        <div className="text-gray-600 dark:text-gray-400">Array Accesses</div>
                      </div>
                      <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                        <div className="font-semibold text-orange-600">{Math.round(stats.timeElapsed / 1000)}s</div>
                        <div className="text-gray-600 dark:text-gray-400">Time Elapsed</div>
                      </div>
                    </div>
                    {stats.operationsPerSecond > 0 && (
                      <div className="mt-3 text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="font-semibold text-gray-700 dark:text-gray-300">
                          {stats.operationsPerSecond} ops/sec
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Operations per second</div>
                      </div>
                    )}
                  </Card>

                  {/* Progress Bar */}
                  {steps.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {currentStep} / {steps.length}
                        </span>
                      </div>
                      <Progress value={(currentStep / steps.length) * 100} className="w-full" />
                      {steps[currentStep] && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          {steps[currentStep].description}
                        </p>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* Visualization Area */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="h-full flex flex-col justify-end bg-gradient-to-t from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-end justify-center gap-1 h-full">
                    {array.map((element, index) => {
                      let barColor = "bg-blue-500";
                      
                      if (element.sorted) barColor = "bg-green-500";
                      else if (element.comparing) barColor = "bg-yellow-500";
                      else if (element.swapping) barColor = "bg-red-500";
                      else if (element.pivot) barColor = "bg-purple-500";
                      else if (element.minimum) barColor = "bg-orange-500";
                      
                      return (
                        <div
                          key={element.id}
                          className={`${barColor} transition-all duration-300 rounded-t-sm relative flex items-end justify-center min-w-[3px] shadow-sm hover:shadow-md`}
                          style={{
                            height: `${element.value}px`,
                            width: `${Math.max(600 / array.length - 1, 3)}px`,
                            transform: element.swapping ? 'scale(1.1)' : 'scale(1)'
                          }}
                        >
                          {array.length <= 30 && (
                            <span className="text-xs font-mono text-white absolute -top-6 bg-black/70 px-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                              {element.value}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {array.length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No array to visualize</p>
                        <p className="text-sm">Generate an array to get started</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Pathfinding Tab */}
            <TabsContent value="pathfinding" className="h-full mt-0 flex">
              <div className="w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Pathfinding Algorithm
                    </label>
                    <Select value={pathfindingAlgorithm} onValueChange={setPathfindingAlgorithm}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
                        <SelectItem value="astar">A* Search</SelectItem>
                        <SelectItem value="bfs">Breadth-First Search</SelectItem>
                        <SelectItem value="dfs">Depth-First Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={initializeGrid}
                      disabled={isPathfinding}
                      variant="outline"
                      size="sm"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset Grid
                    </Button>
                    <Button
                      onClick={() => setIsDrawingWalls(!isDrawingWalls)}
                      variant={isDrawingWalls ? "default" : "outline"}
                      size="sm"
                    >
                      {isDrawingWalls ? <Unlock className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
                      {isDrawingWalls ? "Stop Drawing" : "Draw Walls"}
                    </Button>
                  </div>

                  <Button
                    onClick={dijkstra}
                    disabled={isPathfinding}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Find Path
                  </Button>

                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Pathfinding Stats
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Nodes Visited:</span>
                        <span className="font-semibold">{pathfindingStats.nodesVisited}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Path Length:</span>
                        <span className="font-semibold">{pathfindingStats.pathLength}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Legend</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                        <span>Start Node</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                        <span>End Node</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                        <span>Wall</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-300 rounded-sm"></div>
                        <span>Visited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                        <span>Shortest Path</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(30, 1fr)` }}>
                    {grid.map((row, rowIndex) =>
                      row.map((node, colIndex) => {
                        let nodeClass = "w-4 h-4 border border-gray-300 dark:border-gray-600";
                        
                        if (node.isStart) nodeClass += " bg-green-500";
                        else if (node.isEnd) nodeClass += " bg-red-500";
                        else if (node.isWall) nodeClass += " bg-gray-800";
                        else if (node.isPath) nodeClass += " bg-yellow-400";
                        else if (node.isCurrentlyExploring) nodeClass += " bg-blue-400 animate-pulse";
                        else if (node.isVisited) nodeClass += " bg-blue-200";
                        else nodeClass += " bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700";
                        
                        return (
                          <div
                            key={node.id}
                            className={`${nodeClass} cursor-pointer transition-colors duration-150`}
                            onClick={() => {
                              if (isDrawingWalls && !node.isStart && !node.isEnd) {
                                setGrid(prevGrid => {
                                  const newGrid = [...prevGrid];
                                  newGrid[rowIndex][colIndex] = {
                                    ...node,
                                    isWall: !node.isWall
                                  };
                                  return newGrid;
                                });
                              }
                            }}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Data Structures Tab */}
            <TabsContent value="datastructures" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <Layers className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Data Structures Visualization
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Interactive visualizations for stacks, queues, trees, graphs, and hash tables are coming soon!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Hash className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">Hash Tables</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visualize hash functions and collision resolution
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Binary className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="font-semibold mb-2">Binary Trees</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Interactive tree traversals and operations
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Grid3X3 className="w-8 h-8 text-purple-500 mb-3" />
                    <h3 className="font-semibold mb-2">Graphs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Graph algorithms and traversal methods
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Complexity Analysis Tab */}
            <TabsContent value="complexity" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <TrendingUp className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Complexity Analysis
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Interactive Big O notation calculator and algorithm performance comparisons are coming soon!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <LineChart className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">Performance Graphs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visual comparison of algorithm performance
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <PieChart className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="font-semibold mb-2">Complexity Calculator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Analyze time and space complexity
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}