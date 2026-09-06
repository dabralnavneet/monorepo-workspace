'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The "01 / Writing / ————" row shared by every landing section. The rule draws
 * itself in from the left as the header scrolls into view, a cyan nib tracing
 * the leading edge — a nod to the hand-drawn diagrams in the guides.
 */
export default function SectionHeader({
  index,
  label,
}: Readonly<{ index: string; label: string }>) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-6 mb-8 sm:mb-14 md:mb-20"
    >
      <span className="text-zinc-400 dark:text-zinc-700 font-mono text-xs">{index}</span>
      <span className="text-zinc-800 dark:text-zinc-200 font-mono text-xs uppercase tracking-[0.2em]">
        {label}
      </span>

      <div className="relative flex-1 h-px">
        <motion.div
          className="absolute inset-0 origin-left bg-zinc-200 dark:bg-zinc-900"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        />
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute top-1/2 h-1.5 w-1.5 -mt-[3px] rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.55)]"
            initial={{ left: '0%', opacity: 0 }}
            whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15, opacity: { times: [0, 0.12, 0.82, 1] } }}
          />
        )}
      </div>
    </motion.div>
  );
}
