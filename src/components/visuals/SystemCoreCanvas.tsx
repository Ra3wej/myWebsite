import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { SceneFallback } from './SceneFallback';
import { SystemCoreScene } from './SystemCoreScene';
import { type SystemDomainId } from './systemDomains';
import { VisualErrorBoundary } from './VisualErrorBoundary';

export interface SystemCoreCanvasProps {
  readonly activeDomain?: SystemDomainId | null;
  readonly activatedDomains?: readonly SystemDomainId[];
  readonly className?: string;
  readonly mode?: 'hero' | 'playground';
  readonly onDomainSelect?: (id: SystemDomainId) => void;
}

export default function SystemCoreCanvas({
  activeDomain = null,
  activatedDomains = [],
  className = '',
  mode = 'hero',
  onDomainSelect,
}: SystemCoreCanvasProps) {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(() =>
    window.matchMedia('(max-width: 40rem)').matches,
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 40rem)');
    const update = () => setIsNarrow(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || mode === 'playground') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { rootMargin: '20%' },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [mode]);

  if (shouldReduceMotion || (mode === 'hero' && isNarrow)) {
    return <SceneFallback mode={mode} />;
  }

  const fallback = <SceneFallback mode={mode} />;

  return (
    <div
      aria-hidden="true"
      className={`system-core-canvas system-core-canvas--${mode} ${className}`.trim()}
      ref={wrapperRef}
    >
      <VisualErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ far: 50, fov: mode === 'playground' ? 44 : 40, near: 0.1, position: [0, 0, 7] }}
          dpr={[1, mode === 'playground' ? 1.75 : 1.5]}
          fallback={fallback}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <SystemCoreScene
              activatedDomains={activatedDomains}
              activeDomain={activeDomain}
              interactive={mode === 'playground'}
              onDomainSelect={onDomainSelect}
              reducedMotion={false}
            />
          </Suspense>
        </Canvas>
      </VisualErrorBoundary>
    </div>
  );
}
