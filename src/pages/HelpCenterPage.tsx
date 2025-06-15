import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Video, 
  FileText, 
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Settings,
  CreditCard,
  Shield,
  Users,
  Zap,
  ExternalLink
} from 'lucide-react';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Getting Started',
      description: 'Learn the basics of using StartupLaunch',
      articleCount: 12,
      color: 'bg-blue-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Idea Generation',
      description: 'How to generate and refine startup ideas',
      articleCount: 8,
      color: 'bg-purple-500'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Templates & Resources',
      description: 'Using business templates and documents',
      articleCount: 15,
      color: 'bg-green-500'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Billing & Subscriptions',
      description: 'Manage your account and payments',
      articleCount: 10,
      color: 'bg-orange-500'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Account Settings',
      description: 'Profile, preferences, and security',
      articleCount: 7,
      color: 'bg-gray-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy & Security',
      description: 'Data protection and privacy controls',
      articleCount: 6,
      color: 'bg-red-500'
    }
  ];

  const popularArticles = [
    {
      title: 'How to generate your first startup idea',
      category: 'Getting Started',
      readTime: '5 min read',
      views: '2.3k views'
    },
    {
      title: 'Understanding AI-generated market analysis',
      category: 'AI Idea Generation',
      readTime: '8 min read',
      views: '1.8k views'
    },
    {
      title: 'Customizing business plan templates',
      category: 'Templates & Resources',
      readTime: '6 min read',
      views: '1.5k views'
    },
    {
      title: 'Upgrading your subscription plan',
      category: 'Billing & Subscriptions',
      readTime: '3 min read',
      views: '1.2k views'
    },
    {
      title: 'Setting up two-factor authentication',
      category: 'Account Settings',
      readTime: '4 min read',
      views: '980 views'
    }
  ];

  const quickActions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Contact Support',
      description: 'Get help from our support team',
      action: 'Start Chat',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      action: 'Watch Now',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      action: 'View Docs',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Forum',
      description: 'Connect with other entrepreneurs',
      action: 'Join Forum',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with StartupLaunch',
      duration: '10:32',
      thumbnail: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Complete walkthrough of the platform'
    },
    {
      title: 'Generating Your First Business Idea',
      duration: '8:45',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Step-by-step idea generation process'
    },
    {
      title: 'Using Business Templates Effectively',
      duration: '12:18',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'How to customize and use templates'
    },
    {
      title: 'Advanced AI Features and Tips',
      duration: '15:22',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Pro tips for better results'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find answers, tutorials, and resources to help you make the most of StartupLaunch. 
            Our comprehensive help center has everything you need to succeed.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, tutorials, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {action.description}
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 group">
                  <span>{action.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.articleCount} articles
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Popular Articles
          </h2>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Video Tutorials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn visually with our comprehensive video tutorials covering all aspects of StartupLaunch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tutorial.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Developer Resources
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Building something with our API? Check out our comprehensive documentation and code examples.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <Book className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">API Documentation</h3>
              <p className="text-gray-600 text-sm mb-4">Complete API reference with examples</p>
              <a href="/api-docs" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center space-x-1">
                <span>View Docs</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Code Examples</h3>
              <p className="text-gray-600 text-sm mb-4">Ready-to-use code snippets and samples</p>
              <a href="#" className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center justify-center space-x-1">
                <span>Browse Examples</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Developer Community</h3>
              <p className="text-gray-600 text-sm mb-4">Connect with other developers</p>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center space-x-1">
                <span>Join Community</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Start Live Chat</span>
            </button>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;