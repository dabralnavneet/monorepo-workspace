# 📚 CallbackOS Documentation

This folder contains all project documentation. Any agent or developer with access to this folder should be able to fully understand, set up, and contribute to the project.

## Quick Links

| Document | Contents |
|----------|----------|
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | What CallbackOS is, the problem, features, target audience, monetization |
| [architecture/SYSTEM_ARCHITECTURE.md](./architecture/SYSTEM_ARCHITECTURE.md) | Tech stack, workspace structure, data flows, deployment architecture |
| [architecture/DATABASE_SCHEMA.md](./architecture/DATABASE_SCHEMA.md) | All database models, relationships, enums, design decisions |
| [guides/DEVELOPMENT_SETUP.md](./guides/DEVELOPMENT_SETUP.md) | Prerequisites, quick start, commands, troubleshooting |
| [guides/CODING_CONVENTIONS.md](./guides/CODING_CONVENTIONS.md) | Naming, file structure, patterns for frontend & backend, git conventions |
| [api/API_DESIGN.md](./api/API_DESIGN.md) | All REST endpoints, request/response examples, error format |

## For Agents: Start Here

If you are an AI agent that was just given access to this codebase, read the documents in this order:

1. **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** — Understand what the product is and WHY it exists
2. **[SYSTEM_ARCHITECTURE.md](./architecture/SYSTEM_ARCHITECTURE.md)** — Understand HOW the codebase is structured
3. **[CODING_CONVENTIONS.md](./guides/CODING_CONVENTIONS.md)** — Understand the rules to follow BEFORE writing any code
4. **[DATABASE_SCHEMA.md](./architecture/DATABASE_SCHEMA.md)** — Understand the data model
5. **[API_DESIGN.md](./api/API_DESIGN.md)** — Understand the API contract
6. **[DEVELOPMENT_SETUP.md](./guides/DEVELOPMENT_SETUP.md)** — If you need to run the project locally

## Key Facts (TL;DR for Agents)

- **Monorepo** managed by **Turborepo** + **pnpm workspaces**
- **Frontend**: `apps/web/` — **Next.js 16** (React 19, App Router, TypeScript)
- **Backend**: `apps/server/` — **NestJS 11** (TypeScript, Express)
- **Database**: **PostgreSQL** on **Neon** (free tier), accessed via **Prisma ORM**
- **Shared packages**: `@callbackos/types`, `@callbackos/utils`, `@callbackos/database`
- **Schema source of truth**: `packages/database/prisma/schema.prisma`
- **All apps start with**: `pnpm dev` (or `pnpm dev:web` / `pnpm dev:server`)
- **Env vars template**: `.env.example` at the project root
