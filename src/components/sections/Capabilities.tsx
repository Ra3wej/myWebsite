import { capabilities } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

export function Capabilities() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="Core technical capabilities."
      className="capabilities-section"
    >
      <div className="capability-grid">
        {capabilities.map((capability, index) => (
          <Reveal className="capability-card" key={capability.title}>
            <div className="capability-card__header">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{capability.title}</h3>
            </div>
            <p>{capability.summary}</p>
            <ul className="tag-list" aria-label={`${capability.title} skills`}>
              {capability.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
