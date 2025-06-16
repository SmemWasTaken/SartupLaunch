import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Zap, Users, Shield } from 'lucide-react';
import PricingTable from '../components/PricingTable';

const PricingPage: React.FC = () => {
  const benefits = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "AI-Powered Idea Generation",
      description: "Get personalized startup ideas based on your interests, skills, and market trends."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Launch-Ready Templates",
      description: "Access our library of professional templates for business plans, legal documents, and more."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Join a thriving community of entrepreneurs and get feedback on your ideas."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Get access to mentors and industry experts who can help you succeed."
    }
  ];

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "The 14-day free trial includes full access to all features of your chosen plan. No credit card required to start."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
    },
    {
      question: "Do you offer discounts for startups?",
      answer: "Yes, we offer special pricing for early-stage startups and educational institutions. Contact our sales team for details."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Path to Success
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your entrepreneurial journey with our flexible plans. All plans include a 14-day free trial 
            and 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-20 bg-white">
        <PricingTable />
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools and resources you need to launch and grow your startup.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-blue-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? Our team is here to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <span>Contact Sales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who have launched their startups with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/how-it-works"
              className="border border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;