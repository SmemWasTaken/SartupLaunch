import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Circle, ChevronRight, Target, TrendingUp } from 'lucide-react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { onboardingSteps } from '../config/onboarding';

interface OnboardingChecklistProps {
  className?: string;
  compact?: boolean;
}

const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ 
  className = '', 
  compact = false 
}) => {
  const navigate = useNavigate();
  const { 
    isStepComplete, 
    getCompletedStepsCount, 
    getTotalStepsCount, 
    getProgressPercentage 
  } = useOnboarding();

  const handleStepClick = (stepId: string, action: string) => {
    switch (action) {
      case 'scroll-to-generate':
        const generateSection = document.getElementById('idea-generator');
        if (generateSection) {
          generateSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'scroll-to-claim':
        const claimButton = document.getElementById('claim-button');
        if (claimButton) {
          claimButton.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If no claim button visible, scroll to idea generator first
          const ideaSection = document.getElementById('idea-generator');
          if (ideaSection) {
            ideaSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
      case 'navigate-to-dashboard':
        navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  const completedCount = getCompletedStepsCount();
  const totalCount = getTotalStepsCount();
  const progressPercentage = getProgressPercentage();

  if (compact) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-900">Quick Start</span>
          </div>
          <span className="text-sm text-gray-500">
            {completedCount}/{totalCount}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="space-y-2">
          {onboardingSteps.map((step) => {
            const isComplete = isStepComplete(step.id);
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id, step.action)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all hover:bg-gray-50 ${
                  isComplete ? 'opacity-75' : 'hover:shadow-sm'
                }`}
                disabled={isComplete}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  isComplete 
                    ? 'bg-green-500 text-white' 
                    : 'border-2 border-gray-300 text-gray-400'
                }`}>
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className={`text-sm font-medium ${
                    isComplete ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {!isComplete && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Getting Started</h3>
            <p className="text-gray-600 text-sm">Complete these steps to launch your startup</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{completedCount}/{totalCount}</div>
          <div className="text-sm text-gray-500">completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 20 && (
              <TrendingUp className="w-3 h-3 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {onboardingSteps.map((step, index) => {
          const isComplete = isStepComplete(step.id);
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id, step.action)}
              className={`w-full flex items-start space-x-4 p-4 rounded-xl transition-all ${
                isComplete 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md border border-gray-200'
              }`}
              disabled={isComplete}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isComplete 
                  ? 'bg-green-500 text-white' 
                  : 'border-2 border-gray-300 text-gray-400'
              }`}>
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{step.icon}</span>
                  <h4 className={`font-semibold ${
                    isComplete ? 'text-green-700 line-through' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h4>
                </div>
                <p className={`text-sm ${
                  isComplete ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </div>

              {!isComplete && (
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedCount === totalCount && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-center">
          <div className="text-lg font-semibold mb-1">🎉 Congratulations!</div>
          <div className="text-sm opacity-90">
            You've completed the onboarding. Ready to launch your startup!
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingChecklist;