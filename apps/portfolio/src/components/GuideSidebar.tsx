'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import {
  IconChevronDown,
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

function SidebarContents({
  domains,
  currentOrder,
  onNavigate,
}: {
  domains: SidebarDomain[];
  currentOrder?: number;
  onNavigate?: () => void;
}) {
  const defaultValue =
    (domains.find((d) => d.topics.some((t) => t.order === currentOrder)) ?? domains[0])?.domain;

  return (
    <Accordion.Root type="single" collapsible defaultValue={defaultValue} className="flex flex-col gap-1">
      {domains.map((d) => {
        const Icon = domainIcons[d.domain] ?? IconFolder;

        return (
          <Accordion.Item key={d.domain} value={d.domain}>
            <Accordion.Trigger className="group w-full flex items-center gap-2 py-2.5 text-left text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-200">
              <Icon size={16} className="shrink-0 text-zinc-500" />
              <span className="flex-1 font-mono text-xs uppercase tracking-[0.15em]">{d.domain}</span>
              <span className="text-zinc-400 dark:text-zinc-700 text-[10px] font-mono">
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
  );
}

export default function GuideSidebar({
  domains,
  currentOrder,
}: {
  domains: SidebarDomain[];
  currentOrder?: number;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8"
      >
        <IconMenu2 size={16} />
        Contents
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 fixed left-0 top-0 h-screen overflow-y-auto pt-10 pb-12 pl-6 pr-4 border-r border-zinc-200 dark:border-zinc-900">
        <SidebarContents domains={domains} currentOrder={currentOrder} />
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
                  <SidebarContents domains={domains} currentOrder={currentOrder} onNavigate={() => setDrawerOpen(false)} />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
