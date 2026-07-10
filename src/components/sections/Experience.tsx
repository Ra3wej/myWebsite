import { experiences } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Production work, evolving systems."
      className="experience-section"
    >
      <div className="timeline">
        {experiences.map((experience, index) => (
          <Reveal className="timeline-entry" key={experience.company}>
            <div className="timeline-marker" aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="timeline-meta">
              <p>{experience.period}</p>
              <p>{experience.company}</p>
              {experience.confidential ? (
                <span className="confidential-badge">Confidential work</span>
              ) : null}
            </div>
            <article className="timeline-content">
              <h3>{experience.role}</h3>
              <p className="timeline-summary">{experience.summary}</p>
              <ul className="detail-list">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <ul className="tag-list" aria-label="Technologies used">
                {experience.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
