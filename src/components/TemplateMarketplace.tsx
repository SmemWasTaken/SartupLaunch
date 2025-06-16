import React, { useState, useEffect } from 'react';
import { Search, Star, ShoppingCart, Eye, Download, Heart, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Template } from '../types';
import { useTemplates } from '../hooks/useTemplates';
import { LoadingCard } from './LoadingSpinner';
import { trackTemplateViewed, trackTemplateAddedToCart } from '../utils/analytics';
import Modal from './Modal';

const categories = ['All', 'Business Plan', 'Design', 'Legal', 'Marketing', 'Productivity', 'Finance'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export const TemplateMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const { templates, addToCart, cart, isLoading } = useTemplates();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedTemplate, setAddedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    let filtered = templates;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered = filtered.filter(t => t.isNew).concat(filtered.filter(t => !t.isNew));
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered = filtered.filter(t => t.isPopular).concat(filtered.filter(t => !t.isPopular));
        break;
    }

    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedCategory, sortBy]);

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    trackTemplateViewed(template.id, template.category);
  };

  const handleAddToCart = (template: Template) => {
    addToCart(template);
    setAddedTemplate(template);
    setShowCartModal(true);
    trackTemplateAddedToCart(template.id, template.price);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleGoToCart = () => {
    setShowCartModal(false);
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    setShowCartModal(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="h-20 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Professional Templates
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Accelerate your startup journey with our collection of professional templates, legal documents, and business resources.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredTemplates.length} templates found
        </p>
        
        {cart.length > 0 && (
          <Link 
            to="/cart" 
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.length})</span>
          </Link>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="relative">
              <img
                src={template.thumbnailUrl}
                alt={template.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {template.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    New
                  </span>
                )}
                {template.isPopular && (
                  <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                    {template.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {template.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({template.reviewCount})
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                  {template.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
                {template.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    +{template.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(template.price)}
                  </span>
                  {template.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(template.originalPrice)}
                    </span>
                  )}
                </div>

                {template.isPurchased ? (
                  <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Owned</span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(template);
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSortBy('popular');
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTemplate.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                      {selectedTemplate.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {selectedTemplate.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({selectedTemplate.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <img
                src={selectedTemplate.thumbnailUrl}
                alt={selectedTemplate.title}
                className="w-full h-64 object-cover rounded-xl"
              />

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {selectedTemplate.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  <ul className="space-y-1">
                    {selectedTemplate.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(selectedTemplate.price)}
                  </span>
                  {selectedTemplate.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(selectedTemplate.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  {selectedTemplate.isPurchased ? (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => {
                          handleAddToCart(selectedTemplate);
                          setSelectedTemplate(null);
                        }}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Added to Cart Modal */}
      <Modal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)}
        title="Added to Cart"
      >
        <div className="space-y-6">
          {addedTemplate && (
            <div className="flex items-center space-x-4">
              <img 
                src={addedTemplate.thumbnailUrl} 
                alt={addedTemplate.title} 
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{addedTemplate.title}</h3>
                <p className="text-gray-600 text-sm">{formatPrice(addedTemplate.price)}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={handleContinueShopping}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Continue Shopping
            </button>
            
            <button
              onClick={handleGoToCart}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Go to Cart</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};