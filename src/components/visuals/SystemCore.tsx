import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';

interface SystemCoreProps {
  readonly reducedMotion: boolean;
  readonly energized?: boolean;
}

export function SystemCore({
  reducedMotion,
  energized = false,
}: SystemCoreProps) {
  const groupRef = useRef<Group>(null);
  const innerRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) {
      return;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (energized ? 0.26 : 0.12);
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    }

    if (innerRef.current) {
      const pulse = 0.94 + Math.sin(state.clock.elapsedTime * 1.9) * 0.035;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshStandardMaterial
          color="#392819"
          emissive={energized ? '#d4a56b' : '#6b4525'}
          emissiveIntensity={energized ? 1.05 : 0.48}
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>
      <mesh scale={1.025}>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshBasicMaterial
          color="#f0c486"
          opacity={energized ? 0.42 : 0.2}
          transparent
          wireframe
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.54, 1]} />
        <meshStandardMaterial
          color="#68e4ee"
          emissive="#68e4ee"
          emissiveIntensity={energized ? 2.2 : 1.4}
          metalness={0.55}
          roughness={0.14}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.55, 0.25, 0]}>
        <torusGeometry args={[1.52, 0.014, 8, 128]} />
        <meshBasicMaterial color="#68e4ee" opacity={0.46} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, 0, Math.PI / 2.8]}>
        <torusGeometry args={[1.72, 0.01, 8, 128]} />
        <meshBasicMaterial color="#987dff" opacity={0.28} transparent />
      </mesh>
    </group>
  );
}
