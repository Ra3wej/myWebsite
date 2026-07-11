import { profile } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="site-footer">
      <p>Designed & built by {profile.name}</p>
      <div className="footer-system">
        <span><i aria-hidden="true" /> System stable</span>
        <p>© {new Date().getFullYear()} — Sulaymaniyah, Iraq</p>
      </div>
    </footer>
  );
}
