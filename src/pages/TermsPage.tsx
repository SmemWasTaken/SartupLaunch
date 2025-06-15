import React from 'react';
import { FileText, Scale, Shield, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Acceptance of Terms',
      content: 'By accessing and using StartupLaunch ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all users, including visitors, registered users, and premium subscribers.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Description of Service',
      content: 'StartupLaunch is an AI-powered platform that helps entrepreneurs generate startup ideas, access business templates, and launch micro-businesses. Our services include AI-generated startup idea generation, business template marketplace, legal document templates, business planning tools, educational resources, and community access.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'User Accounts',
      content: 'To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to maintain and update your account information. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account.'
    }
  ];

  const detailedSections = [
    {
      title: 'Acceptable Use Policy',
      content: [
        'You agree to use the Service only for lawful purposes and in accordance with these Terms.',
        'You will not use the Service to violate any applicable laws or regulations.',
        'You will not infringe on intellectual property rights of others.',
        'You will not transmit harmful, offensive, or inappropriate content.',
        'You will not attempt to gain unauthorized access to our systems.',
        'You will not use the service for any illegal or unauthorized purpose.',
        'You will not interfere with or disrupt the Service or servers.',
        'You will not create multiple accounts to circumvent limitations.'
      ]
    },
    {
      title: 'Intellectual Property Rights',
      content: [
        'The Service and its original content, features, and functionality are owned by StartupLaunch.',
        'Our content is protected by international copyright, trademark, and other intellectual property laws.',
        'You retain ownership of content you create using our templates and tools.',
        'You grant us a limited license to use your feedback to improve our services.',
        'You may not copy, modify, distribute, or reverse engineer our software.',
        'Our trademarks and logos may not be used without written permission.',
        'User-generated content remains your property, subject to our license to operate the service.'
      ]
    },
    {
      title: 'Payment Terms and Billing',
      content: [
        'Subscription fees are charged in advance on a monthly or annual basis.',
        'All fees are non-refundable except as required by law or our refund policy.',
        'We offer a 30-day money-back guarantee for new subscriptions.',
        'Prices may change with 30 days advance notice to existing subscribers.',
        'Failed payments may result in service suspension after grace period.',
        'You are responsible for all taxes associated with your subscription.',
        'Refunds, when applicable, will be processed within 5-10 business days.'
      ]
    },
    {
      title: 'AI-Generated Content and Disclaimers',
      content: [
        'Our AI-generated startup ideas are for informational purposes only.',
        'We do not guarantee the success, viability, or profitability of any generated ideas.',
        'Users should conduct their own research and due diligence before pursuing any business opportunity.',
        'AI suggestions are based on patterns in data and may not reflect current market conditions.',
        'We are not responsible for business decisions made based on our AI recommendations.',
        'Market analysis and projections are estimates and should not be considered financial advice.',
        'Users assume all risks associated with implementing generated business ideas.'
      ]
    },
    {
      title: 'Legal Templates and Professional Advice',
      content: [
        'Legal document templates are for general informational purposes only.',
        'Templates should not be considered legal advice or substitute for professional counsel.',
        'We recommend consulting with qualified legal professionals before using any legal documents.',
        'Laws vary by jurisdiction, and templates may not be suitable for all locations.',
        'We disclaim all liability for legal consequences of using our templates.',
        'Users are responsible for ensuring compliance with applicable laws.',
        'Professional review is recommended for all legal and business documents.'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'StartupLaunch shall not be liable for any indirect, incidental, special, or consequential damages.',
        'This includes loss of profits, data, use, goodwill, or other intangible losses.',
        'Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.',
        'We are not liable for damages resulting from unauthorized access to your account.',
        'Force majeure events (natural disasters, government actions, etc.) are excluded from liability.',
        'Some jurisdictions do not allow limitation of liability, so these limits may not apply to you.',
        'You agree to indemnify us against claims arising from your use of the Service.'
      ]
    },
    {
      title: 'Data Protection and Privacy',
      content: [
        'Your privacy is important to us and is governed by our Privacy Policy.',
        'We implement appropriate security measures to protect your personal information.',
        'You have rights regarding your personal data as outlined in our Privacy Policy.',
        'We may process your data to provide and improve our services.',
        'Data may be transferred internationally in accordance with applicable laws.',
        'You can request deletion of your data subject to legal retention requirements.',
        'We will notify you of any data breaches as required by law.'
      ]
    },
    {
      title: 'Termination',
      content: [
        'You may terminate your account at any time through your account settings.',
        'We may terminate or suspend your account for violations of these Terms.',
        'Termination may be immediate for serious violations or illegal activity.',
        'Upon termination, your right to use the Service ceases immediately.',
        'We may retain certain information as required by law or for legitimate business purposes.',
        'Paid subscriptions will continue until the end of the billing period.',
        'You may export your data before termination subject to technical limitations.'
      ]
    },
    {
      title: 'Modifications to Terms',
      content: [
        'We reserve the right to modify these terms at any time.',
        'Material changes will be communicated via email or through the Service.',
        'Continued use after changes constitutes acceptance of new terms.',
        'If you disagree with changes, you may terminate your account.',
        'We will provide at least 30 days notice for material changes affecting paid users.',
        'Changes will be effective immediately for new users.',
        'Previous versions of terms will be archived and available upon request.'
      ]
    },
    {
      title: 'Governing Law and Disputes',
      content: [
        'These Terms are governed by the laws of the State of California, USA.',
        'Disputes will be resolved through binding arbitration in San Francisco, CA.',
        'You waive the right to participate in class action lawsuits.',
        'Small claims court disputes are excluded from arbitration requirements.',
        'California courts have exclusive jurisdiction for non-arbitrable disputes.',
        'The prevailing party in disputes may recover reasonable attorney fees.',
        'These terms survive termination of your account or the Service.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            These terms govern your use of StartupLaunch. By using our service, 
            you agree to these terms and conditions.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Important Legal Agreement</h3>
              <p className="text-amber-800 leading-relaxed">
                These terms constitute a legally binding agreement between you and StartupLaunch. 
                Please read them carefully. By using our service, you acknowledge that you have 
                read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Sections */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Key Terms Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-blue-600">
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="prose prose-lg max-w-none">
            {detailedSections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600 font-bold text-sm">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-2xl p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Questions About These Terms?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you have any questions about these Terms of Service, please contact our legal team. 
                We're here to help clarify any provisions or address your concerns.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Legal Team</h3>
                  <p className="text-gray-700">legal@startupLaunch.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-gray-700">Within 5 business days</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mailing Address</h3>
                  <p className="text-gray-700">
                    StartupLaunch Legal Department<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday<br />
                    9:00 AM - 5:00 PM PST
                  </p>
                </div>
              </div>
            </div>

            {/* Effective Date */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-2">
                These Terms of Service are effective as of January 15, 2024.
              </p>
              <p className="text-gray-600">
                Previous versions are available upon request for reference purposes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;