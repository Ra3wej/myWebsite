import { useEffect, useRef, useState } from 'react';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
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

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Rawezh Ali Rashid, home">
          <span>RA</span>
          <span>Backend / Mobile</span>
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
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
