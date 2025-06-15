import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Code, Key, Zap, Shield, Globe, BarChart3 } from 'lucide-react';

const APIAccessPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Idea Generation',
      description: 'Generate startup ideas programmatically with our advanced AI models.',
      endpoint: 'POST /api/v1/generate-idea'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Template Access',
      description: 'Retrieve and customize business templates through our API.',
      endpoint: 'GET /api/v1/templates'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Market Analysis',
      description: 'Get market insights and validation data for any business idea.',
      endpoint: 'POST /api/v1/analyze-market'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: '99.9% uptime with enterprise-grade security and authentication.',
      endpoint: 'Authentication via API Keys'
    }
  ];

  const pricingTiers = [
    {
      name: 'Developer',
      price: 49,
      requests: '10,000',
      features: [
        '10,000 API requests/month',
        'Basic AI models',
        'Standard support',
        'Rate limiting: 100 req/min'
      ]
    },
    {
      name: 'Business',
      price: 149,
      requests: '50,000',
      features: [
        '50,000 API requests/month',
        'Advanced AI models',
        'Priority support',
        'Rate limiting: 500 req/min',
        'Custom webhooks'
      ]
    },
    {
      name: 'Enterprise',
      price: 499,
      requests: 'Unlimited',
      features: [
        'Unlimited API requests',
        'Premium AI models',
        'Dedicated support',
        'Custom rate limits',
        'White-label options',
        'SLA guarantee'
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
              <Code className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              StartupLaunch API
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Integrate our AI-powered startup generation capabilities into your applications. 
              Build the next generation of entrepreneurship tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
                Get API Key
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              API Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="text-sm text-gray-800 font-mono">
                      {feature.endpoint}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Quick Start Example
            </h2>
            <div className="bg-gray-800 rounded-2xl p-8 overflow-x-auto">
              <pre className="text-green-400 font-mono text-sm">
{`// Generate a startup idea
const response = await fetch('https://api.startupLaunch.com/v1/generate-idea', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'AI-powered fitness app for busy professionals',
    category: 'Mobile App',
    difficulty: 'Medium'
  })
});

const idea = await response.json();
console.log(idea);

// Response
{
  "id": "idea_123",
  "title": "FitBuddy AI",
  "description": "Personalized workout plans using AI...",
  "estimatedRevenue": "$5-15k/month",
  "timeToLaunch": "2-3 months",
  "marketSize": "Large",
  "competitionLevel": "Medium"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              API Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {tier.name}
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      ${tier.price}
                    </div>
                    <div className="text-gray-600">
                      {tier.requests} requests/month
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Links */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Developer Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="#" className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <Key className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
                <p className="text-gray-600 text-sm">Complete API documentation with examples</p>
              </a>
              <a href="#" className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <Globe className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">SDKs</h3>
                <p className="text-gray-600 text-sm">Official SDKs for popular languages</p>
              </a>
              <a href="#" className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <Shield className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Status Page</h3>
                <p className="text-gray-600 text-sm">Real-time API status and uptime</p>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default APIAccessPage;