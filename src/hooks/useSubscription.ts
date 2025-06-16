import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { SubscriptionPlan, SubscriptionFeatures } from '../types';

export const useSubscription = () => {
  const { user, isLoaded } = useUser();
  const [plan, setPlan] = useState<SubscriptionPlan>('starter');
  const [features, setFeatures] = useState<SubscriptionFeatures>({
    templatesAccess: 'basic',
    teamMembers: 1,
    apiAccess: false,
    advancedAnalytics: false,
    legalDocuments: false,
    financialTools: false,
    businessCanvas: false,
    marketingTools: false,
    pitchDeckBuilder: false,
  });

  useEffect(() => {
    if (isLoaded && user) {
      // Get plan from user metadata
      const userPlan = (user.unsafeMetadata?.subscriptionPlan as SubscriptionPlan) || 'starter';
      setPlan(userPlan);
      setFeatures(getFeaturesForPlan(userPlan));
    }
  }, [user, isLoaded]);

  const getFeaturesForPlan = (plan: SubscriptionPlan): SubscriptionFeatures => {
    switch (plan) {
      case 'starter':
        return {
          templatesAccess: 'basic',
          teamMembers: 1,
          apiAccess: false,
          advancedAnalytics: false,
          legalDocuments: false,
          financialTools: false,
          businessCanvas: false,
          marketingTools: false,
          pitchDeckBuilder: false,
        };
      case 'pro':
        return {
          templatesAccess: 'premium',
          teamMembers: 5,
          apiAccess: false,
          advancedAnalytics: true,
          legalDocuments: true,
          financialTools: true,
          businessCanvas: true,
          marketingTools: true,
          pitchDeckBuilder: true,
        };
      case 'enterprise':
        return {
          templatesAccess: 'all',
          teamMembers: 10,
          apiAccess: true,
          advancedAnalytics: true,
          legalDocuments: true,
          financialTools: true,
          businessCanvas: true,
          marketingTools: true,
          pitchDeckBuilder: true,
        };
      default:
        return {
          templatesAccess: 'basic',
          teamMembers: 1,
          apiAccess: false,
          advancedAnalytics: false,
          legalDocuments: false,
          financialTools: false,
          businessCanvas: false,
          marketingTools: false,
          pitchDeckBuilder: false,
        };
    }
  };

  const hasFeature = (feature: keyof SubscriptionFeatures): boolean => {
    return Boolean(features[feature]);
  };

  const getRemainingIdeas = (generationCount: number): number => {
    switch (plan) {
      case 'starter':
        return Math.max(0, 5 - generationCount); // 5 ideas per month for starter plan
      case 'pro':
        return Math.max(0, 20 - generationCount); // 20 ideas per month for pro plan
      case 'enterprise':
        return -1; // Unlimited ideas for enterprise plan
      default:
        return 0;
    }
  };

  const canGenerateIdeas = (generationCount: number): boolean => {
    const remaining = getRemainingIdeas(generationCount);
    return remaining === -1 || remaining > 0;
  };

  const upgradePlan = async (newPlan: SubscriptionPlan) => {
    if (!user) return;
    
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          subscriptionPlan: newPlan,
          planUpgradedAt: new Date().toISOString(),
        },
      });
      setPlan(newPlan);
      setFeatures(getFeaturesForPlan(newPlan));
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
      throw error;
    }
  };

  return {
    plan,
    features,
    hasFeature,
    upgradePlan,
    isLoaded,
    subscription: { plan, features },
    getRemainingIdeas,
    canGenerateIdeas,
  };
};