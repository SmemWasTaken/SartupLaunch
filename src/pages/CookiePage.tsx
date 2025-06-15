import React, { useState } from 'react';
import { Cookie, Settings, Shield, BarChart3, Target, Globe } from 'lucide-react';

const CookiePage: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  });

  const handleCookieToggle = (type: keyof typeof cookieSettings) => {
    if (type === 'necessary') return; // Necessary cookies cannot be disabled
    
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveCookieSettings = () => {
    // In a real implementation, this would save to localStorage and update cookie consent
    localStorage.setItem('cookieConsent', JSON.stringify(cookieSettings));
    alert('Cookie preferences saved successfully!');
  };

  const cookieTypes = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      required: true,
      enabled: cookieSettings.necessary,
      examples: [
        'Authentication and login status',
        'Shopping cart contents',
        'Security and fraud prevention',
        'Basic website functionality',
        'Session management'
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      required: false,
      enabled: cookieSettings.analytics,
      examples: [
        'Google Analytics tracking',
        'Page view statistics',
        'User behavior analysis',
        'Performance monitoring',
        'Error tracking and reporting'
      ]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and track campaign effectiveness.',
      required: false,
      enabled: cookieSettings.marketing,
      examples: [
        'Targeted advertising',
        'Social media integration',
        'Campaign tracking',
        'Retargeting pixels',
        'Conversion tracking'
      ]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Preference Cookies',
      description: 'Remember your choices and provide enhanced, personalized features.',
      required: false,
      enabled: cookieSettings.preferences,
      examples: [
        'Language preferences',
        'Theme and display settings',
        'Saved form data',
        'Customized content',
        'User interface preferences'
      ]
    }
  ];

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and user behavior tracking',
      dataCollected: 'IP address, browser info, page views, session duration',
      retention: '26 months',
      optOut: 'https://tools.google.com/dlpage/gaoptout'
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      dataCollected: 'Payment information, transaction data',
      retention: '7 years (legal requirement)',
      optOut: 'Required for payment processing'
    },
    {
      name: 'Intercom',
      purpose: 'Customer support and live chat',
      dataCollected: 'Contact information, conversation history',
      retention: '3 years',
      optOut: 'Disable in chat widget settings'
    },
    {
      name: 'Hotjar',
      purpose: 'User experience analysis and heatmaps',
      dataCollected: 'Mouse movements, clicks, scroll behavior',
      retention: '365 days',
      optOut: 'https://www.hotjar.com/legal/compliance/opt-out'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
            <Cookie className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This policy explains how we use cookies and similar technologies to provide, 
            improve, and protect our services.
          </p>
        </div>
      </section>

      {/* Cookie Settings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-blue-600" />
              Manage Your Cookie Preferences
            </h2>
            <p className="text-gray-600 mb-8">
              You can control which cookies we use below. Note that necessary cookies cannot be disabled 
              as they are essential for the website to function properly.
            </p>
            
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <div className="text-blue-600">
                          {type.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {type.title}
                          {type.required && (
                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              Required
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleCookieToggle(type.title.toLowerCase().split(' ')[0] as keyof typeof cookieSettings)}
                        disabled={type.required}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          type.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            type.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {type.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={saveCookieSettings}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Are Cookies?</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Cookies are small text files that are stored on your device when you visit a website. 
              They help websites remember information about your visit, which can make it easier to 
              visit the site again and make the site more useful to you.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">How We Use Cookies</h3>
              <p className="text-blue-800 mb-0">
                We use cookies to enhance your experience, analyze website traffic, personalize content, 
                and provide social media features. We also share information about your use of our site 
                with our analytics and advertising partners.
              </p>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Session Cookies</h4>
                <p className="text-gray-600 text-sm">
                  Temporary cookies that are deleted when you close your browser. 
                  They help us maintain your session and provide basic functionality.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Persistent Cookies</h4>
                <p className="text-gray-600 text-sm">
                  Remain on your device for a set period or until you delete them. 
                  They remember your preferences and improve your experience.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">First-Party Cookies</h4>
                <p className="text-gray-600 text-sm">
                  Set directly by our website. We have full control over these cookies 
                  and use them for essential site functionality.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Third-Party Cookies</h4>
                <p className="text-gray-600 text-sm">
                  Set by external services we use, such as analytics providers 
                  or advertising networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Third-Party Services
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We work with trusted third-party services to provide you with the best experience. 
            Here's what data they collect and how you can opt out.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Purpose:</span>
                    <span className="text-gray-600 ml-2">{service.purpose}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Data Collected:</span>
                    <span className="text-gray-600 ml-2">{service.dataCollected}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Retention:</span>
                    <span className="text-gray-600 ml-2">{service.retention}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Opt Out:</span>
                    {service.optOut.startsWith('http') ? (
                      <a 
                        href={service.optOut} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 ml-2 underline"
                      >
                        Opt-out link
                      </a>
                    ) : (
                      <span className="text-gray-600 ml-2">{service.optOut}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Cookie Rights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser Controls</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Most browsers allow you to control cookies through their settings. You can 
                  block or delete cookies, but this may affect website functionality.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Opt-Out Options</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You can opt out of analytics and advertising cookies using the preference 
                  center above or through individual service opt-out pages.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Devices</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mobile browsers and apps may use different tracking technologies. Check your 
                  device settings for privacy and advertising controls.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do Not Track</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We respect Do Not Track signals and will not track users who have enabled 
                  this setting in their browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Questions About Cookies?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have any questions about our use of cookies or this policy, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@startupLaunch.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Contact Privacy Team
            </a>
            <a
              href="/privacy"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              View Privacy Policy
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePage;