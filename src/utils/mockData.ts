import { StartupIdea, Template, IdeaGeneratorParams } from '../types';

export const generateMockIdeas = (params: IdeaGeneratorParams): Omit<StartupIdea, 'id' | 'userId' | 'createdAt' | 'isFavorite'>[] => {
  const ideas = [
    {
      title: 'AI-Powered Plant Care Assistant',
      description: 'A smart mobile app that uses computer vision to diagnose plant health issues and provides personalized care recommendations. Users can snap photos of their plants and get instant advice on watering, lighting, and treatment.',
      category: 'Mobile App',
      difficulty: 'Medium' as const,
      timeToLaunch: '4-6 months',
      revenueEstimate: '$50K-$200K/year',
      marketSize: '$2.1B',
      tags: ['AI', 'Mobile', 'Plants', 'Computer Vision', 'Subscription'],
    },
    {
      title: 'Micro-Learning Platform for Busy Professionals',
      description: 'Bite-sized learning modules delivered through Slack/Teams integration. Professionals can learn new skills in 5-minute daily sessions tailored to their role and industry.',
      category: 'Education',
      difficulty: 'Easy' as const,
      timeToLaunch: '2-3 months',
      revenueEstimate: '$100K-$500K/year',
      marketSize: '$365B',
      tags: ['Education', 'B2B', 'SaaS', 'Integration', 'Productivity'],
    },
    {
      title: 'Local Food Waste Marketplace',
      description: 'Connect restaurants and grocery stores with consumers to sell surplus food at discounted prices. Reduce food waste while providing affordable options for families.',
      category: 'E-commerce',
      difficulty: 'Hard' as const,
      timeToLaunch: '8-12 months',
      revenueEstimate: '$200K-$1M/year',
      marketSize: '$46B',
      tags: ['Marketplace', 'Sustainability', 'Local', 'Mobile', 'Social Impact'],
    },
    {
      title: 'Virtual Reality Meeting Rooms',
      description: 'Professional VR meeting spaces with customizable environments, whiteboarding tools, and screen sharing. Make remote meetings more engaging and productive.',
      category: 'SaaS',
      difficulty: 'Hard' as const,
      timeToLaunch: '10-15 months',
      revenueEstimate: '$300K-$2M/year',
      marketSize: '$31B',
      tags: ['VR', 'Remote Work', 'B2B', 'Collaboration', 'Enterprise'],
    },
    {
      title: 'Personalized Fitness Meal Prep Service',
      description: 'AI-driven meal planning and delivery service that adapts to users\' fitness goals, dietary restrictions, and taste preferences. Includes macro tracking and progress monitoring.',
      category: 'Health',
      difficulty: 'Medium' as const,
      timeToLaunch: '6-9 months',
      revenueEstimate: '$150K-$800K/year',
      marketSize: '$12.2B',
      tags: ['Health', 'AI', 'Subscription', 'Delivery', 'Fitness'],
    },
  ];

  // Filter and customize based on user input
  let filteredIdeas = ideas;
  
  if (params.industry && params.industry !== 'Any') {
    filteredIdeas = ideas.filter(idea => 
      idea.category.toLowerCase().includes(params.industry.toLowerCase()) ||
      idea.tags.some(tag => tag.toLowerCase().includes(params.industry.toLowerCase()))
    );
  }

  // If no matches, return all ideas
  if (filteredIdeas.length === 0) {
    filteredIdeas = ideas;
  }

  // Return 3-5 ideas
  return filteredIdeas.slice(0, Math.min(5, filteredIdeas.length));
};

