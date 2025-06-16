import React, { useState } from 'react';
import { Lightbulb, Zap, Clock, TrendingUp, Heart, Share2, Download, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIdeas } from '../hooks/useIdeas';
import { useSubscription } from '../hooks/useSubscription';
import { LoadingSpinner } from './LoadingSpinner';
import { UpgradePrompt } from './UpgradePrompt';
import { trackIdeaGenerated } from '../utils/analytics';

interface GeneratedIdea {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToLaunch: string;
  revenueEstimate: string;
  marketSize: string;
  tags: string[];
}

export const IdeaGenerator: React.FC = () => {
  const { saveIdea, toggleFavorite, isLoading, ideas } = useIdeas();
  const { plan, canGenerateIdeas, getRemainingIdeas } = useSubscription();
  const [formData, setFormData] = useState({
    interests: '',
    skills: '',
    industry: 'Any',
    budget: '$1K-$10K',
    timeframe: '1-3 months',
  });
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const industries = [
    'Any', 'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce',
    'Food & Beverage', 'Travel', 'Entertainment', 'Fitness', 'Real Estate',
    'Marketing', 'Consulting', 'Manufacturing', 'Agriculture'
  ];

  const budgetRanges = [
    '$0-$1K', '$1K-$10K', '$10K-$50K', '$50K-$100K', '$100K+'
  ];

  const timeframes = [
    '1-3 months', '3-6 months', '6-12 months', '1+ years'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.interests.trim()) {
      setError('Please describe your interests');
      return;
    }

    if (!formData.skills.trim()) {
      setError('Please describe your skills');
      return;
    }

    // Check if user is signed in and if they can generate ideas
    if (!canGenerateIdeas(generationCount)) {
      setShowUpgradePrompt(true);
      return;
    }

    try {
      // For demo purposes, generate mock ideas
      const mockIdeas: GeneratedIdea[] = [
        {
          title: 'AI-Powered Plant Care Assistant',
          description: 'A smart mobile app that uses computer vision to diagnose plant health issues and provides personalized care recommendations.',
          category: 'Mobile App',
          difficulty: 'Medium',
          timeToLaunch: '4-6 months',
          revenueEstimate: '$50K-$200K/year',
          marketSize: '$2.1B',
          tags: ['AI', 'Mobile', 'Plants', 'Computer Vision'],
        },
        {
          title: 'Micro-Learning Platform for Professionals',
          description: 'Bite-sized learning modules delivered through Slack/Teams integration for busy professionals.',
          category: 'Education',
          difficulty: 'Easy',
          timeToLaunch: '2-3 months',
          revenueEstimate: '$100K-$500K/year',
          marketSize: '$365B',
          tags: ['Education', 'B2B', 'SaaS', 'Integration'],
        }
      ];

      setGeneratedIdeas(mockIdeas);
      setShowResults(true);
      setGenerationCount(prev => prev + 1);
      
      // Track analytics
      trackIdeaGenerated(formData.industry, 'AI');
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('generated-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate ideas');
    }
  };

  const handleSaveIdea = async (idea: GeneratedIdea) => {
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
        isFavorite: false,
      });
      
      // Show success feedback
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      successMessage.textContent = 'Idea saved to your dashboard!';
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    } catch (err) {
      if (err instanceof Error && err.message === 'You have already saved this idea') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        errorMessage.textContent = 'You have already saved this idea';
        document.body.appendChild(errorMessage);
        
        setTimeout(() => {
          document.body.removeChild(errorMessage);
        }, 3000);
      } else {
        setError('Failed to save idea');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const remainingIdeas = canGenerateIdeas(generationCount) ? getRemainingIdeas(generationCount) : (2 - generationCount);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upgrade Prompt */}
      {showUpgradePrompt && (
        <UpgradePrompt
          currentPlan={plan}
          feature="Unlimited Idea Generation"
          onClose={() => setShowUpgradePrompt(false)}
        />
      )}

      {/* Form Section */}
      <div id="idea-generator" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI Startup Idea Generator
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tell us about your interests, skills, and goals. Our AI will generate personalized startup ideas with detailed analysis and revenue projections.
          </p>
          
          {/* Usage Limits */}
          {!canGenerateIdeas(generationCount) && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 text-sm">
                <strong>Free Preview:</strong> Generate up to 2 startup ideas without signing up. 
                <Link to="/signup" className="text-amber-700 underline ml-1">Sign up</Link> for unlimited ideas.
              </p>
              <p className="text-amber-600 text-xs mt-1">
                {remainingIdeas} idea{remainingIdeas !== 1 ? 's' : ''} remaining
              </p>
            </div>
          )}
          
          {canGenerateIdeas(generationCount) && plan === 'starter' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800 text-sm">
                <strong>Starter Plan:</strong> {remainingIdeas === -1 ? 'Unlimited' : remainingIdeas} idea{remainingIdeas !== 1 ? 's' : ''} remaining this month.
                {remainingIdeas !== -1 && remainingIdeas <= 0 && (
                  <Link to="/pricing" className="text-blue-700 underline ml-1">Upgrade to Pro</Link>
                )}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="interests" className="text-sm font-semibold text-gray-900">
                Your Interests *
              </label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="e.g., sustainable technology, fitness, cooking, travel, education..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="skills" className="text-sm font-semibold text-gray-900">
                Your Skills *
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="e.g., web development, marketing, design, sales, data analysis..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-semibold text-gray-900">
                Preferred Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-semibold text-gray-900">
                Starting Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                {budgetRanges.map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timeframe" className="text-sm font-semibold text-gray-900">
                Time to Launch
              </label>
              <select
                id="timeframe"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                {timeframes.map(timeframe => (
                  <option key={timeframe} value={timeframe}>{timeframe}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="text-center">
            <button
              id="generate-button"
              type="submit"
              disabled={isLoading || (!canGenerateIdeas(generationCount) && generationCount >= 2)}
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" text="Generating Ideas..." />
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Generate Startup Ideas</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {showResults && (
        <div id="generated-results" className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Personalized Startup Ideas
            </h3>
            <p className="text-gray-600">
              Here are {generatedIdeas.length} AI-generated ideas tailored to your profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {generatedIdeas.map((idea, index) => {
              const savedIdea = ideas.find(i => i.title === idea.title && i.description === idea.description);
              const isFavorite = savedIdea?.isFavorite;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xl font-bold text-gray-900 flex-1">
                        {idea.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                        {idea.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {idea.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">
                          <span className="font-medium">Revenue:</span> {idea.revenueEstimate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">
                          <span className="font-medium">Launch:</span> {idea.timeToLaunch}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        {canGenerateIdeas(generationCount) && (
                          <button
                            aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
                            className="p-2 rounded-full focus:outline-none"
                            disabled={favoriteLoading === idea.title}
                            onClick={async () => {
                              setFavoriteLoading(idea.title);
                              if (!savedIdea) {
                                await saveIdea({ ...idea, isFavorite: true });
                              } else {
                                await toggleFavorite(savedIdea.id);
                              }
                              setFavoriteLoading(null);
                            }}
                          >
                            <Heart className={`w-4 h-4 transition-colors duration-200 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-500 transition-colors duration-200">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      {canGenerateIdeas(generationCount) ? (
                        <button
                          id="claim-button"
                          onClick={() => handleSaveIdea(idea)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Save Idea
                        </button>
                      ) : (
                        <Link
                          to="/signup"
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Sign Up to Save</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};