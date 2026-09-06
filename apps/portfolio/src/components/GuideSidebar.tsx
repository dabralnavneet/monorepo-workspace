'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import {
  IconChevronDown,
  IconChevronLeft,
  IconMenu2,
  IconX,
  IconNetwork,
  IconDatabase,
  IconCpu,
  IconServer2,
  IconPlugConnected,
  IconBrain,
  IconTruck,
  IconSettings,
  IconShieldLock,
  IconFolder,
  IconBrandAws,
} from '@tabler/icons-react';
import type { SidebarDomain } from '../lib/aws-saa-curriculum';

const domainIcons: Record<string, typeof IconNetwork> = {
  Networking: IconNetwork,
  Storage: IconServer2,
  Compute: IconCpu,
  Database: IconDatabase,
  'Application Integration': IconPlugConnected,
  'Data and ML': IconBrain,
  'Migration and Transfer': IconTruck,
  'Management and Governance': IconSettings,
  Security: IconShieldLock,
};

const stripSlash = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p);

/**
 * The active topic's `order`, derived from the current URL rather than a prop.
 * This island is kept mounted across Astro view-transition navigations
 * (`transition:persist`), so it can't rely on props changing — instead it
 * re-reads `location.pathname` on every `astro:page-load`.
 */
function useActiveOrder(domains: SidebarDomain[], fallback?: number) {
  const resolve = () => {
    if (typeof window === 'undefined') return fallback;
    const path = stripSlash(window.location.pathname);
    for (const d of domains) {
      for (const t of d.topics) {
        if (t.url && stripSlash(t.url) === path) return t.order;
      }
    }
    return fallback;
  };

  const [order, setOrder] = useState<number | undefined>(resolve);

  useEffect(() => {
    const sync = () => setOrder(resolve());
    sync();
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains]);

  return order;
}

/**
 * Panel header that fills the space above the domain list (left of the fixed
 * global nav): series identity + a live "published / planned" progress bar
 * summed across every domain in the curriculum.
 */
