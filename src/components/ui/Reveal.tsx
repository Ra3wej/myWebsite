import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Reveal({ children, className = '' }: RevealProps) {
  const { ref, isEnhanced, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-enhanced={isEnhanced}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
}
