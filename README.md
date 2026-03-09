# 🌍 Personal Monorepo Workspace

This is a centralized Turborepo workspace containing multiple personal applications, services, and shared packages. 

It is designed to scale horizontally — you can add as many independent frontend and backend applications as you need, while sharing configurations, UI components, and utilities across them.

## 📁 Directory Structure

The structure is grouped by **project**, allowing multiple independent projects to coexist peacefully:

```
monorepo-workspace/
├── apps/
│   └── callbackos/              ← Project 1: CallbackOS (End-to-End Interview tracker)
│       ├── web/                 ← Next.js Frontend
│       └── server/              ← NestJS Backend API
│
├── packages/
│   └── callbackos/              ← Project 1 Shared Packages
│       ├── database/            ← Prisma ORM and Schema
│       ├── types/               ← Shared TypeScript Definitions
│       └── utils/               ← Shared utility functions
│
└── docs/
    └── callbackos/              ← Project 1 Documentation
```

## 🚀 Projects

### 1. CallbackOS
An end-to-end interview experience platform focusing on *Conversion-First Tracker*.
- **Frontend**: [apps/callbackos/web](./apps/callbackos/web)
- **Backend**: [apps/callbackos/server](./apps/callbackos/server)
- **Docs**: [docs/callbackos/README.md](./docs/callbackos/README.md)

## 💻 Global Commands

Run these commands from the root directory (`/monorepo-workspace`):

### Development
Start the entire monorepo (all apps):
```bash
pnpm dev
```
Start only the CallbackOS project:
```bash
pnpm dev:callbackos
```
Start only the CallbackOS Next.js frontend:
```bash
pnpm dev:callbackos:web
```

### Database Management (CallbackOS)
```bash
# Push schema changes to remote database
pnpm db:callbackos:push

# Generate Prisma client locally
pnpm db:callbackos:generate
```

## 🛠 Adding a New Project
To add a new project (e.g., `fancy-ai-app`), simply create new directories:
1. Initialize an app in `apps/fancy-ai-app/web`
2. Initialize packages in `packages/fancy-ai-app/core`
3. Add a dedicated script to the root `package.json` for convenience: `"dev:fancy": "turbo dev --filter=@fancy-ai-app/*"`
