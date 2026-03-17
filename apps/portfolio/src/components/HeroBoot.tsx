'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_LINES = [
  { text: '> INITIALIZING PORTFOLIO_OS v2026...', delay: 0 },
  { text: '> LOADING CORE MODULES [ ████████████ ] 100%', delay: 400 },
  { text: '> ARCHITECTURE: FRONTEND-HEAVY / FULL-STACK', delay: 750 },
  { text: '> IDENTITY: Navneet Dabral — Senior Software Engineer', delay: 1100 },
  { text: '> STATUS: ONLINE ●', delay: 1450 },
];

const SESSION_KEY = 'portfolio_boot_played';

interface HeroBootProps {
  children: React.ReactNode;
}

export default function HeroBoot({ children }: HeroBootProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    // Only play boot once per session
    if (sessionStorage.getItem(SESSION_KEY)) {
      setSkip(true);
      setBootDone(true);
      return;
    }

    // Hide the default cursor styling during boot
    document.body.style.cursor = 'none';

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    // After all lines appear, wait then reveal hero
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      document.body.style.cursor = '';
      setBootDone(true);
    }, 2000);

    timers.push(doneTimer);

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.cursor = '';
    };
  }, []);

  if (skip) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      {!bootDone ? (
        <motion.div
          key="boot"
          className="flex flex-col items-start justify-center gap-3 font-mono px-4 max-w-2xl w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {BOOT_LINES.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`text-xs sm:text-sm tracking-wider ${
                    i === BOOT_LINES.length - 1
                      ? 'text-stone-800 font-semibold'
                      : 'text-stone-500'
                  }`}
                >
                  {line.text}
                  {i === visibleLines.length - 1 && visibleLines.length < BOOT_LINES.length && (
                    <span className="inline-block w-2 h-4 bg-stone-400 ml-1 animate-pulse align-middle" />
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
