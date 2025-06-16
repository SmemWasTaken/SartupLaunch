import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { supportService } from '../services/supportService';
import {
  CommunityPost,
  PostComment,
  PostReaction,
  SupportTicket,
  TicketMessage,
  TicketStatus,
  TicketPriority,
  KnowledgeBaseArticle,
} from '../types/support';

export function useSupport() {
  const { user } = useUser();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // In a real app, these would be API calls with pagination
        const allPosts = Object.values(await supportService.getPosts());
        const userTickets = Object.values(await supportService.getTickets())
          .filter(ticket => ticket.userId === user.id);
        const allArticles = Object.values(await supportService.getArticles())
          .filter(article => article.isPublished);

        setPosts(allPosts);
        setTickets(userTickets);
        setArticles(allArticles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load support data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Community Posts
  const createPost = async (post: Omit<CommunityPost, 'id' | 'createdAt' | 'updatedAt' | 'reactions' | 'userReactions' | 'comments' | 'viewCount'>) => {
    if (!user) throw new Error('User must be logged in');
    try {
      const newPost = await supportService.createPost({
        ...post,
        authorId: user.id,
        authorName: user.name || user.email,
      });
      setPosts(prev => [...prev, newPost]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      throw err;
    }
  };

  const updatePost = async (id: string, updates: Partial<CommunityPost>) => {
    try {
      const updatedPost = await supportService.updatePost(id, updates);
      if (updatedPost) {
        setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
      }
      return updatedPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const success = await supportService.deletePost(id);
      if (success) {
        setPosts(prev => prev.filter(post => post.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      throw err;
    }
  };

  const addComment = async (postId: string, content: string) => {
    if (!user) throw new Error('User must be logged in');
    try {
      const comment = await supportService.addComment(postId, {
        postId,
        content,
        authorId: user.id,
        authorName: user.name || user.email,
        isAnswer: false,
      });
      if (comment) {
        setPosts(prev => prev.map(post => {
          if (post.id === postId) {
            return { ...post, comments: [...post.comments, comment] };
          }
          return post;
        }));
      }
      return comment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
      throw err;
    }
  };

  const reactToPost = async (postId: string, reaction: PostReaction) => {
    if (!user) throw new Error('User must be logged in');
    try {
      const updatedPost = await supportService.reactToPost(postId, user.id, reaction);
      if (updatedPost) {
        setPosts(prev => prev.map(post => post.id === postId ? updatedPost : post));
      }
      return updatedPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to react to post');
      throw err;
    }
  };

  // Support Tickets
  const createTicket = async (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'attachments'>) => {
    if (!user) throw new Error('User must be logged in');
    try {
      const newTicket = await supportService.createTicket({
        ...ticket,
        userId: user.id,
        userName: user.name || user.email,
      });
      setTickets(prev => [...prev, newTicket]);
      return newTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
      throw err;
    }
  };

  const updateTicket = async (id: string, updates: Partial<SupportTicket>) => {
    try {
      const updatedTicket = await supportService.updateTicket(id, updates);
      if (updatedTicket) {
        setTickets(prev => prev.map(ticket => ticket.id === id ? updatedTicket : ticket));
      }
      return updatedTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket');
      throw err;
    }
  };

  const addMessage = async (ticketId: string, content: string, isInternal = false) => {
    if (!user) throw new Error('User must be logged in');
    try {
      const message = await supportService.addMessage(ticketId, {
        ticketId,
        content,
        authorId: user.id,
        authorName: user.name || user.email,
        authorRole: 'user',
        isInternal,
      });
      if (message) {
        setTickets(prev => prev.map(ticket => {
          if (ticket.id === ticketId) {
            return { ...ticket, messages: [...ticket.messages, message] };
          }
          return ticket;
        }));
      }
      return message;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add message');
      throw err;
    }
  };

  const updateTicketStatus = async (id: string, status: TicketStatus) => {
    try {
      const updatedTicket = await supportService.updateTicketStatus(id, status);
      if (updatedTicket) {
        setTickets(prev => prev.map(ticket => ticket.id === id ? updatedTicket : ticket));
      }
      return updatedTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket status');
      throw err;
    }
  };

  const updateTicketPriority = async (id: string, priority: TicketPriority) => {
    try {
      const updatedTicket = await supportService.updateTicketPriority(id, priority);
      if (updatedTicket) {
        setTickets(prev => prev.map(ticket => ticket.id === id ? updatedTicket : ticket));
      }
      return updatedTicket;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket priority');
      throw err;
    }
  };

  // Knowledge Base
  const getArticle = async (id: string) => {
    try {
      const article = await supportService.getArticle(id);
      if (article) {
        await supportService.incrementArticleViews(id);
        setArticles(prev => prev.map(a => a.id === id ? { ...a, viewCount: a.viewCount + 1 } : a));
      }
      return article;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get article');
      throw err;
    }
  };

  const markArticleHelpful = async (id: string, isHelpful: boolean) => {
    try {
      const updatedArticle = await supportService.markArticleHelpful(id, isHelpful);
      if (updatedArticle) {
        setArticles(prev => prev.map(article => article.id === id ? updatedArticle : article));
      }
      return updatedArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark article helpful');
      throw err;
    }
  };

  return {
    // State
    posts,
    tickets,
    articles,
    isLoading,
    error,

    // Community Posts
    createPost,
    updatePost,
    deletePost,
    addComment,
    reactToPost,

    // Support Tickets
    createTicket,
    updateTicket,
    addMessage,
    updateTicketStatus,
    updateTicketPriority,

    // Knowledge Base
    getArticle,
    markArticleHelpful,
  };
} 