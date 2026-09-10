'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useShaderCanvas } from '../lib/useShaderCanvas';
import { useDarkTarget } from '../lib/useDarkTarget';
import { LANES, TIMELINE, ERAS, type Lane } from '../lib/career-data';

/**
 * PathChart — technology exposure over time, as three ribbons at different depths.
 *
 * The projection is **orthographic axonometric, not perspective**. That matters:
 * perspective would foreshorten the far lanes, so equal weights would draw at
 * unequal heights and the chart would lie. Orthographic keeps every lane to the
 * same scale, and because the transform is then linear, the DOM overlay (lane
 * labels, year ticks, era bands) can be positioned from the *same* constants in
 * percentages — the labels cannot drift out of register with the geometry.
 *
 * Each lane sits in its own depth slot rather than stacking, so no series is
 * hidden behind another and there is no stacked baseline to misread — it is
 * small multiples arranged in depth, which is the honest way to spend 3D here.
 *
 * Colour is the validated 3-slot categorical palette (all-pairs, both modes).
 * Light-mode aqua sits under 3:1 on the page surface, so the relief rule
 * applies: lanes are always direct-labelled and a table view ships alongside.
 */

/* ---------- projection ------------------------------------------------------
   Clip space, -1..1. A point (tx, v, d) — time 0..1, weight 0..1, depth in lane
   units — maps to:
     sx = (tx - 0.5) * W + d * ZX + OX
     sy =  v * H          + d * ZY + OY
   Shared verbatim by the shader (as uniforms) and by `project()` below.        */

export interface Projection {
  W: number;
  H: number;
  ZX: number;
  ZY: number;
  OX: number;
  OY: number;
}

/* The load-bearing constraint is `H < ZY * (1 - THICK)`: a lane's tallest point
   must stay below the next lane's baseline, or the front ribbon simply covers
   the ones behind it and the "no series is hidden" claim is false. Get this
   wrong and Frontend — the tallest series, and the nearest — swallows Backend
   and Platform entirely. `OX` leaves a left gutter for the lane labels. */
/* `ZX` is deliberately small. The year ticks sit on the front lane's baseline and
   serve all three, so a large horizontal recede would slide the back lanes off
   that shared axis — at ZX 0.1 the Platform lane drifts more than a year-step
   right of its own tick. The slab thickness carries the 3D read instead. */
/* Wide keeps a left gutter (OX) for right-aligned lane labels. Compact has no
   room for a gutter, so its labels sit *above* each band instead and the plot
   takes the full width. */
const WIDE: Projection = { W: 1.4, H: 0.3, ZX: 0.06, ZY: 0.5, OX: -0.02, OY: -0.8 };
const COMPACT: Projection = { W: 1.5, H: 0.24, ZX: 0.04, ZY: 0.46, OX: 0.0, OY: -0.76 };

/** Slab thickness, in lane units. */
const THICK = 0.34;

/**
 * Lane index → depth slot. Reversed so the bands read Frontend → Backend →
 * Platform *downward*: it matches the legend's order and the conventional way a
 * stack is drawn, with the platform underneath. Depth carries no data, so this
 * is free to follow the reader's expectation.
 */
const laneDepth = (laneIndex: number) => LANES.length - 1 - laneIndex;

/** Clip-space point → CSS percentages, so the overlay needs no pixel measurement. */
export function project(tx: number, v: number, d: number, p: Projection) {
  const sx = (tx - 0.5) * p.W + d * p.ZX + p.OX;
  const sy = v * p.H + d * p.ZY + p.OY;
  return { left: `${(sx * 0.5 + 0.5) * 100}%`, top: `${(1 - (sy * 0.5 + 0.5)) * 100}%` };
}

const VERT = `
attribute vec3 a_pos;     // tx, weight, depth (lane units)
attribute vec3 a_light;
attribute vec3 a_dark;
attribute float a_shade;

uniform vec2  u_scale;    // W, H
uniform vec2  u_zAxis;    // ZX, ZY
uniform vec2  u_origin;   // OX, OY
uniform float u_maxDepth;
uniform float u_grow;     // 0..1 reveal
uniform float u_sway;     // gentle camera drift + pointer parallax

varying vec3 v_light;
varying vec3 v_dark;
varying float v_shade;
varying float v_tx;

void main() {
  float v = a_pos.y * u_grow;
  float d = a_pos.z;

  float zx = u_zAxis.x * (1.0 + u_sway * 0.16);
  float zy = u_zAxis.y * (1.0 - u_sway * 0.10);

  float sx = (a_pos.x - 0.5) * u_scale.x + d * zx + u_origin.x;
  float sy = v * u_scale.y + d * zy + u_origin.y;

  // Nearer lanes must win the depth test: map depth to -0.8..0.8, front smallest.
  float z = (d / max(u_maxDepth, 0.001)) * 1.6 - 0.8;

  gl_Position = vec4(sx, sy, z, 1.0);
  v_light = a_light;
  v_dark = a_dark;
  v_shade = a_shade;
  v_tx = a_pos.x;
}
`;

