import React from 'react';
import { Shield, Lock, Eye, Users, Globe, FileText } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Information You Provide',
          items: [
            'Account information (name, email, password)',
            'Profile information and preferences',
            'Startup ideas and business descriptions you input',
            'Payment information (processed securely by third-party providers)',
            'Communications with our support team',
            'Survey responses and feedback'
          ]
        },
        {
          subtitle: 'Information We Collect Automatically',
          items: [
            'Usage data and analytics (pages visited, features used)',
            'Device information and IP address',
            'Cookies and similar tracking technologies',
            'Log files and error reports',
            'Performance and diagnostic data'
          ]
        }
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Primary Uses',
          items: [
            'Provide and improve our AI-powered services',
            'Generate personalized startup ideas and recommendations',
            'Process payments and manage your account',
            'Send important updates and notifications',
            'Provide customer support and respond to inquiries',
            'Analyze usage patterns to improve our platform'
          ]
        },
        {
          subtitle: 'AI and Machine Learning',
          items: [
            'Train and improve our AI models (anonymized data only)',
            'Generate better startup ideas based on successful patterns',
            'Provide more accurate market analysis and recommendations',
            'Enhance user experience through personalization'
          ]
        }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Information Sharing',
      content: [
        {
          subtitle: 'Service Providers',
          items: [
            'Payment processors (Stripe, PayPal) for transaction processing',
            'Email service providers for communications',
            'Analytics services (Google Analytics) for usage insights',
            'Cloud hosting providers (AWS, Google Cloud) for data storage',
            'Customer support tools for help desk services'
          ]
        },
        {
          subtitle: 'Legal Requirements',
          items: [
            'Comply with applicable laws and regulations',
            'Respond to legal requests and court orders',
            'Protect our rights and prevent fraud',
            'Ensure safety and security of our users',
            'Enforce our Terms of Service'
          ]
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Technical Safeguards',
          items: [
            'End-to-end encryption for data in transit and at rest',
            'Regular security audits and penetration testing',
            'Multi-factor authentication for admin access',
            'Secure data centers with 24/7 monitoring',
            'Regular security updates and patches'
          ]
        },
        {
          subtitle: 'Organizational Measures',
          items: [
            'Employee training on data protection best practices',
            'Strict access controls and need-to-know basis',
            'Regular security awareness training',
            'Incident response procedures',
            'Data breach notification protocols'
          ]
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Your Rights and Choices',
      content: [
        {
          subtitle: 'Data Rights',
          items: [
            'Access and download your personal information',
            'Correct or update inaccurate data',
            'Delete your account and associated data',
            'Object to certain data processing activities',
            'Request data portability to another service'
          ]
        },
        {
          subtitle: 'Communication Preferences',
          items: [
            'Opt out of marketing communications',
            'Choose notification preferences',
            'Control cookie settings in your browser',
            'Manage email subscription preferences',
            'Update privacy settings in your account'
          ]
        }
      ]
    }
  ];

  const additionalSections = [
    {
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar technologies to remember your preferences, analyze website traffic, provide personalized content, and improve our services. You can control cookies through your browser settings, but some features may not work properly if cookies are disabled. We use both first-party and third-party cookies for analytics, advertising, and functionality purposes.'
    },
    {
      title: 'Data Retention',
      content: 'We retain your information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete your personal information within 30 days, except where required by law to retain certain data. Anonymized usage data may be retained longer for analytics and service improvement purposes.'
    },
    {
      title: 'International Data Transfers',
      content: 'Your information may be transferred to and processed in countries other than your own, including the United States. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws, including Standard Contractual Clauses and adequacy decisions where applicable.'
    },
    {
      title: 'Children\'s Privacy',
      content: 'Our Service is not intended for children under 13 years of age (or 16 in the EU). We do not knowingly collect personal information from children under these ages. If we become aware that we have collected such information, we will take steps to delete it promptly and may terminate the associated account.'
    },
    {
      title: 'AI and Data Processing',
      content: 'Our AI systems process your input to generate startup ideas and business recommendations. We want to be transparent: your input data helps train and improve our AI models, but we use anonymized and aggregated data for this purpose. You retain ownership of ideas you generate using our platform, and we do not share your specific input with other users.'
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the new policy on this page, updating the "Last updated" date, and sending you an email notification. We encourage you to review this policy periodically.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information when you use StartupLaunch.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Full Transparency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-xl">
              <h2 className="text-xl font-bold text-blue-900 mb-3">Our Commitment to Your Privacy</h2>
              <p className="text-blue-800 mb-0 leading-relaxed">
                At StartupLaunch, we are committed to protecting your personal information and being 
                transparent about how we collect, use, and share your data. This policy applies to 
                all users of our platform and services.
              </p>
            </div>

            {/* Main Sections */}
            {sections.map((section, index) => (
              <div key={index} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-blue-600">
                      {section.icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {section.content.map((subsection, subIndex) => (
                  <div key={subIndex} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {subsection.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {/* Additional Sections */}
            {additionalSections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Our Privacy Team
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy, our data practices, 
                or would like to exercise your privacy rights, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">privacy@startupLaunch.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-gray-700">Within 30 days</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mailing Address</h3>
                  <p className="text-gray-700">
                    StartupLaunch Privacy Team<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h3>
                  <p className="text-gray-700">dpo@startupLaunch.com</p>
                </div>
              </div>
            </div>

            {/* Effective Date */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                This Privacy Policy is effective as of January 15, 2024, and was last updated on January 15, 2024.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;