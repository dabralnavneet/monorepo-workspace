# Database Schema Documentation

## Overview

HireFlow uses **PostgreSQL** (hosted on Neon) with **Prisma ORM**. The schema is defined in:

```
packages/database/prisma/schema.prisma
```

Both `apps/web` and `apps/server` share the same Prisma client via the `@hireflow/database` package.

## Entity Relationship Diagram

```
┌──────────┐       ┌──────────────┐       ┌─────────────────┐
│   User   │──1:N──│    Resume    │──1:N──│ TailoredResume  │
│          │       │              │       │                 │
│ id (PK)  │       │ id (PK)     │       │ id (PK)        │
│ email    │       │ userId (FK)  │       │ resumeId (FK)  │
│ name     │       │ title       │       │ jobDescId (FK) │
│ avatarUrl│       │ fileUrl     │       │ content        │
│          │       │ parsed (JSON)│       │ matchScore     │
└────┬─────┘       └──────────────┘       └────────┬────────┘
     │                                             │
     │                                             │
     │             ┌──────────────────┐             │
     ├────1:N─────│ JobDescription   │──N:1────────┘
     │             │                  │
     │             │ id (PK)         │
     │             │ userId (FK)     │
     │             │ title, company  │
     │             │ description     │
     │             │ requirements[]  │
     │             │ sourcePlatform  │
     │             └────────┬────────┘
     │                      │
     │                      │
     │             ┌────────┴────────┐
     └────1:N─────│  Application    │
                   │                 │
                   │ id (PK)        │
                   │ userId (FK)    │
                   │ jobDescId (FK) │
                   │ stage (enum)   │
                   │ notes          │
                   │ appliedAt      │
                   │ nextActionDate │
                   └─────────────────┘

┌──────────────┐
│  JobListing  │  (standalone — aggregated from external boards)
│              │
│ id (PK)     │
│ title       │
│ company     │
│ location    │
│ salary      │
│ applyUrl    │
│ platform    │
│ postedAt    │
└──────────────┘
```

## Models

### User
The authenticated user of the platform.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String (CUID) | PK | Unique identifier |
| `email` | String | Unique | User's email address |
| `name` | String | Required | Display name |
| `avatarUrl` | String | Optional | Profile picture URL |
| `createdAt` | DateTime | Auto | Account creation time |
| `updatedAt` | DateTime | Auto | Last profile update |

**Relations**: Has many Resumes, JobDescriptions, Applications

---

### Resume
An uploaded resume document.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String (CUID) | PK | Unique identifier |
| `userId` | String | FK → User | Owner of the resume |
| `title` | String | Required | User-given name (e.g., "SDE Resume v2") |
| `originalFileUrl` | String | Required | URL to stored file (Supabase/Cloudinary) |
| `parsedContent` | JSON | Optional | Extracted structured data (skills, experience, etc.) |
| `createdAt` | DateTime | Auto | Upload time |
| `updatedAt` | DateTime | Auto | Last modification |

**Relations**: Belongs to User, Has many TailoredResumes

---

### TailoredResume
An AI-generated resume variant optimized for a specific job description.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String (CUID) | PK | Unique identifier |
| `resumeId` | String | FK → Resume | Source resume |
| `jobDescriptionId` | String | FK → JobDescription | Target JD |
| `tailoredContent` | JSON | Required | Modified resume content |
| `matchScore` | Float | Required | 0-100 compatibility score |
| `createdAt` | DateTime | Auto | Generation time |

**Relations**: Belongs to Resume, Belongs to JobDescription

---

### JobDescription
A job description saved by the user (pasted manually or scraped from a board).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String (CUID) | PK | Unique identifier |
| `userId` | String | FK → User | Who saved it |
| `title` | String | Required | Job title |
| `company` | String | Required | Company name |
| `description` | Text | Required | Full JD text |
| `requirements` | String[] | Required | List of requirements/skills |
| `location` | String | Optional | Work location |
| `salary` | String | Optional | Salary range |
| `sourceUrl` | String | Optional | Original listing URL |
| `sourcePlatform` | JobPlatform | Optional | Which job board it came from |
| `createdAt` | DateTime | Auto | When saved |

