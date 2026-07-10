import { profile } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { ArrowIcon } from '../ui/ArrowIcon';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s talk."
      className="contact-section"
    >
      <div className="contact-panel contact-panel--cinematic">
        <span className="contact-panel__halo" aria-hidden="true" />
        <Reveal className="contact-panel__intro" delay={0.1} axis="y" amount={0.4}>
          <p>
            Looking for a backend or mobile developer who understands both system
            boundaries and product experience?
          </p>
        </Reveal>
        <Reveal className="contact-panel__action" delay={0.18} axis="y" amount={0.35}>
          <a className="contact-email contact-email--cinematic" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <ArrowIcon />
          </a>
        </Reveal>
        <Reveal className="contact-meta" delay={0.26} axis="y" amount={0.4}>
          <span>Based in {profile.location}</span>
          <span>Available by email</span>
        </Reveal>
      </div>
    </Section>
  );
}
