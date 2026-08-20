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
        className="text-zinc-500 dark:text-zinc-600 font-mono text-xs uppercase tracking-[0.25em] mb-8 md:mb-10"
      >
        Senior Software Engineer
      </motion.p>

      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-8 mb-12 md:mb-16">
      {/* Name — line-by-line reveal */}
      <motion.div variants={container} initial="hidden" animate="show">
        <div className="overflow-hidden">
          <motion.h1
            variants={lineReveal}
            className="font-semibold leading-[0.88] tracking-tighter text-zinc-900 dark:text-white select-none"
            style={{ fontSize: 'clamp(72px, 11.5vw, 152px)' }}
          >
            Navneet
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            variants={lineReveal}
            className="font-semibold leading-[0.88] tracking-tighter text-zinc-400 dark:text-zinc-500 select-none"
            style={{ fontSize: 'clamp(72px, 11.5vw, 152px)' }}
          >
            Dabral.
          </motion.h1>
        </div>
      </motion.div>

      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        whileHover={{ rotate: 0, scale: 1.03 }}
        className="group relative shrink-0 w-40 h-48 md:w-56 md:h-64 lg:w-64 lg:h-72"
      >
        {/* Offset gradient frame */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-gradient-to-br from-purple-500 via-cyan-400 to-purple-500 opacity-70 blur-[2px] transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
        {/* Ambient glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-400/20 blur-3xl -z-10" />
        <img
          src="/images/me.png"
          alt="Navneet Dabral"
          className="relative w-full h-full rounded-2xl object-cover border border-zinc-300 dark:border-zinc-800 shadow-2xl grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0"
        />
      </motion.div>
      </div>

      {/* Bio + CTAs row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16"
      >
        <motion.p
          variants={fadeUp}
          className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-md font-light"
        >
          {years}+ years building products at scale.
          <br className="hidden md:block" />
          Engineering precision meets product vision.
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center gap-3 shrink-0">
          <a
            href="#writing"
            className="px-5 py-2.5 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-mono hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-300"
          >
            see writing →
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-mono hover:bg-black dark:hover:bg-white transition-all duration-300"
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
          className="w-px h-10 bg-zinc-400 dark:bg-zinc-700 origin-top"
        />
      </motion.div>
    </section>
  );
}
