import { useUser } from '@/contexts/UserContext';

export type Feature = 
  | 'analytics'
  | 'team'
  | 'api'
  | 'priority_support'
  | 'custom_domains'
  | 'advanced_analytics'
  | 'team_members'
  | 'api_access';

const PLAN_FEATURES: Record<string, Feature[]> = {
  free: ['analytics'],
  pro: ['analytics', 'team', 'api', 'priority_support'],
  enterprise: ['analytics', 'team', 'api', 'priority_support', 'custom_domains', 'advanced_analytics', 'team_members', 'api_access']
};

export const usePlanFeatures = () => {
  const { user } = useUser();
  const currentPlan = user?.plan || 'free';
  const planFeatures = PLAN_FEATURES[currentPlan] || [];

  const hasFeature = (feature: Feature): boolean => {
    return planFeatures.includes(feature);
  };

  const getAvailableFeatures = (): Feature[] => {
    return planFeatures;
  };

  const getUpgradeFeatures = (): Feature[] => {
    const allFeatures = Object.values(PLAN_FEATURES).flat();
    const currentFeatures = new Set(planFeatures);
    return allFeatures.filter(feature => !currentFeatures.has(feature));
  };

  return {
    hasFeature,
    getAvailableFeatures,
    getUpgradeFeatures,
    planFeatures,
    currentPlan
  };
}; 