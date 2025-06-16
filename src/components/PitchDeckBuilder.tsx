import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Download, Move, Copy, Save } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { UpgradePrompt } from './UpgradePrompt';

interface Slide {
  id: string;
  type: 'problem' | 'solution' | 'market' | 'business' | 'team' | 'financials' | 'custom';
  title: string;
  content: string;
  order: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  slides: Omit<Slide, 'id' | 'order'>[];
}

const templates: Template[] = [
  {
    id: 'saas',
    name: 'SaaS Startup',
    description: 'Perfect for software-as-a-service companies',
    slides: [
      {
        type: 'problem',
        title: 'The Problem',
        content: 'Describe the key problem your product solves...',
      },
      {
        type: 'solution',
        title: 'Our Solution',
        content: 'Explain how your product solves the problem...',
      },
      {
        type: 'market',
        title: 'Market Opportunity',
        content: 'Detail your target market size and growth...',
      },
      {
        type: 'business',
        title: 'Business Model',
        content: 'Outline your revenue model and pricing strategy...',
      },
      {
        type: 'team',
        title: 'Team',
        content: 'Introduce your key team members and their expertise...',
      },
      {
        type: 'financials',
        title: 'Financial Projections',
        content: 'Share your key financial metrics and projections...',
      },
    ],
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Ideal for marketplace and platform businesses',
    slides: [
      {
        type: 'problem',
        title: 'Market Inefficiency',
        content: 'Describe the inefficiency in the current market...',
      },
      {
        type: 'solution',
        title: 'Platform Solution',
        content: 'Explain how your platform connects buyers and sellers...',
      },
      {
        type: 'market',
        title: 'Network Effects',
        content: 'Detail how your platform creates value through network effects...',
      },
      {
        type: 'business',
        title: 'Revenue Model',
        content: 'Outline your commission and fee structure...',
      },
      {
        type: 'team',
        title: 'Team & Execution',
        content: 'Showcase your team\'s marketplace expertise...',
      },
      {
        type: 'financials',
        title: 'Growth Metrics',
        content: 'Share your key marketplace metrics and projections...',
      },
    ],
  },
];

export const PitchDeckBuilder: React.FC = () => {
  const { hasFeature } = useSubscription();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const [deckTitle, setDeckTitle] = useState('My Pitch Deck');

  useEffect(() => {
    if (!hasFeature('pitchDeckBuilder')) {
      setShowUpgradePrompt(true);
      return;
    }
  }, [hasFeature]);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newSlides: Slide[] = template.slides.map((slide, index) => ({
        ...slide,
        id: `${templateId}-${index}`,
        order: index,
      }));
      setSlides(newSlides);
      setSelectedTemplate(templateId);
      setActiveSlide(newSlides[0]?.id || null);
    }
  };

  const handleSlideUpdate = (slideId: string, updates: Partial<Slide>) => {
    setSlides(prev =>
      prev.map(slide =>
        slide.id === slideId ? { ...slide, ...updates } : slide
      )
    );
  };

  const handleAddSlide = (type: Slide['type']) => {
    const newSlide: Slide = {
      id: `custom-${Date.now()}`,
      type,
      title: 'New Slide',
      content: 'Add your content here...',
      order: slides.length,
    };
    setSlides(prev => [...prev, newSlide]);
    setActiveSlide(newSlide.id);
  };

  const handleDeleteSlide = (slideId: string) => {
    setSlides(prev => prev.filter(slide => slide.id !== slideId));
    if (activeSlide === slideId) {
      const remainingSlides = slides.filter(slide => slide.id !== slideId);
      setActiveSlide(remainingSlides[0]?.id || null);
    }
  };

  const handleMoveSlide = (slideId: string, direction: 'up' | 'down') => {
    setSlides(prev => {
      const index = prev.findIndex(slide => slide.id === slideId);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const newSlides = [...prev];
      [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
      return newSlides.map((slide, i) => ({ ...slide, order: i }));
    });
  };

  const handleDuplicateSlide = (slideId: string) => {
    const slideToDuplicate = slides.find(slide => slide.id === slideId);
    if (slideToDuplicate) {
      const newSlide: Slide = {
        ...slideToDuplicate,
        id: `copy-${Date.now()}`,
        order: slides.length,
      };
      setSlides(prev => [...prev, newSlide]);
      setActiveSlide(newSlide.id);
    }
  };

  const generateDeck = () => {
    const deck = `# ${deckTitle}

${slides
  .sort((a, b) => a.order - b.order)
  .map(
    slide => `
## ${slide.title}

${slide.content}
`
  )
  .join('\n')}

Generated on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([deck], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deckTitle.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!hasFeature('pitchDeckBuilder')) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pitch Deck Builder</h1>
        <p className="text-gray-600">
          Create a professional pitch deck with our easy-to-use builder
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Templates</h2>
            <div className="space-y-4">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors duration-200 ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Add New Slide</h3>
              <div className="grid grid-cols-2 gap-2">
                {['problem', 'solution', 'market', 'business', 'team', 'financials', 'custom'].map(
                  type => (
                    <button
                      key={type}
                      onClick={() => handleAddSlide(type as Slide['type'])}
                      className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <input
                type="text"
                value={deckTitle}
                onChange={e => setDeckTitle(e.target.value)}
                className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0"
              />
              <button
                onClick={generateDeck}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Export Deck</span>
              </button>
            </div>

            <div className="space-y-6">
              {slides
                .sort((a, b) => a.order - b.order)
                .map(slide => (
                  <div
                    key={slide.id}
                    className={`relative p-6 rounded-lg border transition-colors duration-200 ${
                      activeSlide === slide.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSlide(slide.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={slide.title}
                        onChange={e => handleSlideUpdate(slide.id, { title: e.target.value })}
                        className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:ring-0 p-0"
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleMoveSlide(slide.id, 'up');
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          disabled={slide.order === 0}
                        >
                          <Move className="w-4 h-4 rotate-90" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleMoveSlide(slide.id, 'down');
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          disabled={slide.order === slides.length - 1}
                        >
                          <Move className="w-4 h-4 -rotate-90" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDuplicateSlide(slide.id);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteSlide(slide.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={slide.content}
                      onChange={e => handleSlideUpdate(slide.id, { content: e.target.value })}
                      className="w-full h-32 p-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Add your content here..."
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {showUpgradePrompt && (
        <UpgradePrompt
          currentPlan="starter"
          feature="Pitch Deck Builder"
          onClose={() => setShowUpgradePrompt(false)}
        />
      )}
    </div>
  );
}; 