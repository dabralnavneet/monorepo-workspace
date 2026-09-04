'use client';

import { motion } from 'motion/react';

/**
 * Hero — a responsive re-creation of the `gradient-bg.svg` art piece.
 *
 * The source SVG is a fixed 2048×1502 canvas: a pastel `#EAF4FC` field with four
 * blurred radial "blobs" (blue / lavender / pink / sky), a faint film-grain
 * overlay, Po from Kung Fu Panda, the "Senior Software Engineer" label,
 * "Navneet Dabral" in Instrument Serif, and the "there is no secret ingredient"
 * quote.
 *
 * Structure: the tinted field + grain stay as fixed background layers; the
 * panda and the text are laid out as two real grid columns on top — stacked
 * (text, then panda) below `lg`, side-by-side from `lg`. Type is set with
 * inline styles so it never depends on a utility class a stale JIT pass might
 * miss. Colours are `--hero-*` custom properties (see global.css) so the panel
 * has its own light/dark palette. The `years` prop is kept for API compatibility.
 */

const INK = 'var(--hero-ink)';
const QUOTE = "There is no secret ingredient. it's just you";

const lineReveal = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ years: _years }: Readonly<{ years: number }>) {
  return (
    <section className="hero-section relative isolate flex w-full flex-col justify-center overflow-hidden lg:min-h-screen">
      {/* Blobs — four radial gradients (positioned by the source SVG's ellipse
          centres); the gradient stack itself is `--hero-blobs` in global.css so
          it can switch to a dark palette. */}
      <div
        aria-hidden
        className="hero-blobs pointer-events-none absolute inset-0 -z-20"
      />

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

      {/* Two-column grid: panda | text. Stacks (text first, panda second) below
          lg; side-by-side from lg with the panda bled to the bottom edge. */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 content-center items-center gap-x-10 gap-y-8 px-6 pt-28 pb-14 sm:px-10 lg:min-h-screen lg:grid-cols-2 lg:gap-x-16 lg:px-16 lg:pb-0">

        {/* Panda cell */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="order-2 flex justify-center self-end lg:order-1 lg:justify-start"
        >
          <img
            src="/images/panda.png"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none w-[72vw] max-w-[320px] select-none drop-shadow-2xl sm:max-w-[380px] lg:mb-[-4%] lg:w-full lg:max-w-[540px]"
          />
        </motion.div>

        {/* Text cell — a single left-aligned stack, all pieces sharing the
            same left edge as the name. */}
        <div className="order-1 flex w-full flex-col items-start lg:order-2">
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
              letterSpacing: '0.28em',
              fontSize: 'clamp(11px, 1.1vw, 14px)',
              margin: '0 0 clamp(10px, 1.4vw, 18px) 0.15em',
            }}
          >
            Engineer · Learner · Generalist
          </motion.p>

          {/* Name — reveal wipe, Instrument Serif. Wraps to two lines on
              phones, stays one line from `sm` up. */}
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
                letterSpacing: '-0.01em',
                fontSize: 'clamp(34px, 8vw, 108px)',
              }}
            >
              Navneet Dabral
            </motion.h1>
          </div>

          {/* Quote — lighter than the name. Wraps on phones, one line from
              `md` up. */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-[34ch] whitespace-normal md:max-w-none md:whitespace-nowrap"
            style={{
              margin: 'clamp(14px, 1.8vw, 26px) 0 0',
              color: 'var(--hero-ink-soft)',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.45,
              letterSpacing: '0.01em',
              fontSize: 'clamp(13px, 1.35vw, 18px)',
            }}
          >
            {QUOTE}.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
