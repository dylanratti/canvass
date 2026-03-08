'use client';
import { useEffect, useRef } from 'react';
export default function SR({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    requestAnimationFrame(() => {
      el.classList.add('ready');
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setTimeout(() => el.classList.add('show'), delay); obs.unobserve(el); }
      }, { threshold: 0.07 });
      obs.observe(el);
    });
  }, [delay]);
  return <div ref={ref} className={`sr ${className}`}>{children}</div>;
}
