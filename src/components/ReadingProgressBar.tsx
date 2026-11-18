import type { RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export interface ReadingProgressBarProps {
  label?: string;
  targetRef?: RefObject<HTMLElement | null>;
}

export function ReadingProgressBar({ label, targetRef }: ReadingProgressBarProps) {
  const { scrollYProgress } = useScroll(
    targetRef
      ? {
          target: targetRef,
          offset: ['start 64px', 'end end'],
        }
      : undefined
  );

  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      role="region"
      aria-label={label || 'Reading progress'}
      className="fixed top-0 left-0 right-0 z-50 h-[3.5px] bg-[#1A1B1A]/10 pointer-events-none no-print"
    >
      <motion.div
        className="h-full w-full bg-[#E5B622] origin-left"
        style={{
          scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress,
        }}
      />
    </div>
  );
}
