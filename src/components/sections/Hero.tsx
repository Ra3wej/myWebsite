import { profile } from '../../data/portfolio';
import { ArrowIcon } from '../ui/ArrowIcon';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="hero-overline">{profile.title}</p>
        <h1 id="hero-title">
          {profile.name}
        </h1>
        <div className="hero-intro">
          <p className="hero-statement">{profile.statement}</p>
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
      </div>
      <aside className="hero-aside" aria-label="Current professional focus">
        <p className="hero-aside__label">Currently</p>
        <p className="hero-aside__role">Backend Developer</p>
        <p className="hero-aside__company">Moonline Travel · Feb 2026 — Present</p>
        <div className="hero-aside__rule" />
        <p className="hero-aside__label">Focus</p>
        <p className="hero-aside__stack">C# / .NET / PostgreSQL / Docker / CQRS</p>
      </aside>
    </section>
  );
}
