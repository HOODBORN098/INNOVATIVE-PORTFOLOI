import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Play, Pause, RotateCcw, Settings, Zap } from "lucide-react";

export function AlgorithmVisualizerDemo() {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize random array
  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const bubbleSortStep = (arr: number[], step: number) => {
    const n = arr.length;
    const totalSteps = n * (n - 1) / 2;
    
    if (step >= totalSteps) {
      setSorted(Array.from({ length: n }, (_, i) => i));
      setIsPlaying(false);
      return arr;
    }

    let currentStep = 0;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (currentStep === step) {
          setComparing([j, j + 1]);
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
          return [...arr];
        }
        currentStep++;
      }
    }
    return arr;
  };

  const quickSortStep = (arr: number[], step: number) => {
    // Simplified quicksort visualization
    if (step < arr.length) {
      setComparing([step, (step + 1) % arr.length]);
      if (step % 3 === 0 && step > 0) {
        // Simulate some swaps for demo
        const i = Math.floor(Math.random() * arr.length);
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    } else {
      setSorted(Array.from({ length: arr.length }, (_, i) => i));
      setIsPlaying(false);
    }
    return [...arr];
  };

  const mergeSortStep = (arr: number[], step: number) => {
    // Simplified merge sort visualization
    const segmentSize = Math.pow(2, Math.floor(step / arr.length) + 1);
    const currentIndex = step % arr.length;
    
    if (segmentSize >= arr.length) {
      setSorted(Array.from({ length: arr.length }, (_, i) => i));
      setIsPlaying(false);
      return arr;
    }

    setComparing([currentIndex, Math.min(currentIndex + segmentSize - 1, arr.length - 1)]);
    
    // Simulate merge operation
    if (step % 4 === 0) {
      const i = Math.floor(Math.random() * arr.length);
      const j = Math.min(i + 1, arr.length - 1);
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    return [...arr];
  };

  const stepAlgorithm = () => {
    let newArray = [...array];
    
    switch (algorithm) {
      case "bubble":
        newArray = bubbleSortStep(newArray, currentStep);
        break;
      case "quick":
        newArray = quickSortStep(newArray, currentStep);
        break;
      case "merge":
        newArray = mergeSortStep(newArray, currentStep);
        break;
    }
    
    setArray(newArray);
    setCurrentStep(prev => prev + 1);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        stepAlgorithm();
      }, 110 - speed[0]);
    }
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    generateRandomArray();
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "bg-green-500";
    if (comparing.includes(index)) return "bg-red-500";
    return "bg-blue-500";
  };

  const getAlgorithmInfo = (algo: string) => {
    switch (algo) {
      case "bubble":
        return { name: "Bubble Sort", complexity: "O(n²)", description: "Compares adjacent elements and swaps them if they're in wrong order" };
      case "quick":
        return { name: "Quick Sort", complexity: "O(n log n)", description: "Divides array into partitions and sorts them recursively" };
      case "merge":
        return { name: "Merge Sort", complexity: "O(n log n)", description: "Divides array into halves and merges them back in sorted order" };
      default:
        return { name: "", complexity: "", description: "" };
    }
  };

  const algorithmInfo = getAlgorithmInfo(algorithm);

  return (
    <div className="w-full h-[600px] bg-gray-900 text-white rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Algorithm Visualizer</h1>
              <p className="text-sm text-gray-300">Interactive Sorting Algorithms</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="quick">Quick Sort</SelectItem>
                <SelectItem value="merge">Merge Sort</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              onClick={togglePlayPause}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={reset}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button 
              onClick={stepAlgorithm}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={isPlaying}
            >
              Step
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Speed:</span>
              <div className="w-24">
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            <Button 
              onClick={generateRandomArray}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              New Array
            </Button>
          </div>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-400">{algorithmInfo.name}</h3>
            <p className="text-sm text-gray-300">{algorithmInfo.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">Time Complexity</div>
            <div className="font-mono text-orange-400">{algorithmInfo.complexity}</div>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="p-6 h-[380px] flex items-end justify-center">
        <div className="flex items-end gap-1 h-full w-full max-w-4xl">
          {array.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-200 ${getBarColor(index)} rounded-t-sm`}
              style={{
                height: `${(value / 320) * 100}%`,
                width: `${100 / array.length}%`
              }}
            >
              <div className="text-xs text-white text-center p-1 opacity-70">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-300">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-300">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-300">Sorted</span>
          </div>
        </div>
      </div>
    </div>
  );
}