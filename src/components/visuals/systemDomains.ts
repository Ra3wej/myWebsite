export type SystemDomainId =
  | 'backend'
  | 'data'
  | 'infrastructure'
  | 'mobile';

export interface SystemDomain {
  readonly id: SystemDomainId;
  readonly label: string;
  readonly summary: string;
  readonly signal: string;
  readonly color: string;
  readonly position: [number, number, number];
}

export const SYSTEM_DOMAINS: readonly SystemDomain[] = [
  {
    id: 'backend',
    label: 'Backend systems',
    summary: 'C# / .NET Web API / CQRS',
    signal: 'API',
    color: '#d4a56b',
    position: [-2.45, 1.35, 0.15],
  },
  {
    id: 'data',
    label: 'Data workflows',
    summary: 'PostgreSQL / SQL Server',
    signal: 'DB',
    color: '#68e4ee',
    position: [2.5, 1.2, -0.15],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    summary: 'Docker / Firebase',
    signal: 'OPS',
    color: '#987dff',
    position: [-2.35, -1.45, -0.05],
  },
  {
    id: 'mobile',
    label: 'Mobile products',
    summary: 'Flutter / Android / iOS',
    signal: 'APP',
    color: '#f0c486',
    position: [2.4, -1.5, 0.2],
  },
] as const;

export function getSystemDomain(id: SystemDomainId) {
  return SYSTEM_DOMAINS.find((domain) => domain.id === id) ?? SYSTEM_DOMAINS[0];
}
