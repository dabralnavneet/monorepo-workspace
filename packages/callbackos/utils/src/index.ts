// ============================================
// CallbackOS - Shared Utility Functions
// ============================================

/**
 * Format a date to a human-readable relative string
 * e.g., "2 days ago", "just now", "in 3 hours"
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  return date.toLocaleDateString();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate match score between resume keywords and JD requirements
 * Returns a percentage (0-100)
 */
export function calculateMatchScore(
  resumeKeywords: string[],
  jdRequirements: string[]
): number {
  if (jdRequirements.length === 0) return 0;
  const normalizedResume = resumeKeywords.map((k) => k.toLowerCase().trim());
  const normalizedJd = jdRequirements.map((r) => r.toLowerCase().trim());

  const matched = normalizedJd.filter((req) =>
    normalizedResume.some(
      (keyword) => keyword.includes(req) || req.includes(keyword)
    )
  );

  return Math.round((matched.length / normalizedJd.length) * 100);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a random color for avatars/tags
 */
export function generateColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}
