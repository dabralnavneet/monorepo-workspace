// ============================================
// CallbackOS - Shared Type Definitions
// ============================================

// --- User ---
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Resume ---
export interface Resume {
  id: string;
  userId: string;
  title: string;
  originalFileUrl: string;
  parsedContent?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TailoredResume {
  id: string;
  resumeId: string;
  jobDescriptionId: string;
  tailoredContent: Record<string, unknown>;
  matchScore: number;
  createdAt: Date;
}

// --- Job Description ---
export interface JobDescription {
  id: string;
  userId: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location?: string;
  salary?: string;
  sourceUrl?: string;
  sourcePlatform?: JobPlatform;
  createdAt: Date;
}

// --- Application Tracking (Conversion-First Model) ---
// Philosophy: Focus on getting callbacks & offers.
// No "REJECTED" stage — cold applications are quietly "CLOSED".
// Hero metric = CALLBACK rate, not rejection count.
export enum ApplicationStage {
  SAVED = 'SAVED',               // Interested, bookmarked for later
  APPLYING = 'APPLYING',         // Resume tailored, preparing to apply
  APPLIED = 'APPLIED',           // Application submitted
  CALLBACK = 'CALLBACK',         // Got a response back (the key conversion!)
  INTERVIEWING = 'INTERVIEWING', // Active interview process (any round)
  OFFER = 'OFFER',               // Received an offer
  CLOSED = 'CLOSED',             // Quietly archived (neutral, not negative)
}

export interface Application {
  id: string;
  userId: string;
  jobDescriptionId: string;
  stage: ApplicationStage;
  notes?: string;
  appliedAt?: Date;
  callbackAt?: Date;           // 🎉 When they got a response (the key win)
  nextActionDate?: Date;
  closedReason?: string;       // Optional: why it was closed (user's own reference)
  createdAt: Date;
  updatedAt: Date;
}

// --- Job Board Integration ---
export enum JobPlatform {
  NAUKRI = 'NAUKRI',
  LINKEDIN = 'LINKEDIN',
  INSTAHYRE = 'INSTAHYRE',
  WELLFOUND = 'WELLFOUND',
  CUTSHORT = 'CUTSHORT',
  HIRECT = 'HIRECT',
  INTERNSHALA = 'INTERNSHALA',
  CUSTOM = 'CUSTOM',
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  applyUrl: string;
  platform: JobPlatform;
  postedAt?: Date;
  scrapedAt: Date;
}

// --- API Response Types ---
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
