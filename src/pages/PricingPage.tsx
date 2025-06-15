import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      icon: <Zap className="w-8 h-8" />,
      price: 0,
      period: 'Free Forever',
      description: 'Perfect for exploring startup ideas',
      features: [
        '3 AI-generated startup ideas per month',
        'Basic business concept templates',
        'Community forum access',
        'Email support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      icon: <Crown className="w-8 h-8" />,
      price: 29,
      period: 'per month',
      description: 'For serious entrepreneurs ready to launch',
      features: [
        'Unlimited AI-generated startup ideas',
        'Access to all premium templates',
        'Legal document bundles',
        'Business plan generator',
        'Marketing automation setup',
        'Priority email support',
        'Video tutorials & guides'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Rocket className="w-8 h-8" />,
      price: 99,
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'White-label solutions',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Phone support',
        'Custom templates'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Choose the plan that fits your entrepreneurial journey. Start free and upgrade 
              as you grow your startup empire.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
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
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                        {plan.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {plan.description}
                      </p>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          ${plan.price}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-gray-600 ml-2">
                            /{plan.period.split(' ')[1]}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {plan.period}
                      </div>
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
                    <button
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
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
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing differences.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What happens to my data if I cancel?
                </h3>
                <p className="text-gray-600">
                  Your data remains accessible for 30 days after cancellation. You can export all your 
                  generated ideas and purchased templates during this period.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, 
                  contact our support team for a full refund.
                </p>
              </div>
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
              with StartupLaunch.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Start Your Free Trial
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;