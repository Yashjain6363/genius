'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbacusBeads() {
  const group = useRef<THREE.Group>(null);
  const beads = useMemo(() => {
    const arr = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 8; col++) {
        arr.push({
          pos: [(col - 3.5) * 0.35, (2 - row) * 0.4, 0] as [number, number, number],
          color: ['#FFD54F', '#FF5252', '#29B6F6', '#66BB6A', '#AB47BC'][row % 5],
        });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={group} position={[2.5, 0.5, -1]}>
      <mesh>
        <boxGeometry args={[3.2, 2.2, 0.15]} />
        <meshStandardMaterial color="#3D2314" roughness={0.4} metalness={0.2} />
      </mesh>
      {beads.map((b, i) => (
        <Float key={i} speed={1.5 + (i % 3) * 0.3} floatIntensity={0.15}>
          <mesh position={b.pos}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={0.3}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function FloatingBook({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <Float speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[0.6, 0.8, 0.08]} />
          <meshStandardMaterial color="#FF5252" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.55, 0.75, 0.02]} />
          <meshStandardMaterial color="#fff" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingPencil({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.8} floatIntensity={0.5}>
      <group position={position} rotation={[0, 0, Math.PI / 6]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
          <meshStandardMaterial color="#FFD54F" />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <coneGeometry args={[0.05, 0.15, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </Float>
  );
}

function MusicalNote({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="#AB47BC" emissive="#AB47BC" emissiveIntensity={0.5} />
    </mesh>
  );
}

function MagicOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={ref} position={[-2, 1, 0]}>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial
          color="#29B6F6"
          emissive="#29B6F6"
          emissiveIntensity={0.2}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingNumbers() {
  const numbers = ['1', '2', '3', '+', '×', '7', '9'];
  return (
    <>
      {numbers.map((n, i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={0.3}>
          <Text
            position={[
              Math.sin(i * 1.2) * 3,
              Math.cos(i * 0.8) * 2 + 1,
              -2 - i * 0.3,
            ]}
            fontSize={0.4}
            color="#FFD54F"
            anchorX="center"
            anchorY="middle"
          >
            {n}
          </Text>
        </Float>
      ))}
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.15) * 0.5;
    camera.position.y = Math.sin(t * 0.1) * 0.2 + 0.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#FFD54F" />
      <pointLight position={[3, -1, 1]} intensity={0.5} color="#AB47BC" />
      <spotLight position={[0, 5, 0]} intensity={0.6} angle={0.5} penumbra={1} color="#FFE082" />

      <Stars radius={50} depth={30} count={2000} factor={3} saturation={0.5} fade speed={0.5} />
      <Sparkles count={80} scale={8} size={2} speed={0.3} color="#FFD54F" />

      <AbacusBeads />
      <MagicOrb />
      <FloatingNumbers />

      <FloatingBook position={[-3, -0.5, -0.5]} rotation={[0.2, 0.5, 0.1]} />
      <FloatingBook position={[1, 2, -1.5]} rotation={[-0.1, -0.3, 0.2]} />
      <FloatingBook position={[-1.5, 1.5, 0.5]} rotation={[0.3, 0.8, -0.1]} />

      <FloatingPencil position={[-2.5, -1, 0.5]} />
      <FloatingPencil position={[3, 1.5, -0.5]} />

      <MusicalNote position={[-1, 2.5, -1]} />
      <MusicalNote position={[2, -1.5, -0.5]} />
      <MusicalNote position={[0.5, 2, 0]} />

      {/* Classroom platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#f5f0ff" roughness={0.8} metalness={0.1} />
      </mesh>

      <CameraRig />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
