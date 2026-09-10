/**
 * The data behind the "Path" section — technology exposure over time, read off
 * the résumé.
 *
 * Three lanes, not more: the all-pairs colour gate (see the palette validation
 * in PathChart) tops out at three categorical slots, and three is also the arc
 * the résumé actually tells — frontend, then full stack, then platform.
 * Quality and observability tooling (Jest, RTL, Playwright, Datadog, Lighthouse)
 * folds into whichever lane it served rather than claiming a fourth colour.
 *
 * `weight` is a 0–1 reading of how much of the work in that half-year sat in
 * that lane. It is a judgement call, not a measurement — it is kept here, in
 * one obvious place, precisely so it is easy to argue with and re-tune.
 */

export interface Era {
  id: string;
  company: string;
  /** Axis label below `sm`, where three full company names collide. */
  short: string;
  role: string;
  /** Fractional years, matching `TIMELINE`. */
  start: number;
  end: number;
}

export interface Lane {
  id: string;
  label: string;
  /** Categorical slot, validated all-pairs in both modes. */
  light: string;
  dark: string;
  /** Half-yearly weights, index-aligned with `TIMELINE`. */
  weights: number[];
  blurb: string;
}

/** Half-year steps from mid-2019 to late-2026. */
export const TIMELINE = [
  2019.5, 2020.0, 2020.5, 2021.0, 2021.5, 2022.0, 2022.5,
  2023.0, 2023.5, 2024.0, 2024.5, 2025.0, 2025.5, 2026.0,
];

export const ERAS: Era[] = [
  {
    id: 'jio',
    company: 'Reliance Jio',
    short: 'Jio',
    role: 'Software Engineer I',
    start: 2019.5,
    end: 2021.17,
  },
  {
    id: 'c2fo',
    company: 'C2FO',
    short: 'C2FO',
    role: 'Software Engineer I → II',
    start: 2021.17,
    end: 2025.33,
  },
  {
    id: 'bmw',
    company: 'BMW Techworks India',
    short: 'BMW',
    role: 'Senior Software Engineer',
    start: 2025.33,
    end: 2026.5,
  },
];

export const LANES: Lane[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    light: '#2a78d6',
    dark: '#3987e5',
    blurb: 'React Native Web at Jio, then React, Next.js and a shared MUI system at C2FO, then Angular at BMW.',
    weights: [
      0.85, 0.90, 0.90, 0.90, 0.75, 0.85, 1.00,
      1.00, 0.95, 1.00, 1.00, 0.85, 0.70, 0.65,
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    light: '#eb6834',
    dark: '#d95926',
    blurb: 'NestJS and S3 work at C2FO, growing into owning NestJS services and API structure at BMW.',
    // Index 3 is 2021 H1 — still Jio (C2FO began 03/2021), so the NestJS rise
    // belongs at index 4, not here.
    weights: [
      0.10, 0.10, 0.15, 0.15, 0.50, 0.45, 0.30,
      0.30, 0.35, 0.35, 0.40, 0.55, 0.75, 0.80,
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    light: '#1baf7a',
    dark: '#199e70',
    blurb: 'NGINX deploys at Jio, CI/CD and Datadog at C2FO, then Helm, EKS, Kubernetes and ArgoCD at BMW.',
    weights: [
      0.30, 0.30, 0.25, 0.15, 0.20, 0.25, 0.40,
      0.55, 0.50, 0.45, 0.50, 0.60, 0.90, 1.00,
    ],
  },
];

/** Milestones worth calling out, pinned to the nearest timeline step. */
export interface Milestone {
  at: number;
  lane: string;
  text: string;
}

export const MILESTONES: Milestone[] = [
  { at: 2019.5, lane: 'frontend', text: 'React Native Web merchant portal — 100k+ merchants' },
  { at: 2021.5, lane: 'backend', text: 'First NestJS services, S3 media handling' },
  { at: 2022.0, lane: 'frontend', text: 'LCP ~5s → ~2s; single-step signup funnel' },
  { at: 2022.5, lane: 'frontend', text: 'Shared MUI component library, 5+ teams' },
  { at: 2023.0, lane: 'platform', text: 'Azure DevOps → GitHub Actions, ~20% cost cut' },
  { at: 2024.0, lane: 'frontend', text: '100+ Gatsby sites migrated to Next.js' },
  { at: 2025.5, lane: 'platform', text: 'Helm pipelines to AWS EKS' },
  { at: 2026.0, lane: 'platform', text: 'Helm → ArgoCD during cluster migration' },
];

/** Technologies per lane, for the chips under the chart. */
export const LANE_TECH: Record<string, string[]> = {
  frontend: [
    'React', 'React Native', 'Next.js', 'Angular', 'Material UI',
    'GraphQL', 'Storybook', 'Jest', 'React Testing Library', 'Playwright',
  ],
  backend: ['NestJS', 'Node.js', 'REST APIs', 'AWS S3'],
  platform: [
    'AWS EKS', 'Kubernetes', 'Helm', 'ArgoCD', 'GitHub Actions',
    'Azure DevOps', 'NGINX', 'Datadog', 'Lighthouse',
  ],
};

export const yearLabel = (y: number) => String(Math.floor(y));
