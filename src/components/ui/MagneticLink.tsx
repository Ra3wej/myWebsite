import { useEffect } from 'react';
import {
  type HTMLMotionProps,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

export interface MagneticLinkProps extends HTMLMotionProps<'a'> {
  readonly strength?: number;
}

export function MagneticLink({
  children,
  className = '',
  strength = 10,
  style,
  onBlur,
  onFocus,
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerMove,
  ...anchorProps
}: MagneticLinkProps) {
  const shouldReduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 18, mass: 0.18, stiffness: 260 });
  const y = useSpring(rawY, { damping: 18, mass: 0.18, stiffness: 260 });

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      rawX.set(0);
      rawY.set(0);
    }
  }, [rawX, rawY, shouldReduceMotion]);

  return (
    <m.a
      {...anchorProps}
      className={`magnetic-link ${className}`.trim()}
      onBlur={(event) => {
        onBlur?.(event);
        reset();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        reset();
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        reset();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.pointerType !== 'mouse') {
          reset();
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        reset();
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);

        if (event.pointerType !== 'mouse' || shouldReduceMotion !== false) {
          reset();
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        if (bounds.width === 0 || bounds.height === 0) {
          return;
        }

        const maximumOffset = Math.min(24, Math.max(0, strength));
        const horizontal =
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const vertical =
          ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        rawX.set(horizontal * maximumOffset);
        rawY.set(vertical * maximumOffset);
      }}
      style={{ ...style, x, y }}
    >
      {children}
    </m.a>
  );
}
