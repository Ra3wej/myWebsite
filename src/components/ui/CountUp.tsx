import { useEffect, useMemo, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface ParsedValue {
  readonly decimalSeparator: '.' | ',';
  readonly fractionDigits: number;
  readonly minimumIntegerDigits: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly target: number;
}

export interface CountUpProps {
  readonly value: string;
  readonly className?: string;
  readonly duration?: number;
}

function parseValue(value: string): ParsedValue | null {
  const match = /-?\d+(?:[.,]\d+)?/.exec(value);

  if (!match || match.index === undefined) {
    return null;
  }

  const token = match[0];
  const unsignedToken = token.replace(/^-/, '');
  const decimalSeparator = unsignedToken.includes(',') ? ',' : '.';
  const [integerPart, fractionPart = ''] = unsignedToken.split(/[.,]/);
  const target = Number(token.replace(',', '.'));

  if (!Number.isFinite(target)) {
    return null;
  }

  return {
    decimalSeparator,
    fractionDigits: fractionPart.length,
    minimumIntegerDigits: integerPart.length,
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + token.length),
    target,
  };
}

function formatValue(parsed: ParsedValue, current: number) {
  const fixed = Math.abs(current).toFixed(parsed.fractionDigits);
  const [integerPart, fractionPart] = fixed.split('.');
  const integer = integerPart.padStart(parsed.minimumIntegerDigits, '0');
  const sign = current < 0 ? '-' : '';
  const fraction =
    parsed.fractionDigits > 0
      ? `${parsed.decimalSeparator}${fractionPart}`
      : '';

  return `${parsed.prefix}${sign}${integer}${fraction}${parsed.suffix}`;
}

export function CountUp({
  value,
  className = '',
  duration = 1.35,
}: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(elementRef, { amount: 0.65, once: true });
  const parsed = useMemo(() => parseValue(value), [value]);
  const initialText =
    parsed && shouldReduceMotion === false ? formatValue(parsed, 0) : value;

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (!parsed || shouldReduceMotion !== false) {
      element.textContent = value;
      return;
    }

    if (!isInView) {
      element.textContent = formatValue(parsed, 0);
      return;
    }

    if (parsed.target === 0) {
      element.textContent = value;
      return;
    }

    const controls = animate(0, parsed.target, {
      duration: Math.max(0.1, duration),
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        element.textContent = value;
      },
      onUpdate: (current) => {
        element.textContent = formatValue(parsed, current);
      },
    });

    return () => controls.stop();
  }, [duration, isInView, parsed, shouldReduceMotion, value]);

  return (
    <span className={`count-up ${className}`.trim()}>
      <span className="count-up__sr">{value}</span>
      <span aria-hidden="true" ref={elementRef}>{initialText}</span>
    </span>
  );
}
