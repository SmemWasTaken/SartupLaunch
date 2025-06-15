import React, { createContext, useContext, useState, useEffect } from 'react';
import { OnboardingStep } from '../types';
import { useAuth } from './AuthContext';

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingOpen: boolean;
  completedSteps: number;
  totalSteps: number;
  showOnboarding: () => void;
  hideOnboarding: () => void;
  completeStep: (stepId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

const initialSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to StartupLaunch!',
    description: 'Let\'s take a quick tour to get you started with generating amazing startup ideas.',
    completed: false,
    optional: false,
  },
  {
    id: 'generate-idea',
    title: 'Generate Your First Idea',
    description: 'Use our AI-powered generator to create personalized startup ideas based on your interests.',
    completed: false,
    optional: false,
  },
  {
    id: 'explore-templates',
    title: 'Explore Templates',
    description: 'Browse our marketplace of professional business templates to accelerate your launch.',
    completed: false,
    optional: true,
  },
  {
    id: 'customize-profile',
    title: 'Customize Your Profile',
    description: 'Complete your profile to get more personalized recommendations.',
    completed: false,
    optional: true,
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Congratulations! You\'re ready to start building your startup empire.',
    completed: false,
    optional: false,
  },
];

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUser, isDemoMode } = useAuth();
  const [steps, setSteps] = useState<OnboardingStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    if (user && !user.onboardingCompleted) {
      // Auto-show onboarding for new users
      const timer = setTimeout(() => {
        setIsOnboardingOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    // Load onboarding progress from localStorage for demo mode
    if (isDemoMode) {
      const saved = localStorage.getItem('demo_onboarding');
      if (saved) {
        const { steps: savedSteps, currentStep: savedCurrentStep } = JSON.parse(saved);
        setSteps(savedSteps);
        setCurrentStep(savedCurrentStep);
      }
    }
  }, [isDemoMode]);

  const saveProgress = (newSteps: OnboardingStep[], newCurrentStep: number) => {
    if (isDemoMode) {
      localStorage.setItem('demo_onboarding', JSON.stringify({
        steps: newSteps,
        currentStep: newCurrentStep,
      }));
    }
  };

  const showOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const hideOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const completeStep = (stepId: string) => {
    const newSteps = steps.map(step =>
      step.id === stepId ? { ...step, completed: true } : step
    );
    setSteps(newSteps);
    saveProgress(newSteps, currentStep);

    // Check if all required steps are completed
    const requiredSteps = newSteps.filter(step => !step.optional);
    const completedRequired = requiredSteps.filter(step => step.completed);
    
    if (completedRequired.length === requiredSteps.length) {
      // Mark onboarding as completed
      updateUser({ onboardingCompleted: true });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newCurrentStep = currentStep + 1;
      setCurrentStep(newCurrentStep);
      saveProgress(steps, newCurrentStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newCurrentStep = currentStep - 1;
      setCurrentStep(newCurrentStep);
      saveProgress(steps, newCurrentStep);
    }
  };

  const skipOnboarding = () => {
    setIsOnboardingOpen(false);
    updateUser({ onboardingCompleted: true });
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;

  const value: OnboardingContextType = {
    steps,
    currentStep,
    isOnboardingOpen,
    completedSteps,
    totalSteps,
    showOnboarding,
    hideOnboarding,
    completeStep,
    nextStep,
    prevStep,
    skipOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};