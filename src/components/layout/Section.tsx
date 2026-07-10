import type { ReactNode } from 'react';
import { Reveal } from '../ui/Reveal';

interface SectionProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <Reveal className="section-heading">
        <p className="section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
