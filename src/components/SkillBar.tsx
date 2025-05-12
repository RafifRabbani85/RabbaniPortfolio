import React, { useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  name: string;
  progress: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, progress }) => {
  const [visible, setVisible] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let interval: number;
    
    if (visible) {
      let currentProgress = 0;
      interval = window.setInterval(() => {
        currentProgress += 2;
        if (currentProgress >= progress) {
          clearInterval(interval);
          setDisplayProgress(progress);
        } else {
          setDisplayProgress(currentProgress);
        }
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible, progress]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-blue-500">{displayProgress}%</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${visible ? displayProgress : 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;