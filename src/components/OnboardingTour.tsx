import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Target, CheckCircle } from 'lucide-react';
import { useOnboarding } from '../contexts/OnboardingContext';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Your Dashboard!',
    content: 'This is your startup command center. Let\'s take a quick tour to show you all the powerful features available.',
    target: 'dashboard-header',
    position: 'bottom'
  },
  {
    id: 'stats',
    title: 'Your Progress at a Glance',
    content: 'Track your startup journey with these key metrics: ideas generated, favorites, templates owned, and overall progress.',
    target: 'stats-grid',
    position: 'bottom'
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    content: 'Access the most important features instantly: generate new ideas, browse templates, and view analytics.',
    target: 'quick-actions',
    position: 'bottom'
  },
  {
    id: 'recent-ideas',
    title: 'Your Recent Ideas',
    content: 'See your latest AI-generated startup ideas here. Click on any idea to view details or take action.',
    target: 'recent-ideas',
    position: 'top'
  },
  {
    id: 'templates',
    title: 'Your Templates',
    content: 'Access your purchased templates and download resources to help launch your startup.',
    target: 'templates-section',
    position: 'top'
  },
  {
    id: 'onboarding',
    title: 'Complete Your Setup',
    content: 'Follow these steps to get the most out of StartupLaunch. Complete all tasks to unlock advanced features.',
    target: 'onboarding-progress',
    position: 'top'
  }
];

export const OnboardingTour: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const { tourSeen, markTourSeen } = useOnboarding();

  const showTour = () => {
    setIsVisible(true);
    setCurrentStep(0);
    highlightElement(tourSteps[0].target);
  };

  const hideTour = async () => {
    setIsVisible(false);
    removeHighlight();
    await markTourSeen();
  };

  const highlightElement = (targetId: string) => {
    removeHighlight();
    
    const element = document.getElementById(targetId);
    if (element) {
      element.style.position = 'relative';
      element.style.zIndex = '1001';
      element.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.5)';
      element.style.borderRadius = '12px';
      setHighlightedElement(element);
    }
  };

  const removeHighlight = () => {
    if (highlightedElement) {
      highlightedElement.style.position = '';
      highlightedElement.style.zIndex = '';
      highlightedElement.style.boxShadow = '';
      highlightedElement.style.borderRadius = '';
      setHighlightedElement(null);
    }
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      highlightElement(tourSteps[newStep].target);
    } else {
      hideTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      highlightElement(tourSteps[newStep].target);
    }
  };

  const skipTour = () => {
    hideTour();
  };

  // Expose showTour function globally so it can be called from dashboard
  useEffect(() => {
    (window as any).showDashboardTour = showTour;
    return () => {
      delete (window as any).showDashboardTour;
    };
  }, []);

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-1000 pointer-events-none" />
      
      {/* Tour Tooltip */}
      <div className="fixed z-1002 max-w-sm w-full">
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1002
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {tourSteps.length}
              </span>
            </div>
            <button
              onClick={skipTour}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {currentTourStep.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {currentTourStep.content}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={skipTour}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Skip Tour
            </button>

            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}</span>
              {currentStep === tourSteps.length - 1 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour