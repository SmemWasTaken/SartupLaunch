import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
          answer: 'StartupLaunch uses advanced AI to analyze your input and generate personalized startup ideas. Simply describe your interests, skills, or market opportunity, and our AI will create a comprehensive business concept including market analysis, revenue projections, and implementation timeline. You can then access our template marketplace to get all the tools needed to launch your business.'
        },
        {
          question: 'Do I need technical skills to use StartupLaunch?',
          answer: 'Not at all! StartupLaunch is designed for entrepreneurs of all backgrounds. Our platform provides step-by-step guidance, templates, and resources that make it easy to launch your startup regardless of your technical expertise. We offer video tutorials, written guides, and community support to help you every step of the way.'
        },
        {
          question: 'How accurate are the AI-generated ideas?',
          answer: 'Our AI analyzes thousands of successful startups, market trends, and business data to generate ideas. While we strive for accuracy and our ideas are based on real market patterns, we recommend conducting your own market research and validation before launching any business. Think of our AI as a starting point that gives you a solid foundation to build upon.'
        },
        {
          question: 'Can I modify the generated ideas?',
          answer: 'Absolutely! The AI-generated ideas are meant to be starting points. You can and should modify them to fit your unique vision, skills, and market opportunities. Our platform encourages customization and provides tools to help you refine and develop your ideas further.'
        }
      ]
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          question: 'Is there a free trial?',
          answer: 'Yes! We offer a free Starter plan that includes 3 AI-generated startup ideas per month, basic templates, and community access. Pro and Enterprise plans also come with a 14-day free trial with full access to all features. No credit card required to start.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Absolutely. You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you can export all your data. We also offer a 30-day money-back guarantee if you\'re not satisfied.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with StartupLaunch, contact our support team within 30 days of your purchase for a full refund. We want you to be completely happy with your experience.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through Stripe, and we never store your payment information.'
        },
        {
          question: 'Can I upgrade or downgrade my plan?',
          answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and you\'ll be charged the prorated difference. Downgrades take effect at the end of your current billing cycle. All your data and generated ideas are preserved when changing plans.'
        }
      ]
    },
    {
      category: 'Templates & Resources',
      questions: [
        {
          question: 'What templates are included?',
          answer: 'Our template marketplace includes business plans, legal documents, marketing materials, financial models, pitch decks, brand identity packages, and more. Starter users get access to basic templates, while Pro and Enterprise users get access to our premium library with 50+ professional templates created by industry experts.'
        },
        {
          question: 'Can I customize the templates?',
          answer: 'Yes! All templates are fully customizable. You can edit text, add your branding, modify layouts, and adapt them to your specific business needs. Templates are provided in popular formats like Word, Excel, PowerPoint, and Figma, making them easy to work with.'
        },
        {
          question: 'Are the legal documents valid?',
          answer: 'Our legal documents are drafted by experienced attorneys and cover common business needs. However, laws vary by jurisdiction, so we recommend having any legal documents reviewed by a qualified attorney in your area before use. We also offer a Legal Review Service add-on for additional peace of mind.'
        },
        {
          question: 'Do I own the content I create?',
          answer: 'Yes! You retain full ownership of all content you create using our platform, including generated ideas, customized templates, and business plans. Our terms of service are designed to protect your intellectual property rights.'
        },
        {
          question: 'Can I use templates for client work?',
          answer: 'Pro and Enterprise plans include commercial usage rights, allowing you to use templates for client work. Enterprise plans also offer white-label options so you can brand the templates as your own. Starter plan users have personal use rights only.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'How do I get support?',
          answer: 'We offer multiple support channels: email support for all users (48h response for Starter, 24h for Pro, 4h for Enterprise), priority email support for Pro users, and phone support for Enterprise customers. You can also access our knowledge base, video tutorials, and community forum.'
        },
        {
          question: 'What if I have a technical issue?',
          answer: 'Contact our support team through the help center, email support@startupLaunch.com, or use the chat widget in your dashboard. We typically respond within our SLA timeframes and will work with you to resolve any technical issues quickly.'
        },
        {
          question: 'Do you offer training or onboarding?',
          answer: 'Yes! We provide video tutorials, step-by-step guides, and webinars to help you get the most out of StartupLaunch. Enterprise customers also receive personalized onboarding sessions and monthly strategy calls with our team.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Absolutely. We use enterprise-grade security measures including SSL encryption, secure data centers, regular security audits, and strict access controls. Your data is backed up regularly and we comply with GDPR and other privacy regulations.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes! You can export all your generated ideas, templates, and business plans at any time. We provide exports in multiple formats (PDF, Word, Excel) and ensure you always have access to your work, even if you cancel your subscription.'
        }
      ]
    },
    {
      category: 'AI & Idea Generation',
      questions: [
        {
          question: 'How does the AI idea generation work?',
          answer: 'Our AI analyzes your input (interests, skills, budget, timeline) against a database of successful business patterns, market trends, and industry data. It then generates personalized startup ideas with detailed analysis including market size, revenue potential, difficulty level, and implementation steps.'
        },
        {
          question: 'Can I generate ideas in specific industries?',
          answer: 'Yes! You can specify your preferred industry or let our AI suggest ideas across multiple sectors. Our AI has knowledge of trends and opportunities in technology, healthcare, education, finance, e-commerce, and many other industries.'
        },
        {
          question: 'How many ideas can I generate?',
          answer: 'Starter plan users can generate 3 ideas per month. Pro and Enterprise users have unlimited idea generation. Each generation session typically produces 3-5 unique, detailed startup concepts tailored to your profile.'
        },
        {
          question: 'What if I don\'t like the generated ideas?',
          answer: 'You can regenerate ideas as many times as you want (within your plan limits). Try adjusting your input parameters, being more specific about your interests, or exploring different industries. Our AI learns from feedback and improves over time.'
        },
        {
          question: 'Can the AI help with existing business ideas?',
          answer: 'While our AI is primarily designed for generating new ideas, you can input your existing concept and ask for variations, improvements, or market analysis. Pro and Enterprise users also get access to our business plan generator which can help develop existing ideas further.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
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
            Our support team is here to help.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse all categories below.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">{categoryIndex + 1}</span>
                  </div>
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={faqIndex} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
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
            ))
          )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl hover:bg-white/20 transition-all group"
            >
              <Mail className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-blue-100">Get help via email</p>
            </Link>
            
            <a
              href="#"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl hover:bg-white/20 transition-all group"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-blue-100">Chat with our team</p>
            </a>
            
            <a
              href="tel:+1-555-123-4567"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl hover:bg-white/20 transition-all group"
            >
              <Phone className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-blue-100">Enterprise customers</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;