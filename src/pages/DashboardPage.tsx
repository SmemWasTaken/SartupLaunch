import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  Star, 
  Plus, 
  ArrowRight,
  Heart,
  Download,
  BarChart3,
  Target,
  Play
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useIdeas } from '../hooks/useIdeas';
import { useTemplates } from '../hooks/useTemplates';
import { useOnboarding } from '../contexts/OnboardingContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import OnboardingChecklist from '../components/OnboardingChecklist';
import { OnboardingTour } from '../components/OnboardingTour';

export const DashboardPage: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { ideas, isLoading: ideasLoading, toggleFavorite } = useIdeas();
  const { templates } = useTemplates();
  const { getCompletedStepsCount, getTotalStepsCount } = useOnboarding();
  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null);

  if (!isLoaded) {
    return <LoadingSpinner size="lg" text="Loading your dashboard..." />;
  }

  const recentIdeas = ideas.slice(0, 3);
  const favoriteIdeas = ideas.filter(idea => idea.isFavorite);
  const purchasedTemplates = templates.filter(template => template.isPurchased);

  const stats = [
    {
      label: 'Ideas Generated',
      value: ideas.length,
      icon: Lightbulb,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      label: 'Favorites',
      value: favoriteIdeas.length,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Templates Owned',
      value: purchasedTemplates.length,
      icon: Download,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Progress',
      value: `${Math.round((getCompletedStepsCount() / getTotalStepsCount()) * 100)}%`,
      icon: Target,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
  ];

  const quickActions = [
    {
      title: 'Generate New Ideas',
      description: 'Create personalized startup ideas with AI',
      icon: Lightbulb,
      href: '/dashboard/generate',
      color: 'bg-primary-600 hover:bg-primary-700',
    },
    {
      title: 'Browse Templates',
      description: 'Explore professional business templates',
      icon: ShoppingBag,
      href: '/templates',
      color: 'bg-accent-600 hover:bg-accent-700',
    },
    {
      title: 'View Analytics',
      description: 'Track your startup progress',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  const handleTourClick = () => {
    if ((window as any).showDashboardTour) {
      (window as any).showDashboardTour();
    }
  };

  if (ideasLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div id="dashboard-header" className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.fullName || user?.username || 'User'}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your startup journey
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleTourClick}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Take Tour</span>
          </button>
          <Link
            to="/dashboard/generate"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Ideas</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div id="quick-actions" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 hover:scale-105 group`}
            >
              <div className="flex items-center space-x-4">
                <action.icon className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Ideas */}
        <div id="recent-ideas" className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Ideas</h2>
            <Link
              to="/dashboard/ideas"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              View all
            </Link>
          </div>
          
          {recentIdeas.length > 0 ? (
            <div className="space-y-4">
              {recentIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {idea.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      idea.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {idea.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{idea.timeToLaunch}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{idea.category}</span>
                    </span>
                    <button
                      aria-label={idea.isFavorite ? 'Unfavorite' : 'Favorite'}
                      className="ml-2 p-1 rounded-full focus:outline-none"
                      disabled={favoriteLoading === idea.id}
                      onClick={async () => {
                        setFavoriteLoading(idea.id);
                        await toggleFavorite(idea.id);
                        setFavoriteLoading(null);
                      }}
                    >
                      <Heart className={`w-5 h-5 transition-colors duration-200 ${idea.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No ideas generated yet</p>
              <Link
                to="/dashboard/generate"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Generate Your First Idea
              </Link>
            </div>
          )}
        </div>

        {/* Onboarding Progress */}
        <div className="space-y-6">
          <OnboardingChecklist compact={true} />
          
          {/* Purchased Templates */}
          <div id="templates-section" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Templates</h2>
              <Link
                to="/templates"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
              >
                Browse more
              </Link>
            </div>
            
            {purchasedTemplates.length > 0 ? (
              <div className="space-y-4">
                {purchasedTemplates.slice(0, 3).map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {template.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                          {template.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">{template.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-green-50 hover:bg-green-100 text-green-700 p-2 rounded-lg transition-colors duration-200">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No templates purchased yet</p>
                <Link
                  to="/templates"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                >
                  Browse Templates
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Onboarding Tour Component */}
      <OnboardingTour />
    </div>
  );
};