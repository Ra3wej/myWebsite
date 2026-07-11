import { m, useScroll, useSpring } from 'motion/react';

interface ScrollProgressProps {
  readonly className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 32,
    mass: 0.18,
    stiffness: 170,
  });

  return (
    <div
      aria-hidden="true"
      className={`scroll-progress ${className}`.trim()}
    >
      <m.div className="scroll-progress__bar" style={{ scaleX }} />
    </div>
  );
}
