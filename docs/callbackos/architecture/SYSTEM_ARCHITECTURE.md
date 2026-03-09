# System Architecture

## High-Level Overview

CallbackOS is a **Turborepo monorepo** with a clear separation between frontend, backend, and shared packages.

```
┌─────────────────────────────────────────────────────────────┐
│                        MONOREPO (Turborepo + pnpm)          │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐                       │
│  │  apps/web    │    │ apps/server  │                       │
│  │  (Next.js)   │───▶│  (NestJS)    │                       │
│  │  Port: 3000  │    │  Port: 4000  │                       │
│  └──────┬───────┘    └──────┬───────┘                       │
│         │                   │                               │
│         ▼                   ▼                               │
│  ┌────────────────────────────────┐                         │
│  │       packages/ (shared)       │                         │
│  │  ┌──────────┐ ┌──────────┐    │                         │
│  │  │  types   │ │  utils   │    │                         │
│  │  └──────────┘ └──────────┘    │                         │
│  │  ┌──────────────────────────┐ │                         │
│  │  │       database           │ │                         │
│  │  │   (Prisma ORM client)    │ │                         │
│  │  └────────────┬─────────────┘ │                         │
│  └───────────────┼───────────────┘                         │
│                  │                                          │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │   Neon PostgreSQL │
         │   (Cloud DB)      │
         └──────────────────┘
```

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Monorepo** | Turborepo | ^2.8 | Task orchestration, caching, parallel builds |
| **Package Manager** | pnpm | ^10.31 | Fast, disk-efficient package management with workspaces |
| **Frontend** | Next.js | 16.x | React framework with SSR, App Router, API routes |
| **Frontend UI** | React | 19.x | Component library |
| **Backend** | NestJS | 11.x | Enterprise-grade Node.js framework with DI, decorators, modules |
| **ORM** | Prisma | ^6.4 | Type-safe database client, migrations, schema management |
| **Database** | PostgreSQL | 16.x | Relational database (hosted on Neon) |
| **Language** | TypeScript | ^5.x | Used across all apps and packages |
| **Runtime** | Node.js | >=18 | Server runtime (pinned via `.nvmrc` to v20) |

## Workspace Structure

### `apps/web` — Frontend (Next.js)
- **Framework**: Next.js 16 with App Router
- **Routing**: File-based routing under `src/app/`
- **Styling**: CSS Modules (no Tailwind by default)
- **State Management**: TBD (React Context / Zustand)
- **API Calls**: Fetch to `apps/server` API or Next.js API routes for BFF patterns

### `apps/server` — Backend (NestJS)
- **Framework**: NestJS 11 with Express adapter
- **Architecture**: Modular — each domain feature is a NestJS module
- **API Style**: RESTful (potential GraphQL via `@nestjs/graphql` later)
- **Validation**: `class-validator` + `class-transformer` (DTOs)
- **Auth**: JWT-based (planned: `@nestjs/passport` + `@nestjs/jwt`)
- **Port**: 4000 (configurable via `PORT` env var)

### `packages/database` — Shared ORM Layer
- **ORM**: Prisma with PostgreSQL provider
- **Schema**: `prisma/schema.prisma` — single source of truth
- **Exports**: Re-exports `PrismaClient` and all generated types
- **Usage**: Both `apps/web` and `apps/server` import from `@callbackos/database`

### `packages/types` — Shared Type Definitions
- **Purpose**: TypeScript interfaces and enums shared across frontend and backend
- **Contents**: User, Resume, JobDescription, Application, InterviewStage, JobPlatform, API response wrappers
- **Import**: `import { User, InterviewStage } from '@callbackos/types'`

### `packages/utils` — Shared Utilities
- **Purpose**: Common helper functions used in both frontend and backend
- **Contents**: `formatRelativeDate`, `truncate`, `slugify`, `calculateMatchScore`, `isValidEmail`, `generateColor`
- **Import**: `import { calculateMatchScore } from '@callbackos/utils'`

## Data Flow

### Resume Tailoring Flow
```
User uploads resume (PDF/DOCX)
        │
        ▼
[Next.js Frontend] ──POST /api/resumes──▶ [NestJS API]
                                               │
                                               ▼
                                        Parse & extract text
                                        Store in PostgreSQL
                                               │
                                               ▼
User pastes Job Description ──────────▶ [NestJS API]
                                               │
                                               ▼
                                        AI Service (OpenAI/Gemini)
                                        Generate tailored resume
                                        Calculate match score
                                               │
                                               ▼
                                        Store TailoredResume
                                        Return to frontend
```

### Application Tracking Flow
```
User adds job to pipeline
        │
        ▼
[Kanban Board UI] ──POST /api/applications──▶ [NestJS API]
                                                    │
                                                    ▼
                                              Create Application
                                              (stage: WISHLIST)
                                                    │
                                                    ▼
User drags card to new stage ────────────▶ PATCH /api/applications/:id
                                                    │
                                                    ▼
                                              Update stage
                                              Log timestamp
```

## Environment Variables

All env vars are documented in `.env.example` at the root. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `PORT` | ❌ | Backend port (default: 4000) |
| `NODE_ENV` | ❌ | `development` / `production` |
| `FRONTEND_URL` | ✅ | Frontend URL for CORS (default: `http://localhost:3000`) |
| `JWT_SECRET` | ✅ | Secret key for JWT token signing |

## Deployment Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Vercel     │     │   Render /   │     │     Neon     │
│  (Frontend)   │────▶│   Railway    │────▶│ (PostgreSQL) │
│   Next.js     │     │  (Backend)   │     │  Free Tier   │
│   Free Tier   │     │  NestJS API  │     │              │
│               │     │  Free Tier   │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Total cost: $0/month** on free tiers (suitable for MVP and early traction)
