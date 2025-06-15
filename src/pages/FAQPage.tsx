import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How does StartupLaunch work?',
          answer: 'StartupLaunch uses advanced AI to analyze your input and generate personalized startup ideas. Simply describe your interests, skills, or market opportunity, and our AI will create a comprehensive business concept including market analysis, revenue projections, and implementation timeline.'
        },
        {
          question: 'Do I need technical skills to use StartupLaunch?',
          answer: 'Not at all! StartupLaunch is designed for entrepreneurs of all backgrounds. Our platform provides step-by-step guidance, templates, and resources that make it easy to launch your startup regardless of your technical expertise.'
        },
        {
          question: 'How accurate are the AI-generated ideas?',
          answer: 'Our AI analyzes thousands of successful startups, market trends, and business data to generate ideas. While we strive for accuracy, we recommend conducting your own market research and validation before launching any business.'
        }
      ]
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          question: 'Is there a free trial?',
          answer: 'Yes! We offer a free Starter plan that includes 3 AI-generated startup ideas per month, basic templates, and community access. You can upgrade to Pro or Enterprise plans anytime for additional features.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Absolutely. You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you can export all your data.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with StartupLaunch, contact our support team within 30 days of your purchase for a full refund.'
        }
      ]
    },
    {
      category: 'Templates & Resources',
      questions: [
        {
          question: 'What templates are included?',
          answer: 'Our template marketplace includes business plans, legal documents, marketing materials, financial models, pitch decks, and more. Pro and Enterprise users get access to our premium template library with 50+ professional templates.'
        },
        {
          question: 'Can I customize the templates?',
          answer: 'Yes! All templates are fully customizable. You can edit text, add your branding, modify layouts, and adapt them to your specific business needs. Templates are provided in popular formats like Word, Excel, and PowerPoint.'
        },
        {
          question: 'Are the legal documents valid?',
          answer: 'Our legal documents are drafted by experienced attorneys and cover common business needs. However, we recommend having any legal documents reviewed by a qualified attorney in your jurisdiction before use.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'How do I get support?',
          answer: 'We offer multiple support channels: email support for all users, priority email support for Pro users, and phone support for Enterprise customers. You can also access our knowledge base and community forum.'
        },
        {
          question: 'What if I have a technical issue?',
          answer: 'Contact our support team through the help center or email support@startupLaunch.com. We typically respond within 24 hours for standard issues and within 4 hours for Pro/Enterprise customers.'
        },
        {
          question: 'Do you offer training or onboarding?',
          answer: 'Yes! We provide video tutorials, step-by-step guides, and webinars to help you get the most out of StartupLaunch. Enterprise customers also receive personalized onboarding sessions.'
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find answers to common questions about StartupLaunch. Can't find what you're looking for? 
              Contact our support team.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={faqIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our support team is here to help. Get in touch and we'll respond as quickly as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
                Contact Support
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Join Community
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;