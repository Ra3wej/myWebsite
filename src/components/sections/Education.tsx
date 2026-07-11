import { education } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Education & foundation."
      className="education-section"
    >
      <div className="education-card education-card--cinematic">
        <span className="education-card__beam" aria-hidden="true" />
        <span className="education-card__orbit" aria-hidden="true" />
        <Reveal className="education-card__period" delay={0.08} axis="x" amount={0.4}>
          <span className="education-card__marker" aria-hidden="true" />
          <p className="mono-label">{education.period}</p>
          <p>Completed</p>
        </Reveal>
        <Reveal className="education-card__institution" delay={0.16} axis="y" amount={0.4}>
          <p className="mono-label">Institution</p>
          <h3>{education.institution}</h3>
          <p>{education.college}</p>
        </Reveal>
        <Reveal className="education-card__degree" delay={0.24} axis="x" amount={0.4}>
          <p className="mono-label">Qualification</p>
          <p>{education.degree}</p>
          <span>Information Technology</span>
        </Reveal>
      </div>
    </Section>
  );
}
