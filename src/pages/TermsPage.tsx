import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Last updated: January 1, 2024
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <p className="text-blue-800 mb-0">
                  <strong>Important:</strong> These terms govern your use of StartupLaunch. 
                  By using our service, you agree to these terms.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using StartupLaunch ("Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                StartupLaunch is an AI-powered platform that helps entrepreneurs generate startup ideas, 
                access business templates, and launch micro-businesses. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>AI-generated startup idea generation</li>
                <li>Business template marketplace</li>
                <li>Legal document templates</li>
                <li>Business planning tools</li>
                <li>Educational resources and community access</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To access certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for any illegal or unauthorized purpose</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                The Service and its original content, features, and functionality are owned by StartupLaunch 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws. You retain ownership of content you create using our templates 
                and tools.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                For paid services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Fees are charged in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We offer a 30-day money-back guarantee for new subscriptions</li>
                <li>Prices may change with 30 days notice</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. AI-Generated Content Disclaimer</h2>
              <p className="text-gray-700 mb-6">
                Our AI-generated startup ideas and business suggestions are for informational purposes only. 
                We do not guarantee the success, viability, or profitability of any generated ideas. 
                Users should conduct their own research and due diligence before pursuing any business opportunity.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Legal Templates Disclaimer</h2>
              <p className="text-gray-700 mb-6">
                Legal document templates provided through our Service are for general informational purposes 
                and should not be considered legal advice. We recommend consulting with qualified legal 
                professionals before using any legal documents in your business.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                StartupLaunch shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-6">
                We may terminate or suspend your account and access to the Service immediately, without 
                prior notice, for conduct that we believe violates these Terms or is harmful to other 
                users, us, or third parties.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through the Service. Continued use of the Service after 
                changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> legal@startupLaunch.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsPage;