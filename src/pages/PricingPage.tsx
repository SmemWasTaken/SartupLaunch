import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Rocket, Star, ArrowRight, Users, Shield, Headphones } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      icon: <Zap className="w-8 h-8" />,
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for exploring startup ideas and getting started',
      features: [
        '3 AI-generated startup ideas per month',
        'Basic business concept templates',
        'Community forum access',
        'Email support (48h response)',
        'Basic market analysis',
        'Idea favoriting and saving'
      ],
      limitations: [
        'Limited template access',
        'No premium features',
        'Community support only'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      icon: <Crown className="w-8 h-8" />,
      monthlyPrice: 29,
      annualPrice: 290,
      description: 'For serious entrepreneurs ready to launch their startup',
      features: [
        'Unlimited AI-generated startup ideas',
        'Access to all premium templates (50+)',
        'Legal document bundles',
        'Advanced business plan generator',
        'Marketing automation setup guides',
        'Financial planning tools',
        'Priority email support (24h response)',
        'Video tutorials & masterclasses',
        'Market trend analysis',
        'Competitor research tools',
        'Custom branding templates',
        'Export to multiple formats'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Enterprise',
      icon: <Rocket className="w-8 h-8" />,
      monthlyPrice: 99,
      annualPrice: 990,
      description: 'For teams, agencies, and scaling businesses',
      features: [
        'Everything in Pro',
        'Team collaboration tools (up to 10 users)',
        'White-label solutions',
        'API access for integrations',
        'Custom template creation',
        'Dedicated account manager',
        'Phone support (4h response)',
        'Custom integrations',
        'Advanced analytics dashboard',
        'Multi-brand management',
        'Priority feature requests',
        'Onboarding consultation',
        'Monthly strategy calls'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const addOns = [
    {
      name: 'Legal Review Service',
      price: 199,
      description: 'Get your legal documents reviewed by qualified attorneys',
      icon: <Shield className="w-6 h-6" />
    },
    {
      name: '1-on-1 Mentorship',
      price: 299,
      description: 'Monthly 1-hour sessions with experienced entrepreneurs',
      icon: <Users className="w-6 h-6" />
    },
    {
      name: 'Priority Support',
      price: 49,
      description: 'Get support responses within 2 hours, 24/7',
      icon: <Headphones className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export all your generated ideas and purchased templates during this period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'How does team billing work?',
      answer: 'Enterprise plans include up to 10 team members. Additional users can be added for $15/month each.'
    },
    {
      question: 'Can I use StartupLaunch for client work?',
      answer: 'Yes! Pro and Enterprise plans include commercial usage rights. Enterprise plans also offer white-label options.'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.annualPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>30-Day Money-Back Guarantee</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your entrepreneurial journey. Start free and upgrade 
            as you grow your startup empire. No hidden fees, cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Save up to 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${getPrice(plan)}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-gray-600 ml-2">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {getSavings(plan)}% annually
                      </div>
                    )}
                    {plan.monthlyPrice === 0 && (
                      <div className="text-sm text-gray-500">
                        Free Forever
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your experience with these premium services available to all paid plan users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-blue-600">
                      {addon.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                    <div className="text-2xl font-bold text-gray-900">${addon.price}</div>
                  </div>
                </div>
                <p className="text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
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
            Join thousands of entrepreneurs who've successfully launched their businesses 
            with StartupLaunch. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;