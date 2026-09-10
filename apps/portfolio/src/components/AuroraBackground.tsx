'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useShaderCanvas } from '../lib/useShaderCanvas';
import { useDarkTarget } from '../lib/useDarkTarget';

/**
 * AuroraBackground — the hero's WebGL backdrop.
 *
 * Two layers: a slow two-step domain-warped colour wash, and a *ridged*
 * multifractal riding on top of it that resolves into thin strands of light
 * rather than soft blobs. The pointer is a real light source — it drags the
 * field toward itself and lights the strands nearby — and the whole field
 * parallaxes as the hero scrolls away.
 *
 * Both themes are first-class: a pastel wash for light, an emissive
 * cyan/violet/magenta nebula on near-black for dark, crossfaded by `u_dark` so
 * toggling the theme dissolves rather than snaps.
 *
 * Budget: octave count and the DPR ceiling drop on small screens. The GL
 * lifecycle (loop, pausing, context loss, teardown) lives in `useShaderCanvas`.
 * Under `prefers-reduced-motion` it paints a single static frame and repaints
 * only on theme change. If WebGL is unavailable it renders nothing and the CSS
 * `.hero-blobs` gradient behind it (see global.css) shows through.
 */

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_pointer;
uniform float u_dark;
uniform float u_scroll;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p = ROT * p;
    a *= 0.5;
  }
  return v;
}

