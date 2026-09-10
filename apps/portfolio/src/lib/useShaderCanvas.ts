'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useShaderCanvas — the WebGL lifecycle shared by the site's shader surfaces
 * (the hero aurora, the nav highlight).
 *
 * It owns everything that is the same every time: context creation, compiling
 * and linking a fragment shader over a single fullscreen triangle, DPR-capped
 * resizing, the rAF loop, pausing when the tab is hidden or the canvas scrolls
 * out of view, GPU context-loss recovery, and teardown. Callers supply only the
 * fragment source, the uniform names they want looked up, and an `onFrame` that
 * pushes values for the frame about to be drawn.
 *
 * `onFrame` may return `false` to park the loop once its animation has settled
 * — the last frame stays on screen and nothing is scheduled until `poke()` is
 * called. That keeps a mostly-static surface like the nav from holding a rAF
 * open for the life of the page.
 */

/** Default geometry: one triangle covering the viewport. */
const FULLSCREEN_VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;
const FULLSCREEN_TRI = new Float32Array([-1, -1, 3, -1, -1, 3]);

/** One interleaved float attribute in the vertex buffer. */
export interface VertexAttribute {
  name: string;
  size: number;
}

export type UniformMap = Record<string, WebGLUniformLocation | null>;

export interface ShaderFrame {
  /** Seconds since the canvas started. */
  time: number;
  /** Drawing-buffer size, in device pixels. */
  width: number;
  height: number;
  /** Layout size, in CSS pixels — the space `onFrame` should reason about. */
  cssWidth: number;
  cssHeight: number;
}

export interface ShaderCanvasOptions {
  frag: string;
  /** Uniforms to resolve once per link and hand back to `onFrame`. */
  uniformNames: readonly string[];
  /** Pushes uniform values for the frame about to be drawn. Return `false` to park. */
  onFrame: (gl: WebGLRenderingContext, u: UniformMap, frame: ShaderFrame) => boolean | void;
  /** `false` paints a single static frame; repaint it with `redraw()`. */
  animate?: boolean;
  /** Ceiling on devicePixelRatio. */
  dprCap?: number;
  /** Prepended to the fragment source as `#define KEY VALUE` lines. */
  defines?: Record<string, string | number>;
  /** Timestamp used for the static frame, so a still can be a good-looking one. */
  staticTime?: number;
  /** Transparent canvas with premultiplied blending, for overlay surfaces. */
  alpha?: boolean;
  /** Custom vertex shader. Defaults to the fullscreen triangle's. */
  vert?: string;
  /** Interleaved attribute layout. Defaults to a single `vec2 a_pos`. */
  attributes?: readonly VertexAttribute[];
  /** Interleaved vertex data. Defaults to the fullscreen triangle. */
  vertexData?: Float32Array;
  /** Depth buffer + `LEQUAL` testing, for geometry that occludes itself. */
  depth?: boolean;
}

export function useShaderCanvas({
  frag,
  uniformNames,
  onFrame,
  animate = true,
  dprCap = 1.75,
  defines,
  staticTime = 0,
  alpha = false,
  vert,
  attributes,
  vertexData,
  depth = false,
}: ShaderCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  // Kept in refs so a changing closure never tears down and rebuilds the
  // GL context — only `animate` (which changes the loop's shape) does that.
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  const pokeRef = useRef<(() => void) | null>(null);
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: depth,
      alpha,
      depth,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    }) as WebGLRenderingContext | null;

    if (!gl) {
      setFailed(true);
      return;
    }

    const source = defines
      ? `${Object.entries(defines)
          .map(([k, v]) => `#define ${k} ${v}`)
          .join('\n')}\n${frag}`
      : frag;

    const layout = attributes ?? ([{ name: 'a_pos', size: 2 }] as const);
    const data = vertexData ?? FULLSCREEN_TRI;
    const stride = layout.reduce((sum, attr) => sum + attr.size, 0);
    const vertexCount = data.length / stride;

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let uniforms: UniformMap = {};
    let raf = 0;
    let running = true;
    let intersecting = true;
    let parked = false;
    let disposed = false;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const build = () => {
      const vs = compile(gl.VERTEX_SHADER, vert ?? FULLSCREEN_VERT);
      const fs = compile(gl.FRAGMENT_SHADER, source);
      if (!vs || !fs) return false;

      const prog = gl.createProgram();
      if (!prog) return false;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
        return false;
      }

      program = prog;
      gl.useProgram(prog);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      let offset = 0;
      for (const attr of layout) {
        const loc = gl.getAttribLocation(prog, attr.name);
        if (loc >= 0) {
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, attr.size, gl.FLOAT, false, stride * 4, offset * 4);
        }
        offset += attr.size;
      }

      uniforms = {};
      for (const name of uniformNames) uniforms[name] = gl.getUniformLocation(prog, name);

      if (alpha) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
      }
      if (depth) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
      }
      return true;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const clearMask =
      (alpha ? gl.COLOR_BUFFER_BIT : 0) | (depth ? gl.DEPTH_BUFFER_BIT : 0);

    const draw = (seconds: number) => {
      resize();
      if (clearMask) gl.clear(clearMask);
      const cont = onFrameRef.current(gl, uniforms, {
        time: seconds,
        width: canvas.width,
        height: canvas.height,
        cssWidth: canvas.clientWidth,
        cssHeight: canvas.clientHeight,
      });
      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
      return cont;
    };

    const start = performance.now();
    const loop = (now: number) => {
      raf = 0;
      if (!running || disposed) return;
      if (draw((now - start) / 1000) === false) {
        parked = true;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (animate && raf === 0 && running && !parked && !disposed) raf = requestAnimationFrame(loop);
    };

    const syncRunning = () => {
      running = intersecting && !document.hidden;
      if (running) kick();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        syncRunning();
      },
      { threshold: 0 },
    );

    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onContextRestored = () => {
      if (disposed || !build()) return;
      parked = false;
      if (animate) syncRunning();
      else draw(staticTime);
    };

    if (!build()) {
      setFailed(true);
      return;
    }
    draw(animate ? 0 : staticTime);

    pokeRef.current = () => {
      if (disposed) return;
      parked = false;
      kick();
    };
    redrawRef.current = () => {
      if (disposed || animate) return;
      draw(staticTime);
    };

    canvas.addEventListener('webglcontextlost', onContextLost as EventListener);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    io.observe(canvas);

    if (animate) {
      document.addEventListener('visibilitychange', syncRunning);
      window.addEventListener('resize', resize);
      kick();
    }

    return () => {
      disposed = true;
      running = false;
      pokeRef.current = null;
      redrawRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', syncRunning);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', onContextLost as EventListener);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      io.disconnect();
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // `frag`/`uniformNames`/`defines` are module constants at every call site;
    // only `animate` meaningfully changes the loop, so only it forces a rebuild.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return { canvasRef, failed, pokeRef, redrawRef };
}
