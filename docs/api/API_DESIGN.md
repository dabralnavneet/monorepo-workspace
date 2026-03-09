# API Design Specification

## Base URL

- **Development**: `http://localhost:4000/api`
- **Production**: `https://api.hireflow.app/api` (TBD)

## Authentication

All endpoints (except auth) require a Bearer JWT token:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Auth Module

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login with email/password | ❌ |
| `POST` | `/api/auth/refresh` | Refresh JWT token | ✅ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |

#### `POST /api/auth/register`
```json
// Request
{
  "email": "user@example.com",
  "name": "Navneet Dabral",
  "password": "securepassword123"
}

// Response (201)
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "email": "user@example.com",
    "name": "Navneet Dabral",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### `POST /api/auth/login`
```json
// Request
{
  "email": "user@example.com",
  "password": "securepassword123"
}

// Response (200)
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### Resume Module

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/resumes` | List user's resumes | ✅ |
| `POST` | `/api/resumes` | Upload a new resume | ✅ |
| `GET` | `/api/resumes/:id` | Get a specific resume | ✅ |
| `DELETE` | `/api/resumes/:id` | Delete a resume | ✅ |
| `POST` | `/api/resumes/:id/tailor` | Generate a tailored version | ✅ |
| `GET` | `/api/resumes/:id/tailored` | List all tailored versions | ✅ |

#### `POST /api/resumes`
Upload a resume file (multipart/form-data).

```
Content-Type: multipart/form-data

Fields:
- title: string (required) — e.g., "SDE Resume 2026"
- file: File (required) — PDF or DOCX, max 5MB
```

```json
// Response (201)
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "title": "SDE Resume 2026",
    "originalFileUrl": "https://storage.example.com/resumes/abc123.pdf",
    "parsedContent": {
      "skills": ["React", "Node.js", "TypeScript", "PostgreSQL"],
      "experience": [...],
      "education": [...]
    }
  }
}
```

#### `POST /api/resumes/:id/tailor`
Generate an AI-tailored resume based on a job description.

```json
// Request
{
  "jobDescriptionId": "clx9876543210"
}

// Response (201)
{
  "success": true,
  "data": {
    "id": "clxtailored123",
    "matchScore": 87.5,
    "tailoredContent": {
      "summary": "...",
      "experience": [...],
      "skills": [...]
    },
    "suggestions": [
      "Add 'CI/CD' to your skills — mentioned 3x in JD",
      "Quantify impact in your second work experience",
      "Move 'System Design' skills higher — critical requirement"
    ]
  }
}
```

---

### Application Tracking Module (Conversion-First)

> **Design Philosophy**: The tracking model is designed to celebrate progress,
> not document failures. There is no "REJECTED" stage — cold applications are
> quietly "CLOSED". The hero metric is **callback rate**.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/applications` | List all user's applications | ✅ |
| `POST` | `/api/applications` | Create a new application entry | ✅ |
| `GET` | `/api/applications/:id` | Get application details | ✅ |
| `PATCH` | `/api/applications/:id` | Update application (change stage, notes) | ✅ |
| `DELETE` | `/api/applications/:id` | Delete an application | ✅ |
| `GET` | `/api/applications/stats` | Get conversion analytics | ✅ |

#### `GET /api/applications`
Returns applications grouped by stage (for pipeline UI).

```json
// Response (200)
{
  "success": true,
  "data": [
    {
      "id": "clxapp123",
      "stage": "CALLBACK",
      "jobDescription": {
        "title": "Senior Frontend Engineer",
        "company": "Razorpay"
      },
      "appliedAt": "2026-03-01T10:00:00Z",
      "callbackAt": "2026-03-05T14:00:00Z",
      "nextActionDate": "2026-03-12T14:00:00Z",
      "notes": "Got a call from recruiter, technical round scheduled",
      "updatedAt": "2026-03-08T16:30:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "pageSize": 50,
  "totalPages": 1
}
```

#### `PATCH /api/applications/:id`
Move an application to a new stage.

