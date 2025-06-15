import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { IdeaGenerator } from '../components/IdeaGenerator';

export const IdeaGenerationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Generate New Startup Ideas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our AI-powered generator to create personalized startup ideas based on your interests, skills, and goals.
            </p>
          </div>
        </div>

        {/* Idea Generator */}
        <IdeaGenerator />
      </div>
    </div>
  );
};