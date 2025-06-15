import React, { useState } from 'react';
import { Sparkles, Lightbulb, TrendingUp, Clock, DollarSign, Target, Heart, Save, ExternalLink } from 'lucide-react';
import { IdeaGeneratorParams, StartupIdea } from '../types';
import { useIdeas } from '../hooks/useIdeas';
import { useAuth } from '../contexts/AuthContext';
import { validateIdeaGeneratorParams } from '../utils/validation';
import { LoadingSpinner } from './LoadingSpinner';
import { trackIdeaGenerated } from '../utils/analytics';

const interests = [
  'Technology', 'Health', 'Education', 'Environment', 'Finance', 'Entertainment',
  'Food', 'Travel', 'Fashion', 'Sports', 'Art', 'Music', 'Gaming', 'Productivity'
];

const skills = [
  'Programming', 'Design', 'Marketing', 'Sales', 'Writing', 'Analytics',
  'Project Management', 'Customer Service', 'Strategy', 'Research', 'Operations'
];

const industries = [
  'Any', 'SaaS', 'E-commerce', 'Mobile App', 'AI/ML', 'Education',
  'Healthcare', 'Finance', 'Social Media', 'Gaming', 'Productivity'
];

const budgets = [
  'Under $1K', '$1K - $5K', '$5K - $25K', '$25K - $100K', '$100K+'
];

const timeframes = [
  '1-3 months', '3-6 months', '6-12 months', '1-2 years', '2+ years'
];

export const IdeaGenerator: React.FC = () => {
  const { generateIdeas, saveIdea, isLoading } = useIdeas();
  const { isAuthenticated } = useAuth();
  const [params, setParams] = useState<IdeaGeneratorParams>({
    interests: [],
    skills: [],
    industry: '',
    budget: '',
    timeframe: '',
  });
  const [generatedIdeas, setGeneratedIdeas] = useState<StartupIdea[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setParams(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setParams(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleGenerate = async () => {
    const validation = validateIdeaGeneratorParams(params);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    setIsGenerating(true);

    try {
      const ideas = await generateIdeas(params);
      setGeneratedIdeas(ideas);
      
      // Track analytics
      ideas.forEach(idea => {
        trackIdeaGenerated(idea.category, idea.difficulty);
      });
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      setErrors(['Failed to generate ideas. Please try again.']);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveIdea = async (idea: StartupIdea) => {
    if (!isAuthenticated) return;

    try {
      await saveIdea(idea);
      // Show success feedback (could add toast notification here)
    } catch (error) {
      console.error('Failed to save idea:', error);
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
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Idea Generator</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Generate Your Next Big Startup Idea
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tell us about your interests, skills, and preferences. Our AI will generate personalized startup ideas with detailed metrics and insights.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        {/* Interests */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-gray-900">
            What are you interested in? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  params.interests.includes(interest)
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-gray-900">
            What skills do you have? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  params.skills.includes(skill)
                    ? 'bg-accent-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Industry, Budget, Timeframe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Preferred Industry *
            </label>
            <select
              value={params.industry}
              onChange={(e) => setParams(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Budget Range *
            </label>
            <select
              value={params.budget}
              onChange={(e) => setParams(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select budget</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Time to Launch *
            </label>
            <select
              value={params.timeframe}
              onChange={(e) => setParams(prev => ({ ...prev, timeframe: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select timeframe</option>
              {timeframes.map((timeframe) => (
                <option key={timeframe} value={timeframe}>
                  {timeframe}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <ul className="space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {isGenerating ? (
            <LoadingSpinner size="sm" text="Generating ideas..." />
          ) : (
            <>
              <Lightbulb className="w-5 h-5" />
              <span>Generate Startup Ideas</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Ideas */}
      {generatedIdeas.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Personalized Startup Ideas
            </h3>
            <p className="text-gray-600">
              Here are {generatedIdeas.length} startup ideas tailored to your profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {generatedIdeas.map((idea, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xl font-bold text-gray-900 leading-tight">
                      {idea.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                      {idea.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-gray-600">{idea.timeToLaunch}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{idea.revenueEstimate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-accent-600" />
                      <span className="text-sm text-gray-600">{idea.marketSize}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-600">{idea.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                    {isAuthenticated && (
                      <button
                        onClick={() => handleSaveIdea(idea)}
                        className="flex items-center space-x-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Idea</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                      <ExternalLink className="w-4 h-4" />
                      <span>Learn More</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};