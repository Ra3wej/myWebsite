import { profile } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { ArrowIcon } from '../ui/ArrowIcon';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Let’s build something dependable."
      className="contact-section"
    >
      <Reveal className="contact-panel">
        <p>
          Looking for a backend or mobile developer who understands both system
          boundaries and product experience?
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span>
          <ArrowIcon />
        </a>
        <div className="contact-meta">
          <span>Based in {profile.location}</span>
          <span>Available by email</span>
        </div>
      </Reveal>
    </Section>
  );
}
