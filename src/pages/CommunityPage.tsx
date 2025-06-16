import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useSupport } from '../hooks/useSupport';
import { usePlanFeatures } from '../hooks/usePlanFeatures';
import { PostCategory, PostReaction } from '../types/support';
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  ThumbsUp,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Star,
  Filter,
  Search,
  AlertCircle,
} from 'lucide-react';

export default function CommunityPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { features } = usePlanFeatures();
  const {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    addComment,
    reactToPost,
  } = useSupport();

  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>('general');
  const [newPostTags, setNewPostTags] = useState('');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createPost({
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        tags: newPostTags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: 'published',
        isPinned: false,
      });

      setShowNewPostForm(false);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('general');
      setNewPostTags('');
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) return;

    try {
      await addComment(postId, newComment);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleReact = async (postId: string, reaction: PostReaction) => {
    try {
      await reactToPost(postId, reaction);
    } catch (err) {
      console.error('Failed to react to post:', err);
    }
  };

  const getCategoryIcon = (category: PostCategory) => {
    switch (category) {
      case 'ideas':
        return <Lightbulb className="h-4 w-4" />;
      case 'feedback':
        return <MessageCircle className="h-4 w-4" />;
      case 'announcements':
        return <Star className="h-4 w-4" />;
      case 'help':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          </div>
          {features.communityAccess && (
            <button
              onClick={() => setShowNewPostForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Post
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as PostCategory | 'all')}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="ideas">Ideas</option>
                <option value="feedback">Feedback</option>
                <option value="announcements">Announcements</option>
                <option value="help">Help</option>
              </select>
            </div>
          </div>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <form onSubmit={handleCreatePost}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as PostCategory)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="general">General</option>
                    <option value="ideas">Ideas</option>
                    <option value="feedback">Feedback</option>
                    <option value="announcements">Announcements</option>
                    <option value="help">Help</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                    placeholder="e.g., startup, marketing, tech"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getCategoryIcon(post.category)}
                      <span className="ml-1">{post.category}</span>
                    </span>
                    {post.isPinned && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Pinned
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleReact(post.id, 'like')}
                      className={`inline-flex items-center space-x-1 text-sm ${
                        post.userReactions[user?.id || '']?.includes('like')
                          ? 'text-blue-600'
                          : 'text-gray-500 hover:text-blue-600'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.reactions.like}</span>
                    </button>
                    <button
                      onClick={() => handleReact(post.id, 'helpful')}
                      className={`inline-flex items-center space-x-1 text-sm ${
                        post.userReactions[user?.id || '']?.includes('helpful')
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-green-600'
                      }`}
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>{post.reactions.helpful}</span>
                    </button>
                    <button
                      onClick={() => handleReact(post.id, 'insightful')}
                      className={`inline-flex items-center space-x-1 text-sm ${
                        post.userReactions[user?.id || '']?.includes('insightful')
                          ? 'text-purple-600'
                          : 'text-gray-500 hover:text-purple-600'
                      }`}
                    >
                      <Lightbulb className="h-4 w-4" />
                      <span>{post.reactions.insightful}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments.length} comments</span>
                  </button>
                </div>

                {/* Comments Section */}
                {selectedPost === post.id && (
                  <div className="mt-4 space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">
                              {comment.authorName}
                            </span>
                            {comment.isAnswer && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Answer
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            onClick={() => handleReact(post.id, 'like')}
                            className={`inline-flex items-center space-x-1 text-sm ${
                              comment.userReactions[user?.id || '']?.includes('like')
                                ? 'text-blue-600'
                                : 'text-gray-500 hover:text-blue-600'
                            }`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.reactions.like}</span>
                          </button>
                          <button
                            onClick={() => handleReact(post.id, 'helpful')}
                            className={`inline-flex items-center space-x-1 text-sm ${
                              comment.userReactions[user?.id || '']?.includes('helpful')
                                ? 'text-green-600'
                                : 'text-gray-500 hover:text-green-600'
                            }`}
                          >
                            <HelpCircle className="h-4 w-4" />
                            <span>{comment.reactions.helpful}</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* New Comment Form */}
                    <div className="mt-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows={2}
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!newComment.trim()}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Be the first to start a discussion!'}
              </p>
              {features.communityAccess && !searchQuery && selectedCategory === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowNewPostForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 