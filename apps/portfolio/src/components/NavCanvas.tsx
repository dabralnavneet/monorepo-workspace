'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from 'motion/react';
import { useShaderCanvas } from '../lib/useShaderCanvas';
import { useDarkTarget } from '../lib/useDarkTarget';

/**
 * NavCanvas — the light under the nav bar.
 *
 * The bar's frosted glass is CSS (`backdrop-filter` can sample the page behind
 * it; WebGL can't). What WebGL adds is the highlight: a capsule drawn between
 * the *lagging* and *current* item positions, so while it travels it stretches
 * into a liquid streak and settles back into a pill — the one thing a CSS
 * transition on a box can't do. It sits behind the links, glowing rather than
 * filling, so text contrast is untouched.
 *
 * The loop parks itself once the highlight settles (see `useShaderCanvas`), so
 * an idle nav — which is most of the time, on every page — holds no rAF open.
 */

const FRAG = `
precision mediump float;

uniform vec2  u_res;      // drawing-buffer size, device px
uniform vec2  u_css;      // layout size, CSS px
uniform float u_time;
uniform float u_dark;
uniform vec4  u_seg;      // currentX, laggingX, halfWidth (CSS px), strength
uniform float u_glass;    // 0..1, how materialised the bar is

/** Pill corner radius, and so half the highlight's height. */
const float R = 15.0;

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  // Work in CSS pixels so the component can hand over DOM measurements as-is.
  vec2 p = gl_FragCoord.xy * (u_css / max(u_res, vec2(1.0)));
  float cy = u_css.y * 0.5;

  // A stadium spanning the item's width: the capsule's *radius* is the pill
  // height, its length comes from the item box. Stretching the span between the
  // lagging and current centres is what makes it travel like liquid instead of
  // sliding as a rigid box.
  float halfLen = max(u_seg.z - R, 0.0);
  float left  = min(u_seg.x, u_seg.y) - halfLen;
  float right = max(u_seg.x, u_seg.y) + halfLen;
  float d = sdSegment(p, vec2(left, cy), vec2(right, cy)) - R;

  float core = smoothstep(0.5, -3.0, d);
  float glow = exp(-max(d, 0.0) * 0.18);

  // The two themes need opposite idioms, not one idiom in two colours. On a
  // near-black bar the highlight is *emission*: a halo plus a bright rim. On a
  // near-white bar there is no light to add — a halo there just smears blue
  // haze and a lightened rim vanishes — so light mode *tints* instead: a gentle
  // wash with a darker hairline holding the edge, and no halo at all.
  vec3 inkLight = vec3(0.043, 0.353, 0.459);   // deep teal, darkens the bar
  vec3 emitDark = vec3(0.133, 0.827, 0.933);   // cyan, adds light to the bar
  vec3 accent = mix(inkLight, emitDark, u_dark);

  vec3 col = vec3(0.0);
  float a = 0.0;

  // A soft sheen across the glass, so the bar isn't a flat plate once it
  // materialises on scroll.
  float sweep = sin(p.x / max(u_css.x, 1.0) * 6.2831 - u_time * 0.35) * 0.5 + 0.5;
  float glassA = u_glass * (0.030 + 0.030 * sweep) * mix(0.5, 0.55, u_dark);
  col += mix(vec3(1.0), accent, 0.4) * glassA;
  a += glassA;

  // Every contribution stays premultiplied (colour never exceeds the alpha it
  // is added with), so this composites source-over instead of over-brightening
  // into a solid slab that the label then has to fight for contrast.
  float halo = glow * mix(0.0, 0.16, u_dark);
  float fill = clamp(halo + core * mix(0.12, 0.20, u_dark), 0.0, 1.0) * u_seg.w;
  col += accent * fill;
  a += fill;

  // Rim: darker than the bar in light mode, brighter than it in dark mode.
  vec3 rimCol = mix(mix(inkLight, vec3(0.0), 0.30), mix(emitDark, vec3(1.0), 0.45), u_dark);
  float rim = smoothstep(1.6, -0.6, abs(d)) * u_seg.w * mix(0.26, 0.46, u_dark);
  col += rimCol * rim;
  a += rim;

  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

const UNIFORMS = ['u_res', 'u_css', 'u_time', 'u_dark', 'u_seg', 'u_glass'] as const;

/** Where the highlight should be, in CSS px relative to the canvas. */
export interface NavSeg {
  x: number;
  halfWidth: number;
  strength: number;
}

interface Props {
  /** Read fresh each frame — the DOM is the source of truth for item positions. */
  segRef: RefObject<NavSeg>;
  /** 0..1 — how far the glass has materialised on scroll. */
  glassRef: RefObject<number>;
  /** Assigned a `poke()` that restarts the loop after the nav changes state. */
  pokeRef: RefObject<(() => void) | null>;
}

export default function NavCanvas({ segRef, glassRef, pokeRef }: Readonly<Props>) {
  const reduceMotion = useReducedMotion();
  // Assigned from `useShaderCanvas` below; the theme watcher is declared first
  // and needs a way to wake the loop once it has parked itself.
  const wake = useRef<(() => void) | null>(null);
  const darkTargetRef = useDarkTarget(() => wake.current?.());

  // The animated state the shader reads, chasing `segRef`. The nav island is
  // `transition:persist`ed, so this survives Astro's page swaps and the
  // highlight doesn't snap back to zero on navigation.
  const anim = useRef({ x: 0, lag: 0, halfWidth: 0, strength: 0, glass: 0, dark: 0 }).current;

  const { canvasRef, failed, pokeRef: innerPoke } = useShaderCanvas({
    frag: FRAG,
    uniformNames: UNIFORMS,
    alpha: true,
    animate: true,
    dprCap: 2,
    onFrame: (gl, u, frame) => {
      const want = segRef.current;

      // Reduced motion still shows the highlight — it just snaps there.
      const ease = reduceMotion ? 1 : 0.18;
      anim.x += (want.x - anim.x) * ease;
      anim.halfWidth += (want.halfWidth - anim.halfWidth) * ease;
      anim.strength += (want.strength - anim.strength) * (reduceMotion ? 1 : 0.12);
      // The lag is what makes the capsule stretch while it travels.
      anim.lag += (anim.x - anim.lag) * (reduceMotion ? 1 : 0.09);
      anim.glass += (glassRef.current - anim.glass) * (reduceMotion ? 1 : 0.12);
      anim.dark += (darkTargetRef.current - anim.dark) * (reduceMotion ? 1 : 0.1);

      gl.uniform2f(u.u_res, frame.width, frame.height);
      gl.uniform2f(u.u_css, frame.cssWidth, frame.cssHeight);
      gl.uniform1f(u.u_time, frame.time);
      gl.uniform1f(u.u_dark, anim.dark);
      gl.uniform4f(u.u_seg, anim.x, anim.lag, anim.halfWidth, anim.strength);
      gl.uniform1f(u.u_glass, anim.glass);

      // Park once everything has settled; `poke()` wakes it on the next change.
      const settled =
        Math.abs(anim.x - want.x) < 0.3 &&
        Math.abs(anim.halfWidth - want.halfWidth) < 0.3 &&
        Math.abs(anim.strength - want.strength) < 0.004 &&
        Math.abs(anim.lag - anim.x) < 0.3 &&
        Math.abs(anim.glass - glassRef.current) < 0.004 &&
        Math.abs(anim.dark - darkTargetRef.current) < 0.004;
      return !settled;
    },
  });

  useEffect(() => {
    const poke = () => innerPoke.current?.();
    wake.current = poke;
    pokeRef.current = poke;
    return () => {
      wake.current = null;
      pokeRef.current = null;
    };
  }, [innerPoke, pokeRef]);

  if (failed) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      tabIndex={-1}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
