import React, { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Quote,
  Award,
  Target,
  Zap
} from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SaaS', 'E-commerce', 'Mobile App', 'Service Business', 'AI/Tech'];

  const successStories = [
    {
      id: 1,
      name: 'Sarah Chen',
      company: 'EcoDelivery',
      category: 'Service Business',
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      companyLogo: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100',
      story: 'Used StartupLaunch to generate the idea for a sustainable delivery service. Now serving 500+ businesses.',
      quote: 'StartupLaunch helped me validate and launch my sustainable delivery service in just 2 weeks. The AI-generated business plan was spot-on!',
      metrics: {
        revenue: '$8K MRR',
        timeToLaunch: '2 weeks',
        customers: '500+',
        growth: '300%'
      },
      timeline: '3 months',
      featured: true
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      company: 'SkillShare Pro',
      category: 'SaaS',
      location: 'Austin, TX',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      companyLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      story: 'Built an online education platform connecting professionals with mentors. Reached profitability in 6 months.',
      quote: 'The template marketplace saved me thousands in consulting fees. Everything I needed to launch my online education platform was right there.',
      metrics: {
        revenue: '$12K MRR',
        timeToLaunch: '6 weeks',
        customers: '1,200+',
        growth: '250%'
      },
      timeline: '6 months',
      featured: false
    },
    {
      id: 3,
      name: 'Emily Watson',
      company: 'Local Eats',
      category: 'E-commerce',
      location: 'Portland, OR',
      image: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=300',
      companyLogo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
      story: 'Created a platform connecting local restaurants with customers. Now processing 1000+ orders daily.',
      quote: 'I went from idea to profitable food delivery service faster than I ever imagined. The legal docs and business templates were game-changers.',
      metrics: {
        revenue: '$15K MRR',
        timeToLaunch: '4 weeks',
        customers: '2,500+',
        growth: '400%'
      },
      timeline: '4 months',
      featured: false
    },
    {
      id: 4,
      name: 'David Kim',
      company: 'FitTrack AI',
      category: 'Mobile App',
      location: 'Seattle, WA',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      companyLogo: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100',
      story: 'Developed an AI-powered fitness tracking app. Acquired by major fitness company after 18 months.',
      quote: 'StartupLaunch\'s AI suggested the perfect niche for my fitness app. The market analysis was incredibly accurate.',
      metrics: {
        revenue: '$25K MRR',
        timeToLaunch: '8 weeks',
        customers: '10K+',
        growth: 'Acquired'
      },
      timeline: '18 months',
      featured: false
    },
    {
      id: 5,
      name: 'Lisa Park',
      company: 'CodeMentor',
      category: 'SaaS',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      companyLogo: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100',
      story: 'Built a platform for coding mentorship and tutorials. Serving developers worldwide.',
      quote: 'The business model suggestions from StartupLaunch helped me find the perfect pricing strategy. Revenue grew 500% in 6 months.',
      metrics: {
        revenue: '$18K MRR',
        timeToLaunch: '5 weeks',
        customers: '3,000+',
        growth: '500%'
      },
      timeline: '8 months',
      featured: false
    },
    {
      id: 6,
      name: 'James Wilson',
      company: 'GreenTech Solutions',
      category: 'AI/Tech',
      location: 'Denver, CO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      companyLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      story: 'Created AI-powered energy optimization software for businesses. Raised $2M in Series A funding.',
      quote: 'The market validation framework from StartupLaunch helped me prove product-market fit to investors. Raised our Series A in record time.',
      metrics: {
        revenue: '$50K MRR',
        timeToLaunch: '12 weeks',
        customers: '150+',
        growth: 'Series A'
      },
      timeline: '12 months',
      featured: false
    }
  ];

  const filteredStories = selectedCategory === 'All' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory);

  const featuredStory = successStories.find(story => story.featured);
  const regularStories = filteredStories.filter(story => !story.featured);

  const stats = [
    { number: '2,400+', label: 'Successful Launches', icon: <Zap className="w-6 h-6" /> },
    { number: '$12M+', label: 'Revenue Generated', icon: <DollarSign className="w-6 h-6" /> },
    { number: '78%', label: 'Success Rate', icon: <Target className="w-6 h-6" /> },
    { number: '4.2x', label: 'Faster Launch', icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Real Success Stories</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Entrepreneurs Who Made It
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how real entrepreneurs used StartupLaunch to generate ideas, validate concepts, 
            and build successful businesses. Their stories could inspire your next big venture.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && selectedCategory === 'All' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured Success
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{featuredStory.company}</h2>
                  <p className="text-xl text-blue-100 mb-6">{featuredStory.story}</p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                    />
                    <div>
                      <div className="font-semibold text-lg">{featuredStory.name}</div>
                      <div className="text-blue-100 flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{featuredStory.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <Quote className="w-6 h-6 text-white/60 mb-2" />
                    <p className="text-white/90 italic">"{featuredStory.quote}"</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{featuredStory.metrics.revenue}</div>
                      <div className="text-blue-100 text-sm">Monthly Revenue</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{featuredStory.metrics.customers}</div>
                      <div className="text-blue-100 text-sm">Customers</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <img
                    src={featuredStory.companyLogo}
                    alt={featuredStory.company}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={story.companyLogo}
                    alt={story.company}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {story.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <div className="text-sm text-gray-600 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{story.story}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <Quote className="w-4 h-4 text-gray-400 mb-2" />
                    <p className="text-gray-700 text-sm italic">"{story.quote}"</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-800">{story.metrics.revenue}</div>
                      <div className="text-green-600 text-xs">Revenue</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-800">{story.metrics.timeToLaunch}</div>
                      <div className="text-blue-600 text-xs">Time to Launch</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{story.timeline} journey</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>{story.metrics.growth} growth</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What Our Successful Entrepreneurs Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center space-x-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "StartupLaunch didn't just give me an idea - it gave me a complete roadmap to success. 
                The AI suggestions were incredibly relevant to my background."
              </p>
              <div className="font-semibold text-gray-900">- Tech Entrepreneur</div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center space-x-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The templates and legal documents saved me months of work and thousands of dollars. 
                I was able to launch in weeks instead of months."
              </p>
              <div className="font-semibold text-gray-900">- Service Business Owner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Your Success Story Starts Here
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have launched successful businesses with StartupLaunch. 
            Your story could be featured next.
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
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;