'use client';

import { motion } from 'motion/react';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const lineReveal = {
  hidden: { y: '110%' },
  show: {
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero({ years }: { years: number }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pt-24 pb-16">

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-zinc-600 font-mono text-xs uppercase tracking-[0.25em] mb-8 md:mb-10"
      >
        Senior Software Engineer
      </motion.p>

      {/* Name — line-by-line reveal */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-12 md:mb-16">
        <div className="overflow-hidden">
          <motion.h1
            variants={lineReveal}
            className="font-semibold leading-[0.88] tracking-tighter text-white select-none"
            style={{ fontSize: 'clamp(72px, 11.5vw, 152px)' }}
          >
            Navneet
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            variants={lineReveal}
            className="font-semibold leading-[0.88] tracking-tighter text-zinc-500 select-none"
            style={{ fontSize: 'clamp(72px, 11.5vw, 152px)' }}
          >
            Dabral.
          </motion.h1>
        </div>
      </motion.div>

      {/* Bio + CTAs row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16"
      >
        <motion.p
          variants={fadeUp}
          className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md font-light"
        >
          {years}+ years building products at scale.
          <br className="hidden md:block" />
          Engineering precision meets product vision.
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center gap-3 shrink-0">
          <a
            href="#writing"
            className="px-5 py-2.5 border border-zinc-800 text-zinc-400 text-sm font-mono hover:border-zinc-500 hover:text-zinc-200 transition-all duration-300"
          >
            see writing →
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-zinc-100 text-zinc-900 text-sm font-mono hover:bg-white transition-all duration-300"
          >
            get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex flex-col items-start gap-2"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
          className="w-px h-10 bg-zinc-700 origin-top"
        />
      </motion.div>
    </section>
  );
}
