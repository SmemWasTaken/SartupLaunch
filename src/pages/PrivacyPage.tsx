import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Header />
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
            <p className="text-xl text-gray-600 mb-8">
              Last updated: January 1, 2024
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <p className="text-green-800 mb-0">
                  <strong>Your Privacy Matters:</strong> We are committed to protecting your personal 
                  information and being transparent about how we collect, use, and share your data.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Account information (name, email, password)</li>
                <li>Profile information and preferences</li>
                <li>Startup ideas and business descriptions you input</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Communications with our support team</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect Automatically</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Usage data and analytics</li>
                <li>Device information and IP address</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Log files and error reports</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Provide and improve our AI-powered services</li>
                <li>Generate personalized startup ideas and recommendations</li>
                <li>Process payments and manage your account</li>
                <li>Send important updates and notifications</li>
                <li>Provide customer support</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. AI and Data Processing</h2>
              <p className="text-gray-700 mb-4">
                Our AI systems process your input to generate startup ideas and business recommendations. 
                We want to be transparent about this process:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Your input data is used to train and improve our AI models</li>
                <li>Generated ideas are based on patterns in successful business data</li>
                <li>We do not share your specific input with other users</li>
                <li>You retain ownership of ideas you generate using our platform</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 mb-4">We may share your information with:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Email service providers</li>
                <li>Analytics and monitoring services</li>
                <li>Cloud hosting providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-6">
                We may disclose information when required by law, to protect our rights, or to protect 
                the safety of our users or others.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">We implement industry-standard security measures:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Object to certain data processing activities</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p className="text-gray-700 mb-6">
                You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your information for as long as necessary to provide our services and comply 
                with legal obligations. When you delete your account, we will delete your personal 
                information within 30 days, except where required by law to retain certain data.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 mb-6">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable privacy laws.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our Service is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If we become aware that we have 
                collected such information, we will take steps to delete it.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the "Last updated" date. 
                We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@startupLaunch.com
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

export default PrivacyPage;