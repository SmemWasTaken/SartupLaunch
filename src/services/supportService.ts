import { v4 as uuidv4 } from 'uuid';
import {
  CommunityPost,
  PostComment,
  PostReaction,
  SupportTicket,
  TicketMessage,
  TicketAttachment,
  SupportAgent,
  KnowledgeBaseArticle,
  TicketStatus,
  TicketPriority,
  CreateSupportTicketInput,
  UpdateSupportTicketInput,
  SupportTicketFilters,
  SupportComment
} from '../types/support';
import { supabase } from '../lib/supabaseClient';

const POSTS_STORAGE_KEY = 'community_posts';
const TICKETS_STORAGE_KEY = 'support_tickets';
const AGENTS_STORAGE_KEY = 'support_agents';
const ARTICLES_STORAGE_KEY = 'knowledge_base_articles';

export class SupportService {
  private static instance: SupportService;
  private readonly tableName = 'support_tickets';

  private constructor() {}

  public static getInstance(): SupportService {
    if (!SupportService.instance) {
      SupportService.instance = new SupportService();
    }
    return SupportService.instance;
  }

  // Community Posts
  getPosts(): Record<string, CommunityPost> {
    const posts = localStorage.getItem(POSTS_STORAGE_KEY);
    return posts ? JSON.parse(posts) : {};
  }

  private savePosts(posts: Record<string, CommunityPost>): void {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }

  async createPost(post: Omit<CommunityPost, 'id' | 'createdAt' | 'updatedAt' | 'reactions' | 'userReactions' | 'comments' | 'viewCount'>): Promise<CommunityPost> {
    const posts = this.getPosts();
    const newPost: CommunityPost = {
      ...post,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reactions: { like: 0, helpful: 0, insightful: 0 },
      userReactions: {},
      comments: [],
      viewCount: 0,
    };
    posts[newPost.id] = newPost;
    this.savePosts(posts);
    return newPost;
  }

  async getPost(id: string): Promise<CommunityPost | null> {
    const posts = this.getPosts();
    return posts[id] || null;
  }

