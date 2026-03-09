// ============================================
// HireFlow - Shared Type Definitions
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

// --- Interview Funnel ---
export enum InterviewStage {
  WISHLIST = 'WISHLIST',
  APPLIED = 'APPLIED',
  PHONE_SCREEN = 'PHONE_SCREEN',
  TECHNICAL_ROUND = 'TECHNICAL_ROUND',
  ONSITE = 'ONSITE',
  HR_ROUND = 'HR_ROUND',
  OFFER = 'OFFER',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export interface Application {
  id: string;
  userId: string;
  jobDescriptionId: string;
  stage: InterviewStage;
  notes?: string;
  appliedAt?: Date;
  nextActionDate?: Date;
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
