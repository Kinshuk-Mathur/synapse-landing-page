"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 180;

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const stride = i * 3;
      positions[stride] = (Math.random() - 0.5) * 11;
      positions[stride + 1] = (Math.random() - 0.5) * 6;
      positions[stride + 2] = (Math.random() - 0.5) * 7;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.035 + pointer.x * 0.08;
    points.current.rotation.x = pointer.y * 0.04;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#8bd3ff"
        size={0.028}
        transparent
        opacity={0.74}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlassSphere({
  position,
  color,
  scale,
  speed
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime * speed;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.16;
    mesh.current.position.x = position[0] + pointer.x * 0.16;
    mesh.current.rotation.x = t * 0.22;
    mesh.current.rotation.y = t * 0.28;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.18}
        roughness={0.36}
        metalness={0.26}
        transparent
        opacity={0.48}
      />
    </mesh>
  );
}

function CoreSystem() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current || !ring.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.14;
    group.current.rotation.x = pointer.y * 0.1;
    ring.current.rotation.z = clock.elapsedTime * 0.35;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.08, 1]} />
        <meshStandardMaterial
          color="#4B0082"
          emissive="#2c0057"
          emissiveIntensity={0.36}
          metalness={0.34}
          roughness={0.28}
          transparent
          opacity={0.72}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.56, 0.012, 8, 72]} />
        <meshBasicMaterial color="#FF00B8" transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.3, 0]}>
        <torusGeometry args={[1.84, 0.01, 8, 72]} />
        <meshBasicMaterial color="#008FFF" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false
      }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[2.8, 2.4, 3]} intensity={3.6} color="#FF00B8" />
      <pointLight position={[-3, -1.8, 2.4]} intensity={2.6} color="#008FFF" />
      <ParticleField />
      <GlassSphere position={[-2.45, 0.9, -0.7]} color="#008FFF" scale={0.34} speed={0.86} />
      <GlassSphere position={[2.3, -0.5, -0.3]} color="#FF00B8" scale={0.42} speed={0.72} />
      <CoreSystem />
    </Canvas>
  );
}
