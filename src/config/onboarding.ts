export interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  target?: string;
}

export const tourSteps: OnboardingStep[] = [
  {
    id: 'generate-idea',
    title: 'Generate Your First Startup Idea',
    content: 'Start here: Click "Generate Startup Idea" to get your first AI-powered business concept tailored to your interests and skills.',
    target: '#generate-button',
  },
  {
    id: 'claim-idea',
    title: 'Claim Your Startup Idea',
    content: 'Love the idea? Click "Claim This Idea & Get Started" to save it to your dashboard and access launch-ready templates.',
    target: '#claim-button',
  },
  {
    id: 'dashboard-access',
    title: 'Access Your Dashboard',
    content: 'View all your claimed ideas, track progress, and access premium templates in your personal dashboard.',
    target: '#dashboard-link',
  },
];

export const onboardingSteps = [
  {
    id: 'generate-idea',
    title: 'Generate Your First Idea',
    description: 'Use AI to create a personalized startup concept',
    icon: '🚀',
    action: 'scroll-to-generate',
  },
  {
    id: 'claim-idea',
    title: 'Claim an Idea',
    description: 'Save your favorite idea to your dashboard',
    icon: '💡',
    action: 'scroll-to-claim',
  },
  {
    id: 'visit-dashboard',
    title: 'Visit Your Dashboard',
    description: 'Explore your claimed ideas and templates',
    icon: '📊',
    action: 'navigate-to-dashboard',
  },
] as const;

export type OnboardingStepId = typeof onboardingSteps[number]['id'];