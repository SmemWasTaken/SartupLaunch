export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  onboardingCompleted: boolean;
  onboardingStep: number;
}

export interface StartupIdea {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToLaunch: string;
  revenueEstimate: string;
  marketSize: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  features: string[];
  previewUrl?: string;
  downloadUrl?: string;
  thumbnailUrl: string;
  isPurchased?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  templateId: string;
  template: Template;
  quantity: number;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  optional: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
}

export interface IdeaGeneratorParams {
  interests: string[];
  skills: string[];
  industry: string;
  budget: string;
  timeframe: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export type SubscriptionPlan = 'starter' | 'pro' | 'enterprise';

export interface SubscriptionFeatures {
  templatesAccess: 'basic' | 'premium' | 'all';
  teamMembers: number;
  apiAccess: boolean;
  advancedAnalytics: boolean;
  legalDocuments: boolean;
  financialTools: boolean;
  businessCanvas: boolean;
  marketingTools: boolean;
  pitchDeckBuilder: boolean;
}

export interface Subscription {
  plan: SubscriptionPlan;
  features: SubscriptionFeatures;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
}