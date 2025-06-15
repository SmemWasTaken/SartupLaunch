import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Globe, 
  TrendingUp, 
  Coffee, 
  Laptop, 
  MapPin, 
  Clock,
  ArrowRight,
  Star,
  Award,
  Zap
} from 'lucide-react';

const CareersPage: React.FC = () => {
  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness stipends'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Remote-First Culture',
      description: 'Work from anywhere with flexible hours and home office setup allowance'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget and mentorship programs'
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Work-Life Balance',
      description: 'Unlimited PTO, sabbatical options, and company retreats'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Equity & Ownership',
      description: 'Competitive equity packages so you share in our success'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Inclusive Culture',
      description: 'Diverse, supportive team committed to belonging and inclusion'
    }
  ];

  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Move Fast',
      description: 'We ship quickly, iterate based on feedback, and aren\'t afraid to fail fast and learn.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Obsessed',
      description: 'Every decision we make starts with our customers and their success.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We set high standards and continuously push ourselves to deliver exceptional work.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Care Deeply',
      description: 'We care about our work, our team, and the entrepreneurs we serve.'
    }
  ];

  const openRoles = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      description: 'Help build the next generation of our AI-powered platform using React, Node.js, and Python.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote / New York',
      type: 'Full-time',
      description: 'Design beautiful, intuitive experiences that help entrepreneurs succeed.'
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      description: 'Improve our AI models and build new machine learning capabilities.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our customers achieve their entrepreneurial goals and drive product adoption.'
    },
    {
      title: 'Content Marketing Manager',
      department: 'Marketing',
      location: 'Remote / New York',
      type: 'Full-time',
      description: 'Create compelling content that educates and inspires entrepreneurs.'
    },
    {
      title: 'Sales Development Representative',
      department: 'Sales',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive growth by connecting with potential enterprise customers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>We're Hiring!</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Join Our Mission to Democratize Entrepreneurship
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Help us build the future of entrepreneurship. We're looking for passionate, 
            talented people who want to make a real impact on entrepreneurs worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#open-roles"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>View Open Roles</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/about"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work at StartupLaunch?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building something special, and we want you to be part of it. 
              Here's what makes working here unique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-blue-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide how we work, make decisions, and treat each other every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
                  {value.icon}
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

      {/* Open Roles */}
      <section id="open-roles" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing team and help shape the future of entrepreneurship. 
              We're always looking for exceptional talent.
            </p>
          </div>
          
          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {role.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {role.department}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {role.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{role.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{role.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform group-hover:scale-105 flex items-center space-x-2">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Don't see a role that fits? We're always interested in hearing from exceptional people.
            </p>
            <Link
              to="/contact"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all inline-flex items-center space-x-2"
            >
              <span>Send Us Your Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              More Than Just a Job
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We believe in taking care of our team so they can do their best work and live their best lives.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Laptop className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Latest Equipment</h3>
                <p className="text-blue-100 text-sm">
                  MacBook Pro, external monitors, and any tools you need to be productive.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Coffee className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Office Perks</h3>
                <p className="text-blue-100 text-sm">
                  Fully stocked kitchen, catered meals, and comfortable workspaces.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Globe className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Team Retreats</h3>
                <p className="text-blue-100 text-sm">
                  Annual company retreats and quarterly team building events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're excited to meet passionate people who want to help democratize entrepreneurship. 
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#open-roles"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Browse Open Roles</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;