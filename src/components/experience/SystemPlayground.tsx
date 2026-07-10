import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { SceneFallback } from '../visuals/SceneFallback';
import {
  SYSTEM_DOMAINS,
  getSystemDomain,
  type SystemDomainId,
} from '../visuals/systemDomains';

const SystemCoreCanvas = lazy(() => import('../visuals/SystemCoreCanvas'));

interface SystemPlaygroundProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function SystemPlayground({ open, onClose }: SystemPlaygroundProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [activeDomain, setActiveDomain] = useState<SystemDomainId>('backend');
  const [activatedDomains, setActivatedDomains] = useState<SystemDomainId[]>([]);
  const allSystemsOnline = activatedDomains.length === SYSTEM_DOMAINS.length;
  const currentDomain = useMemo(() => getSystemDomain(activeDomain), [activeDomain]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      openerRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.body.dataset.playgroundOpen = 'true';
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      delete document.body.dataset.playgroundOpen;
    };
  }, [open]);

  const activateDomain = (id: SystemDomainId) => {
    setActiveDomain(id);
    setActivatedDomains((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  const handleClosed = () => {
    delete document.body.dataset.playgroundOpen;
    onClose();
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <dialog
      aria-describedby="playground-description"
      aria-labelledby="playground-title"
      className="system-playground"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={handleClosed}
      ref={dialogRef}
    >
      <div className="system-playground__world">
        <Suspense fallback={<SceneFallback mode="playground" />}>
          <SystemCoreCanvas
            activatedDomains={activatedDomains}
            activeDomain={activeDomain}
            mode="playground"
            onDomainSelect={activateDomain}
          />
        </Suspense>
      </div>

      <header className="system-playground__header">
        <div>
          <p>Interactive system / 01</p>
          <h2 id="playground-title">Systems control room</h2>
        </div>
        <button className="playground-close" onClick={onClose} type="button">
          <span>Exit system</span>
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <div className="system-playground__console">
        <p id="playground-description">
          Focus every domain to stabilize the network. Drag the scene to inspect the core.
        </p>
        <div className="system-domain-controls" aria-label="System domains">
          {SYSTEM_DOMAINS.map((domain, index) => {
            const activated = activatedDomains.includes(domain.id);
            return (
              <button
                aria-pressed={activeDomain === domain.id}
                className="system-domain-control"
                data-active={activeDomain === domain.id}
                data-activated={activated}
                key={domain.id}
                onClick={() => activateDomain(domain.id)}
                style={{ '--domain-color': domain.color } as React.CSSProperties}
                type="button"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{domain.label}</strong>
                <small>{domain.summary}</small>
              </button>
            );
          })}
        </div>
        <div className="system-playground__readout" aria-live="polite">
          <span>{currentDomain.signal} CHANNEL</span>
          <strong>{allSystemsOnline ? 'Network stabilized' : currentDomain.label}</strong>
          <p>
            {allSystemsOnline
              ? 'All four product domains are connected and responding.'
              : `${activatedDomains.length} / ${SYSTEM_DOMAINS.length} domains online`}
          </p>
        </div>
      </div>
    </dialog>
  );
}
