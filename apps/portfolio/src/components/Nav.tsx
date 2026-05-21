'use client';

import { motion } from 'motion/react';

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, #000 60%, transparent)' }}
    >
      <a
        href="/"
        className="text-zinc-100 font-mono text-sm tracking-tight hover:text-white transition-colors duration-200"
      >
        navneet dabral
      </a>
      <nav className="flex items-center gap-8">
        <a
          href="#writing"
          className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] hover:text-zinc-200 transition-colors duration-200"
        >
          writing
        </a>
        <a
          href="#contact"
          className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] hover:text-zinc-200 transition-colors duration-200"
        >
          contact
        </a>
      </nav>
    </motion.header>
  );
}
