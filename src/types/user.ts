export type Plan = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  createdAt: string;
  lastActive: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: {
      email?: boolean;
      push?: boolean;
    };
  };
  subscription?: {
    status: 'active' | 'canceled' | 'expired';
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
  teamId?: string;
  role?: 'owner' | 'admin' | 'member';
} 