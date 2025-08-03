// POINT_VALUES.ts
export const POINT_VALUES = {
  visionSubmission: 3,
  imageLikeGiven: 1,
  imageLikeReceived: 1,
  fundingSelectedBonus: 10,
};

// Demo Configuration
export const DEMO_CONFIG = {
  autoGenerateTestVisions: true, // Populate with sample data
  skipVideoGeneration: true,     // Use image slideshow for speed
  fastDalleMode: true,          // Reduce generation time
  mockCityData: true            // Use SF sample data
};

// Recommended Tech Stack
export const RECOMMENDED_STACK = {
  frontend: 'Next.js 14 with App Router (already setup)',
  backend: 'Next.js API routes + Vercel Edge Functions',
  database: 'Vercel KV (Redis) for MVP speed',
  images: 'Vercel Blob Storage',
  ai: 'OpenAI API (DALL-E + GPT for categorization)',
  cityData: 'SF Open Data API + CSV fallback',
  authentication: 'NextAuth.js (optional for MVP)',
  realtime: 'Vercel Functions + polling (WebSocket for v2)'
};

// Error Handling & Fallbacks
export const FALLBACK_STRATEGIES = {
  dalleFailure: 'Use placeholder civic images',
  cityDataError: 'Load from local mock JSON',
  videoGeneration: 'Static image with overlay text',
  addressValidation: 'Accept any text input for MVP'
};