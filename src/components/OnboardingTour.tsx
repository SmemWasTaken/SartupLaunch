import React, { useState, useEffect } from 'react';
import { tourSteps } from '../config/onboarding';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAuth } from '../hooks/useAuth';

// Simple tour implementation without react-joyride for now
const OnboardingTour: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { tourSeen, markTourSeen } = useOnboarding();
  const { user } = useAuth();

  useEffect(() => {
    // Start tour if user is logged in and hasn't seen it yet
    if (user && !tourSeen) {
      // Small delay to ensure DOM elements are rendered
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, tourSeen]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    setIsVisible(false);
    await markTourSeen();
  };

  // Don't render if user is not logged in or has already seen the tour
  if (!user || tourSeen || !isVisible) {
    return null;
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {tourSteps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {currentTourStep.title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {currentTourStep.content}
        </p>
        
        <div className="flex justify-between">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {currentStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;