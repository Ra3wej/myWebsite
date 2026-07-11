import { useState } from 'react';
import {
  AdaptiveDpr,
  OrbitControls,
  PerformanceMonitor,
  Sparkles,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { SystemCore } from './SystemCore';
import { ServiceOrbit } from './ServiceOrbit';
import { SYSTEM_DOMAINS, type SystemDomainId } from './systemDomains';

interface SystemCoreSceneProps {
  readonly activeDomain?: SystemDomainId | null;
  readonly activatedDomains?: readonly SystemDomainId[];
  readonly interactive?: boolean;
  readonly reducedMotion: boolean;
  readonly onDomainSelect?: (id: SystemDomainId) => void;
}

function CameraRig({ reducedMotion }: { readonly reducedMotion: boolean }) {
  useFrame((state, delta) => {
    if (reducedMotion) {
      return;
    }

    const response = Math.min(1, delta * 2.8);
    state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * response;
    state.camera.position.y += (state.pointer.y * 0.32 - state.camera.position.y) * response;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function SystemCoreScene({
  activeDomain = null,
  activatedDomains = [],
  interactive = false,
  reducedMotion,
  onDomainSelect,
}: SystemCoreSceneProps) {
  const [effectsEnabled, setEffectsEnabled] = useState(!reducedMotion);
  const energized = activatedDomains.length === SYSTEM_DOMAINS.length;

  return (
    <>
      <fog attach="fog" args={['#07090d', 7.5, 18]} />
      <ambientLight intensity={0.46} />
      <directionalLight color="#f0c486" intensity={2.4} position={[4, 5, 6]} />
      <pointLight color="#68e4ee" distance={12} intensity={20} position={[-4, 1, 4]} />
      <pointLight color="#987dff" distance={10} intensity={14} position={[4, -3, 2]} />

      <group scale={interactive ? 1.08 : 0.9}>
        <SystemCore energized={energized} reducedMotion={reducedMotion} />
        {SYSTEM_DOMAINS.map((domain, index) => (
          <ServiceOrbit
            activated={activatedDomains.includes(domain.id)}
            active={activeDomain === domain.id}
            domain={domain}
            interactive={interactive}
            key={domain.id}
            onSelect={onDomainSelect}
            reducedMotion={reducedMotion}
            sequence={index}
          />
        ))}
      </group>

      <Sparkles
        color="#68e4ee"
        count={interactive ? 72 : 46}
        opacity={0.34}
        scale={[8, 6, 5]}
        size={1.25}
        speed={reducedMotion ? 0 : 0.18}
      />

      {interactive ? (
        <OrbitControls
          autoRotate={!reducedMotion && activeDomain === null}
          autoRotateSpeed={0.42}
          enablePan={false}
          maxDistance={9}
          minDistance={4.8}
        />
      ) : (
        <CameraRig reducedMotion={reducedMotion} />
      )}

      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => setEffectsEnabled(false)} />

      {effectsEnabled && !reducedMotion ? (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.15}
            luminanceSmoothing={0.72}
            luminanceThreshold={0.36}
            mipmapBlur
          />
          <Noise opacity={0.018} />
          <Vignette darkness={0.62} eskil={false} offset={0.18} />
        </EffectComposer>
      ) : null}
    </>
  );
}
