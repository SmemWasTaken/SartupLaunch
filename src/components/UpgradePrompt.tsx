import React from 'react';
import { SubscriptionPlan, SubscriptionFeatures } from '../types';

interface UpgradePromptProps {
  currentPlan: SubscriptionPlan;
  feature: keyof SubscriptionFeatures;
  onClose: () => void;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  currentPlan,
  feature,
  onClose,
}) => {
  const getUpgradeMessage = () => {
    const featureName = feature
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());

    switch (currentPlan) {
      case 'starter':
        return `Upgrade to Pro to access ${featureName}`;
      case 'pro':
        return `Upgrade to Enterprise to unlock advanced ${featureName} features`;
      default:
        return `Upgrade your plan to access ${featureName}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upgrade Required</h3>
        <p className="text-gray-600 mb-6">{getUpgradeMessage()}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Maybe Later
          </button>
          <button
            onClick={() => {
              // TODO: Implement upgrade flow
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};