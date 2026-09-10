'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks the active theme as a 0/1 ref, for shaders that crossfade between a
 * light and a dark palette.
 *
 * The theme lives on `<html class="dark">` — set by Nav's toggle and by the
 * inline script in Layout.astro — so this watches the class rather than the
 * `prefers-color-scheme` media query, which would miss a manual toggle. It
 * returns a ref rather than state on purpose: a render loop reads it every
 * frame and must not re-render (or rebuild its GL context) to see a change.
 */
export function useDarkTarget(onChange?: () => void) {
  const ref = useRef(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 1 : 0,
  );
  // Kept in a ref so a changing closure never re-subscribes the observer.
  const changed = useRef(onChange);
  changed.current = onChange;

  useEffect(() => {
    const read = () => {
      const next = document.documentElement.classList.contains('dark') ? 1 : 0;
      if (next === ref.current) return;
      ref.current = next;
      // A parked render loop or a static reduced-motion frame would otherwise
      // keep showing the old palette until something unrelated repainted it.
      changed.current?.();
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('astro:after-swap', read);
    return () => {
      mo.disconnect();
      document.removeEventListener('astro:after-swap', read);
    };
  }, []);

  return ref;
}
