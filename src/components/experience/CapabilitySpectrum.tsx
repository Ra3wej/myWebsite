import { capabilities } from '../../data/portfolio';

const domainMeta = [
  { code: 'API', color: 'var(--color-accent)' },
  { code: 'DATA', color: 'var(--color-signal)' },
  { code: 'APP', color: 'var(--color-violet)' },
  { code: 'LINK', color: 'var(--color-accent-strong)' },
] as const;

export function CapabilitySpectrum() {
  return (
    <aside className="capability-spectrum" aria-label="Backend and mobile capability spectrum">
      <div className="capability-spectrum__header">
        <span>Build spectrum</span>
        <a href="#skills">Explore all skills</a>
      </div>
      <div className="capability-spectrum__grid">
        {capabilities.map((capability, index) => {
          const meta = domainMeta[index] ?? domainMeta[0];
          return (
            <a
              className="capability-spectrum__item"
              href="#skills"
              key={capability.title}
              style={{ '--spectrum-color': meta.color } as React.CSSProperties}
            >
              <span className="capability-spectrum__orbit" aria-hidden="true">
                <i />
                <b>{meta.code}</b>
              </span>
              <span className="capability-spectrum__copy">
                <strong>{capability.title}</strong>
                <small>{capability.skills.slice(0, 3).join(' · ')}</small>
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