// Ridged multifractal — inverting and squaring each octave stacks the noise
// into thin bright ridges instead of soft lumps. This is what makes the field
// read as strands of light rather than a blur.
float ridged(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    float n = 1.0 - abs(noise(p) * 2.0);
    v += a * n * n;
    p = ROT * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p  = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res;

  float t = u_time * 0.05;

  // The pointer is a light source that also drags the field toward itself.
  vec2  ptr     = u_pointer * vec2(0.85, 0.5);
  vec2  toPtr   = p - ptr;
  float ptrD    = length(toPtr);
  float ptrPull = exp(-ptrD * 1.7);
  p -= toPtr / max(ptrD, 0.001) * ptrPull * 0.14;

  // Drift the field as the hero scrolls away.
  p.y += u_scroll * 0.4;

  // Far layer — slow two-step domain warp, carries the colour.
  vec2 wp = p * 0.85;
  vec2 q = vec2(fbm(wp + t), fbm(wp + vec2(3.1, 1.7) - t));
  vec2 r = vec2(
    fbm(wp + 1.8 * q + vec2(1.7, 9.2) + 0.20 * t),
    fbm(wp + 1.8 * q + vec2(8.3, 2.8) - 0.16 * t)
  );
  float wash = fbm(wp + 2.4 * r) * 0.5 + 0.5;
  float ql = length(q);
  float rl = length(r);

  // Near layer — ridged strands riding the warp, faster and sharper.
  vec2 fp = p * 1.6 + 1.1 * r + vec2(t * 1.6, -t * 0.7);
  float fil = pow(ridged(fp), 2.6);
  fil *= smoothstep(0.05, 0.7, wash + 0.2);

  // A finer pass, for sparkle in the brightest folds only.
  float fine = pow(ridged(fp * 2.7 + vec2(-t * 2.2, t * 1.3)), 5.0) * 0.6;

  float energy = clamp(fil + fine + ptrPull * 0.30, 0.0, 1.4);

  // ---- light palette: pastel wash, strands resolving to white ----
  vec3 lBase = vec3(0.918, 0.957, 0.988);
  vec3 lSky  = vec3(0.545, 0.812, 0.937);
  vec3 lLav  = vec3(0.612, 0.451, 0.808);
  vec3 lPink = vec3(0.957, 0.620, 0.729);

  vec3 lc = lBase;
  lc = mix(lc, lSky,  smoothstep(0.05, 0.62, wash));
  lc = mix(lc, lLav,  smoothstep(0.18, 0.82, ql) * 0.90);
  lc = mix(lc, lPink, smoothstep(0.28, 0.95, rl) * 0.85);
  vec3 lFil = mix(lLav, lPink, 0.5 + 0.5 * sin(5.0 * wash + u_time * 0.25));
  lc = mix(lc, lFil, clamp(energy * 0.80, 0.0, 1.0));
  lc = mix(lc, vec3(1.0), clamp(pow(energy, 2.2) * 0.95, 0.0, 1.0));

  // ---- dark palette: emissive nebula, additive ----
  vec3 dBase = vec3(0.024, 0.031, 0.059);
  vec3 dCyan = vec3(0.298, 0.855, 0.937);
  vec3 dVio  = vec3(0.510, 0.345, 0.949);
  vec3 dMag  = vec3(0.937, 0.353, 0.647);

  vec3 hue = mix(dCyan, dVio, smoothstep(0.15, 0.85, ql));
  hue = mix(hue, dMag, smoothstep(0.35, 1.0, rl) * 0.75);

  vec3 dc = dBase;
  dc += hue * wash * 0.30;                    // nebula wash
  dc += hue * energy * 1.45;                  // glowing strands
  dc += vec3(1.0) * pow(energy, 3.2) * 0.75;  // hot cores
  dc += dCyan * ptrPull * 0.30;               // the cursor's own light

  vec3 col = mix(lc, dc, u_dark);

  // Iridescent chromatic shimmer.
  col += (0.05 - 0.02 * u_dark) * sin(vec3(0.0, 2.1, 4.2) + 8.0 * (wash + 0.4 * ql));

  // Left side calmer so the type keeps contrast — a lighter touch in dark mode,
  // where the scrim already does most of the work.
  vec3 calmTo = mix(lBase, dBase, u_dark);
  float leftCalm = smoothstep(-0.2, 0.5, uv.x);
  col = mix(mix(col, calmTo, mix(0.34, 0.20, u_dark)), col, leftCalm);

  // Edge falloff.
  float vig = smoothstep(1.55, 0.3, length(p));
  col = mix(mix(col, calmTo, mix(0.24, 0.40, u_dark)), col, vig);

  // Dither — 8-bit gradients band badly without it.
  float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (d - 0.5) / 255.0;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

const UNIFORMS = ['u_res', 'u_time', 'u_pointer', 'u_dark', 'u_scroll'] as const;

/**
 * The ridged passes are the expensive part of the shader, so phones get fewer
 * octaves and a lower DPR ceiling — at that screen size the missing detail
 * isn't visible anyway. Read once, at module scope on the client, so the value
 * is stable for the life of the page.
 */
const SMALL_SCREEN =
  typeof window !== 'undefined' && Math.min(window.innerWidth, window.innerHeight) < 768;
const OCTAVES = SMALL_SCREEN ? 3 : 5;
const DPR_CAP = SMALL_SCREEN ? 1.3 : 1.75;

export default function AuroraBackground() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;
  // Under reduced motion there is no loop, so a theme change has to repaint the
  // single static frame itself.
  const redraw = useRef<(() => void) | null>(null);
  const darkTargetRef = useDarkTarget(() => redraw.current?.());

  // Smoothed + target pointer, normalised to -1..1.
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const lastMove = useRef(0);
  const darkMix = useRef(darkTargetRef.current);

  const { canvasRef, failed, redrawRef } = useShaderCanvas({
    frag: FRAG,
    uniformNames: UNIFORMS,
    defines: { OCTAVES },
    dprCap: DPR_CAP,
    animate,
    staticTime: 12,
    onFrame: (gl, u, frame) => {
      if (animate) {
        // Touch devices never fire a hover, so the light idles on a slow orbit
        // instead of sitting dead centre.
        const coarse = window.matchMedia('(hover: none)').matches;
        if (coarse || performance.now() - lastMove.current > 4000) {
          target.current.x = Math.sin(frame.time * 0.21) * 0.6;
          target.current.y = Math.cos(frame.time * 0.17) * 0.45;
        }
        pointer.current.x += (target.current.x - pointer.current.x) * 0.045;
        pointer.current.y += (target.current.y - pointer.current.y) * 0.045;
        darkMix.current += (darkTargetRef.current - darkMix.current) * 0.06;
      } else {
        darkMix.current = darkTargetRef.current;
      }

      const scroll = animate
        ? Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)))
        : 0;

      gl.uniform2f(u.u_res, frame.width, frame.height);
      gl.uniform1f(u.u_time, frame.time);
      gl.uniform2f(u.u_pointer, pointer.current.x, pointer.current.y);
      gl.uniform1f(u.u_dark, darkMix.current);
      gl.uniform1f(u.u_scroll, scroll);
    },
  });

  useEffect(() => {
    redraw.current = () => redrawRef.current?.();
    return () => {
      redraw.current = null;
    };
  }, [redrawRef]);

  useEffect(() => {
    if (!animate) return;
    const onPointerMove = (e: PointerEvent) => {
      lastMove.current = performance.now();
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [animate]);

  if (failed) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      tabIndex={-1}
      className="hero-aurora pointer-events-none absolute inset-0 -z-30 h-full w-full"
    />
  );
}
