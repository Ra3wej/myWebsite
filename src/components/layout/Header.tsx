import { useEffect, useRef, useState } from 'react';
import { CommandPalette } from '../experience/CommandPalette';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      setIsOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    const sections = ['top', ...navigation.map((item) => item.href.slice(1)), 'education']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-20% 0px -64% 0px', threshold: [0, 0.1, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavigation = (href: string) => {
    closeMenu();
    const target = document.getElementById(href.slice(1));
    window.requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" data-scrolled={isScrolled}>
        <a className="wordmark" href="#top" aria-label="Rawezh Ali Rashid, home">
          <span>RA</span>
          <span>
            <strong>Backend / Mobile</strong>
            <small><i aria-hidden="true" /> System online</small>
          </span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className="primary-navigation"
          aria-label="Primary navigation"
          data-open={isOpen}
        >
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavigation(item.href)}
              data-active={activeSection === item.href.slice(1)}
              aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <CommandPalette />
      </header>
    </>
  );
}
