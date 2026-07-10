import { useEffect, useMemo, useRef } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import type { SystemDomain } from './systemDomains';

interface ServiceOrbitProps {
  readonly domain: SystemDomain;
  readonly activated: boolean;
  readonly active: boolean;
  readonly interactive: boolean;
  readonly reducedMotion: boolean;
  readonly sequence: number;
  readonly onSelect?: (id: SystemDomain['id']) => void;
}

function createRoute(position: SystemDomain['position']) {
  const start = new Vector3(0, 0, 0);
  const end = new Vector3(...position);
  const control = new Vector3(position[0] * 0.42, position[1] * 0.42, 1.25);

  return Array.from({ length: 26 }, (_, index) => {
    const t = index / 25;
    const inverse = 1 - t;
    return new Vector3(
      inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x,
      inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y,
      inverse * inverse * start.z + 2 * inverse * t * control.z + t * t * end.z,
    );
  });
}

export function ServiceOrbit({
  domain,
  activated,
  active,
  interactive,
  reducedMotion,
  sequence,
  onSelect,
}: ServiceOrbitProps) {
  const packetRef = useRef<Mesh>(null);
  const route = useMemo(() => createRoute(domain.position), [domain.position]);

  useEffect(() => () => {
    document.body.style.cursor = '';
  }, []);

  useFrame((state) => {
    if (!packetRef.current || reducedMotion) {
      return;
    }

    const progress = (state.clock.elapsedTime * 0.12 + sequence * 0.23) % 1;
    const routeIndex = Math.min(route.length - 1, Math.floor(progress * route.length));
    packetRef.current.position.copy(route[routeIndex]);
    const pulse = 0.78 + Math.sin(state.clock.elapsedTime * 4 + sequence) * 0.22;
    packetRef.current.scale.setScalar(pulse);
  });

  const intensity = active ? 2.2 : activated ? 1.6 : 0.78;

  return (
    <group>
      <Line
        color={domain.color}
        lineWidth={active ? 1.55 : 0.82}
        opacity={active || activated ? 0.72 : 0.28}
        points={route}
        transparent
      />
      <mesh ref={packetRef} position={route[sequence + 4]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshBasicMaterial color={domain.color} toneMapped={false} />
      </mesh>
      <group position={domain.position}>
        <mesh
          onClick={(event) => {
            event.stopPropagation();
            if (interactive) {
              onSelect?.(domain.id);
            }
          }}
          onPointerEnter={() => {
            if (interactive) {
              document.body.style.cursor = 'pointer';
            }
          }}
          onPointerLeave={() => {
            document.body.style.cursor = '';
          }}
          scale={active ? 1.22 : 1}
        >
          <dodecahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color={domain.color}
            emissive={domain.color}
            emissiveIntensity={intensity}
            metalness={0.62}
            roughness={0.2}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.48, 0.012, 8, 64]} />
          <meshBasicMaterial
            color={domain.color}
            opacity={active ? 0.82 : 0.28}
            transparent
          />
        </mesh>
        {activated ? (
          <pointLight color={domain.color} distance={3.4} intensity={1.1} />
        ) : null}
      </group>
    </group>
  );
}
