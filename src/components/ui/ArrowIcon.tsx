interface ArrowIconProps {
  readonly direction?: 'up-right' | 'down';
}

export function ArrowIcon({ direction = 'up-right' }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon arrow-icon--${direction}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 16 16 4M7 4h9v9" />
    </svg>
  );
}
