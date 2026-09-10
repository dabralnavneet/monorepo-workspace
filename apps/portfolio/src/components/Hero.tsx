'use client';

import { motion, useReducedMotion } from 'motion/react';
import AuroraBackground from './AuroraBackground';

/**
 * Hero — a full-height light art panel with a live WebGL backdrop.
 *
 * Back to front: the CSS `.hero-blobs` gradient (fallback for no-WebGL and the
 * pre-hydration frame), the `AuroraBackground` canvas (domain-warped noise
 * ribbons in the site palette, bending toward the pointer), a left-weighted
 * contrast scrim so the type stays legible, and film grain. On top, a single
 * left-aligned stack: the role label, "Navneet Dabral" in Instrument Serif
 * with a reveal wipe, and the Kung Fu Panda quote resolving word by word. The
 * wavy bottom edge is filled with the page background so it reads as the next
 * section cutting a curve into the hero. Colours / scrim / grain are `--hero-*`
 * custom properties (see global.css); the panel stays light in both themes.
 * The `years` prop is kept for API compatibility.
 */

const INK = 'var(--hero-ink)';
const QUOTE = "There is no secret ingredient. it's just you";
const QUOTE_WORDS = QUOTE.split(' ');

/** The site's ease-out curve. Typed as a bezier tuple so `Variants` accepts it. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const lineReveal = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

// The quote resolves word by word — the last one ("you.") a half-beat behind
// and in the fuller ink, so the line lands on it.
const quoteContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.85 } },
};

const quoteWord = {
  hidden: { opacity: 0, y: 6, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
};

// The measure is tuned so the phone break lands after "ingredient." rather than
// orphaning "it's" at the end of the first line.
const quoteClass = 'max-w-[26ch] whitespace-normal md:max-w-none md:whitespace-nowrap';
const quoteStyle = {
  margin: 'var(--hero-quote-gap) 0 0',
  color: 'var(--hero-ink-soft)',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.01em',
  fontSize: 'var(--hero-quote-size)',
} as const;

const scrollCue = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, delay: 1.6 } },
};

export default function Hero({ years: _years }: Readonly<{ years: number }>) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden">
      {/* Fallback gradient — shows pre-hydration and when WebGL is unavailable.
          `--hero-blobs` in global.css also carries the dark palette. */}
      <div aria-hidden className="hero-blobs pointer-events-none absolute inset-0 -z-40" />

      {/* Live WebGL aurora — domain-warped noise in the site palette. */}
      <AuroraBackground />

      {/* Contrast scrim — left-weighted, theme-aware (see --hero-scrim). */}
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0 -z-20" />

      {/* Film grain */}
      <svg
        aria-hidden
        className="hero-grain pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Single left-aligned stack — label, name, quote sharing one left edge.
          Bottom padding clears the scroll cue and the wavy divider. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pt-28 pb-40 sm:px-10 sm:pt-32 sm:pb-44 lg:px-16">
        <div className="flex max-w-2xl flex-col items-start">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            style={{
              color: INK,
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 'var(--hero-label-tracking)',
              fontSize: 'var(--hero-label-size)',
              margin: '0 0 clamp(12px, 1.4vw, 18px) 0.15em',
            }}
          >
            Engineer · Learner · Generalist
          </motion.p>

          {/* Name — reveal wipe, Instrument Serif. Wraps to two lines on phones,
              stays one line from `sm` up. */}
          <div style={{ overflow: 'hidden', paddingBottom: '0.08em' }}>
            <motion.h1
              variants={lineReveal}
              initial="hidden"
              animate="show"
              className="whitespace-normal sm:whitespace-nowrap"
              style={{
                margin: 0,
                color: INK,
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                fontSize: 'var(--hero-name-size)',
              }}
            >
              Navneet Dabral
            </motion.h1>
          </div>

          {/* Quote — lighter than the name, resolving word by word (landing on
              "you."). Wraps on phones, one line from `md` up. */}
          {reduceMotion ? (
            <p className={quoteClass} style={quoteStyle}>
              {QUOTE}.
            </p>
          ) : (
            <motion.p
              aria-label={`${QUOTE}.`}
              variants={quoteContainer}
              initial="hidden"
              animate="show"
              className={quoteClass}
              style={quoteStyle}
            >
              {QUOTE_WORDS.map((word, i) => {
                const last = i === QUOTE_WORDS.length - 1;
                return (
                  <span key={word + i}>
                    <motion.span
                      aria-hidden="true"
                      variants={quoteWord}
                      style={{ display: 'inline-block', color: last ? 'var(--hero-ink)' : undefined }}
                    >
                      {last ? `${word}.` : word}
                    </motion.span>
                    {!last && ' '}
                  </span>
                );
              })}
            </motion.p>
          )}
        </div>
      </div>

      {/* Scroll cue — a thin drifting line, bottom-left, matching the nav's
          mono label voice. Hidden under reduced-motion. */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          variants={scrollCue}
          initial="hidden"
          animate="show"
          className="absolute bottom-20 left-6 z-20 flex items-center gap-3 sm:bottom-24 sm:left-10 lg:left-16"
        >
          <span
            style={{
              color: 'var(--hero-ink-soft)',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              fontSize: '10px',
            }}
          >
            Scroll
          </span>
          <motion.span
            className="block h-px w-10 origin-left"
            style={{ background: 'var(--hero-ink-soft)' }}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}

      {/* Wavy edge into the writing section — filled with the page background so
          it reads as the next section cutting a curved line into the hero. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 w-full sm:h-16 lg:h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          className="fill-[#fafafa] dark:fill-black"
          d="M0,34 C 240,80 420,4 720,26 C 1000,46 1200,86 1440,38 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}
