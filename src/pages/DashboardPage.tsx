import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Lightbulb,
  Heart,
  Download,
  Target,
  Calculator,
  Layout,
  Megaphone,
  Scale,
  ShoppingBag,
  BarChart3,
  Crown,
  Shield,
  Zap,
  LucideIcon
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useIdeas } from '../hooks/useIdeas';
import { useTemplates } from '../hooks/useTemplates';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useSubscription } from '../hooks/useSubscription';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { OnboardingTour } from '../components/OnboardingTour';
import { UpgradePrompt } from '../components/UpgradePrompt';
import { FinancialPlanning } from '../components/FinancialPlanning';
import { PitchDeckBuilder } from '../components/PitchDeckBuilder';
import { LegalDocuments } from '../components/LegalDocuments';
import { SubscriptionFeatures, StartupIdea } from '../types';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  feature?: keyof SubscriptionFeatures;
  color: string;
  available: boolean;
  href?: string;
}

export const DashboardPage: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { ideas, isLoading: ideasLoading, toggleFavorite } = useIdeas();
  const { templates } = useTemplates();
  const { getCompletedStepsCount, getTotalStepsCount } = useOnboarding();
  const { plan, features, hasFeature, subscription } = useSubscription();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [activeFeature, setActiveFeature] = useState<keyof SubscriptionFeatures | null>(null);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<StartupIdea | null>(null);
  const navigate = useNavigate();

  if (!isLoaded) {
    return <LoadingSpinner size="lg" text="Loading your dashboard..." />;
  }

  const recentIdeas = ideas.slice(0, 3);
  const favoriteIdeas = ideas.filter(idea => idea.isFavorite);
  const purchasedTemplates = templates.filter(template => template.isPurchased);

  const stats = [
    {
      title: 'Ideas Generated',
      value: ideas.length.toString(),
      change: '+12%',
      icon: Lightbulb,
      color: 'text-blue-600'
    },
    {
      title: 'Favorites',
      value: favoriteIdeas.length.toString(),
      change: '+1',
      icon: Heart,
      color: 'text-emerald-600'
    },
    {
      title: 'Templates Owned',
      value: purchasedTemplates.length.toString(),
      change: '+25%',
      icon: Download,
      color: 'text-purple-600'
    },
    {
      title: 'Progress',
      value: `${Math.round((getCompletedStepsCount() / getTotalStepsCount()) * 100)}%`,
      change: '+5%',
      icon: Target,
      color: 'text-green-600'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Generated New Idea', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Updated Financial Model', time: '4 hours ago', status: 'completed' },
    { id: 3, action: 'Created Marketing Campaign', time: '1 day ago', status: 'pending' },
    { id: 4, action: 'Exported Business Canvas', time: '2 days ago', status: 'completed' }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'generate-ideas',
      title: 'Generate New Ideas',
      description: 'Create personalized startup ideas with AI',
      icon: Lightbulb,
      color: 'text-blue-600',
      available: true,
      href: '/dashboard/generate'
    },
    {
      id: 'financial-planning',
      title: 'Financial Planning',
      description: 'Track your startup finances and metrics',
      icon: Calculator,
      feature: 'financialTools',
      color: 'text-emerald-600',
      available: hasFeature('financialTools'),
      href: '/dashboard/financial'
    },
    {
      id: 'pitch-deck',
      title: 'Pitch Deck Builder',
      description: 'Create professional pitch decks',
      icon: FileText,
      feature: 'pitchDeckBuilder',
      color: 'text-purple-600',
      available: hasFeature('pitchDeckBuilder'),
      href: '/dashboard/pitch-deck'
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      description: 'Analyze the market for your idea',
      icon: BarChart3,
      color: 'text-indigo-600',
      available: true,
      href: undefined
    },
    {
      id: 'legal-documents',
      title: 'Legal Documents',
      description: 'Access legal templates and documents',
      icon: Scale,
      feature: 'legalDocuments',
      color: 'text-green-600',
      available: hasFeature('legalDocuments'),
      href: '/dashboard/legal'
    }
  ];

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'market-analysis') {
      setShowMarketModal(true);
      return;
    }
    const action = quickActions.find(a => a.id === actionId);
    if (!action) return;

    if (action.href) {
      navigate(action.href);
    } else if (action.feature) {
      if (hasFeature(action.feature)) {
        setActiveFeature(action.feature);
        setShowUpgradePrompt(false);
      } else {
        setActiveFeature(action.feature);
        setShowUpgradePrompt(true);
      }
    }
  };

  const renderFeature = (feature: keyof SubscriptionFeatures) => {
    switch (feature) {
      case 'financialTools':
        return <FinancialPlanning />;
      case 'pitchDeckBuilder':
        return <PitchDeckBuilder />;
      case 'legalDocuments':
        return <LegalDocuments />;
      default:
        return null;
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
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || user?.username || 'Entrepreneur'}!</h2>
            <p className="text-blue-100 text-lg mb-6">
              Ready to accelerate your startup journey? Let's build something amazing today.
            </p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => (window as any).showDashboardTour?.()}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Quick Start Guide
              </button>
              <Link
                to="/help"
                className="border border-blue-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              // Define navigation targets for each stat
              let onClick = undefined;
              let clickable = false;
              if (stat.title === 'Ideas Generated') {
                onClick = () => navigate('/dashboard/ideas');
                clickable = true;
              } else if (stat.title === 'Favorites') {
                onClick = () => navigate('/dashboard/favorites');
                clickable = true;
              } else if (stat.title === 'Templates Owned') {
                onClick = () => navigate('/templates');
                clickable = true;
              }
              return (
                <div
                  key={stat.title}
                  className={`bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow ${clickable ? 'cursor-pointer hover:border-blue-400' : ''}`}
                  onClick={onClick}
                  tabIndex={clickable ? 0 : -1}
                  role={clickable ? 'button' : undefined}
                  aria-label={clickable ? `Go to ${stat.title}` : undefined}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      {stat.change}
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    disabled={!action.available}
                    className={`p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-${action.color.split('-')[1]}-300 hover:bg-${action.color.split('-')[1]}-50 transition-colors group ${
                      !action.available ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <action.icon className={`w-8 h-8 text-gray-400 group-hover:${action.color} mx-auto mb-2`} />
                    <p className={`text-sm font-medium text-gray-600 group-hover:${action.color}`}>
                      {action.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Feature */}
          {activeFeature && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderFeature(activeFeature)}
            </div>
          )}

          {/* Upgrade Prompt */}
          {showUpgradePrompt && activeFeature && (
            <UpgradePrompt
              currentPlan={subscription.plan}
              feature={activeFeature}
              onClose={() => setShowUpgradePrompt(false)}
            />
          )}

          {/* Market Analysis Modal */}
          {showMarketModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowMarketModal(false)}>&times;</button>
                <h2 className="text-xl font-bold mb-4">Select an Idea for Market Analysis</h2>
                <ul className="space-y-2 mb-4">
                  {ideas.length === 0 && <li className="text-gray-500">No ideas available.</li>}
                  {ideas.map((idea) => (
                    <li key={idea.id}>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 ${selectedIdea && selectedIdea.id === idea.id ? 'bg-blue-100' : ''}`}
                        onClick={() => setSelectedIdea(idea)}
                      >
                        {idea.title}
                      </button>
                    </li>
                  ))}
                </ul>
                {selectedIdea && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">Market Analysis for: {selectedIdea.title}</h3>
                    <p className="text-gray-600">[Market analysis results will appear here. Integrate your analysis logic as needed.]</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};