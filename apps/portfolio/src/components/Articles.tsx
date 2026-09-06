'use client';

import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import MagneticArrow from './MagneticArrow';

interface Article {
  url: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

export default function Articles({ articles }: { articles: Article[] }) {
  return (
    <section
      id="writing"
      className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full py-12 sm:py-20 md:py-32"
    >
      <SectionHeader index="01" label="Writing" />

      {/* Articles list */}
      <div>
        {articles.map((article, i) => (
          <motion.div
            key={article.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: 'easeOut' }}
          >
            <a
              href={article.url}
              className="group flex flex-col md:flex-row md:items-start gap-3 md:gap-12 py-7 border-t border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors duration-300 cursor-pointer"
            >
              {/* Date */}
              <span className="text-zinc-400 dark:text-zinc-700 font-mono text-xs shrink-0 md:pt-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors duration-300">
                {article.date}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-700 dark:text-zinc-300 text-xl md:text-2xl font-medium mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-200 leading-snug">
                  {article.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-600 text-sm leading-relaxed line-clamp-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors duration-200">
                  {article.description}
                </p>
              </div>

              {/* Read time + arrow */}
              <div className="flex items-center gap-3 shrink-0 md:pt-1">
                <span className="text-zinc-400 dark:text-zinc-700 font-mono text-xs group-hover:text-zinc-600 dark:group-hover:text-zinc-500 transition-colors duration-300">
                  {article.readTime}
                </span>
                <MagneticArrow className="text-zinc-400 dark:text-zinc-700 text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
            </a>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <p className="text-zinc-400 dark:text-zinc-700 font-mono text-sm py-8 border-t border-zinc-200 dark:border-zinc-900">
            No articles yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
