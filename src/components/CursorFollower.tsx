import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        className="w-8 h-8 absolute"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <div className="relative w-full h-full">
          {/* Robot head */}
          <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-20" />
          <div className="absolute inset-2 bg-blue-500 rounded-lg" />
          {/* Robot eyes */}
          <motion.div 
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{
              left: '35%',
              top: '40%',
            }}
          />
          <motion.div 
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{
              right: '35%',
              top: '40%',
            }}
          />
          {/* Robot antenna */}
          <div className="absolute w-1 h-2 bg-blue-500 -top-2 left-1/2 transform -translate-x-1/2" />
        </div>
      </motion.div>
    </div>
  );
};

export default CursorFollower;