import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Heart, 
  Sparkles, 
  Lightbulb, 
  Target, 
  Rocket,
  Users,
  X,
  Plus
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useIdeas } from '../hooks/useIdeas';
import { LoadingSpinner } from './LoadingSpinner';
import { generateMockIdeas } from '../utils/mockData';
import { secureLocalStorage } from '../utils/security';

interface WizardState {
  currentStep: number;
  interests: string[];
  skills: string[];
  industry: string;
  budget: string;
  timeframe: string;
  generatedIdeas: any[];
  favoriteIdeas: string[];
  completedSteps: number[];
}

const initialWizardState: WizardState = {
  currentStep: 1,
  interests: [],
  skills: [],
  industry: 'Any',
  budget: '$1K-$10K',
  timeframe: '1-3 months',
  generatedIdeas: [],
  favoriteIdeas: [],
  completedSteps: [],
};

export const HowItWorksWizard: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const { saveIdea } = useIdeas();
  const navigate = useNavigate();
  const [wizardState, setWizardState] = useState<WizardState>(initialWizardState);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [customInterest, setCustomInterest] = useState('');
  const [customSkill, setCustomSkill] = useState('');

  // Load wizard state from localStorage on mount
  useEffect(() => {
    const savedState = secureLocalStorage.getItem<WizardState>('wizardState');
    if (savedState) {
      setWizardState({ ...initialWizardState, ...savedState });
    }
  }, []);

  // Save wizard state to localStorage whenever it changes
  useEffect(() => {
    secureLocalStorage.setItem('wizardState', wizardState);
  }, [wizardState]);

  const updateWizardState = (updates: Partial<WizardState>) => {
    setWizardState(prev => ({ ...prev, ...updates }));
  };

  const predefinedInterests = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce',
    'Sustainability', 'Food & Beverage', 'Travel', 'Entertainment', 'Fitness',
    'Fashion', 'Real Estate', 'Marketing', 'Gaming', 'Social Impact'
  ];

  const predefinedSkills = [
    'Programming', 'Design', 'Marketing', 'Sales', 'Management',
    'Data Analysis', 'Writing', 'Photography', 'Video Editing', 'Teaching',
    'Consulting', 'Finance', 'Operations', 'Customer Service', 'Research'
  ];

  const industries = [
    'Any', 'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce',
    'Food & Beverage', 'Travel', 'Entertainment', 'Fitness', 'Real Estate'
  ];

  const budgetRanges = ['$0-$1K', '$1K-$10K', '$10K-$50K', '$50K-$100K', '$100K+'];
  const timeframes = ['1-3 months', '3-6 months', '6-12 months', '1+ years'];

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (wizardState.interests.length === 0) {
        newErrors.interests = 'Please select at least one interest';
      }
      if (wizardState.skills.length === 0) {
        newErrors.skills = 'Please select at least one skill';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (!validateStep(wizardState.currentStep)) return;

    if (wizardState.currentStep === 2 && wizardState.generatedIdeas.length === 0) {
      await generateIdeas();
    } else {
      const newStep = Math.min(4, wizardState.currentStep + 1);
      updateWizardState({ 
        currentStep: newStep,
        completedSteps: [...wizardState.completedSteps, wizardState.currentStep]
      });
    }
  };

  const prevStep = () => {
    const newStep = Math.max(1, wizardState.currentStep - 1);
    updateWizardState({ currentStep: newStep });
  };

  const generateIdeas = async () => {
    setIsGenerating(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const params = {
        interests: wizardState.interests,
        skills: wizardState.skills,
        industry: wizardState.industry,
        budget: wizardState.budget,
        timeframe: wizardState.timeframe,
      };

      const ideas = generateMockIdeas(params);
      
      updateWizardState({ 
        generatedIdeas: ideas,
        currentStep: 3,
        completedSteps: [...wizardState.completedSteps, 2]
      });
    } catch (error) {
      console.error('Failed to generate ideas:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFavorite = (ideaId: string) => {
    const newFavorites = wizardState.favoriteIdeas.includes(ideaId)
      ? wizardState.favoriteIdeas.filter(id => id !== ideaId)
      : [...wizardState.favoriteIdeas, ideaId];
    
    updateWizardState({ favoriteIdeas: newFavorites });
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !wizardState.interests.includes(customInterest.trim())) {
      updateWizardState({ 
        interests: [...wizardState.interests, customInterest.trim()] 
      });
      setCustomInterest('');
    }
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !wizardState.skills.includes(customSkill.trim())) {
      updateWizardState({ 
        skills: [...wizardState.skills, customSkill.trim()] 
      });
      setCustomSkill('');
    }
  };

  const removeInterest = (interest: string) => {
    updateWizardState({ 
      interests: wizardState.interests.filter(i => i !== interest) 
    });
  };

  const removeSkill = (skill: string) => {
    updateWizardState({ 
      skills: wizardState.skills.filter(s => s !== skill) 
    });
  };

  const completeWizard = async () => {
    // Save favorite ideas if user is signed in
    if (isSignedIn && wizardState.favoriteIdeas.length > 0) {
      for (const ideaId of wizardState.favoriteIdeas) {
        const idea = wizardState.generatedIdeas[parseInt(ideaId)];
        if (idea) {
          try {
            await saveIdea({
              title: idea.title,
              description: idea.description,
              category: idea.category,
              difficulty: idea.difficulty,
              timeToLaunch: idea.timeToLaunch,
              revenueEstimate: idea.revenueEstimate,
              marketSize: idea.marketSize,
              tags: idea.tags,
              isFavorite: true,
            });
          } catch (error) {
            console.log('Idea already saved or error occurred');
          }
        }
      }
    }

    // Navigate to pricing with favorites count
    navigate(`/pricing?favorites=${wizardState.favoriteIdeas.length}&from=wizard`);
  };

  const resetWizard = () => {
    setWizardState(initialWizardState);
    secureLocalStorage.removeItem('wizardState');
  };

  const renderProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
            step <= wizardState.currentStep 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {wizardState.completedSteps.includes(step) ? (
              <Check className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step < wizardState.currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Yourself</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help us understand your interests and skills so we can generate personalized startup ideas for you.
        </p>
      </div>

      <div className="space-y-6">
        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            What are your interests? *
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {predefinedInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  const newInterests = wizardState.interests.includes(interest)
                    ? wizardState.interests.filter(i => i !== interest)
                    : [...wizardState.interests, interest];
                  updateWizardState({ interests: newInterests });
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  wizardState.interests.includes(interest)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          
          {/* Custom interests */}
          <div className="flex flex-wrap gap-2 mb-3">
            {wizardState.interests.filter(i => !predefinedInterests.includes(i)).map((interest) => (
              <div key={interest} className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
                <span>{interest}</span>
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-2 hover:bg-blue-700 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="Add custom interest..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && addCustomInterest()}
            />
            <button
              onClick={addCustomInterest}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {errors.interests && (
            <p className="text-red-600 text-sm mt-1">{errors.interests}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            What are your skills? *
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {predefinedSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  const newSkills = wizardState.skills.includes(skill)
                    ? wizardState.skills.filter(s => s !== skill)
                    : [...wizardState.skills, skill];
                  updateWizardState({ skills: newSkills });
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  wizardState.skills.includes(skill)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          
          {/* Custom skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {wizardState.skills.filter(s => !predefinedSkills.includes(s)).map((skill) => (
              <div key={skill} className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg text-sm">
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:bg-green-700 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Add custom skill..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
            />
            <button
              onClick={addCustomSkill}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {errors.skills && (
            <p className="text-red-600 text-sm mt-1">{errors.skills}</p>
          )}
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Preferred Industry
            </label>
            <select
              value={wizardState.industry}
              onChange={(e) => updateWizardState({ industry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Starting Budget
            </label>
            <select
              value={wizardState.budget}
              onChange={(e) => updateWizardState({ budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {budgetRanges.map(budget => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Time to Launch
            </label>
            <select
              value={wizardState.timeframe}
              onChange={(e) => updateWizardState({ timeframe: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe} value={timeframe}>{timeframe}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="text-center space-y-8">
      <div>
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Generate Your Ideas</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your interests and skills, our AI will create personalized startup ideas tailored just for you.
        </p>
      </div>

      {isGenerating ? (
        <div className="py-12">
          <LoadingSpinner size="lg" text="Generating personalized startup ideas..." />
          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <p>🧠 Analyzing your interests and skills...</p>
            <p>📊 Researching market opportunities...</p>
            <p>💡 Creating personalized startup concepts...</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to generate ideas based on:</h3>
          <div className="space-y-3 text-left max-w-2xl mx-auto">
            <div>
              <span className="font-medium text-gray-700">Interests:</span>{' '}
              <span className="text-gray-600">{wizardState.interests.join(', ')}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Skills:</span>{' '}
              <span className="text-gray-600">{wizardState.skills.join(', ')}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Industry:</span>{' '}
              <span className="text-gray-600">{wizardState.industry}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Favorites</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Review the generated ideas and heart the ones that interest you most. 
          {wizardState.favoriteIdeas.length > 0 && (
            <span className="text-green-600 font-medium ml-1">
              ({wizardState.favoriteIdeas.length} selected)
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wizardState.generatedIdeas.map((idea, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex-1">{idea.title}</h3>
              <button
                onClick={() => toggleFavorite(index.toString())}
                className={`p-2 rounded-full transition-colors ${
                  wizardState.favoriteIdeas.includes(index.toString())
                    ? 'text-red-500 bg-red-50'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${
                  wizardState.favoriteIdeas.includes(index.toString()) ? 'fill-current' : ''
                }`} />
              </button>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">{idea.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium">{idea.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Difficulty:</span>
                <span className={`font-medium ${
                  idea.difficulty === 'Easy' ? 'text-green-600' :
                  idea.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {idea.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Revenue Potential:</span>
                <span className="font-medium text-green-600">{idea.revenueEstimate}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1">
              {idea.tags.map((tag: string, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-8">
      <div>
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Launch!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          You've selected {wizardState.favoriteIdeas.length} startup idea{wizardState.favoriteIdeas.length !== 1 ? 's' : ''}. 
          Now let's get you the tools and templates you need to turn {wizardState.favoriteIdeas.length > 1 ? 'them' : 'it'} into reality.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">What's Next?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Choose Your Plan</h4>
            <p className="text-gray-600 text-sm">Select a subscription plan that fits your entrepreneurial goals</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Access Templates</h4>
            <p className="text-gray-600 text-sm">Get business plans, legal docs, and marketing materials</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Launch & Grow</h4>
            <p className="text-gray-600 text-sm">Execute your plan and scale your startup</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={completeWizard}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
        >
          <span>View Pricing Plans</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={resetWizard}
          className="text-gray-600 hover:text-gray-800 text-sm underline"
        >
          Start over with different inputs
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {renderProgressBar()}
      
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
        {wizardState.currentStep === 1 && renderStep1()}
        {wizardState.currentStep === 2 && renderStep2()}
        {wizardState.currentStep === 3 && renderStep3()}
        {wizardState.currentStep === 4 && renderStep4()}
        
        {/* Navigation */}
        {wizardState.currentStep < 4 && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={wizardState.currentStep === 1}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <span className="text-sm text-gray-500">
              Step {wizardState.currentStep} of 4
            </span>
            
            <button
              onClick={nextStep}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {wizardState.currentStep === 2 ? 'Generate Ideas' : 'Next'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};