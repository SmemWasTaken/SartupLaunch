import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, HelpCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: {
    name: string;
    included: boolean;
    tooltip?: string;
  }[];
  isPopular?: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for solo entrepreneurs just getting started',
    monthlyPrice: 29,
    yearlyPrice: 279,
    features: [
      { name: 'AI Idea Generation', included: true },
      { name: 'Basic Templates', included: true },
      { name: 'Community Access', included: true },
      { name: 'Email Support', included: true },
      { name: 'Team Seats', included: false },
      { name: 'Analytics Dashboard', included: false },
      { name: 'Custom Branding', included: false },
      { name: 'Priority Support', included: false },
      { name: 'API Access', included: false },
      { name: 'White Label Option', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for growing startups and small teams',
    monthlyPrice: 79,
    yearlyPrice: 759,
    features: [
      { name: 'AI Idea Generation', included: true },
      { name: 'Premium Templates', included: true },
      { name: 'Community Access', included: true },
      { name: 'Priority Email Support', included: true },
      { name: 'Up to 5 Team Seats', included: true },
      { name: 'Analytics Dashboard', included: true },
      { name: 'Custom Branding', included: true },
      { name: 'Priority Support', included: true },
      { name: 'API Access', included: false },
      { name: 'White Label Option', included: false },
    ],
    isPopular: true,
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For established businesses and large teams',
    monthlyPrice: 199,
    yearlyPrice: 1919,
    features: [
      { name: 'AI Idea Generation', included: true },
      { name: 'All Templates', included: true },
      { name: 'Community Access', included: true },
      { name: '24/7 Priority Support', included: true },
      { name: 'Unlimited Team Seats', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Custom Branding', included: true },
      { name: 'Priority Support', included: true },
      { name: 'API Access', included: true },
      { name: 'White Label Option', included: true },
    ],
    cta: 'Contact Sales',
  },
];

const PricingTable: React.FC = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handlePlanSelect = (plan: PricingPlan) => {
    if (plan.id === 'enterprise') {
      navigate('/contact', { state: { plan: plan.id } });
    } else {
      navigate('/signup', { state: { plan: plan.id, isYearly } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your startup journey. All plans include a 14-day free trial.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-white rounded-2xl border ${
              plan.isPopular
                ? 'border-blue-500 shadow-xl'
                : 'border-gray-200 shadow-lg'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500 text-white text-sm font-medium">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 ml-2">/ {isYearly ? 'year' : 'month'}</span>
                </div>
                {isYearly && (
                  <p className="text-sm text-gray-500 mt-1">
                    Billed annually (${Math.round(plan.yearlyPrice / 12)}/mo)
                  </p>
                )}
              </div>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 px-6 rounded-xl text-center font-semibold transition-all ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-start">
                    <div className="flex-shrink-0">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className="ml-3 flex items-center">
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {feature.name}
                      </span>
                      {feature.tooltip && (
                        <div className="relative ml-2">
                          <button
                            onMouseEnter={() => setShowTooltip(feature.name)}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                          {showTooltip === feature.name && (
                            <div className="absolute z-10 w-48 p-2 mt-1 text-xs text-white bg-gray-900 rounded-lg shadow-lg -left-1/2 transform -translate-x-1/2">
                              {feature.tooltip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 mb-8">
          Can't find the answer you're looking for?{' '}
          <button
            onClick={() => navigate('/contact')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact our support team
          </button>
        </p>
      </div>
    </div>
  );
};

export default PricingTable; 