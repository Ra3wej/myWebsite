interface ProjectHologramProps {
  readonly sequence: number;
}

export function ProjectHologram({ sequence }: ProjectHologramProps) {
  const mission = String(sequence + 1).padStart(2, '0');
  const variant = (sequence % 3) + 1;

  return (
    <div
      className={`project-hologram project-hologram--variant-${variant}`}
      aria-hidden="true"
    >
      <span className="project-hologram__grid" />
      <span className="project-hologram__halo project-hologram__halo--outer" />
      <span className="project-hologram__halo project-hologram__halo--inner" />
      <span className="project-hologram__orbit">
        <i />
        <i />
        <i />
      </span>
      <span className="project-hologram__panel project-hologram__panel--rear" />
      <span className="project-hologram__panel project-hologram__panel--mid" />
      <span className="project-hologram__core">
        <i className="project-hologram__scan" />
        <i className="project-hologram__route project-hologram__route--one" />
        <i className="project-hologram__route project-hologram__route--two" />
        <i className="project-hologram__node project-hologram__node--one" />
        <i className="project-hologram__node project-hologram__node--two" />
        <i className="project-hologram__node project-hologram__node--three" />
      </span>
      <span className="project-hologram__readout">MISSION / {mission}</span>
    </div>
  );
}
