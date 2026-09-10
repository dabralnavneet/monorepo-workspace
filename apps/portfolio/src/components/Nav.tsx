'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';
import NavCanvas, { type NavSeg } from './NavCanvas';

/**
 * Nav — a glass bar with a WebGL highlight.
 *
 * The links are real anchors: keyboard focus, screen readers and Astro's view
 * transitions all keep working, and WebGL only ever draws *behind* them. The
 * bar itself is transparent over the hero and materialises into frosted glass
 * as you scroll (CSS `backdrop-filter`, which can sample the page behind it —
 * the one thing the shader can't do). `NavCanvas` adds the moving light.
 *
 * Below `sm` the links collapse into a full-screen sheet (Radix Dialog, so
 * focus trapping and escape-to-close come for free).
 */

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
      const els = ['path', 'writing', 'guides', 'contact']
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

function ThemeToggle({ onToggle, size = 16 }: Readonly<{ onToggle?: () => void; size?: number }>) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
    onToggle?.();
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      {isDark ? <IconSun size={size} /> : <IconMoon size={size} />}
    </button>
  );
}

export default function Nav() {
  const guidesHref = useGuidesHref();
  const active = useActiveSection();
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items = [
    { key: 'path', label: 'path', index: '01', href: '/#path' },
    { key: 'writing', label: 'writing', index: '02', href: '/#writing' },
    { key: 'guides', label: 'guides', index: '03', href: guidesHref },
    { key: 'contact', label: 'contact', index: '04', href: '/#contact' },
  ];

  // Shared with NavCanvas: where the highlight wants to be, how far the glass
  // has materialised, and the hook that wakes its parked render loop.
  const segRef = useRef<NavSeg>({ x: 0, halfWidth: 0, strength: 0 });
  const glassRef = useRef(0);
  const pokeRef = useRef<(() => void) | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const poke = useCallback(() => pokeRef.current?.(), []);

  /** The DOM is the source of truth for item positions — measure, don't model. */
  const syncSeg = useCallback(() => {
    const key = hovered ?? active;
    const row = rowRef.current;
    const el = key ? itemRefs.current[key] : null;
    const rb = row?.getBoundingClientRect();
    const eb = el?.getBoundingClientRect();
    // Below `sm` the desktop links are `display:none`, so they measure 0×0 and
    // would anchor the highlight to the bar's left edge — a stray pill behind
    // the wordmark. A zero-width item means "no highlight", not "highlight at 0".
    if (!rb || !eb || eb.width === 0) {
      // Fade out in place rather than sliding back to the origin.
      segRef.current = { ...segRef.current, strength: 0 };
    } else {
      segRef.current = {
        x: eb.left - rb.left + eb.width / 2,
        halfWidth: eb.width / 2 + 12,
        strength: 1,
      };
    }
    poke();
  }, [hovered, active, poke]);

  useEffect(() => {
    syncSeg();
  }, [syncSeg]);

  useEffect(() => {
    window.addEventListener('resize', syncSeg);
    document.addEventListener('astro:page-load', syncSeg);
    // Item widths shift when the webfont swaps in, which moves the highlight.
    document.fonts?.ready.then(syncSeg).catch(() => {});
    return () => {
      window.removeEventListener('resize', syncSeg);
      document.removeEventListener('astro:page-load', syncSeg);
    };
  }, [syncSeg]);

  useEffect(() => {
    const scrolledNow = { current: false };
    const onScroll = () => {
      const g = Math.min(1, window.scrollY / 80);
      glassRef.current = g;
      const next = g > 0.5;
      if (next !== scrolledNow.current) {
        scrolledNow.current = next;
        setScrolled(next);
      }
      poke();
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('astro:page-load', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('astro:page-load', onScroll);
    };
  }, [poke]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="nav-shell fixed inset-x-0 top-0 z-50"
      data-scrolled={scrolled}
    >
      <div
        ref={rowRef}
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-20"
      >
        <NavCanvas segRef={segRef} glassRef={glassRef} pokeRef={pokeRef} />

        {/* Wordmark — also the way home from a guide page. */}
        <a
          href="/"
          className="relative z-10 text-zinc-800 transition-colors duration-200 hover:text-cyan-600 dark:text-zinc-100 dark:hover:text-cyan-400"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: '22px',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          ND
        </a>

        {/* Desktop links */}
        <nav
          className="relative z-10 hidden items-center gap-8 sm:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {items.map((it) => (
            <a
              key={it.key}
              href={it.href}
              ref={(el) => {
                itemRefs.current[it.key] = el;
              }}
              onMouseEnter={() => setHovered(it.key)}
              onFocus={() => setHovered(it.key)}
              onBlur={() => setHovered(null)}
              className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                active === it.key
                  ? 'text-cyan-700 dark:text-cyan-200'
                  : 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              }`}
            >
              {it.label}
            </a>
          ))}
          <ThemeToggle onToggle={poke} />
        </nav>

        {/* Mobile trigger + sheet */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <div className="relative z-10 flex items-center gap-5 sm:hidden">
            <ThemeToggle onToggle={poke} />
            <Dialog.Trigger asChild>
              <button
                aria-label="Open menu"
                className="text-zinc-700 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                <IconMenu2 size={20} />
              </button>
            </Dialog.Trigger>
          </div>

          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="nav-sheet fixed inset-0 z-[60]"
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount aria-describedby={undefined}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[70] flex flex-col px-6 py-4"
                  >
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-zinc-800 dark:text-zinc-100"
                        style={{
                          fontFamily: '"Instrument Serif", Georgia, serif',
                          fontSize: '22px',
                          lineHeight: 1,
                        }}
                      >
                        ND
                      </span>
                      <Dialog.Close asChild>
                        <button
                          aria-label="Close menu"
                          className="rounded-full p-1 text-zinc-700 transition-colors duration-200 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 dark:text-zinc-300 dark:hover:text-zinc-100"
                        >
                          <IconX size={22} />
                        </button>
                      </Dialog.Close>
                    </div>

                    <nav className="flex flex-1 flex-col justify-center gap-2">
                      {items.map((it, i) => (
                        <motion.a
                          key={it.key}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                          className="group flex items-baseline gap-4 border-b border-zinc-200 py-5 dark:border-zinc-800"
                        >
                          <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                            {it.index}
                          </span>
                          <span
                            className="text-zinc-800 transition-colors duration-200 group-hover:text-cyan-600 dark:text-zinc-100 dark:group-hover:text-cyan-400"
                            style={{
                              fontFamily: '"Instrument Serif", Georgia, serif',
                              fontSize: 'clamp(34px, 11vw, 52px)',
                              lineHeight: 1.1,
                            }}
                          >
                            {it.label}
                          </span>
                        </motion.a>
                      ))}
                    </nav>

                    {/* The bar's own toggle is behind the sheet, so the menu
                        carries its own. */}
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400 dark:text-zinc-600">
                        Navneet Dabral
                      </p>
                      <ThemeToggle onToggle={poke} size={18} />
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </motion.header>
  );
}
