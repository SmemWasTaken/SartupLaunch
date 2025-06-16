import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { analyticsService, AnalyticsData } from '../services/analyticsService';
import { usePlanFeatures } from '../hooks/usePlanFeatures';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { Zap, Star, Clock, TrendingUp, Users } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface PieChartLabelProps {
  name: string;
  percent: number;
}

const AnalyticsDashboard: React.FC = () => {
  const { user } = useUser();
  const { hasFeature } = usePlanFeatures();
  const [userAnalytics, setUserAnalytics] = useState<AnalyticsData | null>(null);
  const [aggregateAnalytics, setAggregateAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userData = analyticsService.getAnalytics(user.id);
      setUserAnalytics(userData);
    }
    const aggregateData = analyticsService.getAggregateAnalytics();
    setAggregateAnalytics(aggregateData);
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!hasFeature('analytics')) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Upgrade to Pro or Enterprise plan to access detailed analytics and insights.
        </p>
        <button
          onClick={() => window.location.href = '/pricing'}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Plans
        </button>
      </div>
    );
  }

  const renderStatCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    color: string
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </motion.div>
  );

  const renderDifficultyChart = (data: AnalyticsData) => {
    const chartData = Object.entries(data.ideasByDifficulty).map(([difficulty, count]) => ({
      name: difficulty,
      value: count,
    }));

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ideas by Difficulty</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: PieChartLabelProps) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderMarketSizeChart = (data: AnalyticsData) => {
    const chartData = Object.entries(data.ideasByMarketSize).map(([size, count]) => ({
      name: size.charAt(0).toUpperCase() + size.slice(1),
      value: count,
    }));

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ideas by Market Size</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderGenerationHistoryChart = (data: AnalyticsData) => {
    const chartData = data.generationHistory.map(entry => ({
      date: entry.date.toLocaleDateString(),
      count: entry.count,
    }));

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Generation History</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userAnalytics && (
          <>
            {renderStatCard(
              'Total Ideas Generated',
              userAnalytics.totalIdeasGenerated,
              <Zap className="w-6 h-6 text-blue-500" />,
              'bg-blue-50'
            )}
            {renderStatCard(
              'Favorite Ideas',
              userAnalytics.favoriteIdeas,
              <Star className="w-6 h-6 text-yellow-500" />,
              'bg-yellow-50'
            )}
            {renderStatCard(
              'Avg. Time to Launch',
              userAnalytics.averageTimeToLaunch,
              <Clock className="w-6 h-6 text-green-500" />,
              'bg-green-50'
            )}
            {renderStatCard(
              'Most Common Interest',
              userAnalytics.mostCommonInterests[0] || 'None',
              <TrendingUp className="w-6 h-6 text-purple-500" />,
              'bg-purple-50'
            )}
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {userAnalytics && (
          <>
            {renderDifficultyChart(userAnalytics)}
            {renderMarketSizeChart(userAnalytics)}
          </>
        )}
      </div>

      {/* Generation History */}
      {userAnalytics && (
        <div className="mb-8">
          {renderGenerationHistoryChart(userAnalytics)}
        </div>
      )}

      {/* Aggregate Analytics (for Pro/Enterprise users) */}
      {hasFeature('analytics') && aggregateAnalytics && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderStatCard(
              'Total Platform Ideas',
              aggregateAnalytics.totalIdeasGenerated,
              <Users className="w-6 h-6 text-indigo-500" />,
              'bg-indigo-50'
            )}
            {renderStatCard(
              'Platform Favorites',
              aggregateAnalytics.favoriteIdeas,
              <Star className="w-6 h-6 text-pink-500" />,
              'bg-pink-50'
            )}
            {renderStatCard(
              'Platform Avg. Launch Time',
              aggregateAnalytics.averageTimeToLaunch,
              <Clock className="w-6 h-6 text-teal-500" />,
              'bg-teal-50'
            )}
            {renderStatCard(
              'Top Platform Interest',
              aggregateAnalytics.mostCommonInterests[0] || 'None',
              <TrendingUp className="w-6 h-6 text-orange-500" />,
              'bg-orange-50'
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard; 