import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { SubscriptionPlan } from '../hooks/useSubscription';

interface UpgradePromptProps {
  currentPlan: SubscriptionPlan;
  feature: string;
  onClose?: () => void;
  className?: string;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  currentPlan,
  feature,
  onClose,
  className = ''
}) => {
  const getUpgradeMessage = () => {
    if (currentPlan === 'starter') {
      return {
        title: 'Upgrade to Pro',
        subtitle: `${feature} is available with Pro plans`,
        plan: 'Pro',
        price: '$29/month',
        benefits: [
          'Unlimited AI-generated ideas',
          'Access to all premium templates',
          'Advanced business tools',
          'Priority support'
        ]
      };
    } else {
      return {
        title: 'Upgrade to Enterprise',
        subtitle: `${feature} is available with Enterprise plans`,
        plan: 'Enterprise',
        price: '$99/month',
        benefits: [
          'Everything in Pro',
          'Unlimited team collaboration',
          'API access',
          'Custom integrations',
          'Dedicated account manager'
        ]
      };
    }
  };

  const upgrade = getUpgradeMessage();

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
          <Crown className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{upgrade.title}</h3>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          
          <p className="text-gray-600 mb-4">{upgrade.subtitle}</p>
          
          <div className="space-y-2 mb-6">
            {upgrade.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Starting at <span className="font-semibold text-gray-900">{upgrade.price}</span>
            </div>
            
            <div className="flex space-x-3">
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Maybe later
                </button>
              )}
              <Link
                to="/pricing"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2"
              >
                <span>Upgrade Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};