import React, { useState } from 'react';
import { Lightbulb, Zap, Clock, TrendingUp, Star, Heart, Share2, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useIdeas } from '../hooks/useIdeas';
import { LoadingSpinner } from './LoadingSpinner';
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
  const { user, isAuthenticated } = useAuth();
  const { generateIdeas, saveIdea, isLoading } = useIdeas();
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

    try {
      const params = {
        interests: formData.interests.split(',').map(s => s.trim()),
        skills: formData.skills.split(',').map(s => s.trim()),
        industry: formData.industry,
        budget: formData.budget,
        timeframe: formData.timeframe,
      };

      const ideas = await generateIdeas(params);
      setGeneratedIdeas(ideas);
      setShowResults(true);
      
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
    if (!isAuthenticated) {
      setError('Please sign in to save ideas');
      return;
    }

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
      alert('Idea saved to your dashboard!');
    } catch (err) {
      setError('Failed to save idea');
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
              disabled={isLoading}
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
            {generatedIdeas.map((idea, index) => (
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
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-500 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      id="claim-button"
                      onClick={() => handleSaveIdea(idea)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Save Idea
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold text-primary-900 mb-2">
                Save Your Ideas
              </h4>
              <p className="text-primary-700 mb-4">
                Sign up for free to save your generated ideas and access premium templates
              </p>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                Sign Up Free
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};