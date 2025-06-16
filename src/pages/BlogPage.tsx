import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Tag,
  TrendingUp,
  Lightbulb,
  Users,
  Target
} from 'lucide-react';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Entrepreneurship', 'AI & Technology', 'Business Strategy', 'Success Stories', 'Product Updates'];

  const blogPosts = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Startup Idea Generation',
      excerpt: 'Discover how artificial intelligence is changing the way entrepreneurs find and validate business opportunities, making the process faster and more data-driven than ever before.',
      content: 'The landscape of entrepreneurship is rapidly evolving, and artificial intelligence is at the forefront of this transformation...',
      author: 'Sarah Chen',
      authorImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'AI & Technology',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 2,
      title: 'From Idea to $100K ARR: A Complete Startup Journey',
      excerpt: 'Follow the inspiring story of how one entrepreneur used StartupLaunch to generate an idea, validate it, and scale to six-figure annual recurring revenue in just 18 months.',
      content: 'When Marcus first logged into StartupLaunch, he had no clear business idea. Fast forward 18 months, and his SaaS platform...',
      author: 'Emily Watson',
      authorImage: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-12',
      readTime: '8 min read',
      category: 'Success Stories',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 3,
      title: 'The Ultimate Guide to Validating Your Startup Idea',
      excerpt: 'Learn the proven framework for testing your business concept before you invest time and money. Includes templates, checklists, and real-world examples.',
      content: 'Validation is the most critical step in the startup journey, yet many entrepreneurs skip it entirely...',
      author: 'David Kim',
      authorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'Business Strategy',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 4,
      title: 'Building a Micro-SaaS: Why Small is the New Big',
      excerpt: 'Explore why micro-SaaS businesses are becoming the preferred choice for solo entrepreneurs and small teams looking to build sustainable, profitable companies.',
      content: 'The era of massive, venture-backed startups dominating the headlines is giving way to a new trend...',
      author: 'Marcus Rodriguez',
      authorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'Entrepreneurship',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 5,
      title: 'New Feature: AI-Powered Market Analysis',
      excerpt: 'We\'re excited to announce our latest feature that provides instant market analysis for your startup ideas, including competitor research and market size estimation.',
      content: 'Today, we\'re thrilled to introduce our most requested feature: AI-Powered Market Analysis...',
      author: 'Sarah Chen',
      authorImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'Product Updates',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 6,
      title: 'The Psychology of Successful Entrepreneurs',
      excerpt: 'What separates successful entrepreneurs from the rest? Dive into the mindset, habits, and psychological traits that drive entrepreneurial success.',
      content: 'Success in entrepreneurship isn\'t just about having a great idea or perfect timing...',
      author: 'Emily Watson',
      authorImage: 'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-03',
      readTime: '7 min read',
      category: 'Entrepreneurship',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & Technology': return <TrendingUp className="w-4 h-4" />;
      case 'Entrepreneurship': return <Lightbulb className="w-4 h-4" />;
      case 'Success Stories': return <Target className="w-4 h-4" />;
      case 'Business Strategy': return <Users className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>Insights & Stories</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            StartupLaunch Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover insights, success stories, and practical advice to help you build 
            and grow your startup. Learn from entrepreneurs who've been there.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    {getCategoryIcon(featuredPost.category)}
                    <span className="text-blue-600 font-medium text-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{featuredPost.author}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(featuredPost.date)}</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      {getCategoryIcon(post.category)}
                      <span className="text-blue-600 font-medium text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{post.author}</div>
                          <div className="text-xs text-gray-500 flex items-center space-x-1">
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 group"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest insights, success stories, and startup tips delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;