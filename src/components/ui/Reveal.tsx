import type { ReactNode } from 'react';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Reveal({ children, className = '' }: RevealProps) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
}
