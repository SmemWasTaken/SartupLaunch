import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Zap, Rocket, CheckCircle, ArrowRight, Brain, Target, TrendingUp, Users, Star, Clock } from 'lucide-react';
import HowItWorksWizard from '../components/HowItWorksWizard';

const HowItWorksPage: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Market-Validated Ideas",
      description: "Every idea is backed by real market data and successful business patterns."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join thousands of entrepreneurs sharing experiences and supporting each other."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Access to business mentors and industry experts for personalized advice."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Implementation",
      description: "Launch your startup 10x faster with our proven templates and frameworks."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>From Idea to Launch in 4 Simple Steps</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How StartupLaunch Works
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform guides you through every stage of building your micro-startup, 
            from initial idea generation to successful launch and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Wizard Section */}
      <section className="py-20 bg-white">
        <HowItWorksWizard />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose StartupLaunch?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to turn your entrepreneurial dreams into reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-white transition-colors duration-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who have launched with StartupLaunch.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-100">Ideas Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2,400+</div>
              <div className="text-blue-100">Startups Launched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">78%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$12M+</div>
              <div className="text-blue-100">Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Launch Your Startup?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who've successfully launched their micro-startups 
            using our platform. Your journey starts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;