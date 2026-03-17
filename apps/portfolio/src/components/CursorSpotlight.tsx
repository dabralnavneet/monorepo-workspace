'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorSpotlight() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Spring physics for the trailing "outer ring" of the cursor
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    // Only run on pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Update CSS custom properties for the grid spotlight
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Spotlight overlay tied to CSS custom props */}
      <div
        className="cursor-spotlight"
        aria-hidden="true"
      />

      {/* The precise crosshair dot */}
      <motion.div
        className="cursor-core"
        aria-hidden="true"
        style={{ x: cursorX, y: cursorY }}
      />

      {/* The spring-lagged outer ring */}
      <motion.div
        className="cursor-ring"
        aria-hidden="true"
        style={{ x: springX, y: springY }}
      />
    </>
  );
}