  async updatePost(id: string, updates: Partial<CommunityPost>): Promise<CommunityPost | null> {
    const posts = this.getPosts();
    if (!posts[id]) return null;

    const updatedPost = {
      ...posts[id],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    posts[id] = updatedPost;
    this.savePosts(posts);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const posts = this.getPosts();
    if (!posts[id]) return false;

    delete posts[id];
    this.savePosts(posts);
    return true;
  }

  async addComment(postId: string, comment: Omit<PostComment, 'id' | 'createdAt' | 'updatedAt' | 'reactions' | 'userReactions'>): Promise<PostComment | null> {
    const posts = this.getPosts();
    if (!posts[postId]) return null;

    const newComment: PostComment = {
      ...comment,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reactions: { like: 0, helpful: 0, insightful: 0 },
      userReactions: {},
    };

    posts[postId].comments.push(newComment);
    posts[postId].updatedAt = new Date().toISOString();
    this.savePosts(posts);
    return newComment;
  }

  async reactToPost(postId: string, userId: string, reaction: PostReaction): Promise<CommunityPost | null> {
    const posts = this.getPosts();
    if (!posts[postId]) return null;

    const post = posts[postId];
    const userReactions = post.userReactions[userId] || [];

    if (userReactions.includes(reaction)) {
      // Remove reaction
      post.userReactions[userId] = userReactions.filter(r => r !== reaction);
      post.reactions[reaction]--;
    } else {
      // Add reaction
      post.userReactions[userId] = [...userReactions, reaction];
      post.reactions[reaction]++;
    }

    posts[postId] = post;
    this.savePosts(posts);
    return post;
  }

  // Support Tickets
  getTickets(): Record<string, SupportTicket> {
    const tickets = localStorage.getItem(TICKETS_STORAGE_KEY);
    return tickets ? JSON.parse(tickets) : {};
  }

  private saveTickets(tickets: Record<string, SupportTicket>): void {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  }

  async createTicket(input: CreateSupportTicketInput, userId: string): Promise<SupportTicket> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert({
        ...input,
        userId,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create support ticket: ${error.message}`);
    return data;
  }

  async getTicket(id: string): Promise<SupportTicket> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, comments(*)')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch support ticket: ${error.message}`);
    return data;
  }

  async updateTicket(id: string, input: UpdateSupportTicketInput): Promise<SupportTicket> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        ...input,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update support ticket: ${error.message}`);
    return data;
  }

  async listTickets(filters: SupportTicketFilters = {}): Promise<SupportTicket[]> {
    let query = supabase
      .from(this.tableName)
      .select('*, comments(*)');

    // Apply filters
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.priority) query = query.eq('priority', filters.priority);
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.assignedTo) query = query.eq('assignedTo', filters.assignedTo);
    if (filters.userId) query = query.eq('userId', filters.userId);
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters.startDate) query = query.gte('createdAt', filters.startDate);
    if (filters.endDate) query = query.lte('createdAt', filters.endDate);

    const { data, error } = await query.order('createdAt', { ascending: false });

    if (error) throw new Error(`Failed to list support tickets: ${error.message}`);
    return data || [];
  }

  async addComment(ticketId: string, userId: string, content: string, isInternal: boolean = false): Promise<SupportComment> {
    const { data, error } = await supabase
      .from('support_comments')
      .insert({
        ticketId,
        userId,
        content,
        isInternal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to add comment: ${error.message}`);
    return data;
  }

  async getComments(ticketId: string): Promise<SupportComment[]> {
    const { data, error } = await supabase
      .from('support_comments')
      .select('*')
      .eq('ticketId', ticketId)
      .order('createdAt', { ascending: true });

    if (error) throw new Error(`Failed to fetch comments: ${error.message}`);
    return data || [];
  }

  async updateTicketStatus(id: string, status: TicketStatus): Promise<SupportTicket | null> {
    return this.updateTicket(id, { status });
  }

  async updateTicketPriority(id: string, priority: TicketPriority): Promise<SupportTicket | null> {
    return this.updateTicket(id, { priority });
  }

  async assignTicket(id: string, agentId: string, agentName: string): Promise<SupportTicket | null> {
    return this.updateTicket(id, { assignedTo: agentId, assignedToName: agentName });
  }

  // Support Agents
  private getAgents(): Record<string, SupportAgent> {
    const agents = localStorage.getItem(AGENTS_STORAGE_KEY);
    return agents ? JSON.parse(agents) : {};
  }

  private saveAgents(agents: Record<string, SupportAgent>): void {
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents));
  }

  async getAgent(id: string): Promise<SupportAgent | null> {
    const agents = this.getAgents();
    return agents[id] || null;
  }

  async updateAgentStatus(id: string, isAvailable: boolean): Promise<SupportAgent | null> {
    const agents = this.getAgents();
    if (!agents[id]) return null;

    const updatedAgent = {
      ...agents[id],
      isAvailable,
      lastActive: new Date().toISOString(),
    };
    agents[id] = updatedAgent;
    this.saveAgents(agents);
    return updatedAgent;
  }

  // Knowledge Base
  getArticles(): Record<string, KnowledgeBaseArticle> {
    const articles = localStorage.getItem(ARTICLES_STORAGE_KEY);
    return articles ? JSON.parse(articles) : {};
  }

  private saveArticles(articles: Record<string, KnowledgeBaseArticle>): void {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
  }

  async createArticle(article: Omit<KnowledgeBaseArticle, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'helpfulCount' | 'notHelpfulCount'>): Promise<KnowledgeBaseArticle> {
    const articles = this.getArticles();
    const newArticle: KnowledgeBaseArticle = {
      ...article,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      helpfulCount: 0,
      notHelpfulCount: 0,
    };
    articles[newArticle.id] = newArticle;
    this.saveArticles(articles);
    return newArticle;
  }

  async getArticle(id: string): Promise<KnowledgeBaseArticle | null> {
    const articles = this.getArticles();
    return articles[id] || null;
  }

  async updateArticle(id: string, updates: Partial<KnowledgeBaseArticle>): Promise<KnowledgeBaseArticle | null> {
    const articles = this.getArticles();
    if (!articles[id]) return null;

    const updatedArticle = {
      ...articles[id],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    articles[id] = updatedArticle;
    this.saveArticles(articles);
    return updatedArticle;
  }

  async incrementArticleViews(id: string): Promise<KnowledgeBaseArticle | null> {
    const articles = this.getArticles();
    if (!articles[id]) return null;

    articles[id].viewCount++;
    this.saveArticles(articles);
    return articles[id];
  }

  async markArticleHelpful(id: string, isHelpful: boolean): Promise<KnowledgeBaseArticle | null> {
    const articles = this.getArticles();
    if (!articles[id]) return null;

    if (isHelpful) {
      articles[id].helpfulCount++;
    } else {
      articles[id].notHelpfulCount++;
    }
    this.saveArticles(articles);
    return articles[id];
  }
}

export const supportService = SupportService.getInstance(); 