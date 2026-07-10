import { lazy, Suspense, useEffect, useState } from 'react';
import { profile } from '../../data/portfolio';
import { SystemPlayground } from '../experience/SystemPlayground';
import { SceneFallback } from '../visuals/SceneFallback';
import { ArrowIcon } from '../ui/ArrowIcon';
import { MagneticLink } from '../ui/MagneticLink';
import { Reveal } from '../ui/Reveal';

const SystemCoreCanvas = lazy(() => import('../visuals/SystemCoreCanvas'));

export function Hero() {
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [canRenderHero3D, setCanRenderHero3D] = useState(() =>
    window.matchMedia('(min-width: 40.001rem) and (prefers-reduced-motion: no-preference)').matches,
  );
  const nameParts = profile.name.split(' ');

  useEffect(() => {
    const query = window.matchMedia(
      '(min-width: 40.001rem) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => setCanRenderHero3D(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <>
      <section id="top" className="hero hero--systems" aria-labelledby="hero-title">
        <div className="hero-world" aria-hidden="true">
          {canRenderHero3D ? (
            <Suspense fallback={<SceneFallback />}>
              <SystemCoreCanvas mode="hero" />
            </Suspense>
          ) : (
            <SceneFallback />
          )}
        </div>

        <div className="hero-content hero-content--systems">
          <Reveal axis="y" delay={0.03}>
            <p className="hero-overline">
              <span>{profile.title}</span>
              <span aria-hidden="true">CORE / ONLINE</span>
            </p>
          </Reveal>
          <Reveal axis="y" delay={0.09}>
            <h1 id="hero-title" aria-label={profile.name}>
              {nameParts.map((part, index) => (
                <span key={`${part}-${index}`}>{part}</span>
              ))}
            </h1>
          </Reveal>
          <Reveal className="hero-intro" axis="y" delay={0.16} amount={0.3}>
            <p className="hero-statement">{profile.statement}</p>
            <p>{profile.introduction}</p>
          </Reveal>
          <Reveal className="hero-actions" axis="y" delay={0.23}>
            <MagneticLink
              className="button button--primary"
              href={`mailto:${profile.email}`}
              strength={8}
            >
              Start a conversation
              <ArrowIcon />
            </MagneticLink>
            <button
              className="button button--secondary button--launch"
              onClick={() => setIsPlaygroundOpen(true)}
              type="button"
            >
              <span>Launch system</span>
              <span className="launch-signal" aria-hidden="true"><i /><i /><i /></span>
            </button>
            <MagneticLink className="hero-work-link" href="#work" strength={5}>
              View mission archive
              <ArrowIcon direction="down" />
            </MagneticLink>
          </Reveal>
        </div>

        <aside
          className="hero-aside hero-aside--systems"
          aria-label="Current professional focus"
        >
          <Reveal className="hero-aside__motion" axis="x" delay={0.2}>
            <p className="hero-aside__label">Currently</p>
            <p className="hero-aside__role">Backend Developer</p>
            <p className="hero-aside__company">Moonline Travel · Feb 2026 — Present</p>
            <div className="hero-aside__rule" />
            <p className="hero-aside__label">Focus</p>
            <p className="hero-aside__stack">C# / .NET / PostgreSQL / Docker / CQRS</p>
            <div className="hero-telemetry" aria-hidden="true">
              <span><i /> API</span>
              <span><i /> DATA</span>
              <span><i /> MOBILE</span>
            </div>
          </Reveal>
        </aside>

        <a className="hero-scroll-cue" href="#about">
          <span>Scroll to enter</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <SystemPlayground
        onClose={() => setIsPlaygroundOpen(false)}
        open={isPlaygroundOpen}
      />
    </>
  );
}
