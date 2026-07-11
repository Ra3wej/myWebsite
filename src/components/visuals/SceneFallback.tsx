import { SYSTEM_DOMAINS } from './systemDomains';

interface SceneFallbackProps {
  readonly mode?: 'hero' | 'playground';
}

export function SceneFallback({ mode = 'hero' }: SceneFallbackProps) {
  return (
    <div className={`scene-fallback scene-fallback--${mode}`} aria-hidden="true">
      <span className="scene-fallback__grid" />
      <span className="scene-fallback__orbit scene-fallback__orbit--outer" />
      <span className="scene-fallback__orbit scene-fallback__orbit--inner" />
      <span className="scene-fallback__core">
        <i />
        <i />
        <i />
      </span>
      {SYSTEM_DOMAINS.map((domain, index) => (
        <span
          className={`scene-fallback__node scene-fallback__node--${index + 1}`}
          key={domain.id}
          style={{ '--node-color': domain.color } as React.CSSProperties}
        >
          <i />
          <small>{domain.signal}</small>
        </span>
      ))}
      <span className="scene-fallback__scan">STATIC SYSTEM MAP</span>
    </div>
  );
}
