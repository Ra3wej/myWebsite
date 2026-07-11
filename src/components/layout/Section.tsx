import type { ReactNode } from 'react';
import { Reveal } from '../ui/Reveal';

interface SectionProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
}

const sectionCoordinates: Readonly<Record<string, string>> = {
  about: 'SYS.01',
  experience: 'SYS.02',
  skills: 'SYS.03',
  work: 'SYS.04',
  education: 'SYS.05',
  contact: 'SYS.06',
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      data-system-section={id}
      tabIndex={-1}
    >
      <Reveal className="section-heading">
        <p className="section-kicker">
          <span>{eyebrow}</span>
          <span aria-hidden="true">{sectionCoordinates[id] ?? 'SYS.00'}</span>
        </p>
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
