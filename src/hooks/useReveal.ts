import { useEffect, useRef, useState } from 'react';

interface RevealState {
  readonly ref: React.RefObject<HTMLDivElement | null>;
  readonly isEnhanced: boolean;
  readonly isVisible: boolean;
}

export function useReveal(): RevealState {
  const ref = useRef<HTMLDivElement>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!element || reducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    setIsEnhanced(true);
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, isEnhanced, isVisible };
}
