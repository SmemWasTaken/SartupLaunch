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
  isStepComplete: (stepId: string) => boolean;
  getCompletedStepsCount: () => number;
  getTotalStepsCount: () => number;
  getProgressPercentage: () => number;
  tourSeen: boolean;
  markTourSeen: () => Promise<void>;
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
    id: 'generate-idea',
    title: 'Generate Your First Idea',
    description: 'Use our AI-powered generator to create personalized startup ideas based on your interests.',
    completed: false,
    optional: false,
  },
  {
    id: 'save-idea',
    title: 'Save an Idea',
    description: 'Save your favorite generated idea to your dashboard for future reference.',
    completed: false,
    optional: false,
  },
  {
    id: 'explore-templates',
    title: 'Explore Templates',
    description: 'Browse our marketplace of professional business templates to accelerate your launch.',
    completed: false,
    optional: false,
  },
  {
    id: 'complete-profile',
    title: 'Complete Your Profile',
    description: 'Add more details to your profile to get better personalized recommendations.',
    completed: false,
    optional: true,
  },
  {
    id: 'take-tour',
    title: 'Take the Dashboard Tour',
    description: 'Learn about all the features available in your dashboard.',
    completed: false,
    optional: false,
  },
];

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUser, isDemoMode } = useAuth();
  const [steps, setSteps] = useState<OnboardingStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [tourSeen, setTourSeen] = useState(false);

  useEffect(() => {
    if (isDemoMode) {
      // Load from localStorage for demo mode
      const savedSteps = localStorage.getItem('demo_onboarding_steps');
      const savedTourSeen = localStorage.getItem('demo_tour_seen');
      
      if (savedSteps) {
        setSteps(JSON.parse(savedSteps));
      }
      
      if (savedTourSeen) {
        setTourSeen(JSON.parse(savedTourSeen));
      }
    }
  }, [isDemoMode]);

  const saveProgress = (newSteps: OnboardingStep[]) => {
    if (isDemoMode) {
      localStorage.setItem('demo_onboarding_steps', JSON.stringify(newSteps));
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
    saveProgress(newSteps);

    // Check if all required steps are completed
    const requiredSteps = newSteps.filter(step => !step.optional);
    const completedRequired = requiredSteps.filter(step => step.completed);
    
    if (completedRequired.length === requiredSteps.length && user) {
      updateUser({ onboardingCompleted: true });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newCurrentStep = currentStep + 1;
      setCurrentStep(newCurrentStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newCurrentStep = currentStep - 1;
      setCurrentStep(newCurrentStep);
    }
  };

  const skipOnboarding = () => {
    setIsOnboardingOpen(false);
    if (user) {
      updateUser({ onboardingCompleted: true });
    }
  };

  const isStepComplete = (stepId: string): boolean => {
    const step = steps.find(s => s.id === stepId);
    return step?.completed || false;
  };

  const getCompletedStepsCount = (): number => {
    return steps.filter(step => step.completed).length;
  };

  const getTotalStepsCount = (): number => {
    return steps.length;
  };

  const getProgressPercentage = (): number => {
    const completed = getCompletedStepsCount();
    const total = getTotalStepsCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const markTourSeen = async (): Promise<void> => {
    setTourSeen(true);
    completeStep('take-tour');
    
    if (isDemoMode) {
      localStorage.setItem('demo_tour_seen', 'true');
    }
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
    isStepComplete,
    getCompletedStepsCount,
    getTotalStepsCount,
    getProgressPercentage,
    tourSeen,
    markTourSeen,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};