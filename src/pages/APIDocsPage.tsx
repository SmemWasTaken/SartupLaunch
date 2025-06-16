import React, { useState } from 'react';
import { 
  Code, 
  Book, 
  Key, 
  Zap, 
  Shield, 
  Globe, 
  Copy, 
  Check,
  ExternalLink,
  Terminal,
  Database,
  Settings
} from 'lucide-react';

const APIDocsPage: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('generate-idea');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      id: 'generate-idea',
      method: 'POST',
      path: '/api/v1/generate-idea',
      title: 'Generate Startup Idea',
      description: 'Generate personalized startup ideas using AI',
      category: 'AI Generation'
    },
    {
      id: 'analyze-market',
      method: 'POST',
      path: '/api/v1/analyze-market',
      title: 'Market Analysis',
      description: 'Get market insights and validation data',
      category: 'Analysis'
    },
    {
      id: 'get-templates',
      method: 'GET',
      path: '/api/v1/templates',
      title: 'List Templates',
      description: 'Retrieve available business templates',
      category: 'Templates'
    },
    {
      id: 'create-business-plan',
      method: 'POST',
      path: '/api/v1/business-plan',
      title: 'Generate Business Plan',
      description: 'Create a comprehensive business plan',
      category: 'Documents'
    }
  ];

  const quickStart = `// Install the SDK
npm install @startupLaunch/api

// Initialize the client
import { StartupLaunchAPI } from '@startupLaunch/api';

const client = new StartupLaunchAPI({
  apiKey: 'your-api-key-here'
});

// Generate a startup idea
const idea = await client.generateIdea({
  prompt: 'AI-powered fitness app for busy professionals',
  category: 'Mobile App',
  difficulty: 'Medium'
});

console.log(idea);`;

  const exampleResponse = `{
  "id": "idea_123",
  "title": "FitBuddy AI",
  "description": "An AI-powered fitness app that creates personalized workout plans for busy professionals, adapting to their schedule and fitness level.",
  "category": "Mobile App",
  "difficulty": "Medium",
  "estimatedRevenue": "$5-15k/month",
  "timeToLaunch": "2-3 months",
  "marketSize": "Large",
  "competitionLevel": "Medium",
  "tags": ["AI", "Fitness", "Mobile", "SaaS"],
  "marketAnalysis": {
    "targetAudience": "Busy professionals aged 25-45",
    "marketSize": "$4.4B",
    "growthRate": "8.7% annually",
    "keyCompetitors": ["MyFitnessPal", "Nike Training Club"]
  },
  "businessModel": {
    "revenueStreams": ["Subscription", "Premium Features"],
    "pricingStrategy": "$9.99/month",
    "customerAcquisition": ["App Store", "Social Media", "Partnerships"]
  }
}`;

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Generation',
      description: 'Generate startup ideas using advanced AI models trained on successful business patterns.',
      color: 'bg-blue-500'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Market Analysis',
      description: 'Get comprehensive market insights, competitor analysis, and validation data.',
      color: 'bg-green-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with API key authentication and rate limiting.',
      color: 'bg-purple-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Scale',
      description: '99.9% uptime with global CDN and redundant infrastructure.',
      color: 'bg-orange-500'
    }
  ];

  const pricingTiers = [
    {
      name: 'Developer',
      price: '$49',
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
      price: '$149',
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
      price: 'Custom',
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

  const currentEndpoint = endpoints.find(e => e.id === activeEndpoint);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
            <Code className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            StartupLaunch API
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Integrate our AI-powered startup generation capabilities into your applications. 
            Build the next generation of entrepreneurship tools with our comprehensive API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <Key className="w-5 h-5" />
              <span>Get API Key</span>
            </button>
            <a
              href="#quick-start"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Quick Start Guide
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            API Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center text-white mx-auto mb-6`}>
                  {feature.icon}
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

      {/* Quick Start */}
      <section id="quick-start" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Start
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Get Your API Key
              </h3>
              <p className="text-gray-600 mb-6">
                Sign up for a StartupLaunch account and generate your API key from the dashboard.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Install the SDK
              </h3>
              <p className="text-gray-600 mb-6">
                Use our official SDK or make direct HTTP requests to our REST API.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Make Your First Request
              </h3>
              <p className="text-gray-600">
                Generate your first startup idea with just a few lines of code.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">Quick Start</span>
                </div>
                <button
                  onClick={() => copyToClipboard(quickStart, 'quickstart')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'quickstart' ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>{quickStart}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            API Reference
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Endpoints</h3>
                <nav className="space-y-2">
                  {endpoints.map((endpoint) => (
                    <button
                      key={endpoint.id}
                      onClick={() => setActiveEndpoint(endpoint.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        activeEndpoint === endpoint.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-mono ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <div>
                          <div className="font-medium text-sm">{endpoint.title}</div>
                          <div className="text-xs text-gray-500">{endpoint.category}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {currentEndpoint && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className={`px-3 py-1 rounded-lg text-sm font-mono ${
                      currentEndpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {currentEndpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-800">{currentEndpoint.path}</code>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentEndpoint.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8">
                    {currentEndpoint.description}
                  </p>

                  {/* Request Example */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Request Example</h4>
                    <div className="bg-gray-900 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-green-400 font-mono text-sm">cURL</span>
                        <button
                          onClick={() => copyToClipboard(`curl -X ${currentEndpoint.method} \\
  https://api.startupLaunch.com${currentEndpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "AI-powered fitness app for busy professionals",
    "category": "Mobile App",
    "difficulty": "Medium"
  }'`, 'request')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'request' ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <pre className="text-green-400 font-mono text-sm">
                        <code>{`curl -X ${currentEndpoint.method} \\
  https://api.startupLaunch.com${currentEndpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "AI-powered fitness app for busy professionals",
    "category": "Mobile App",
    "difficulty": "Medium"
  }'`}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Response Example */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Response Example</h4>
                    <div className="bg-gray-900 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-green-400 font-mono text-sm">JSON Response</span>
                        <button
                          onClick={() => copyToClipboard(exampleResponse, 'response')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === 'response' ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                        <code>{exampleResponse}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
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
                    {tier.price}
                  </div>
                  <div className="text-gray-600">
                    {tier.requests} requests/month
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
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

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Developer Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group">
              <Book className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">SDKs & Libraries</h3>
              <p className="text-gray-600 text-sm mb-4">Official SDKs for popular languages</p>
              <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                <span className="mr-2">Download</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
            
            <a href="#" className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group">
              <Settings className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Postman Collection</h3>
              <p className="text-gray-600 text-sm mb-4">Ready-to-use API collection</p>
              <div className="flex items-center justify-center text-green-600 group-hover:text-green-700">
                <span className="mr-2">Import</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
            
            <a href="#" className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group">
              <Globe className="w-8 h-8 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Status Page</h3>
              <p className="text-gray-600 text-sm mb-4">Real-time API status and uptime</p>
              <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700">
                <span className="mr-2">Check Status</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Build?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start integrating our API today and build the next generation of entrepreneurship tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <Key className="w-5 h-5" />
              <span>Get API Key</span>
            </button>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APIDocsPage;