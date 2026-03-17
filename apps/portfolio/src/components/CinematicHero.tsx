'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// The three rotating "impact statements" that cycle in the hero
const IMPACT_LINES = [
  '25% growth in conversion.',
  '60% faster page loads.',
  '100k+ merchants served.',
  '4 products shipped to scale.',
  '6 years of execution.',
];

export default function CinematicHero({ years, months }: { years: number; months: number }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<'hook' | 'reveal'>('hook');

  useEffect(() => {
    // Cycle through impact lines
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        const next = (prev + 1) % IMPACT_LINES.length;
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // After 1.2s, transition from hook to reveal phase
    const t = setTimeout(() => setPhase('reveal'), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex flex-col items-center text-center px-4 z-10 w-full max-w-5xl mx-auto">

      {/* ── Phase 1: Hook statement — vanishes upward ── */}
      <AnimatePresence>
        {phase === 'hook' && (
          <motion.div
            key="hook"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs text-stone-400 uppercase tracking-[0.3em] mb-6">
              Senior Software Engineer
            </p>
            <h1
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-800 leading-[1]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {years} years of
              <br />
              <span className="text-stone-400">shipping</span> things
              <br />
              that <span className="italic">matter.</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 2: Full hero reveal ── */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            className="flex flex-col items-center gap-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-stone-800 leading-none"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              Navneet
              <br />
              <span className="text-stone-400">Dabral.</span>
            </motion.h1>

            {/* Rotating impact line */}
            <div className="h-8 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLine}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-sm sm:text-base text-stone-500 tracking-wide"
                >
                  {IMPACT_LINES[currentLine]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-stone-300"
            />

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-lg text-sm sm:text-base text-stone-500 leading-relaxed font-light"
            >
              {years} years building products at scale — from Reliance Jio to C2FO to BMW.
              I close the gap between engineering precision and product vision.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4 mt-2"
            >
              <a
                href="#prototypes"
                className="px-6 py-3 bg-stone-800 text-white font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-stone-700 transition-colors"
              >
                See the Work
              </a>
              <a
                href="#experience"
                className="px-6 py-3 border border-stone-200 text-stone-600 font-mono text-xs uppercase tracking-widest rounded-xl hover:border-stone-800 hover:text-stone-800 transition-all"
              >
                The Journey
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll prompt */}
      {phase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent"
          />
          <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">Scroll</span>
        </motion.div>
      )}
    </div>
  );
}
