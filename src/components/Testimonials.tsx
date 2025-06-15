import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Founder, EcoDelivery',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'StartupLaunch helped me validate and launch my sustainable delivery service in just 2 weeks. The AI-generated business plan was spot-on!',
      revenue: '$8k MRR in 3 months'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CEO, SkillShare Pro',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The template marketplace saved me thousands in consulting fees. Everything I needed to launch my online education platform was right there.',
      revenue: '$12k MRR in 6 months'
    },
    {
      name: 'Emily Watson',
      role: 'Founder, Local Eats',
      image: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'I went from idea to profitable food delivery service faster than I ever imagined. The legal docs and business templates were game-changers.',
      revenue: '$15k MRR in 4 months'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Real Founders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of entrepreneurs who've launched profitable startups using our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-gray-300 mb-4" />
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm font-medium inline-block">
                {testimonial.revenue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;