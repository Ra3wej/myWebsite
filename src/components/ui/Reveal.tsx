import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';

export type RevealAxis = 'none' | 'x' | 'y';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly axis?: RevealAxis;
  readonly amount?: number;
}

const revealOffsets: Record<RevealAxis, { x: number; y: number }> = {
  none: { x: 0, y: 0 },
  x: { x: 22, y: 0 },
  y: { x: 0, y: 18 },
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  axis = 'y',
  amount = 0.2,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = revealOffsets[axis];

  return (
    <m.div
      className={`reveal ${className}`.trim()}
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        delay: Math.max(0, delay),
        duration: 0.86,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ amount: Math.min(1, Math.max(0, amount)), once: true }}
      whileInView={
        shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }
      }
    >
      {children}
    </m.div>
  );
}