function SidebarHeader({ domains }: Readonly<{ domains: SidebarDomain[] }>) {
  const published = domains.reduce((sum, d) => sum + d.publishedCount, 0);
  const total = domains.reduce((sum, d) => sum + d.topics.length, 0);
  const pct = total > 0 ? Math.round((published / total) * 100) : 0;

  return (
    <div className="mb-5 pb-5 border-b border-zinc-200 dark:border-zinc-900">
      <a
        href="/guides"
        className="inline-flex items-center gap-1 text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200"
      >
        <IconChevronLeft size={11} className="shrink-0" />
        Guides
      </a>

      <a
        href="/guides/aws-saa"
        className="mt-3 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-200"
      >
        <IconBrandAws size={20} className="shrink-0 text-amber-500 dark:text-amber-400" />
        <span className="font-mono text-xs uppercase tracking-[0.18em] font-medium">AWS SAA</span>
      </a>

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-600">
            Published
          </span>
          <span className="font-mono text-[10px] text-zinc-500 tabular-nums">
            {published}
            <span className="text-zinc-300 dark:text-zinc-700">/{total}</span>
          </span>
        </div>
        <div className="h-1 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 overflow-hidden" aria-hidden="true">
          <div
            className="h-full rounded-full bg-cyan-500/80 dark:bg-cyan-400/70 transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarContents({
  domains,
  currentOrder,
  onNavigate,
}: Readonly<{
  domains: SidebarDomain[];
  currentOrder?: number;
  onNavigate?: () => void;
}>) {
  const activeDomain = useMemo(
    () => (domains.find((d) => d.topics.some((t) => t.order === currentOrder)) ?? domains[0])?.domain ?? '',
    [domains, currentOrder],
  );

  // Controlled so the open section follows the active topic across navigations,
  // while still letting the reader collapse/expand sections by hand.
  const [open, setOpen] = useState<string>(activeDomain);
  useEffect(() => {
    if (activeDomain) setOpen(activeDomain);
  }, [activeDomain]);

  return (
    <>
      <SidebarHeader domains={domains} />
      <Accordion.Root
        type="single"
        collapsible
        value={open}
        onValueChange={setOpen}
        className="flex flex-col gap-1"
      >
        {domains.map((d) => {
        const Icon = domainIcons[d.domain] ?? IconFolder;
        const isActiveDomain = d.domain === activeDomain;

        return (
          <Accordion.Item key={d.domain} value={d.domain}>
            <Accordion.Trigger className="group w-full flex items-center gap-2 py-2.5 text-left text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-200">
              <Icon
                size={16}
                className={`shrink-0 ${isActiveDomain ? 'text-cyan-600 dark:text-cyan-400' : 'text-zinc-500'}`}
              />
              <span
                className={`flex-1 font-mono text-xs uppercase tracking-[0.15em] ${
                  isActiveDomain ? 'text-cyan-600 dark:text-cyan-400' : ''
                }`}
              >
                {d.domain}
              </span>
              <span
                className={`text-[10px] font-mono tabular-nums ${
                  d.publishedCount > 0 ? 'text-zinc-500' : 'text-zinc-400 dark:text-zinc-700'
                }`}
              >
                {d.publishedCount}/{d.topics.length}
              </span>
              <IconChevronDown
                size={14}
                className="shrink-0 text-zinc-500 dark:text-zinc-600 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>

            <Accordion.Content className="accordion-content">
              <div className="pl-6 pb-2 flex flex-col gap-0.5">
                {d.topics.map((t) => {
                  const isActive = t.order === currentOrder;
                  if (!t.published) {
                    return (
                      <span
                        key={t.order}
                        className="text-zinc-400 dark:text-zinc-700 text-sm py-1.5 cursor-default"
                        title="Coming soon"
                      >
                        {t.title}
                      </span>
                    );
                  }
                  return (
                    <a
                      key={t.order}
                      href={t.url ?? '#'}
                      onClick={onNavigate}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm py-1.5 transition-colors duration-200 ${
                        isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {t.title}
                    </a>
                  );
                })}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
        })}
      </Accordion.Root>
    </>
  );
}

export default function GuideSidebar({
  domains,
  currentOrder,
}: Readonly<{
  domains: SidebarDomain[];
  currentOrder?: number;
}>) {
  const activeOrder = useActiveOrder(domains, currentOrder);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the mobile drawer once a client-side navigation has completed.
  useEffect(() => {
    const close = () => setDrawerOpen(false);
    document.addEventListener('astro:page-load', close);
    return () => document.removeEventListener('astro:page-load', close);
  }, []);

  return (
    <>
      {/* Mobile trigger — pinned into the top bar, opposite the global nav links.
          Icon-only so it never collides with them on narrow phones. */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open guide contents"
        className="lg:hidden fixed top-0 left-0 z-50 flex items-center px-6 py-5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200"
      >
        <IconMenu2 size={18} />
        <span className="sr-only">Contents</span>
      </button>

      {/* Desktop sidebar — starts flush under the fixed global nav (h-14) so the
          two never overlap and no list item hides behind the nav gradient. */}
      <aside className="hidden lg:block w-56 shrink-0 fixed left-0 top-14 bottom-0 overflow-y-auto pt-6 pb-12 pl-6 pr-4 border-r border-zinc-200 dark:border-zinc-900">
        <SidebarContents domains={domains} currentOrder={activeOrder} />
      </aside>

      {/* Mobile drawer */}
      <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <AnimatePresence>
          {drawerOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 z-[60] lg:hidden"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  className="fixed top-0 left-0 bottom-0 w-72 bg-[#fafafa] dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-900 z-[70] p-6 overflow-y-auto lg:hidden"
                >
                  <Dialog.Title className="sr-only">Guide contents</Dialog.Title>
                  <Dialog.Close asChild>
                    <button type="button" className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8">
                      <IconX size={16} />
                      Close
                    </button>
                  </Dialog.Close>
                  <SidebarContents domains={domains} currentOrder={activeOrder} onNavigate={() => setDrawerOpen(false)} />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
