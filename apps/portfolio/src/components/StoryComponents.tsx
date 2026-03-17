'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

// — Fade-in-on-scroll wrapper ————————————————————————
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// — Chapter divider ————————————————————————————————————
export function ChapterDivider({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <div ref={ref} className="w-full py-20 sm:py-28 flex flex-col items-center text-center px-4">
      {/* Chapter number */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.05em' }}
        animate={isInView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="font-mono text-xs text-stone-400 uppercase mb-4"
      >
        {number}
      </motion.p>

      {/* Chapter title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-stone-800 leading-none"
        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
      >
        {title}
      </motion.h2>

      {/* Expanding rule */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '120px' } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="h-px bg-stone-800 mt-6"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-stone-500 font-mono text-sm max-w-md"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// — Stat callout ————————————————————————————————————————
export function StatCallout({
  number,
  label,
  delay = 0,
}: {
  number: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-6 py-4"
    >
      <span
        className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-stone-800"
        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
      >
        {number}
      </span>
      <span className="mt-1 font-mono text-xs text-stone-500 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}
