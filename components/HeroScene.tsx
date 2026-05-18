"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 120;

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
      <ambientLight intensity={0.38} />
      <pointLight position={[2.8, 2.4, 3]} intensity={1.8} color="#FF00B8" />
      <pointLight position={[-3, -1.8, 2.4]} intensity={1.4} color="#008FFF" />
      <ParticleField />
    </Canvas>
  );
}
