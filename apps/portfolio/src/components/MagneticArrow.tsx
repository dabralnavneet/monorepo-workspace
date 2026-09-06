'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * The row-end "→" that leans toward the cursor while it is anywhere over the
 * parent link, springing back on leave. Pointer-fine and non-reduced-motion
 * only; everywhere else it is a plain glyph.
 */
export default function MagneticArrow({
  char = '→',
  className = '',
}: Readonly<{ char?: string; className?: string }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const zone = el.closest('a, button');
    if (!zone) return;

    let frame = 0;
    const clamp = (v: number) => Math.max(-9, Math.min(9, v));
    const onMove = (event: Event) => {
      const e = event as MouseEvent;
      const r = el.getBoundingClientRect();
      const dx = clamp((e.clientX - (r.left + r.width / 2)) * 0.28);
      const dy = clamp((e.clientY - (r.top + r.height / 2)) * 0.28);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = '';
    };

    zone.addEventListener('mousemove', onMove);
    zone.addEventListener('mouseleave', onLeave);
    return () => {
      zone.removeEventListener('mousemove', onMove);
      zone.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    >
      {char}
    </span>
  );
}