```json
// Request — Moving to CALLBACK (the big win!)
{
  "stage": "CALLBACK",
  "callbackAt": "2026-03-05T14:00:00Z",
  "notes": "Recruiter called! Technical round next week"
}

// Request — Closing an application (neutral, not "rejected")
{
  "stage": "CLOSED",
  "closedReason": "Role was filled internally"
}

// Response (200)
{
  "success": true,
  "data": {
    "id": "clxapp123",
    "stage": "CALLBACK",
    "callbackAt": "2026-03-05T14:00:00Z",
    "notes": "Recruiter called! Technical round next week",
    "updatedAt": "2026-03-09T20:00:00Z"
  }
}
```

#### `GET /api/applications/stats`
Conversion analytics — designed to motivate, not demoralize.

```json
// Response (200)
{
  "success": true,
  "data": {
    "totalApplications": 42,
    "activeApplications": 34,
    "byStage": {
      "SAVED": 5,
      "APPLYING": 3,
      "APPLIED": 18,
      "CALLBACK": 4,
      "INTERVIEWING": 3,
      "OFFER": 1,
      "CLOSED": 8
    },
    "callbackRate": 0.22,
    "callbackRateLabel": "22% callback rate — above average! 🔥",
    "avgTimeToCallback": "4.2 days",
    "thisWeekHighlights": {
      "newCallbacks": 2,
      "applicationsSubmitted": 5,
      "offersReceived": 0
    },
    "topRespondingCompanies": ["Razorpay", "Flipkart", "Zerodha"]
  }
}
```

---

### Job Listings Module

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | Browse aggregated job listings | ✅ |
| `GET` | `/api/jobs/:id` | Get job listing details | ✅ |
| `GET` | `/api/jobs/platforms` | List supported platforms | ❌ |

#### `GET /api/jobs`
Paginated, filterable job listings.

```
Query Parameters:
- page (number, default: 1)
- pageSize (number, default: 20, max: 50)
- search (string) — search in title, company, description
- platform (JobPlatform) — filter by source
- location (string) — filter by location
- sortBy (string) — "postedAt" | "scrapedAt" (default: "postedAt")
- sortOrder (string) — "asc" | "desc" (default: "desc")
```

```json
// Response (200)
{
  "success": true,
  "data": [
    {
      "id": "clxjob456",
      "title": "Full Stack Developer",
      "company": "Zerodha",
      "location": "Bangalore",
      "salary": "₹18-25 LPA",
      "platform": "CUTSHORT",
      "applyUrl": "https://cutshort.io/job/abc123",
      "postedAt": "2026-03-07T00:00:00Z"
    }
  ],
  "total": 340,
  "page": 1,
  "pageSize": 20,
  "totalPages": 17
}
```

---

### Job Description Module

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/job-descriptions` | List saved job descriptions | ✅ |
| `POST` | `/api/job-descriptions` | Save a new job description | ✅ |
| `GET` | `/api/job-descriptions/:id` | Get JD details | ✅ |
| `DELETE` | `/api/job-descriptions/:id` | Delete a JD | ✅ |

#### `POST /api/job-descriptions`
```json
// Request
{
  "title": "Senior Frontend Engineer",
  "company": "Razorpay",
  "description": "We are looking for a Senior Frontend Engineer...",
  "requirements": ["React", "TypeScript", "System Design", "3+ years"],
  "location": "Bangalore",
  "salary": "₹25-35 LPA",
  "sourceUrl": "https://linkedin.com/jobs/view/123",
  "sourcePlatform": "LINKEDIN"
}

// Response (201)
{
  "success": true,
  "data": {
    "id": "clxjd789",
    "title": "Senior Frontend Engineer",
    "company": "Razorpay",
    "requirements": ["React", "TypeScript", "System Design", "3+ years"],
    "createdAt": "2026-03-09T20:00:00Z"
  }
}
```

## Error Responses

All errors follow a consistent format:

```json
// 400 Bad Request
{
  "success": false,
  "error": "Validation failed",
  "message": "email must be a valid email address"
}

// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}

// 404 Not Found
{
  "success": false,
  "error": "Not Found",
  "message": "Application with id 'clx123' not found"
}

// 500 Internal Server Error
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting (Planned)

| Tier | Rate Limit |
|------|-----------|
| Free | 100 requests/minute |
| Pro | 500 requests/minute |
| Premium | 1000 requests/minute |
