import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Rocket,
  Shield,
  BarChart3,
  FileText
} from 'lucide-react';

const StartupGuidePage: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: 'Getting Started',
      icon: <Lightbulb className="w-6 h-6" />,
      duration: '15 min read',
      description: 'Learn the fundamentals of starting a business and validate your idea.',
      sections: [
        'What is a startup?',
        'Identifying market opportunities',
        'Validating your business idea',
        'Common startup myths debunked'
      ]
    },
    {
      id: 1,
      title: 'Market Research',
      icon: <Target className="w-6 h-6" />,
      duration: '20 min read',
      description: 'Understand your market, competitors, and target customers.',
      sections: [
        'Defining your target market',
        'Competitive analysis framework',
        'Customer interviews and surveys',
        'Market size estimation'
      ]
    },
    {
      id: 2,
      title: 'Business Planning',
      icon: <FileText className="w-6 h-6" />,
      duration: '25 min read',
      description: 'Create a solid business plan and strategy for success.',
      sections: [
        'Business model canvas',
        'Revenue model selection',
        'Financial projections',
        'Risk assessment and mitigation'
      ]
    },
    {
      id: 3,
      title: 'Building Your MVP',
      icon: <Rocket className="w-6 h-6" />,
      duration: '30 min read',
      description: 'Develop your minimum viable product efficiently and cost-effectively.',
      sections: [
        'MVP principles and best practices',
        'No-code and low-code solutions',
        'Finding technical co-founders',
        'Outsourcing vs. in-house development'
      ]
    },
    {
      id: 4,
      title: 'Legal & Compliance',
      icon: <Shield className="w-6 h-6" />,
      duration: '20 min read',
      description: 'Navigate legal requirements and protect your business.',
      sections: [
        'Business structure selection',
        'Intellectual property protection',
        'Terms of service and privacy policies',
        'Employment law basics'
      ]
    },
    {
      id: 5,
      title: 'Marketing & Growth',
      icon: <TrendingUp className="w-6 h-6" />,
      duration: '35 min read',
      description: 'Acquire customers and grow your business sustainably.',
      sections: [
        'Digital marketing fundamentals',
        'Content marketing strategy',
        'Social media and community building',
        'Growth hacking techniques'
      ]
    },
    {
      id: 6,
      title: 'Funding & Investment',
      icon: <DollarSign className="w-6 h-6" />,
      duration: '25 min read',
      description: 'Explore funding options and prepare for investors.',
      sections: [
        'Bootstrapping vs. external funding',
        'Angel investors and VCs',
        'Crowdfunding platforms',
        'Pitch deck essentials'
      ]
    },
    {
      id: 7,
      title: 'Scaling & Operations',
      icon: <BarChart3 className="w-6 h-6" />,
      duration: '30 min read',
      description: 'Scale your operations and build a sustainable business.',
      sections: [
        'Hiring and team building',
        'Operations and processes',
        'Financial management',
        'Exit strategies'
      ]
    }
  ];

  const quickTips = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      tip: 'Start small and validate early - don\'t build everything at once'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      tip: 'Talk to customers before, during, and after building your product'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      tip: 'Focus on solving a real problem that people will pay for'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      tip: 'Keep your burn rate low and extend your runway'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      tip: 'Build a strong network of mentors, advisors, and peers'
    }
  ];

  const resources = [
    {
      title: 'Business Plan Template',
      description: 'Comprehensive template with financial projections',
      type: 'Template',
      link: '/templates'
    },
    {
      title: 'Market Research Toolkit',
      description: 'Survey templates and analysis frameworks',
      type: 'Toolkit',
      link: '/templates'
    },
    {
      title: 'Legal Document Bundle',
      description: 'Essential legal documents for startups',
      type: 'Legal',
      link: '/templates'
    },
    {
      title: 'Pitch Deck Template',
      description: 'Investor-ready presentation template',
      type: 'Template',
      link: '/templates'
    }
  ];

  const currentChapter = chapters[activeChapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Complete Startup Guide</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Ultimate Startup Launch Guide
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know to launch a successful startup, from initial idea 
            to scaling your business. Learn from real examples and proven strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveChapter(0)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Start Reading</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#resources"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Download Resources
            </a>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Table of Contents</h3>
                <nav className="space-y-2">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveChapter(chapter.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        activeChapter === chapter.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${
                          activeChapter === chapter.id ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {chapter.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{chapter.title}</div>
                          <div className="text-xs text-gray-500">{chapter.duration}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-blue-600">
                      {currentChapter.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{currentChapter.title}</h2>
                    <p className="text-gray-600">{currentChapter.duration}</p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {currentChapter.description}
                </p>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">What You'll Learn</h3>
                  <ul className="space-y-3">
                    {currentChapter.sections.map((section, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{section}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Content */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Chapter Preview
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This chapter provides comprehensive coverage of {currentChapter.title.toLowerCase()}, 
                    including practical examples, templates, and actionable strategies you can implement 
                    immediately. Each section builds upon the previous one, creating a complete framework 
                    for success.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    You'll learn from real-world case studies, avoid common pitfalls, and gain access to 
                    proven methodologies used by successful entrepreneurs. The content is designed to be 
                    practical and immediately applicable to your startup journey.
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                    disabled={activeChapter === 0}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>Previous</span>
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    Chapter {activeChapter + 1} of {chapters.length}
                  </span>
                  
                  <button
                    onClick={() => setActiveChapter(Math.min(chapters.length - 1, activeChapter + 1))}
                    disabled={activeChapter === chapters.length - 1}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Quick Success Tips
          </h2>
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="space-y-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {tip.icon}
                  <span className="text-green-800 font-medium">{tip.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Downloadable Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <span>Download</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Launch Your Startup?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Put this knowledge into action. Use StartupLaunch to generate your first 
            AI-powered business idea and access all the templates you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/templates"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Browse Templates
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupGuidePage;