import type { ReactNode } from 'react';
import { ArrowIcon } from './ArrowIcon';

interface ExternalLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function ExternalLink({
  href,
  children,
  className = '',
  ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`external-link ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}
