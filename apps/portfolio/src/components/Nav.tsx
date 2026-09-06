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

/**
 * On the landing page, tracks which section (`#writing` / `#guides` / `#contact`)
 * is centred in the viewport so the matching nav item can pick up the accent.
 * Inactive anywhere else.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const build = () => {
      if (window.location.pathname !== '/') {
        setActive(null);
        return () => {};
      }
      const els = ['writing', 'guides', 'contact']
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (els.length === 0) return () => {};

      const io = new IntersectionObserver(
        (entries) => {
          const top = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (top) setActive(top.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    };

    let teardown = build();
    const onLoad = () => {
      teardown();
      teardown = build();
    };
    document.addEventListener('astro:page-load', onLoad);
    return () => {
      teardown();
      document.removeEventListener('astro:page-load', onLoad);
    };
  }, []);
  return active;
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
  const active = useActiveSection();

  const items = [
    { key: 'writing', label: 'writing', href: '/#writing' },
    { key: 'guides', label: 'guides', href: guidesHref },
    { key: 'contact', label: 'contact', href: '/#contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-end bg-gradient-to-b from-[#fafafa] dark:from-[#000] to-transparent"
    >
      <nav className="flex items-center gap-5 sm:gap-8">
        {items.map((it) => (
          <a
            key={it.key}
            href={it.href}
            className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
              active === it.key
                ? 'text-cyan-600 dark:text-cyan-400'
                : 'text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {it.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
