import { useState, useEffect, useRef } from "react";

interface EyePosition {
  x: number;
  y: number;
}

export function FloatingEyes() {
  const [mousePosition, setMousePosition] = useState<EyePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      // Hide eyes when scrolling for better performance
      setIsVisible(false);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = window.setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  const calculatePupilPosition = (eyeElement: HTMLDivElement | null, isRightEye = false) => {
    if (!eyeElement) return { x: 0, y: 0 };

    const eyeRect = eyeElement.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);
    
    // Limit pupil movement within the eye boundary
    const maxDistance = Math.min(eyeRect.width, eyeRect.height) * 0.15;
    const distance = Math.min(maxDistance, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) * 0.1);

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };

  const leftPupilPos = calculatePupilPosition(leftEyeRef.current, false);
  const rightPupilPos = calculatePupilPosition(rightEyeRef.current, true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Left Eye */}
      <div 
        ref={leftEyeRef}
        className="absolute top-20 left-20 w-16 h-16 bg-white dark:bg-gray-100 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        {/* Left Eye Pupil */}
        <div
          className="absolute w-6 h-6 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(calc(-50% + ${leftPupilPos.x}px), calc(-50% + ${leftPupilPos.y}px))`,
            background: 'radial-gradient(circle at 30% 30%, #333333 0%, #000000 100%)',
          }}
        >
          {/* Pupil highlight */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
        
        {/* Left Eye shine */}
        <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full opacity-40"></div>
      </div>

      {/* Right Eye */}
      <div 
        ref={rightEyeRef}
        className="absolute top-20 right-20 w-16 h-16 bg-white dark:bg-gray-100 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        {/* Right Eye Pupil */}
        <div
          className="absolute w-6 h-6 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(calc(-50% + ${rightPupilPos.x}px), calc(-50% + ${rightPupilPos.y}px))`,
            background: 'radial-gradient(circle at 30% 30%, #333333 0%, #000000 100%)',
          }}
        >
          {/* Pupil highlight */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
        
        {/* Right Eye shine */}
        <div className="absolute top-2 right-3 w-3 h-3 bg-white rounded-full opacity-40"></div>
      </div>

      {/* Cookie Monster Blue accent rings */}
      <div className="absolute top-18 left-18 w-20 h-20 border-2 border-blue-600 dark:border-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-18 right-18 w-20 h-20 border-2 border-blue-600 dark:border-blue-400 rounded-full opacity-20 animate-pulse"></div>

      {/* Eyelashes/decorative elements */}
      <div className="absolute top-16 left-16">
        <div className="w-1 h-6 bg-gray-400 dark:bg-gray-500 rounded-full transform -rotate-45 opacity-30"></div>
        <div className="w-1 h-4 bg-gray-400 dark:bg-gray-500 rounded-full transform -rotate-12 opacity-30 ml-2 -mt-4"></div>
        <div className="w-1 h-5 bg-gray-400 dark:bg-gray-500 rounded-full transform rotate-12 opacity-30 ml-4 -mt-3"></div>
      </div>
      
      <div className="absolute top-16 right-16">
        <div className="w-1 h-6 bg-gray-400 dark:bg-gray-500 rounded-full transform rotate-45 opacity-30 ml-16"></div>
        <div className="w-1 h-4 bg-gray-400 dark:bg-gray-500 rounded-full transform rotate-12 opacity-30 ml-14 -mt-4"></div>
        <div className="w-1 h-5 bg-gray-400 dark:bg-gray-500 rounded-full transform -rotate-12 opacity-30 ml-12 -mt-3"></div>
      </div>
    </div>
  );
}

// Extend Window interface to include scrollTimeout
declare global {
  interface Window {
    scrollTimeout: number;
  }
}