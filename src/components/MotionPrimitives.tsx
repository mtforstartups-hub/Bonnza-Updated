import { useEffect, useState, type ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function delayIndexFromSeconds(delaySeconds: number): number {
  if (delaySeconds <= 0) return 0;
  return Math.max(0, Math.min(7, Math.round((delaySeconds * 1000) / 50)));
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
  as = 'div',
  trigger = 'mount',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'h1' | 'h2' | 'p' | 'span';
  trigger?: 'mount' | 'inView';
}) {
  const staggerIndex = delayIndexFromSeconds(delay);
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    triggerOnce: true,
    variant: 'card',
    staggerIndex,
  });

  const [mountedVisible, setMountedVisible] = useState(false);

  useEffect(() => {
    if (trigger !== 'mount') return;
    const raf = window.requestAnimationFrame(() => setMountedVisible(true));
    return () => window.cancelAnimationFrame(raf);
  }, [trigger]);

  const active = trigger === 'mount' ? mountedVisible : isVisible;
  const delayClass = `bonnza-stagger-${staggerIndex}`;
  const Tag = as;

  return (
    <Tag
      ref={trigger === 'inView' ? (ref as never) : undefined}
      className={`bonnza-card-reveal ${delayClass} ${active ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, revealClassName } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -28px 0px',
    triggerOnce: true,
    variant: 'section',
    staggerIndex: delay > 0 ? delayIndexFromSeconds(delay) : undefined,
  });

  return (
    <div ref={ref} className={`${revealClassName} ${className}`.trim()}>
      {children}
    </div>
  );
}

export const RevealSection = ScrollReveal;

export function StaggerRevealItem({
  children,
  index = 0,
  className = '',
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const { ref, revealClassName } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.06,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: true,
    variant: 'card',
    staggerIndex: index,
  });

  return (
    <div ref={ref} className={`${revealClassName} ${className}`.trim()}>
      {children}
    </div>
  );
}
