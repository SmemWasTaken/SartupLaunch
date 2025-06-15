import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Heart, 
  Globe, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We believe in the power of innovative thinking to solve real-world problems and create meaningful businesses.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Entrepreneur Success',
      description: 'Your success is our success. We\'re committed to providing tools and resources that help you build thriving businesses.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'We operate with complete transparency, protecting your data and intellectual property while building lasting relationships.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Impact',
      description: 'We\'re building a platform that empowers entrepreneurs worldwide to create positive change in their communities.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Product at TechCorp, serial entrepreneur with 3 successful exits. Passionate about democratizing entrepreneurship.',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former Google engineer. Expert in machine learning and natural language processing with 10+ years experience.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Watson',
      role: 'Head of Product',
      bio: 'Former product manager at Stripe and Airbnb. Specializes in user experience design and product strategy for growth-stage companies.',
      image: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=300',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'Head of Business Development',
      bio: 'Former McKinsey consultant and startup advisor. Helped 100+ startups raise over $500M in funding and scale their operations.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Company Founded',
      description: 'Started with a vision to democratize entrepreneurship using AI technology.'
    },
    {
      year: '2023',
      title: 'First 1,000 Users',
      description: 'Reached our first milestone with entrepreneurs from 25 countries using our platform.'
    },
    {
      year: '2023',
      title: 'Series A Funding',
      description: 'Raised $5M Series A to accelerate product development and team growth.'
    },
    {
      year: '2024',
      title: '10,000+ Ideas Generated',
      description: 'Our AI has helped generate over 10,000 startup ideas, with 78% success rate.'
    },
    {
      year: '2024',
      title: 'Template Marketplace Launch',
      description: 'Launched comprehensive marketplace with 50+ professional business templates.'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expanding to serve entrepreneurs in 50+ countries with localized content.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Ideas Generated' },
    { number: '2,400+', label: 'Startups Launched' },
    { number: '78%', label: 'Success Rate' },
    { number: '$12M+', label: 'Revenue Generated' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Empowering Entrepreneurs Worldwide</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About StartupLaunch
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize entrepreneurship by making it easier than ever 
            to generate, validate, and launch profitable startup ideas using the power of AI.
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Join Our Mission</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that everyone has the potential to be an entrepreneur, but many are held back 
                by the complexity of starting a business. Our mission is to remove these barriers by 
                providing AI-powered tools that make entrepreneurship accessible to everyone.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our platform, we're not just generating business ideas – we're creating 
                opportunities, fostering innovation, and helping people build the future they envision.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team collaboration"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we build products, 
              serve customers, and grow our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-blue-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're proud of the entrepreneurs we've helped and the businesses they've built.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse team of entrepreneurs, engineers, and business experts 
              passionate about helping others succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a platform serving thousands of entrepreneurs worldwide.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-blue-600">{milestone.year}</span>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a community that's reshaping entrepreneurship. Start your journey today 
            and build the business you've always dreamed of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;