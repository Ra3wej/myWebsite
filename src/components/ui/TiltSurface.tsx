import { useEffect, useRef, type HTMLAttributes } from 'react';
import { useReducedMotion } from 'motion/react';

export interface TiltSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  readonly maxTilt?: number;
}

function resetSurface(surface: HTMLDivElement | null) {
  if (!surface) {
    return;
  }

  surface.dataset.tiltActive = 'false';
  surface.style.setProperty('--tilt-rotate-x', '0deg');
  surface.style.setProperty('--tilt-rotate-y', '0deg');
  surface.style.setProperty('--tilt-pointer-x', '50%');
  surface.style.setProperty('--tilt-pointer-y', '50%');
}

export function TiltSurface({
  children,
  className = '',
  maxTilt = 5,
  onBlur,
  onFocus,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerMove,
  ...surfaceProps
}: TiltSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      resetSurface(surfaceRef.current);
    }
  }, [shouldReduceMotion]);

  return (
    <div
      {...surfaceProps}
      className={`tilt-surface ${className}`.trim()}
      data-tilt-active="false"
      onBlur={(event) => {
        onBlur?.(event);
        resetSurface(event.currentTarget);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        resetSurface(event.currentTarget);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        resetSurface(event.currentTarget);
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.pointerType !== 'mouse') {
          resetSurface(event.currentTarget);
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        resetSurface(event.currentTarget);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);

        if (event.pointerType !== 'mouse' || shouldReduceMotion !== false) {
          resetSurface(event.currentTarget);
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        if (bounds.width === 0 || bounds.height === 0) {
          return;
        }

        const pointerX = Math.min(
          1,
          Math.max(0, (event.clientX - bounds.left) / bounds.width),
        );
        const pointerY = Math.min(
          1,
          Math.max(0, (event.clientY - bounds.top) / bounds.height),
        );
        const tilt = Math.min(12, Math.max(0, maxTilt));
        const rotateX = (0.5 - pointerY) * 2 * tilt;
        const rotateY = (pointerX - 0.5) * 2 * tilt;

        event.currentTarget.dataset.tiltActive = 'true';
        event.currentTarget.style.setProperty(
          '--tilt-rotate-x',
          `${rotateX.toFixed(2)}deg`,
        );
        event.currentTarget.style.setProperty(
          '--tilt-rotate-y',
          `${rotateY.toFixed(2)}deg`,
        );
        event.currentTarget.style.setProperty(
          '--tilt-pointer-x',
          `${(pointerX * 100).toFixed(1)}%`,
        );
        event.currentTarget.style.setProperty(
          '--tilt-pointer-y',
          `${(pointerY * 100).toFixed(1)}%`,
        );
      }}
      ref={surfaceRef}
    >
      {children}
    </div>
  );
}
