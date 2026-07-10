import { profile } from '../../data/portfolio';
import { ArrowIcon } from '../ui/ArrowIcon';
import { Reveal } from '../ui/Reveal';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-system" aria-hidden="true">
        <span className="hero-node hero-node--one" />
        <span className="hero-node hero-node--two" />
        <span className="hero-node hero-node--three" />
        <span className="hero-path" />
      </div>
      <Reveal className="hero-content">
        <p className="hero-overline">
          <span className="status-dot" />
          {profile.location}
        </p>
        <h1 id="hero-title">
          <span>{profile.name}</span>
          <span>{profile.title}</span>
        </h1>
        <div className="hero-summary">
          <p>{profile.statement}</p>
          <p>{profile.introduction}</p>
        </div>
        <div className="hero-actions">
          <a className="button button--primary" href={`mailto:${profile.email}`}>
            Start a conversation
            <ArrowIcon />
          </a>
          <a className="button button--secondary" href="#work">
            View selected work
            <ArrowIcon direction="down" />
          </a>
        </div>
      </Reveal>
      <p className="hero-index" aria-hidden="true">
        00 / Portfolio — 2026
      </p>
    </section>
  );
}
