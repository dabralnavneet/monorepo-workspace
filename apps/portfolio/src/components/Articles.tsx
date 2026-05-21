'use client';

import { motion } from 'motion/react';

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
        <span className="text-zinc-700 font-mono text-xs">01</span>
        <span className="text-zinc-200 font-mono text-xs uppercase tracking-[0.2em]">Writing</span>
        <div className="flex-1 h-px bg-zinc-900" />
      </motion.div>

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
              className="group flex flex-col md:flex-row md:items-start gap-3 md:gap-12 py-7 border-t border-zinc-900 hover:border-zinc-800 transition-colors duration-300 cursor-pointer"
            >
              {/* Date */}
              <span className="text-zinc-700 font-mono text-xs shrink-0 md:pt-1 group-hover:text-zinc-500 transition-colors duration-300">
                {article.date}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-300 text-xl md:text-2xl font-medium mb-2 group-hover:text-white transition-colors duration-200 leading-snug">
                  {article.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2 group-hover:text-zinc-500 transition-colors duration-200">
                  {article.description}
                </p>
              </div>

              {/* Read time + arrow */}
              <div className="flex items-center gap-3 shrink-0 md:pt-1">
                <span className="text-zinc-700 font-mono text-xs group-hover:text-zinc-500 transition-colors duration-300">
                  {article.readTime}
                </span>
                <span className="text-zinc-700 text-sm group-hover:text-zinc-300 transition-all duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <p className="text-zinc-700 font-mono text-sm py-8 border-t border-zinc-900">
            No articles yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
