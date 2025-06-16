import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useSupport } from '../hooks/useSupport';
import { usePlanFeatures } from '../hooks/usePlanFeatures';
import { 
  TicketCategory, 
  TicketPriority, 
  TicketStatus, 
  SupportTicket,
  CreateSupportTicketInput,
  SupportComment,
  TicketAttachment
} from '../types/support';
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Paperclip,
  Send,
  HelpCircle,
  CreditCard,
  Bug,
  Lightbulb,
  Settings,
} from 'lucide-react';

const CATEGORY_OPTIONS: TicketCategory[] = ['technical', 'billing', 'feature_request', 'bug', 'other'];
const DEFAULT_CATEGORY: TicketCategory = 'technical';

export default function SupportPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { hasFeature } = usePlanFeatures();
  const {
    tickets,
    articles,
    isLoading,
    error,
    createTicket,
    updateTicketStatus,
    updateTicketPriority,
    addMessage,
    getArticle,
    markArticleHelpful,
  } = useSupport();

  const [selectedCategory, setSelectedCategory] = useState<TicketCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketContent, setNewTicketContent] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState<TicketCategory>(DEFAULT_CATEGORY);
  const [newTicketPriority, setNewTicketPriority] = useState<TicketPriority>('medium');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Filter tickets based on category, status, and search query
  const filteredTickets = tickets.filter(ticket => {
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createTicket({
        title: newTicketTitle,
        description: newTicketContent,
        category: newTicketCategory,
        priority: newTicketPriority,
        status: 'open',
        userId: user.id,
      });

      setShowNewTicketForm(false);
      setNewTicketTitle('');
      setNewTicketContent('');
      setNewTicketCategory(DEFAULT_CATEGORY);
      setNewTicketPriority('medium');
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  const handleAddMessage = async (ticketId: string) => {
    if (!newMessage.trim() || !user) return;

    try {
      await addMessage(ticketId, newMessage, false);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to add message:', err);
    }
  };

  const handleUpdateStatus = async (ticketId: string, status: TicketStatus) => {
    try {
      await updateTicketStatus(ticketId, status);
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
  };

  const handleUpdatePriority = async (ticketId: string, priority: TicketPriority) => {
    try {
      await updateTicketPriority(ticketId, priority);
    } catch (err) {
      console.error('Failed to update ticket priority:', err);
    }
  };

  const getCategoryIcon = (category: TicketCategory) => {
    switch (category) {
      case 'technical':
        return <Settings className="h-4 w-4" />;
      case 'billing':
        return <CreditCard className="h-4 w-4" />;
      case 'feature_request':
        return <Lightbulb className="h-4 w-4" />;
      case 'bug':
        return <Bug className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const renderTicketMessages = (ticket: SupportTicket) => {
    return ticket.comments?.map((comment: SupportComment) => (
      <div key={comment.id} className="flex space-x-3 mb-4">
        <div className="flex-1 bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              {comment.userId === user?.id ? 'You' : 'Support Agent'}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      </div>
    ));
  };

  const renderTicketAttachments = (attachments: string[] = []) => {
    return attachments.map((url: string) => (
      <div key={url} className="flex items-center space-x-2 text-sm text-gray-600">
        <Paperclip className="h-4 w-4" />
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
          {url.split('/').pop()}
        </a>
      </div>
    ));
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
            <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          </div>
          <button
            onClick={() => setShowNewTicketForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Ticket
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
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
                onChange={(e) => setSelectedCategory(e.target.value as TicketCategory | 'all')}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="feature_request">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as TicketStatus | 'all')}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* New Ticket Form */}
        {showNewTicketForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <form onSubmit={handleCreateTicket}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newTicketCategory}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        // @ts-expect-error: value is always a TicketCategory from CATEGORY_OPTIONS
                        setNewTicketCategory(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {CATEGORY_OPTIONS.map((category) => (
                        <option key={category} value={category}>
                          {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={newTicketPriority}
                      onChange={(e) => setNewTicketPriority(e.target.value as TicketPriority)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newTicketContent}
                    onChange={(e) => setNewTicketContent(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Ticket
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Knowledge Base */}
        {!showNewTicketForm && !selectedTicket && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Knowledge Base</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.slice(0, 6).map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.viewCount} views</span>
                    <span>{article.helpfulCount} found helpful</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Article */}
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              ← Back to articles
            </button>
            {articles.find(a => a.id === selectedArticle) && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {articles.find(a => a.id === selectedArticle)?.title}
                </h2>
                <div className="prose max-w-none mb-6">
                  {articles.find(a => a.id === selectedArticle)?.content}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => markArticleHelpful(selectedArticle, true)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Helpful
                  </button>
                  <button
                    onClick={() => markArticleHelpful(selectedArticle, false)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Not Helpful
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Tickets List */}
        <div className="space-y-6">
          {filteredTickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getCategoryIcon(ticket.category)}
                      <span className="ml-1">{ticket.category}</span>
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1">{ticket.status}</span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">{ticket.title}</h2>
                <p className="text-gray-600 mb-4">{ticket.description}</p>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                      className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{ticket.comments?.length} messages</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleUpdateStatus(ticket.id, e.target.value as TicketStatus)}
                      className="block w-full pl-3 pr-10 py-1.5 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <select
                      value={ticket.priority}
                      onChange={(e) => handleUpdatePriority(ticket.id, e.target.value as TicketPriority)}
                      className="block w-full pl-3 pr-10 py-1.5 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Messages Section */}
                {selectedTicket === ticket.id && (
                  <div className="mt-4 space-y-4">
                    {renderTicketMessages(ticket)}
                    {renderTicketAttachments(ticket.attachments)}

                    {/* New Message Form */}
                    <div className="mt-4">
                      <div className="flex items-center space-x-2">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Write a message..."
                          className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          rows={2}
                        />
                        <button
                          onClick={() => handleAddMessage(ticket.id)}
                          disabled={!newMessage.trim()}
                          className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create a new support ticket to get help'}
              </p>
              {!searchQuery && selectedCategory === 'all' && selectedStatus === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowNewTicketForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Ticket
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