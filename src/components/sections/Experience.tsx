import { experiences } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional experience."
      className="experience-section"
    >
      <div className="timeline timeline--cinematic">
        <div className="timeline__progress" aria-hidden="true">
          <span className="timeline__progress-bar" />
        </div>
        {experiences.map((experience, index) => (
          <Reveal
            className="timeline-entry timeline-entry--cinematic"
            key={experience.company}
            delay={index * 0.1}
            axis="y"
            amount={0.24}
          >
            <div className="timeline-meta">
              <p>{experience.period}</p>
              <p>{experience.company}</p>
              {experience.confidential ? (
                <span className="confidential-badge">Confidential work</span>
              ) : null}
            </div>
            <div className="timeline-marker" aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i />
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
