'use client';

import { motion } from 'motion/react';

const links = [
  { label: 'linkedin', href: 'https://linkedin.com/in/navneet-dabral-859707117', external: true },
  { label: 'twitter', href: 'https://twitter.com/medabral', external: true },
  { label: 'email', href: 'mailto:dabralnavneet@gmail.com', external: false },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-24 md:py-32 border-t border-zinc-900"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6 mb-16 md:mb-20"
      >
        <span className="text-zinc-700 font-mono text-xs">02</span>
        <span className="text-zinc-200 font-mono text-xs uppercase tracking-[0.2em]">Contact</span>
        <div className="flex-1 h-px bg-zinc-900" />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-20">
        {/* Heading */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-semibold text-white tracking-tighter leading-none mb-4"
          >
            Say hello.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-zinc-500 text-sm leading-relaxed max-w-xs"
          >
            Open to interesting engineering problems, ambitious products, and conversations worth having.
          </motion.p>
        </div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-3 text-zinc-500 font-mono text-sm hover:text-zinc-200 transition-colors duration-200"
            >
              <span className="w-4 h-px bg-zinc-800 group-hover:w-6 group-hover:bg-zinc-500 transition-all duration-300" />
              {link.label}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">↗</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 md:mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-zinc-700 font-mono text-xs"
      >
        <span>NAVNEET DABRAL</span>
        <span>© {new Date().getFullYear()}</span>
      </motion.div>
    </footer>
  );
}
