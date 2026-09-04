'use client';

import { motion } from 'motion/react';

interface GuideSeries {
  url: string;
  title: string;
  description: string;
  partCount: number;
}

export default function Guides({ series }: Readonly<{ series: GuideSeries[] }>) {
  return (
    <section
      id="guides"
      className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-24 md:py-32"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6 mb-16 md:mb-20"
      >
        <span className="text-zinc-400 dark:text-zinc-700 font-mono text-xs">02</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-mono text-xs uppercase tracking-[0.2em]">Guides</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-900" />
      </motion.div>

      {/* Series list */}
      <div>
        {series.map((s, i) => (
          <motion.div
            key={s.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: 'easeOut' }}
          >
            <a
              href={s.url}
              className="group flex flex-col md:flex-row md:items-start gap-3 md:gap-12 py-7 border-t border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-700 dark:text-zinc-300 text-xl md:text-2xl font-medium mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-200 leading-snug">
                  {s.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-600 text-sm leading-relaxed line-clamp-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors duration-200">
                  {s.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 md:pt-1">
                <span className="text-zinc-400 dark:text-zinc-700 font-mono text-xs group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors duration-300">
                  {s.partCount} {s.partCount === 1 ? 'part' : 'parts'}
                </span>
                <span className="text-zinc-400 dark:text-zinc-700 text-sm group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-all duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          </motion.div>
        ))}

        {series.length === 0 && (
          <p className="text-zinc-400 dark:text-zinc-700 font-mono text-sm py-8 border-t border-zinc-200 dark:border-zinc-900">
            No guides yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
