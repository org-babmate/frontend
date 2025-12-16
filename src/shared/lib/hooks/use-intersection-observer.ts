import { useEffect, useRef } from 'react';

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = '0px',
  threshold = 1.0,
}: {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
}) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      },
    );

    const el = targetRef.current;
    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, onIntersect, rootMargin, threshold]);

  return targetRef;
}
