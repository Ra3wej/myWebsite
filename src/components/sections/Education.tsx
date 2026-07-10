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
      <Reveal className="education-card">
        <div className="education-card__period">
          <span className="education-card__marker" aria-hidden="true" />
          <p className="mono-label">{education.period}</p>
          <p>Completed</p>
        </div>
        <div className="education-card__institution">
          <p className="mono-label">Institution</p>
          <h3>{education.institution}</h3>
          <p>{education.college}</p>
        </div>
        <div className="education-card__degree">
          <p className="mono-label">Qualification</p>
          <p>{education.degree}</p>
          <span>Information Technology</span>
        </div>
      </Reveal>
    </Section>
  );
}
