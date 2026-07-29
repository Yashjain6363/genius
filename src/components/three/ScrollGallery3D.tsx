'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

type ImageFrameProps = {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  index: number;
};

function ImageFrame3D({ url, position, rotation = [0, 0, 0], scale = 1, index }: ImageFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(url);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Tabasco-style mouse parallax tilt
    const targetRotX = -pointer.y * 0.15;
    const targetRotY = pointer.x * 0.15 + Math.sin(t * 0.5 + index) * 0.05;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      rotation[0] + targetRotX,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      rotation[1] + targetRotY,
      0.05
    );

    const hoverScale = hovered ? 1.08 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(scale * hoverScale, scale * hoverScale, scale * hoverScale),
      0.08
    );
  });

  return (
    <Float speed={1.2 + index * 0.1} floatIntensity={0.2} rotationIntensity={0.05}>
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Frame border — portal door inspired brass grid */}
        <RoundedBox args={[2.4, 3.2, 0.12]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#3D2314" roughness={0.3} metalness={0.4} />
        </RoundedBox>

        {/* Inner brass studs */}
        {[-0.9, 0, 0.9].map((x) =>
          [-1.2, 0, 1.2].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.08]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#C9A227" metalness={0.8} roughness={0.2} />
            </mesh>
          ))
        )}

        {/* Photo plane */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[2.1, 2.8]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Glow on hover */}
        {hovered && (
          <pointLight position={[0, 0, 1]} intensity={0.5} color="#FFD54F" distance={3} />
        )}
      </group>
    </Float>
  );
}

function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollProgress;
    camera.position.z = 6 - p * 4;
    camera.position.y = 0.5 + p * 2;
    camera.position.x = Math.sin(p * Math.PI) * 2;
    camera.lookAt(0, p * 1.5, -p * 3);
  });

  return null;
}

type ScrollGallery3DProps = {
  images: { src: string; title: string }[];
  scrollProgress: number;
};

function GalleryContent({ images, scrollProgress }: ScrollGallery3DProps) {
  const positions: [number, number, number][] = [
    [-3, 0, -2],
    [3, 0.5, -3],
    [-2, -1, -4],
    [2.5, 1, -5],
    [0, 0, -6],
    [-3.5, 0.5, -7],
    [3, -0.5, -8],
    [-1, 1, -9],
    [1.5, -1, -10],
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#FFE082" />
      <pointLight position={[-5, 0, -5]} intensity={0.4} color="#AB47BC" />

      {images.slice(0, 9).map((img, i) => (
        <ImageFrame3D
          key={img.src}
          url={img.src}
          position={positions[i] || [0, 0, -i * 2]}
          rotation={[0, (i % 2 === 0 ? 1 : -1) * 0.2, 0]}
          scale={0.9 + (i % 3) * 0.1}
          index={i}
        />
      ))}

      <ScrollCamera scrollProgress={scrollProgress} />
    </>
  );
}

export default function ScrollGallery3D({ images, scrollProgress }: ScrollGallery3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <GalleryContent images={images} scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
