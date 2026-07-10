import type { ReactNode } from 'react';
import { Reveal } from '../ui/Reveal';

interface SectionProps {
  readonly id: string;
  readonly index: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <Reveal className="section-heading">
        <div className="section-kicker">
          <span>{index}</span>
          <span>{eyebrow}</span>
        </div>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
