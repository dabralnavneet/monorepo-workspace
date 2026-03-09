# Development Setup Guide

## Prerequisites

- **Node.js** ≥ 18 (recommended: v20, pinned in `.nvmrc`)
- **pnpm** ≥ 10.x (`npm install -g pnpm`)
- **Git**

## Quick Start

```bash
# 1. Clone the repo
git clone <repo-url> hireflow
cd hireflow

# 2. Install all dependencies (across all workspaces)
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your Neon database URL, JWT secret, etc.

# 4. Push the Prisma schema to your database
pnpm db:push

# 5. Generate the Prisma client
pnpm db:generate

# 6. Start all apps in development mode
pnpm dev
```

After running `pnpm dev`:
- **Frontend** (Next.js) → [http://localhost:3000](http://localhost:3000)
- **Backend** (NestJS) → [http://localhost:4000](http://localhost:4000)

## Workspace Commands

### Root-Level Commands (via Turborepo)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start **all** apps in parallel (frontend + backend) |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all apps and packages |
| `pnpm dev:web` | Start **only** the Next.js frontend |
| `pnpm dev:server` | Start **only** the NestJS backend |
| `pnpm db:generate` | Generate Prisma client from schema |
| `pnpm db:push` | Push schema to database (dev only) |
| `pnpm db:migrate` | Create and run database migration |
| `pnpm clean` | Clean all build outputs |

### Running Commands in Specific Workspaces

```bash
# Run any script in a specific workspace
pnpm --filter @hireflow/web <script>
pnpm --filter @hireflow/server <script>
pnpm --filter @hireflow/database <script>

# Examples
pnpm --filter @hireflow/server test
pnpm --filter @hireflow/web build
pnpm --filter @hireflow/database db:studio
```

## Adding Dependencies

```bash
# Add to a specific workspace
pnpm --filter @hireflow/web add axios
pnpm --filter @hireflow/server add @nestjs/config

# Add as dev dependency
pnpm --filter @hireflow/server add -D @types/multer

# Add to the root (shared dev tools only)
pnpm add -D prettier -w

# Add a workspace package as a dependency of another
pnpm --filter @hireflow/server add @hireflow/types@workspace:*
pnpm --filter @hireflow/web add @hireflow/types@workspace:*
```

## Database Setup (Neon)

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Create a free account
3. Create a new project (name: `hireflow`)
4. Copy the connection string from the dashboard
5. Paste it into your `.env` file as `DATABASE_URL`

```env
DATABASE_URL="postgresql://user:password@ep-cool-forest-123456.us-east-2.aws.neon.tech/hireflow?sslmode=require"
```

6. Run `pnpm db:push` to create all tables

## Project Structure Deep Dive

```
hireflow/
├── apps/
│   ├── web/                        # Next.js 16 Frontend
│   │   ├── src/
│   │   │   └── app/                # App Router pages
│   │   │       ├── layout.tsx      # Root layout
│   │   │       ├── page.tsx        # Homepage
│   │   │       ├── globals.css     # Global styles
│   │   │       └── favicon.ico     # App icon
│   │   ├── public/                 # Static assets
│   │   ├── next.config.ts          # Next.js configuration
│   │   ├── tsconfig.json           # TypeScript config
│   │   └── package.json
│   │
│   └── server/                     # NestJS 11 Backend
│       ├── src/
│       │   ├── main.ts             # App entry point (bootstrap)
│       │   ├── app.module.ts       # Root module
│       │   ├── app.controller.ts   # Root controller
│       │   └── app.service.ts      # Root service
│       ├── test/                   # E2E tests
│       ├── nest-cli.json           # NestJS CLI config
│       ├── tsconfig.json           # TypeScript config
│       └── package.json
│
├── packages/
│   ├── database/                   # Shared Prisma ORM
│   │   ├── prisma/
│   │   │   └── schema.prisma      # ⭐ Database schema (source of truth)
│   │   ├── src/
│   │   │   └── index.ts           # Re-exports PrismaClient
│   │   └── package.json
│   │
│   ├── types/                      # Shared TypeScript types
│   │   ├── src/
│   │   │   └── index.ts           # All interfaces & enums
│   │   └── package.json
│   │
│   └── utils/                      # Shared utility functions
│       ├── src/
│       │   └── index.ts          # Helper functions
│       └── package.json
│
├── docs/                           # 📚 Project documentation
│   ├── PROJECT_OVERVIEW.md         # What is HireFlow? Business context
│   ├── architecture/
│   │   ├── SYSTEM_ARCHITECTURE.md  # Tech stack, data flows, deployment
│   │   └── DATABASE_SCHEMA.md      # All models, relations, enums
│   ├── guides/
│   │   ├── DEVELOPMENT_SETUP.md    # This file — how to get started
│   │   └── CODING_CONVENTIONS.md   # Code style & patterns to follow
│   └── api/
│       └── API_DESIGN.md           # REST API endpoint specifications
│
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore rules
├── .nvmrc                          # Node version (v20)
├── turbo.json                      # Turborepo pipeline config
├── pnpm-workspace.yaml             # Workspace package list
└── package.json                    # Root scripts & dev dependencies
```

## Troubleshooting

### `pnpm install` fails with permission errors
```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
pnpm install
```

### Prisma client not generated
```bash
pnpm db:generate
```

### Port already in use
```bash
# Find and kill the process on port 3000 or 4000
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### TypeScript errors after schema change
```bash
# Regenerate Prisma client and restart TypeScript server
pnpm db:generate
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```
