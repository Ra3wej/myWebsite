import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { m, useReducedMotion } from 'motion/react';
import { projects } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { ArrowIcon } from '../ui/ArrowIcon';
import { ExternalLink } from '../ui/ExternalLink';
import { ProjectMedia } from '../ui/ProjectMedia';
import { Reveal } from '../ui/Reveal';

interface ProjectSelectionDetail {
  readonly index: number;
}

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    duration: shouldReduceMotion ? 18 : 34,
    loop: true,
    skipSnaps: false,
  });

  const syncSelection = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', syncSelection);
    emblaApi.on('reInit', syncSelection);

    return () => {
      emblaApi.off('select', syncSelection);
      emblaApi.off('reInit', syncSelection);
    };
  }, [emblaApi, syncSelection]);

  useEffect(() => {
    const selectProject = (event: Event) => {
      const index = (event as CustomEvent<ProjectSelectionDetail>).detail?.index;
      if (Number.isInteger(index) && index >= 0 && index < projects.length) {
        emblaApi?.scrollTo(index);
      }
    };

    window.addEventListener('portfolio:project', selectProject);
    return () => window.removeEventListener('portfolio:project', selectProject);
  }, [emblaApi]);

  const activeProject = projects[selectedIndex] ?? projects[0]!;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Published mobile applications."
      className="projects-section"
    >
      <Reveal className="project-orbit" axis="y" amount={0.12}>
        <div className="project-orbit__header">
          <div>
            <p className="project-orbit__eyebrow">Mission archive / interactive</p>
            <p className="project-orbit__status" aria-live="polite">
              <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
              <span aria-hidden="true"> / </span>
              <span>{String(projects.length).padStart(2, '0')}</span>
              <strong>{activeProject.name}</strong>
            </p>
          </div>
          <div className="project-orbit__controls" aria-label="Project navigation">
            <button onClick={() => emblaApi?.scrollPrev()} type="button">
              <ArrowIcon />
              <span>Previous project</span>
            </button>
            <button onClick={() => emblaApi?.scrollNext()} type="button">
              <span>Next project</span>
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="project-orbit__stage">
          <div className="project-orbit__field" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div
            aria-label="Project carousel"
            className="project-orbit__viewport"
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                emblaApi?.scrollPrev();
              } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                emblaApi?.scrollNext();
              }
            }}
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            tabIndex={0}
          >
            <div className="project-orbit__container">
              {projects.map((project, index) => {
                const isActive = selectedIndex === index;
                return (
                  <div
                    aria-hidden={!isActive}
                    aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
                    aria-roledescription="slide"
                    className="project-orbit__slide"
                    data-active={isActive}
                    inert={!isActive}
                    key={project.name}
                    role="group"
                  >
                    <m.article
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: isActive ? 1 : 0.42,
                              scale: isActive ? 1 : 0.925,
                              y: isActive ? 0 : 18,
                            }
                      }
                      className="project-card project-card--orbit"
                      transition={{
                        damping: 26,
                        mass: 0.72,
                        stiffness: 150,
                        type: 'spring',
                      }}
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
                      <div className="project-content project-content--mission">
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
                        <div className="project-card__delivery">
                          <span>Published product</span>
                          <span>iOS + Android</span>
                        </div>
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
                      </div>
                    </m.article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <nav className="project-orbit__dock" aria-label="Choose a project">
          <span className="project-orbit__rail" aria-hidden="true" />
          {projects.map((project, index) => (
            <button
              aria-label={`Show project ${index + 1}: ${project.name}`}
              aria-pressed={selectedIndex === index}
              data-active={selectedIndex === index}
              key={project.name}
              onClick={() => emblaApi?.scrollTo(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <i aria-hidden="true" />
              <small>{project.name}</small>
            </button>
          ))}
        </nav>
        <p className="project-orbit__hint">Drag, swipe, use arrow keys, or choose an orbit node.</p>
      </Reveal>
    </Section>
  );
}
