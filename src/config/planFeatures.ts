export type PlanName = 'basic' | 'pro' | 'enterprise';

export interface PlanFeatures {
  aiIdeaGenerationLimit: number | 'unlimited';
  templates: 'basic' | 'premium' | 'all';
  analytics: boolean;
  teamSeats: number | 'unlimited';
  apiAccess: boolean;
  whiteLabel: boolean;
  prioritySupport: boolean;
  communityAccess: boolean;
}

export const PLAN_FEATURES: Record<PlanName, PlanFeatures> = {
  basic: {
    aiIdeaGenerationLimit: 3,
    templates: 'basic',
    analytics: false,
    teamSeats: 1,
    apiAccess: false,
    whiteLabel: false,
    prioritySupport: false,
    communityAccess: true,
  },
  pro: {
    aiIdeaGenerationLimit: 'unlimited',
    templates: 'premium',
    analytics: true,
    teamSeats: 5,
    apiAccess: false,
    whiteLabel: false,
    prioritySupport: true,
    communityAccess: true,
  },
  enterprise: {
    aiIdeaGenerationLimit: 'unlimited',
    templates: 'all',
    analytics: true,
    teamSeats: 'unlimited',
    apiAccess: true,
    whiteLabel: true,
    prioritySupport: true,
    communityAccess: true,
  },
}; 