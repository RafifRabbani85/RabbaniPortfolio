import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function RobotCharacter({ mousePosition }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/robot.glb');

  // Create refs for robot parts
  const head = useRef();
  const body = useRef();
  const eyes = useRef();

  useFrame((state, delta) => {
    if (!head.current || !mousePosition.current) return;

    // Calculate target rotation based on mouse position
    const targetRotationY = (mousePosition.current.x - window.innerWidth / 2) / 1000;
    const targetRotationX = (mousePosition.current.y - window.innerHeight / 2) / 1000;

    // Smoothly interpolate current rotation to target rotation
    head.current.rotation.y = THREE.MathUtils.lerp(
      head.current.rotation.y,
      targetRotationY,
      0.1
    );
    head.current.rotation.x = THREE.MathUtils.lerp(
      head.current.rotation.x,
      targetRotationX,
      0.1
    );

    // Add subtle floating animation
    if (body.current) {
      body.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Blink animation for eyes
    if (eyes.current && Math.random() < 0.005) {
      eyes.current.scale.y = 0.1;
      setTimeout(() => {
        if (eyes.current) eyes.current.scale.y = 1;
      }, 150);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <mesh
        ref={body}
        geometry={nodes.RobotBody.geometry}
        material={materials.RobotMaterial}
        position={[0, 0, 0]}
      >
        <mesh
          ref={head}
          geometry={nodes.RobotHead.geometry}
          material={materials.RobotMaterial}
          position={[0, 1.5, 0]}
        >
          <mesh
            ref={eyes}
            geometry={nodes.RobotEyes.geometry}
            material={materials.EyeMaterial}
            position={[0, 0.2, 0.5]}
          />
        </mesh>
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/robot.glb');