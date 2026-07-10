import { projects } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { ExternalLink } from '../ui/ExternalLink';
import { ProjectMedia } from '../ui/ProjectMedia';
import { Reveal } from '../ui/Reveal';

export function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Published mobile applications."
      className="projects-section"
    >
      <div className="project-list">
        {projects.map((project, index) => (
          <Reveal
            className={`project-card project-card--mission project-card--mission-${index + 1}`}
            key={project.name}
            delay={index * 0.035}
            axis="y"
            amount={0.16}
          >
            <span className="project-card__atmosphere" aria-hidden="true" />
            <span className="project-card__mission-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <ProjectMedia
              media={project.media}
              projectName={project.name}
              sequence={index}
            />
            <article className="project-content project-content--mission">
              <div className="project-heading">
                <p>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {project.category}
                </p>
                <h3>{project.name}</h3>
              </div>
              <p className="project-role">{project.role}</p>
              <p className="project-summary">{project.summary}</p>
              <ul className="tag-list" aria-label={`${project.name} technologies`}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="store-links">
                {project.stores.map((store) => (
                  <ExternalLink
                    key={store.platform}
                    href={store.href}
                    ariaLabel={`View ${project.name} on ${store.platform}`}
                  >
                    {store.platform}
                  </ExternalLink>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
