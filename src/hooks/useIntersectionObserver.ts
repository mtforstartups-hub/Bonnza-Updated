import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  variant?: 'section' | 'card';
  staggerIndex?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reusable Intersection Observer hook that triggers CSS fade-in and slide-up animations
 * across sections and cards on scroll. Honors `prefers-reduced-motion` and degrades
 * safely when IntersectionObserver is unavailable.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -28px 0px',
    triggerOnce = true,
    variant = 'section',
    staggerIndex,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (prefersReducedMotion()) return true;
    return typeof IntersectionObserver === 'undefined';
  });

  useEffect(() => {
    if (isVisible && triggerOnce) return;

    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(node);
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, isVisible]);

  const baseClass = variant === 'card' ? 'bonnza-card-reveal' : 'bonnza-reveal';
  const clampedStagger =
    typeof staggerIndex === 'number'
      ? `bonnza-stagger-${Math.max(0, Math.min(staggerIndex, 7))}`
      : '';
  const revealClassName = [baseClass, clampedStagger, isVisible ? 'is-visible' : '']
    .filter(Boolean)
    .join(' ');

  return { ref, isVisible, revealClassName } as const;
}
