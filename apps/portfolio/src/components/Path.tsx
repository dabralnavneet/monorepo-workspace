'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';
import PathChart from './PathChart';
import {
  LANES, TIMELINE, ERAS, MILESTONES, LANE_TECH, yearLabel,
} from '../lib/career-data';

/**
 * Path — the opening section: technology exposure over time.
 *
 * The chart is the showpiece, but it is not the only way to read the numbers.
 * A readout under it names the values for the hovered step (and defaults to the
 * latest, so it says something before you touch anything), and a table view
 * carries every value in plain markup. That pairing is what lets the chart be
 * 3D without the data becoming hover-gated or colour-only.
 */

const LAST = TIMELINE.length - 1;

function eraAt(year: number) {
  return ERAS.find((e) => year >= e.start && year < e.end) ?? ERAS[ERAS.length - 1];
}

function milestoneAt(year: number) {
  return MILESTONES.find((m) => Math.abs(m.at - year) < 0.01) ?? null;
}

function useCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return compact;
}

export default function Path() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const compact = useCompact();

  const active = hoverIndex ?? LAST;
  const year = TIMELINE[active];
  const era = eraAt(year);
  const milestone = milestoneAt(year);

  return (
    <section
      id="path"
      className="path-viz mx-auto w-full max-w-7xl px-6 py-12 sm:py-20 md:px-12 md:py-32 lg:px-20"
    >
      <SectionHeader index="01" label="Path" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-500"
      >
        Six years, three companies, and a centre of gravity that kept moving — frontend
        first, then services, then the platform underneath them. Each ribbon is one
        strand of that work; height is how much of the job it was.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <PathChart hoverIndex={hoverIndex} onHover={setHoverIndex} compact={compact} />
      </motion.div>

      {/* Readout — always says something, so no value is hover-gated. */}
      <div className="mt-14 border-t border-zinc-200 pt-5 dark:border-zinc-900 sm:mt-16">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="font-mono text-xs tabular-nums text-zinc-800 dark:text-zinc-200">
            {yearLabel(year)}
            {year % 1 !== 0 ? ' H2' : ' H1'}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
            {era.company} · {era.role}
          </span>
          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-700">
            {hoverIndex === null ? 'hover the chart to scrub' : ''}
          </span>
        </div>

        {/* Legend + values in one row: identity is never colour alone. */}
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {LANES.map((lane) => (
            <div key={lane.id} className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ background: `var(--path-${lane.id})` }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
                {lane.label}
              </span>
              <span className="font-mono text-xs tabular-nums text-zinc-800 dark:text-zinc-200">
                {Math.round(lane.weights[active] * 100)}
              </span>
            </div>
          ))}
        </div>

        {milestone && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {milestone.text}
          </p>
        )}
      </div>

      {/* What each strand actually was. */}
      <div className="mt-14 grid gap-8 sm:mt-16 md:grid-cols-3">
        {LANES.map((lane) => (
          <div key={lane.id}>
            <div className="mb-3 flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ background: `var(--path-${lane.id})` }}
              />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300">
                {lane.label}
              </h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
              {lane.blurb}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {LANE_TECH[lane.id].map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-zinc-200 px-2.5 py-1 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Table view — the plain-markup twin of the chart. */}
      <div className="mt-12">
        <button
          onClick={() => setShowTable((v) => !v)}
          aria-expanded={showTable}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:decoration-zinc-700 dark:hover:text-zinc-200"
        >
          {showTable ? 'Hide table' : 'View as table'}
        </button>

        {showTable && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="mb-3 text-left text-xs text-zinc-400 dark:text-zinc-600">
                Share of focus by strand, 0–100. A self-assessed reading of the roles
                below, not a measured figure.
              </caption>
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-900">
                  <th scope="col" className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Period</th>
                  <th scope="col" className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Company</th>
                  {LANES.map((lane) => (
                    <th key={lane.id} scope="col" className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {lane.label}
                    </th>
                  ))}
                  <th scope="col" className="py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Milestone</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE.map((y, i) => (
                  <tr key={y} className="border-b border-zinc-100 dark:border-zinc-900/60">
                    <th scope="row" className="py-2 pr-4 font-mono text-xs font-normal tabular-nums text-zinc-700 dark:text-zinc-300">
                      {yearLabel(y)} {y % 1 !== 0 ? 'H2' : 'H1'}
                    </th>
                    <td className="py-2 pr-4 text-xs text-zinc-600 dark:text-zinc-400">{eraAt(y).company}</td>
                    {LANES.map((lane) => (
                      <td key={lane.id} className="py-2 pr-4 font-mono text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                        {Math.round(lane.weights[i] * 100)}
                      </td>
                    ))}
                    <td className="py-2 text-xs text-zinc-500 dark:text-zinc-500">
                      {milestoneAt(y)?.text ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
