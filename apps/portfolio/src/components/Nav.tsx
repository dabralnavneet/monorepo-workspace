'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { IconSun, IconMoon } from '@tabler/icons-react';

/**
 * The nav items are homepage section anchors (`/#guides` …). From a sub-page
 * those bounce you back to the homepage, which is jarring once a real section
 * page exists — so on `/guides/*` the "guides" item targets the guides index
 * instead. Re-read on every `astro:page-load` because this island is persisted
 * across view-transition navigations and its props never change.
 */
function useGuidesHref() {
  const [href, setHref] = useState('/#guides');
  useEffect(() => {
    const sync = () => {
      const path = window.location.pathname;
      setHref(path === '/guides' || path.startsWith('/guides/') ? '/guides' : '/#guides');
    };
    sync();
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
  }, []);
  return href;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200"
    >
      {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
    </button>
  );
}

export default function Nav() {
  const guidesHref = useGuidesHref();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-end bg-gradient-to-b from-[#fafafa] dark:from-[#000] to-transparent"
    >
      <nav className="flex items-center gap-8">
        <a
          href="/#writing"
          className="text-zinc-600 dark:text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200"
        >
          writing
        </a>
        <a
          href={guidesHref}
          className="text-zinc-600 dark:text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200"
        >
          guides
        </a>
        <a
          href="/#contact"
          className="text-zinc-600 dark:text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200"
        >
          contact
        </a>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
