// This file is deprecated and replaced by Supabase
// Keeping for reference only - all functionality moved to src/lib/supabase.ts

export const isDemoMode = true; // Firebase is no longer used

// Legacy exports for backward compatibility
export const auth = null;
export const db = null;
export const googleProvider = null;
export const githubProvider = null;

console.warn('Firebase configuration is deprecated. Please use Supabase instead.');