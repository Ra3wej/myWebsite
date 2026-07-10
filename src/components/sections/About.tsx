import { aboutCopy, proofPoints } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { CountUp } from '../ui/CountUp';
import { Reveal } from '../ui/Reveal';
import { TiltSurface } from '../ui/TiltSurface';

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="From mobile products to backend systems."
      className="about-section"
    >
      <Reveal className="about-copy about-copy--cinematic" delay={0.04} axis="y" amount={0.25}>
        <p className="about-lead">{aboutCopy.lead}</p>
        <div>
          <p className="mono-label">{aboutCopy.eyebrow}</p>
          <p>{aboutCopy.body}</p>
        </div>
      </Reveal>
      <Reveal className="proof-grid proof-grid--cinematic" delay={0.12} axis="y" amount={0.3}>
        {proofPoints.map((point, index) => (
          <article key={point.label} className="proof-card proof-card--cinematic">
            <TiltSurface className="proof-card__surface">
              <span className="proof-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong>
                <CountUp value={point.value} duration={1.2 + index * 0.12} />
              </strong>
              <span>{point.label}</span>
            </TiltSurface>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
