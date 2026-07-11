import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';

interface SmoothScrollProps {
  readonly children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion !== false) {
      return;
    }

    const lenis = new Lenis({
      anchors: true,
      autoRaf: false,
      lerp: 0.075,
      prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });

    let animationFrame = 0;

    const update = (time: number) => {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return children;
}
