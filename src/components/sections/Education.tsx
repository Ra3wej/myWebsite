import { education } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

export function Education() {
  return (
    <Section
      id="education"
      index="05"
      eyebrow="Education"
      title="Where the foundation started."
      className="education-section"
    >
      <Reveal className="education-card">
        <p className="mono-label">{education.period}</p>
        <div>
          <h3>{education.institution}</h3>
          <p>{education.college}</p>
        </div>
        <p>{education.degree}</p>
      </Reveal>
    </Section>
  );
}
