import { profile } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="site-footer">
      <p>Designed & built by {profile.name}</p>
      <p>© {new Date().getFullYear()} — Sulaymaniyah, Iraq</p>
    </footer>
  );
}
