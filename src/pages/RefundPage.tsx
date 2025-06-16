import React from 'react';
import { RefreshCw, CheckCircle, AlertCircle, CreditCard, Mail } from 'lucide-react';

const RefundPage: React.FC = () => {
  const refundTimeline = [
    {
      step: 1,
      title: 'Request Submitted',
      description: 'You submit a refund request through our support system',
      timeframe: 'Immediate'
    },
    {
      step: 2,
      title: 'Review Process',
      description: 'Our team reviews your request and account history',
      timeframe: '1-2 business days'
    },
    {
      step: 3,
      title: 'Approval & Processing',
      description: 'Approved refunds are processed back to your original payment method',
      timeframe: '2-3 business days'
    },
    {
      step: 4,
      title: 'Refund Completed',
      description: 'Funds appear in your account (timing depends on your bank)',
      timeframe: '3-10 business days'
    }
  ];

  const eligibilityCriteria = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: 'Within 30 Days',
      description: 'Request must be made within 30 days of purchase'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: 'Minimal Usage',
      description: 'Limited use of premium features (less than 10 AI generations)'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: 'Valid Reason',
      description: 'Technical issues, billing errors, or service not as described'
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
      title: 'Account in Good Standing',
      description: 'No violations of our Terms of Service'
    }
  ];

  const nonRefundableItems = [
    'Custom template creation services',
    'One-on-one consultation sessions',
    'Third-party service fees (payment processing)',
    'Subscriptions used for more than 30 days',
    'Accounts terminated for policy violations',
    'Services already delivered (completed projects)'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
            <RefreshCw className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We want you to be completely satisfied with StartupLaunch. If you're not happy 
            with your purchase, we offer a fair and transparent refund policy.
          </p>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              We're confident you'll love StartupLaunch. If you're not completely satisfied 
              within 30 days of your purchase, we'll refund your money.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-green-800 font-medium">
                No questions asked. No hassle. Just contact our support team and we'll take care of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Refund Eligibility
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligibilityCriteria.map((criteria, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  {criteria.icon}
                  <h3 className="font-semibold text-gray-900">{criteria.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {criteria.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How the Refund Process Works
          </h2>
          
          <div className="space-y-8">
            {refundTimeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.timeframe}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Not Refundable */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Non-Refundable Items
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            While we offer generous refund terms, some items and services are not eligible for refunds.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-start space-x-3 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Please Note
                </h3>
                <p className="text-amber-800">
                  The following items and services are not eligible for refunds under our standard policy:
                </p>
              </div>
            </div>
            
            <ul className="space-y-3">
              {nonRefundableItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-amber-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Special Circumstances
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Issues</h3>
              <p className="text-gray-600 mb-4">
                If you experience technical problems that prevent you from using our service, 
                we may offer refunds beyond the 30-day period.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Service outages lasting more than 24 hours</li>
                <li>• Critical bugs affecting core functionality</li>
                <li>• Data loss due to our system errors</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Billing Errors</h3>
              <p className="text-gray-600 mb-4">
                If you were charged incorrectly due to a system error or billing mistake, 
                we'll process a full refund immediately.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Duplicate charges</li>
                <li>• Wrong subscription tier charged</li>
                <li>• Charges after cancellation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Request */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Request a Refund
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  Contact Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Send an email to our support team with your refund request. Include your account 
                  email and reason for the refund.
                </p>
                <a
                  href="mailto:support@startupLaunch.com?subject=Refund Request"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-block"
                >
                  Email Support
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  Required Information
                </h3>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>• Account email address</li>
                  <li>• Subscription or purchase details</li>
                  <li>• Reason for refund request</li>
                  <li>• Any relevant screenshots or details</li>
                </ul>
                <p className="text-sm text-gray-500">
                  Providing complete information helps us process your request faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Refund FAQ
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long do refunds take to process?
              </h3>
              <p className="text-gray-600">
                Refunds typically take 5-10 business days to appear in your account after approval. 
                The exact timing depends on your bank or payment provider.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I get a partial refund?
              </h3>
              <p className="text-gray-600">
                We generally offer full refunds within our policy terms. Partial refunds may be 
                considered for special circumstances on a case-by-case basis.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens to my data after a refund?
              </h3>
              <p className="text-gray-600">
                You'll have 30 days to export your data after a refund. After that, your account 
                and associated data will be permanently deleted.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I get a refund if I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Canceling your subscription stops future billing but doesn't automatically trigger 
                a refund. You can request a refund separately if you meet our eligibility criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Help with a Refund?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. We'll work with you to resolve any issues 
            and ensure you're satisfied with your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@startupLaunch.com"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/faq"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPage;