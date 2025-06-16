import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Loader2, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { aiService } from '../services/aiService';
import { analyticsService } from '../services/analyticsService';
import { GeneratedIdea } from '../types/idea';
import { usePlanFeatures } from '../hooks/usePlanFeatures';
import { useFavorites } from '../hooks/useFavorites';

interface Interest {
  id: string;
  label: string;
  category: string;
}

const interests: Interest[] = [
  { id: 'tech', label: 'Technology', category: 'Industry' },
  { id: 'health', label: 'Healthcare', category: 'Industry' },
  { id: 'finance', label: 'Finance', category: 'Industry' },
  { id: 'education', label: 'Education', category: 'Industry' },
  { id: 'retail', label: 'Retail', category: 'Industry' },
  { id: 'marketing', label: 'Marketing', category: 'Skill' },
  { id: 'coding', label: 'Programming', category: 'Skill' },
  { id: 'design', label: 'Design', category: 'Skill' },
  { id: 'sales', label: 'Sales', category: 'Skill' },
  { id: 'writing', label: 'Content Creation', category: 'Skill' },
];

const GENERATION_LIMITS: Record<string, number | 'unlimited'> = {
  free: 5,
  pro: 50,
  enterprise: 'unlimited',
};

const HowItWorksWizard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { currentPlan } = usePlanFeatures();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [favoriteIdeas, setFavoriteIdeas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);

  const generationLimit = GENERATION_LIMITS[currentPlan] ?? 0;

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('howItWorksWizard');
    if (savedState) {
      const { step, interests, ideas, favorites } = JSON.parse(savedState);
      setCurrentStep(step);
      setSelectedInterests(interests);
      setGeneratedIdeas(ideas);
      setFavoriteIdeas(favorites);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('howItWorksWizard', JSON.stringify({
      step: currentStep,
      interests: selectedInterests,
      ideas: generatedIdeas,
      favorites: favoriteIdeas,
    }));
  }, [currentStep, selectedInterests, generatedIdeas, favoriteIdeas]);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleGenerate = async () => {
    if (!user) {
      navigate('/signup', { state: { from: 'how-it-works' } });
      return;
    }

    if (generationLimit !== 'unlimited' && generationCount >= generationLimit) {
      setError(`You've reached your limit of ${generationLimit} idea generations. Upgrade your plan for unlimited generations.`);
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const ideas = await aiService.generateIdeas(
        {
          interests: selectedInterests,
          userPreferences: {
            preferredDifficulty: 'Medium',
            preferredTimeToLaunch: '3-6 months',
          }
        },
        user.id
      );
      
      setGeneratedIdeas(ideas);
      setGenerationCount(prev => prev + 1);
      setCurrentStep(3);

      // Track analytics
      analyticsService.trackIdeaGeneration(user.id, ideas);
      analyticsService.trackInterestSelection(user.id, selectedInterests);
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate ideas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleFavorite = (idea: GeneratedIdea) => {
    if (!user?.id) return;
    toggleFavorite(idea);
    analyticsService.trackIdeaFavorite(user.id, !isFavorite(idea.id));
  };

  const handleNext = async () => {
    if (currentStep === 1 && selectedInterests.length === 0) {
      setError('Please select at least one interest to continue.');
      return;
    }
    
    if (currentStep === 2) {
      await handleGenerate();
    } else if (currentStep === 3 && favoriteIdeas.length === 0) {
      setError('Please select at least one idea to continue.');
      return;
    } else {
      setCurrentStep(prev => prev + 1);
    }
    setError(null);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError(null);
  };

  const handleStartTrial = () => {
    if (user?.id) {
      navigate('/dashboard', { state: { favoriteIdeas } });
    } else {
      navigate('/signup', { state: { favoriteIdeas } });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Tell Us Your Interests</h3>
            <p className="text-gray-600">Select the skills and industries you're interested in. This helps us generate more relevant ideas for you.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="font-medium">{interest.label}</div>
                  <div className="text-sm text-gray-500">{interest.category}</div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Generate Ideas</h3>
            <p className="text-gray-600">
              Our AI will analyze your interests and generate personalized startup ideas.
              {generationLimit !== 'unlimited' && (
                <span className="block mt-2 text-sm text-gray-500">
                  You have {generationLimit - generationCount} generations remaining.
                </span>
              )}
            </p>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
            
            <div className="flex justify-center py-12">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (generationLimit !== 'unlimited' && generationCount >= generationLimit)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Ideas...</span>
                  </>
                ) : !user ? (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Sign Up to Generate Ideas</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Generate Ideas</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Select & Save Ideas</h3>
            <p className="text-gray-600">Review and favorite the ideas you like. You can access these later in your dashboard.</p>
            
            <div className="space-y-4">
              {generatedIdeas.map(idea => (
                <div
                  key={idea.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{idea.title}</h4>
                      <p className="text-gray-600 mt-2">{idea.description}</p>
                      <div className="flex gap-4 mt-4 text-sm text-gray-500">
                        <div>Market Size: {idea.marketSize}</div>
                        <div>Difficulty: {idea.difficulty}</div>
                        <div>Time to Launch: {idea.timeToLaunch}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(idea)}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite(idea.id)
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-6 h-6" fill={isFavorite(idea.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Ready to Launch!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You've selected {favoriteIdeas.length} ideas. Start your free trial to access your dashboard and begin your startup journey.
            </p>
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleStartTrial}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`flex items-center ${
                step < 4 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Tell Us Your Interests</span>
          <span>Generate Ideas</span>
          <span>Select & Save</span>
          <span>Launch & Grow</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          {error}
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HowItWorksWizard; 