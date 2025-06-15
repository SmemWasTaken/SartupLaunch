import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Circle, ChevronRight, Target, TrendingUp, Lightbulb, ShoppingBag, User, Play } from 'lucide-react';
import { useOnboarding } from '../contexts/OnboardingContext';

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
    steps,
    isStepComplete, 
    getCompletedStepsCount, 
    getTotalStepsCount, 
    getProgressPercentage,
    completeStep
  } = useOnboarding();

  const handleStepClick = (stepId: string) => {
    switch (stepId) {
      case 'generate-idea':
        navigate('/dashboard/generate');
        break;
      case 'save-idea':
        // Check if user has any saved ideas
        const savedIdeas = localStorage.getItem('demo_ideas');
        if (savedIdeas && JSON.parse(savedIdeas).length > 0) {
          completeStep('save-idea');
        } else {
          navigate('/dashboard/generate');
        }
        break;
      case 'explore-templates':
        navigate('/templates');
        completeStep('explore-templates');
        break;
      case 'complete-profile':
        // For demo, just mark as complete
        completeStep('complete-profile');
        break;
      case 'take-tour':
        // Trigger the dashboard tour
        if ((window as any).showDashboardTour) {
          (window as any).showDashboardTour();
        }
        break;
      default:
        break;
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'generate-idea': return <Lightbulb className="w-4 h-4" />;
      case 'save-idea': return <Target className="w-4 h-4" />;
      case 'explore-templates': return <ShoppingBag className="w-4 h-4" />;
      case 'complete-profile': return <User className="w-4 h-4" />;
      case 'take-tour': return <Play className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
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
          {steps.map((step) => {
            const isComplete = isStepComplete(step.id);
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
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
                    getStepIcon(step.id)
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
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`} id="onboarding-progress">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Complete Your Setup</h3>
            <p className="text-gray-600 text-sm">Follow these steps to get the most out of StartupLaunch</p>
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
        {steps.map((step, index) => {
          const isComplete = isStepComplete(step.id);
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
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
                  {getStepIcon(step.id)}
                  <h4 className={`font-semibold ${
                    isComplete ? 'text-green-700 line-through' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h4>
                  {step.optional && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Optional
                    </span>
                  )}
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
            You've completed the setup. You're ready to launch your startup!
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingChecklist;