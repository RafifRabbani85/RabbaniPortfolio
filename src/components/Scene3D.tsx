import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { RobotCharacter } from './RobotCharacter';

const Scene3D: React.FC = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: event.clientX,
      y: event.clientY
    };
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute right-0 top-0 w-1/2 h-screen pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RobotCharacter mousePosition={mousePosition} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;