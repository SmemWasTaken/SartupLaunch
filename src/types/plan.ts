export type PlanType = 'Free' | 'Pro' | 'Enterprise';

export interface PlanFeatures {
  maxGenerationsPerDay: number;
  hasAdvancedAnalytics: boolean;
  maxSavedIdeas: number;
  hasPrioritySupport: boolean;
  hasCustomInterests: boolean;
  hasCustomAITraining: boolean;
  hasAPIAccess: boolean;
  hasCustomIntegrations: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
} 