**Relations**: Belongs to User, Has many TailoredResumes, Has many Applications

---

### Application
Tracks a user's application through the **conversion-first pipeline**. No "REJECTED" stage — cold applications are quietly "CLOSED".

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String (CUID) | PK | Unique identifier |
| `userId` | String | FK → User | Applicant |
| `jobDescriptionId` | String | FK → JobDescription | The job applied to |
| `stage` | ApplicationStage | Default: SAVED | Current pipeline stage |
| `notes` | Text | Optional | User's private notes |
| `appliedAt` | DateTime | Optional | When the application was submitted |
| `callbackAt` | DateTime | Optional | 🎉 When they got a response (the hero metric) |
| `nextActionDate` | DateTime | Optional | Reminder for next follow-up |
| `closedReason` | String | Optional | Why it was closed (user's own reference, not shown publicly) |
| `createdAt` | DateTime | Auto | Record creation |
| `updatedAt` | DateTime | Auto | Last stage change |

**Relations**: Belongs to User, Belongs to JobDescription

---

### JobListing
Aggregated job listings scraped/fetched from external job boards. **Not** user-specific — this is a shared catalog.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | String (CUID) | PK | Unique identifier |
| `title` | String | Required | Job title |
| `company` | String | Required | Company name |
| `location` | String | Required | Work location |
| `salary` | String | Optional | Salary range/info |
| `description` | Text | Required | Full listing text |
| `applyUrl` | String | Required | Direct link to apply |
| `platform` | JobPlatform | Required | Source platform |
| `postedAt` | DateTime | Optional | Original posting date |
| `scrapedAt` | DateTime | Auto | When we fetched it |

**Relations**: None (standalone entity)

## Enums

### ApplicationStage
Conversion-first pipeline — focuses on celebrating progress, not tracking failures:

```
SAVED → APPLYING → APPLIED → CALLBACK ✨ → INTERVIEWING → OFFER 🎉 → CLOSED
```

| Value | Description |
|-------|-------------|
| `SAVED` | Interested, bookmarked for later |
| `APPLYING` | Resume tailored, preparing to apply |
| `APPLIED` | Application submitted |
| `CALLBACK` | Got a response back — **the hero metric** |
| `INTERVIEWING` | Active interview process (any round) |
| `OFFER` | Received an offer |
| `CLOSED` | Quietly archived (neutral, not negative) |

> **Design Philosophy**: No "REJECTED" or "WITHDRAWN" stages. Applications that go cold are simply moved to CLOSED. The dashboard celebrates callbacks and offers, not losses. Users can optionally note a `closedReason` for their own reference.

### JobPlatform
Supported job board sources:

| Value | Platform |
|-------|----------|
| `NAUKRI` | Naukri.com |
| `LINKEDIN` | LinkedIn Jobs |
| `INSTAHYRE` | Instahyre |
| `WELLFOUND` | Wellfound (formerly AngelList) |
| `CUTSHORT` | Cutshort |
| `HIRECT` | Hirect |
| `INTERNSHALA` | Internshala |
| `CUSTOM` | User-added or unknown source |

## Key Design Decisions

1. **CUID for IDs** — More secure than auto-increment, URL-safe, sortable by creation time.
2. **JSON columns for parsed content** — Resume parsing output varies; JSON provides flexibility without schema changes.
3. **Cascade deletes** — Deleting a User removes all their data (GDPR-friendly).
4. **Separate JobListing from JobDescription** — `JobListing` is our aggregated catalog; `JobDescription` is what the user saves/interacts with.
5. **String arrays for requirements** — PostgreSQL native arrays; simpler than a join table for this use case.

## Database Commands

```bash
# Generate Prisma client after schema changes
pnpm db:generate

# Push schema directly to database (dev only, no migration history)
pnpm db:push

# Create a migration (use in production workflows)
pnpm db:migrate

# Open Prisma Studio (visual DB browser)
pnpm --filter @hireflow/database db:studio
```
