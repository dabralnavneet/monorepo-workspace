# Coding Conventions

## General Principles

1. **TypeScript everywhere** — No `any` types unless absolutely unavoidable. Use `unknown` + type narrowing instead.
2. **Shared types first** — All interfaces/enums shared between frontend and backend go in `@hireflow/types`.
3. **Single responsibility** — Each file/module should do one thing well.
4. **Meaningful names** — Variables, functions, files should clearly describe their purpose.

## File & Folder Naming

| Item | Convention | Example |
|------|-----------|---------|
| Files (general) | `kebab-case` | `user-profile.ts` |
| React components | `PascalCase` | `UserProfile.tsx` |
| NestJS modules | `kebab-case` | `auth/auth.module.ts` |
| NestJS services | `kebab-case` | `auth/auth.service.ts` |
| NestJS controllers | `kebab-case` | `auth/auth.controller.ts` |
| NestJS DTOs | `kebab-case` | `auth/dto/create-user.dto.ts` |
| Test files | `*.spec.ts` / `*.e2e-spec.ts` | `auth.service.spec.ts` |
| CSS Modules | `kebab-case.module.css` | `user-profile.module.css` |
| Types/Interfaces | `PascalCase` | `interface UserProfile` |
| Enums | `PascalCase` with `SCREAMING_SNAKE` values | `enum InterviewStage { PHONE_SCREEN }` |

## Frontend Conventions (Next.js)

### App Router Structure
```
src/app/
├── (auth)/                    # Route group (no URL segment)
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── page.tsx               # /dashboard
│   ├── layout.tsx             # Dashboard layout (sidebar, etc.)
│   └── applications/
│       └── page.tsx           # /dashboard/applications
├── layout.tsx                 # Root layout
└── page.tsx                   # Landing page (/)
```

### Component Structure
```tsx
// components/ResumeCard/ResumeCard.tsx
import styles from './ResumeCard.module.css';

interface ResumeCardProps {
  title: string;
  matchScore: number;
  onEdit: () => void;
}

export function ResumeCard({ title, matchScore, onEdit }: ResumeCardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <span>{matchScore}% match</span>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}
```

### Key Rules
- Use **named exports** (not default exports) for components
- Colocate component styles: `ComponentName/ComponentName.tsx` + `ComponentName.module.css`
- Use `'use client'` directive only when necessary (event handlers, hooks, browser APIs)
- Prefer **Server Components** by default — they're the default in App Router

## Backend Conventions (NestJS)

### Module Structure
Each feature is a **NestJS module** with its own folder:

```
src/
├── auth/
│   ├── auth.module.ts          # Module declaration
│   ├── auth.controller.ts      # HTTP endpoints
│   ├── auth.service.ts         # Business logic
│   ├── auth.guard.ts           # Auth guard
│   ├── dto/
│   │   ├── login.dto.ts        # Input validation
│   │   └── register.dto.ts
│   └── auth.controller.spec.ts # Unit tests
├── resume/
│   ├── resume.module.ts
│   ├── resume.controller.ts
│   ├── resume.service.ts
│   └── dto/
│       ├── create-resume.dto.ts
│       └── update-resume.dto.ts
├── application/
│   └── ...
└── app.module.ts               # Root module (imports all feature modules)
```

### DTO Pattern (Data Transfer Objects)
Always validate incoming data with DTOs:

```typescript
// dto/create-application.dto.ts
import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { InterviewStage } from '@hireflow/types';

export class CreateApplicationDto {
  @IsString()
  jobDescriptionId: string;

  @IsEnum(InterviewStage)
  @IsOptional()
  stage?: InterviewStage;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsOptional()
  nextActionDate?: string;
}
```

### Service Pattern
Services contain business logic and interact with the database:

```typescript
// application/application.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@hireflow/database';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllByUser(userId: string) {
    return this.prisma.application.findMany({
      where: { userId },
      include: { jobDescription: true },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
```

### Key Rules
- Always use **DTOs with class-validator** for request bodies
- Use **dependency injection** — never instantiate services manually
- Keep controllers thin — delegate logic to services
- Return consistent response shapes using `ApiResponse<T>` from `@hireflow/types`
- Use **guards** for authentication, **interceptors** for response transformation
- Handle errors with NestJS built-in exceptions (`NotFoundException`, `BadRequestException`, etc.)

## API Response Format

All API responses should follow this consistent shape:

```json
// Success
{
  "success": true,
  "data": { ... },
  "message": "Application created successfully"
}

// Error
{
  "success": false,
  "error": "Application not found",
  "message": "The requested application does not exist"
}

// Paginated
{
  "success": true,
  "data": [ ... ],
  "total": 42,
  "page": 1,
  "pageSize": 20,
  "totalPages": 3
}
```

## Git Conventions

### Branch Naming
```
feature/resume-upload
fix/login-redirect
chore/update-dependencies
docs/api-documentation
```

### Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(resume): add AI-powered JD tailoring
fix(auth): resolve token refresh race condition
chore(deps): update Prisma to v6.5
docs(api): document application endpoints
refactor(server): extract shared validation pipe
```

## Import Order

Organize imports in this order (separated by blank lines):

```typescript
// 1. External packages
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

// 2. Monorepo packages
import { User, InterviewStage } from '@hireflow/types';
import { formatRelativeDate } from '@hireflow/utils';
import { PrismaClient } from '@hireflow/database';

// 3. Local imports (relative paths)
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationService } from './application.service';
```
