import { aboutCopy, proofPoints } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="Profile"
      title="Backend depth. Product perspective."
      className="about-section"
    >
      <Reveal className="about-copy">
        <p className="about-lead">{aboutCopy.lead}</p>
        <div>
          <p className="mono-label">{aboutCopy.eyebrow}</p>
          <p>{aboutCopy.body}</p>
        </div>
      </Reveal>
      <Reveal className="proof-grid">
        {proofPoints.map((point) => (
          <article key={point.label} className="proof-card">
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
