import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Play,
  Crown,
  Users,
  Zap,
  Shield,
  Globe,
  Settings,
  Infinity,
  LogOut
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useIdeas } from '../hooks/useIdeas';
import { useTemplates } from '../hooks/useTemplates';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useSubscription } from '../hooks/useSubscription';
import { LoadingSpinner } from '../components/LoadingSpinner';
import OnboardingChecklist from '../components/OnboardingChecklist';
import { OnboardingTour } from '../components/OnboardingTour';
import { UpgradePrompt } from '../components/UpgradePrompt';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { user, isLoaded, isSignedIn, logout } = useUser();
  const { ideas, isLoading: ideasLoading, toggleFavorite } = useIdeas();
  const { templates } = useTemplates();
  const { getCompletedStepsCount, getTotalStepsCount } = useOnboarding();
  const { plan, features, hasFeature } = useSubscription();
  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const navigate = useNavigate();

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

  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'Generate New Ideas',
        description: 'Create personalized startup ideas with AI',
        icon: Lightbulb,
        href: '/dashboard/generate',
        color: 'bg-primary-600 hover:bg-primary-700',
        available: true,
      },
      {
        title: 'Browse Templates',
        description: 'Explore professional business templates',
        icon: ShoppingBag,
        href: '/templates',
        color: 'bg-accent-600 hover:bg-accent-700',
        available: true,
      },
    ];

    if (hasFeature('advancedAnalytics')) {
      baseActions.push({
        title: 'View Analytics',
        description: 'Track your startup progress',
        icon: BarChart3,
        href: '/dashboard/analytics',
        color: 'bg-green-600 hover:bg-green-700',
        available: true,
      });
    }

    if (hasFeature('teamMembers') && features.teamMembers > 1) {
      baseActions.push({
        title: 'Team Management',
        description: 'Manage your team members',
        icon: Users,
        href: '/dashboard/team',
        color: 'bg-purple-600 hover:bg-purple-700',
        available: true,
      });
    }

    if (hasFeature('apiAccess')) {
      baseActions.push({
        title: 'API Access',
        description: 'Integrate with your tools',
        icon: Settings,
        href: '/dashboard/api',
        color: 'bg-gray-600 hover:bg-gray-700',
        available: true,
      });
    }

    return baseActions;
  };

  const quickActions = getQuickActions();

  const handleTourClick = () => {
    if ((window as any).showDashboardTour) {
      (window as any).showDashboardTour();
    }
  };

  const getPlanIcon = () => {
    switch (plan) {
      case 'pro':
        return <Crown className="w-5 h-5" />;
      case 'enterprise':
        return <Shield className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getPlanColor = () => {
    switch (plan) {
      case 'pro':
        return 'from-blue-500 to-purple-600';
      case 'enterprise':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user?.fullName || user?.username || 'User'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/how-it-works')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate Ideas
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Current Plan</h3>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </span>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Plan Details →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Quick Actions</h3>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/how-it-works')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900"
              >
                Generate New Ideas
              </button>
              <button
                onClick={() => navigate('/favorites')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900"
              >
                View Favorite Ideas
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Account</h3>
              <Settings className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/settings')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900"
              >
                Account Settings
              </button>
              <button
                onClick={() => navigate('/billing')}
                className="block w-full text-left text-sm text-gray-600 hover:text-gray-900"
              >
                Billing & Subscription
              </button>
            </div>
          </motion.div>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </main>
    </div>
  );
};

export default DashboardPage;