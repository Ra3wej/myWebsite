import type { ReactNode } from 'react';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { ScrollProgress } from './ScrollProgress';
import { SmoothScroll } from './SmoothScroll';

interface ExperienceRootProps {
  readonly children: ReactNode;
}

export function ExperienceRoot({ children }: ExperienceRootProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </LazyMotion>
    </MotionConfig>
  );
}
