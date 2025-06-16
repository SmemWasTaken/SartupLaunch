import React, { useState, useEffect } from "react";
import { SignUp } from "@clerk/clerk-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, Crown, Rocket, Zap, Star, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan') || 'starter');
  const [showPlanSelection, setShowPlanSelection] = useState(true);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: <Zap className="w-6 h-6" />,
      price: '$0',
      period: 'Forever',
      description: 'Perfect for exploring startup ideas',
      features: [
        '2 AI-generated ideas per month',
        'Basic templates (3)',
        'Community support',
        'Basic market analysis'
      ],
      color: 'from-gray-500 to-gray-600',
      buttonStyle: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <Crown className="w-6 h-6" />,
      price: '$29',
      period: '/month',
      description: 'For serious entrepreneurs',
      features: [
        'Unlimited AI-generated ideas',
        'All premium templates (50+)',
        'Advanced business tools',
        'Priority support (24h)',
        'Financial planning tools',
        'Team collaboration (3 users)'
      ],
      color: 'from-blue-500 to-purple-600',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: <Rocket className="w-6 h-6" />,
      price: '$99',
      period: '/month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Unlimited team collaboration',
        'White-label solutions',
        'API access',
        'Dedicated account manager',
        'Custom integrations'
      ],
      color: 'from-purple-500 to-pink-600',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === 'starter') {
      setShowPlanSelection(false);
    }
  };

  const handleContinueWithPaid = () => {
    setShowPlanSelection(false);
  };

  if (showPlanSelection && selectedPlan !== 'starter') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Choose Your Plan</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select Your Subscription Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your entrepreneurial goals. You can always upgrade later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500 scale-105' : ''
                } ${plan.popular ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${plan.buttonStyle} ${
                      selectedPlan === plan.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleContinueWithPaid}
              disabled={!selectedPlan}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue with {plans.find(p => p.id === selectedPlan)?.name}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-500 mt-4">
              {selectedPlan === 'starter' ? 'No credit card required' : '14-day free trial • Cancel anytime'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {selectedPlan !== 'starter' && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Crown className="w-4 h-4" />
                <span>{plans.find(p => p.id === selectedPlan)?.name} Plan Selected</span>
              </div>
              <button
                onClick={() => setShowPlanSelection(true)}
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Change plan
              </button>
            </div>
          )}
          
          <SignUp 
            routing="path" 
            path="/signup"
            afterSignUpUrl={`/dashboard?plan=${selectedPlan}&welcome=true`}
            unsafeMetadata={{
              selectedPlan: selectedPlan,
              signupDate: new Date().toISOString()
            }}
          />
        </div>
      </div>
    </div>
  );
}