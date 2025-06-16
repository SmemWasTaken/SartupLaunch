import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export type SubscriptionPlan = 'starter' | 'pro' | 'enterprise';

interface SubscriptionFeatures {
  maxIdeasPerMonth: number;
  templatesAccess: 'basic' | 'premium' | 'all';
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
  teamMembers: number;
  apiAccess: boolean;
  customBranding: boolean;
  advancedAnalytics: boolean;
  customIntegrations: boolean;
  dedicatedManager: boolean;
}

export const useSubscription = () => {
  const { user, isLoaded } = useUser();
  const [plan, setPlan] = useState<SubscriptionPlan>('starter');
  const [features, setFeatures] = useState<SubscriptionFeatures>({
    maxIdeasPerMonth: 2,
    templatesAccess: 'basic',
    supportLevel: 'community',
    teamMembers: 1,
    apiAccess: false,
    customBranding: false,
    advancedAnalytics: false,
    customIntegrations: false,
    dedicatedManager: false,
  });

  useEffect(() => {
    if (isLoaded && user) {
      // Get plan from user metadata
      const userPlan = (user.publicMetadata?.subscriptionPlan as SubscriptionPlan) || 'starter';
      setPlan(userPlan);
      setFeatures(getPlanFeatures(userPlan));
    }
  }, [user, isLoaded]);

  const getPlanFeatures = (planType: SubscriptionPlan): SubscriptionFeatures => {
    switch (planType) {
      case 'pro':
        return {
          maxIdeasPerMonth: -1, // unlimited
          templatesAccess: 'premium',
          supportLevel: 'priority',
          teamMembers: 3,
          apiAccess: false,
          customBranding: false,
          advancedAnalytics: true,
          customIntegrations: false,
          dedicatedManager: false,
        };
      case 'enterprise':
        return {
          maxIdeasPerMonth: -1, // unlimited
          templatesAccess: 'all',
          supportLevel: 'dedicated',
          teamMembers: -1, // unlimited
          apiAccess: true,
          customBranding: true,
          advancedAnalytics: true,
          customIntegrations: true,
          dedicatedManager: true,
        };
      default: // starter
        return {
          maxIdeasPerMonth: 2,
          templatesAccess: 'basic',
          supportLevel: 'community',
          teamMembers: 1,
          apiAccess: false,
          customBranding: false,
          advancedAnalytics: false,
          customIntegrations: false,
          dedicatedManager: false,
        };
    }
  };

  const hasFeature = (feature: keyof SubscriptionFeatures): boolean => {
    return Boolean(features[feature]);
  };

  const canGenerateIdeas = (currentCount: number): boolean => {
    return features.maxIdeasPerMonth === -1 || currentCount < features.maxIdeasPerMonth;
  };

  const getRemainingIdeas = (currentCount: number): number => {
    if (features.maxIdeasPerMonth === -1) return -1; // unlimited
    return Math.max(0, features.maxIdeasPerMonth - currentCount);
  };

  const upgradePlan = async (newPlan: SubscriptionPlan) => {
    if (!user) return;
    
    try {
      await user.update({
        unsafeMetadata: {
          subscriptionPlan: newPlan,
          planUpgradedAt: new Date().toISOString(),
        }
      });
      setPlan(newPlan);
      setFeatures(getPlanFeatures(newPlan));
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
      throw error;
    }
  };

  return {
    plan,
    features,
    hasFeature,
    canGenerateIdeas,
    getRemainingIdeas,
    upgradePlan,
    isLoaded,
  };
};