import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Loader2, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface Interest {
  id: string;
  label: string;
  category: string;
}

interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  marketSize: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToLaunch: string;
  isFavorite: boolean;
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

const HowItWorksWizard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [favoriteIdeas, setFavoriteIdeas] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const generateIdeas = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Simulate API call to generate ideas
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockIdeas: GeneratedIdea[] = [
        {
          id: '1',
          title: 'AI-Powered Content Creation Platform',
          description: 'A platform that helps businesses create engaging content using AI, tailored to their brand voice and audience.',
          marketSize: '$10B+',
          difficulty: 'Medium',
          timeToLaunch: '3-4 months',
          isFavorite: false,
        },
        {
          id: '2',
          title: 'Sustainable E-commerce Marketplace',
          description: 'A curated marketplace for eco-friendly products, with verified sustainability credentials and carbon footprint tracking.',
          marketSize: '$5B+',
          difficulty: 'Hard',
          timeToLaunch: '6-8 months',
          isFavorite: false,
        },
        {
          id: '3',
          title: 'Remote Team Collaboration Tool',
          description: 'An all-in-one platform for remote teams to collaborate, manage projects, and maintain company culture.',
          marketSize: '$8B+',
          difficulty: 'Medium',
          timeToLaunch: '4-5 months',
          isFavorite: false,
        },
      ];
      
      setGeneratedIdeas(mockIdeas);
      setCurrentStep(3);
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      setError('Failed to generate ideas. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFavorite = (ideaId: string) => {
    setFavoriteIdeas(prev => 
      prev.includes(ideaId)
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
    );
    
    setGeneratedIdeas(prev =>
      prev.map(idea =>
        idea.id === ideaId
          ? { ...idea, isFavorite: !idea.isFavorite }
          : idea
      )
    );
  };

  const handleNext = async () => {
    if (currentStep === 1 && selectedInterests.length === 0) {
      setError('Please select at least one interest to continue.');
      return;
    }
    
    if (currentStep === 2) {
      await generateIdeas();
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
    if (user) {
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
            <p className="text-gray-600">Our AI will analyze your interests and generate personalized startup ideas.</p>
            
            <div className="flex justify-center py-12">
              <button
                onClick={generateIdeas}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Ideas...</span>
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
                      onClick={() => toggleFavorite(idea.id)}
                      className={`p-2 rounded-full transition-colors ${
                        idea.isFavorite
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-6 h-6" fill={idea.isFavorite ? 'currentColor' : 'none'} />
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