const FRAG = `
precision mediump float;

uniform float u_dark;
uniform float u_hover;    // 0..1 highlighted time, or -1 for none

varying vec3 v_light;
varying vec3 v_dark;
varying float v_shade;
varying float v_tx;

void main() {
  vec3 base = mix(v_light, v_dark, u_dark);
  vec3 col = base * v_shade;

  // Dark mode lets the ribbons emit a little, so they read against near-black.
  col += base * 0.16 * u_dark;

  // Hovered column brightens — the tooltip names the values, this locates them.
  if (u_hover >= 0.0) {
    float near = 1.0 - smoothstep(0.0, 0.045, abs(v_tx - u_hover));
    col += base * near * 0.42;
  }

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

const UNIFORMS = [
  'u_scale', 'u_zAxis', 'u_origin', 'u_maxDepth',
  'u_grow', 'u_sway', 'u_dark', 'u_hover',
] as const;

const ATTRS = [
  { name: 'a_pos', size: 3 },
  { name: 'a_light', size: 3 },
  { name: 'a_dark', size: 3 },
  { name: 'a_shade', size: 1 },
] as const;

const hexToRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

/** Face shading — the top cap catches the light, the front face falls off. */
const SHADE_BASE = 0.52;
const SHADE_TOP = 0.86;
const SHADE_CAP_NEAR = 1.0;
const SHADE_CAP_FAR = 0.9;
const SHADE_SIDE = 0.66;

type V = [number, number, number, number]; // tx, weight, depth, shade

function buildGeometry(lanes: Lane[]): Float32Array {
  const out: number[] = [];
  const N = TIMELINE.length;

  lanes.forEach((lane, li) => {
    const lc = hexToRgb(lane.light);
    const dc = hexToRgb(lane.dark);
    const zF = laneDepth(li);
    const zB = zF + THICK;
    const w = lane.weights;

    const vert = (p: V) => out.push(p[0], p[1], p[2], ...lc, ...dc, p[3]);
    const quad = (a: V, b: V, c: V, d: V) => {
      vert(a); vert(b); vert(c);
      vert(a); vert(c); vert(d);
    };

    for (let i = 0; i < N - 1; i++) {
      const x0 = i / (N - 1);
      const x1 = (i + 1) / (N - 1);
      const v0 = w[i];
      const v1 = w[i + 1];

      // Front face — the readable one: height is the weight.
      quad(
        [x0, 0, zF, SHADE_BASE], [x1, 0, zF, SHADE_BASE],
        [x1, v1, zF, SHADE_TOP], [x0, v0, zF, SHADE_TOP],
      );
      // Top cap — gives the ribbon solidity and reads as the line of the series.
      quad(
        [x0, v0, zF, SHADE_CAP_NEAR], [x1, v1, zF, SHADE_CAP_NEAR],
        [x1, v1, zB, SHADE_CAP_FAR], [x0, v0, zB, SHADE_CAP_FAR],
      );
    }

    // End caps, so the slab reads as solid at both ends of the timeline.
    quad(
      [0, 0, zF, SHADE_SIDE], [0, 0, zB, SHADE_SIDE],
      [0, w[0], zB, SHADE_SIDE], [0, w[0], zF, SHADE_SIDE],
    );
    quad(
      [1, 0, zB, SHADE_SIDE], [1, 0, zF, SHADE_SIDE],
      [1, w[N - 1], zF, SHADE_SIDE], [1, w[N - 1], zB, SHADE_SIDE],
    );
  });

  return new Float32Array(out);
}

interface Props {
  /** Index into TIMELINE that the tooltip is showing, or null. */
  hoverIndex: number | null;
  onHover: (index: number | null) => void;
  compact: boolean;
}

export default function PathChart({ hoverIndex, onHover, compact }: Readonly<Props>) {
  const reduceMotion = useReducedMotion();
  const proj = compact ? COMPACT : WIDE;
  const maxDepth = LANES.length - 1 + THICK;

  const geometry = useMemo(() => buildGeometry(LANES), []);
  const wake = useRef<(() => void) | null>(null);
  const darkTargetRef = useDarkTarget(() => wake.current?.());

  const anim = useRef({ grow: 0, sway: 0, dark: 0, hover: -1 }).current;
  const hoverRef = useRef(hoverIndex);
  hoverRef.current = hoverIndex;
  const projRef = useRef(proj);
  projRef.current = proj;

  const { canvasRef, failed, pokeRef, redrawRef } = useShaderCanvas({
    frag: FRAG,
    vert: VERT,
    attributes: ATTRS,
    vertexData: geometry,
    uniformNames: UNIFORMS,
    depth: true,
    alpha: true,
    dprCap: 2,
    animate: !reduceMotion,
    staticTime: 0,
    onFrame: (gl, u, frame) => {
      const p = projRef.current;
      const ease = reduceMotion ? 1 : 0.055;
      anim.grow += (1 - anim.grow) * ease;
      anim.dark += (darkTargetRef.current - anim.dark) * (reduceMotion ? 1 : 0.08);

      anim.hover =
        hoverRef.current === null ? -1 : hoverRef.current / (TIMELINE.length - 1);
      // A slow drift, so the solid never reads as a flat picture.
      if (!reduceMotion) anim.sway = Math.sin(frame.time * 0.32) * 0.5;

      gl.uniform2f(u.u_scale, p.W, p.H);
      gl.uniform2f(u.u_zAxis, p.ZX, p.ZY);
      gl.uniform2f(u.u_origin, p.OX, p.OY);
      gl.uniform1f(u.u_maxDepth, maxDepth);
      gl.uniform1f(u.u_grow, anim.grow);
      gl.uniform1f(u.u_sway, anim.sway);
      gl.uniform1f(u.u_dark, anim.dark);
      gl.uniform1f(u.u_hover, anim.hover);

      if (reduceMotion) return false;
      return true;
    },
  });

  /**
   * Repaint on demand. Under reduced motion the loop parks after its single
   * frame, so a theme change or a new hover has to redraw that frame directly —
   * `poke` is a no-op there.
   */
  useEffect(() => {
    const repaint = () => {
      if (reduceMotion) redrawRef.current?.();
      else pokeRef.current?.();
    };
    wake.current = repaint;
    repaint();
    return () => {
      wake.current = null;
    };
  }, [hoverIndex, reduceMotion, pokeRef, redrawRef]);

  /** Pointer x → nearest timeline step, read along the front lane's baseline. */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const clip = ((e.clientX - box.left) / box.width) * 2 - 1;
    const tx = (clip - proj.OX) / proj.W + 0.5;
    const i = Math.round(tx * (TIMELINE.length - 1));
    onHover(i >= 0 && i < TIMELINE.length ? i : null);
  };

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: compact ? '5 / 4' : '16 / 9' }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => onHover(null)}
    >
      {!failed && (
        <canvas
          ref={canvasRef}
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full"
        />
      )}

      {/* Direct labels — required relief for the light-mode aqua contrast WARN,
          and they keep identity off colour-alone. Each sits in the left gutter,
          right-aligned to its own ribbon's starting edge and at that ribbon's
          starting height, so the three stagger diagonally and never collide with
          the geometry or with each other. */}
      {LANES.map((lane, li) => {
        const pos = project(0, lane.weights[0], laneDepth(li) + THICK, proj);
        return (
          <span
            key={lane.id}
            className={`pointer-events-none absolute flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300 ${
              compact
                ? '-translate-y-full pb-1.5'
                : '-translate-x-full -translate-y-1/2 pr-2'
            }`}
            style={{ left: pos.left, top: pos.top }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: `var(--path-${lane.id})` }}
            />
            {lane.label}
          </span>
        );
      })}

      {/* Year ticks along the front baseline. */}
      {TIMELINE.map((year, i) => {
        if (!Number.isInteger(year)) return null;
        if (compact && year % 2 !== 0) return null;
        const pos = project(i / (TIMELINE.length - 1), 0, 0, proj);
        return (
          <span
            key={year}
            className="pointer-events-none absolute -translate-x-1/2 pt-2 font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-600"
            style={{ left: pos.left, top: pos.top }}
          >
            {year}
          </span>
        );
      })}

      {/* Era bands — the companies, along the time axis rather than as a second
          colour encoding. */}
      {ERAS.map((era) => {
        const span = TIMELINE[TIMELINE.length - 1] - TIMELINE[0];
        const mid = (era.start + era.end) / 2;
        const tx = Math.min(1, Math.max(0, (mid - TIMELINE[0]) / span));
        const pos = project(tx, 0, 0, proj);
        return (
          <span
            key={era.id}
            className="pointer-events-none absolute -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500"
            style={{ left: pos.left, top: pos.top, marginTop: '1.6rem' }}
          >
            {compact ? era.short : era.company}
          </span>
        );
      })}
    </div>
  );
}