export const getMockTemplates = (): Template[] => {
  return [
    {
      id: 'template-1',
      title: 'Complete SaaS Startup Kit',
      description: 'Everything you need to launch your SaaS startup: business plan template, financial models, legal documents, and marketing materials.',
      category: 'Business Plan',
      price: 199,
      originalPrice: 299,
      rating: 4.9,
      reviewCount: 127,
      tags: ['SaaS', 'Business Plan', 'Legal', 'Marketing'],
      features: [
        'Comprehensive business plan template',
        'Financial projection models',
        'Legal document templates',
        'Marketing strategy guide',
        'Pitch deck template',
        '1-year email support',
      ],
      thumbnailUrl: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPopular: true,
      isNew: false,
    },
    {
      id: 'template-2',
      title: 'Brand Identity Design System',
      description: 'Professional brand kit including logo variations, color palette, typography guide, and brand guidelines for consistent identity.',
      category: 'Design',
      price: 149,
      rating: 4.8,
      reviewCount: 89,
      tags: ['Branding', 'Logo', 'Design', 'Guidelines'],
      features: [
        'Logo design in multiple formats',
        'Color palette and guidelines',
        'Typography system',
        'Brand style guide',
        'Social media templates',
        'Business card designs',
      ],
      thumbnailUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPopular: false,
      isNew: true,
    },
    {
      id: 'template-3',
      title: 'Startup Legal Document Bundle',
      description: 'Essential legal templates for startups including incorporation docs, employee agreements, and terms of service.',
      category: 'Legal',
      price: 299,
      originalPrice: 450,
      rating: 4.7,
      reviewCount: 156,
      tags: ['Legal', 'Contracts', 'Incorporation', 'Compliance'],
      features: [
        'Incorporation documents',
        'Employee handbook template',
        'Terms of service template',
        'Privacy policy template',
        'Contractor agreements',
        'Legal compliance checklist',
      ],
      thumbnailUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
      isPopular: true,
      isNew: false,
    },
    {
      id: 'template-4',
      title: 'Growth Marketing Playbook',
      description: 'Complete guide to growth hacking with templates, strategies, and tools for rapid customer acquisition.',
      category: 'Marketing',
      price: 99,
      rating: 4.6,
      reviewCount: 203,
      tags: ['Marketing', 'Growth', 'Strategy', 'Templates'],
      features: [
        'Growth strategy templates',
        'Customer acquisition playbook',
        'Social media content calendar',
        'Email marketing templates',
        'Analytics tracking guide',
        'A/B testing frameworks',
      ],
      thumbnailUrl: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpg?auto=compress&cs=tinysrgb&w=400',
      isPopular: false,
      isNew: false,
    },
    {
      id: 'template-5',
      title: 'Notion Workspace for Startups',
      description: 'Pre-built Notion workspace with databases, templates, and workflows optimized for startup operations.',
      category: 'Productivity',
      price: 79,
      rating: 4.9,
      reviewCount: 312,
      tags: ['Notion', 'Productivity', 'Organization', 'Templates'],
      features: [
        'Complete Notion workspace',
        'Project management system',
        'Team collaboration tools',
        'Knowledge base templates',
        'Meeting notes system',
        'Goal tracking dashboard',
      ],
      thumbnailUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpg?auto=compress&cs=tinysrgb&w=400',
      isPopular: true,
      isNew: true,
    },
    {
      id: 'template-6',
      title: 'Financial Model & Projections',
      description: 'Comprehensive Excel/Google Sheets financial model with 5-year projections, scenarios, and investor-ready outputs.',
      category: 'Finance',
      price: 179,
      originalPrice: 249,
      rating: 4.8,
      reviewCount: 94,
      tags: ['Finance', 'Excel', 'Projections', 'Investors'],
      features: [
        '5-year financial projections',
        'Revenue model templates',
        'Cash flow analysis',
        'Scenario planning tools',
        'Investor pitch metrics',
        'Budget tracking system',
      ],
      thumbnailUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=400',
      isPopular: false,
      isNew: false,
    },
  ];
};

export const getMockTestimonials = () => [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Founder, TechFlow',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'StartupLaunch helped me generate the perfect idea for my SaaS business. The AI suggestions were incredibly relevant to my background in data science.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'CEO, GreenPath',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The template marketplace saved me months of work. The legal documents alone were worth the investment. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Entrepreneur',
    avatar: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'I went from idea to MVP in just 3 months using StartupLaunch. The business plan template and marketing materials were professional and comprehensive.',
    rating: 5,
  },
];

export const getMockStats = () => ({
  ideasGenerated: '50,000+',
  startupslaunched: '2,400+',
  templatesold: '15,000+',
  successRate: '78%',
});