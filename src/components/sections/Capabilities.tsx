import { capabilities } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { TiltSurface } from '../ui/TiltSurface';

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
          <Reveal
            className="capability-card capability-card--cinematic"
            key={capability.title}
            delay={index * 0.07}
            axis="y"
            amount={0.22}
          >
            <TiltSurface className="capability-card__surface">
              <span className="capability-card__spotlight" aria-hidden="true" />
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
            </TiltSurface>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
