export type PostCategory = 'general' | 'ideas' | 'feedback' | 'announcements' | 'help';

export type PostStatus = 'published' | 'draft' | 'archived';

export type PostReaction = 'like' | 'helpful' | 'insightful';

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: PostCategory;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  reactions: Record<PostReaction, number>;
  userReactions: Record<string, PostReaction[]>;
  comments: PostComment[];
  tags: string[];
  isPinned: boolean;
  viewCount: number;
}

export interface PostComment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  reactions: Record<PostReaction, number>;
  userReactions: Record<string, PostReaction[]>;
  isAnswer: boolean;
  parentId?: string;
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketCategory = 'technical' | 'billing' | 'feature_request' | 'bug' | 'other';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: SupportStatus;
  priority: SupportPriority;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  category: string;
  attachments?: string[];
  comments?: SupportComment[];
}

export interface SupportComment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isInternal?: boolean;
}

export interface CreateSupportTicketInput {
  title: string;
  description: string;
  priority: SupportPriority;
  category: string;
  attachments?: string[];
}

export interface UpdateSupportTicketInput {
  title?: string;
  description?: string;
  status?: SupportStatus;
  priority?: SupportPriority;
  assignedTo?: string;
  category?: string;
}

export interface SupportTicketFilters {
  status?: SupportStatus;
  priority?: SupportPriority;
  category?: string;
  assignedTo?: string;
  userId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: 'user' | 'support_agent' | 'admin';
  createdAt: string;
  updatedAt: string;
  isInternal: boolean;
  attachments: TicketAttachment[];
}

export interface TicketAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface SupportAgent {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'support_agent' | 'admin';
  specialties: TicketCategory[];
  activeTickets: number;
  resolvedTickets: number;
  averageResponseTime: number;
  isAvailable: boolean;
  lastActive: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: TicketCategory;
  tags: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  isPublished: boolean;
  relatedArticles: string[];
}

export type SupportStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type SupportPriority = 'low' | 'medium' | 'high' | 'urgent'; 