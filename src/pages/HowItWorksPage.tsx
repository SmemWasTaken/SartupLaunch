import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lightbulb, Zap, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Describe Your Vision",
      description: "Tell our AI about your interests, skills, or market opportunity. The more specific you are, the better your startup idea will be.",
      details: [
        "Share your passions and expertise",
        "Describe market gaps you've noticed",
        "Mention your available resources",
        "Set your timeline and goals"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Generates Ideas",
      description: "Our advanced AI analyzes thousands of successful startups and market trends to create a personalized business concept for you.",
      details: [
        "Market analysis and validation",
        "Revenue potential assessment",
        "Competition landscape review",
        "Implementation difficulty rating"
      ]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Get Launch-Ready Assets",
      description: "Choose from our marketplace of professional templates, legal documents, and business tools to fast-track your launch.",
      details: [
        "Business plan templates",
        "Legal document bundles",
        "Marketing automation setups",
        "Brand identity packages"
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Launch & Scale",
      description: "With everything in place, launch your startup and use our ongoing resources to grow and scale your business.",
      details: [
        "Step-by-step launch guide",
        "Growth hacking strategies",
        "Community support access",
        "Performance tracking tools"
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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How StartupLaunch Works
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              From idea to launch in 4 simple steps. Our AI-powered platform guides you through 
              every stage of building your micro-startup.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col lg:flex-row items-center gap-12">
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-600 mb-1">
                            Step {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center">
                      <div className="text-6xl opacity-20">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your Startup?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who've successfully launched their micro-startups 
              using our platform.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorksPage;