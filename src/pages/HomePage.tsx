import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Zap, Users, TrendingUp, Star, CheckCircle, Rocket } from 'lucide-react';
import { IdeaGenerator } from '../components/IdeaGenerator';
import { getMockStats, getMockTestimonials } from '../utils/mockData';
import { trackButtonClick } from '../utils/analytics';

export const HomePage: React.FC = () => {
  const stats = getMockStats();
  const testimonials = getMockTestimonials();

  const features = [
    {
      icon: Lightbulb,
      title: 'AI-Powered Idea Generation',
      description: 'Get personalized startup ideas based on your interests, skills, and market opportunities.',
    },
    {
      icon: Zap,
      title: 'Instant Market Analysis',
      description: 'Receive detailed insights including revenue estimates, difficulty ratings, and time to launch.',
    },
    {
      icon: Users,
      title: 'Professional Templates',
      description: 'Access our marketplace of legal documents, business plans, and marketing materials.',
    },
    {
      icon: TrendingUp,
      title: 'Success Tracking',
      description: 'Monitor your progress from idea to launch with our comprehensive dashboard.',
    },
  ];

  const handleCTAClick = (buttonName: string) => {
    trackButtonClick(buttonName, 'homepage_hero');
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <Rocket className="w-4 h-4" />
              <span>Trusted by 2,400+ successful entrepreneurs</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Turn Your Ideas Into
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Profitable Startups
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Generate AI-powered startup ideas, access professional templates, and launch your business 10x faster with our comprehensive platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                onClick={() => handleCTAClick('get_started')}
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free templates included</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stats.ideasGenerated}
              </div>
              <div className="text-gray-600 font-medium">Ideas Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-600 mb-2">
                {stats.startupslaunched}
              </div>
              <div className="text-gray-600 font-medium">Startups Launched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.templatesold}
              </div>
              <div className="text-gray-600 font-medium">Templates Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {stats.successRate}
              </div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Launch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ideation to execution, our platform provides all the tools and resources needed to turn your startup dreams into reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8 text-primary-600" />
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

      {/* Idea Generator Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Generate Your Next Big Idea
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Try our AI-powered idea generator below. Answer a few questions and get personalized startup ideas with detailed analysis.
            </p>
          </div>
          
          <IdeaGenerator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful entrepreneurs who have launched their startups with StartupLaunch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Launch Your Startup?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have successfully launched their startups with our platform. Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              onClick={() => handleCTAClick('final_cta')}
              className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link
              to="/templates"
              onClick={() => handleCTAClick('browse_templates')}
              className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};