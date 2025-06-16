import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { usePlanFeatures } from '../hooks/usePlanFeatures';
import { CreditCard, Package, Zap } from 'lucide-react';

const BillingPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { currentPlan, features } = usePlanFeatures();

  if (!user) {
    navigate('/login');
    return null;
  }

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 idea generations per day',
        'Basic analytics',
        'Save up to 10 ideas',
      ],
      icon: Package,
    },
    {
      name: 'Pro',
      price: '$29',
      features: [
        'Unlimited idea generations',
        'Advanced analytics',
        'Save unlimited ideas',
        'Priority support',
        'Custom interest categories',
      ],
      icon: Zap,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Custom AI training',
        'API access',
        'Dedicated support',
        'Custom integrations',
      ],
      icon: CreditCard,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing & Subscription</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-gray-900">{currentPlan}</p>
            <p className="text-sm text-gray-500">
              {currentPlan === 'Free' ? 'No subscription' : 'Active subscription'}
            </p>
          </div>
          {currentPlan !== 'Free' && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel your subscription?')) {
                  // TODO: Implement subscription cancellation
                }
              }}
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.name === currentPlan;

          return (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg p-6 ${
                isCurrentPlan ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <Icon className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                  isCurrentPlan
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
                disabled={isCurrentPlan}
                onClick={() => {
                  if (!isCurrentPlan) {
                    // TODO: Implement plan upgrade/downgrade
                    if (plan.name === 'Enterprise') {
                      window.location.href = 'mailto:sales@startuplaunch.ai';
                    } else {
                      // Redirect to payment page
                    }
                  }
                }}
              >
                {isCurrentPlan ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPlan === 'Free' ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No payment history available
                  </td>
                </tr>
              ) : (
                // TODO: Implement payment history
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Coming soon
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Payment history will be available here
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage; 