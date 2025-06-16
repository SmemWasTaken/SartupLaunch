import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdeas } from '../hooks/useIdeas';
import { Clock, TrendingUp, Lightbulb, ArrowLeft, Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { ideas, isLoading, toggleFavorite } = useIdeas();
  const [favoriteLoading, setFavoriteLoading] = useState<string | null>(null);
  const favoriteIdeas = ideas.filter(idea => idea.isFavorite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Favorite Ideas</h1>
        </div>
        {isLoading ? (
          <div className="text-center py-12">Loading ideas...</div>
        ) : favoriteIdeas.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No favorite ideas yet</p>
            <Link
              to="/dashboard/generate"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
            >
              Generate Your First Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    idea.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{idea.description}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>{idea.category}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
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
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 