import { useUser } from '@/contexts/UserContext';

type Feature = 'analytics' | 'team' | 'api' | 'priority_support' | 'custom_domains';

const PLAN_FEATURES: Record<string, Feature[]> = {
  free: ['analytics'],
  pro: ['analytics', 'team', 'api', 'priority_support'],
  enterprise: ['analytics', 'team', 'api', 'priority_support', 'custom_domains'],
};

export function usePlanFeatures() {
  const { user } = useUser();

  const hasFeature = (feature: Feature): boolean => {
    if (!user) return false;
    const features = PLAN_FEATURES[user.plan] || [];
    return features.includes(feature);
  };

  const getAvailableFeatures = (): Feature[] => {
    if (!user) return [];
    return PLAN_FEATURES[user.plan] || [];
  };

  const getUpgradeFeatures = (): Feature[] => {
    if (!user) return [];
    const currentFeatures = PLAN_FEATURES[user.plan] || [];
    const allFeatures = Object.values(PLAN_FEATURES).flat();
    return allFeatures.filter((feature) => !currentFeatures.includes(feature));
  };

  return {
    hasFeature,
    getAvailableFeatures,
    getUpgradeFeatures,
  };
}

export type { Feature }; 