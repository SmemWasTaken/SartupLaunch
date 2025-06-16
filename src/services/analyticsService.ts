import { GeneratedIdea } from '../types/idea';

export interface AnalyticsData {
  totalIdeasGenerated: number;
  favoriteIdeas: number;
  ideasByDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  ideasByMarketSize: {
    small: number; // < $1B
    medium: number; // $1B - $10B
    large: number; // > $10B
  };
  averageTimeToLaunch: string;
  mostCommonInterests: string[];
  generationHistory: {
    date: Date;
    count: number;
  }[];
}

export type SupportAnalyticsEvent =
  | 'support_ticket_created'
  | 'support_ticket_updated'
  | 'support_ticket_resolved'
  | 'support_ticket_closed'
  | 'support_message_sent'
  | 'support_article_viewed'
  | 'support_article_helpful'
  | 'support_article_not_helpful'
  | 'community_post_created'
  | 'community_post_viewed'
  | 'community_comment_added'
  | 'community_reaction_added'
  | 'support_search_performed'
  | 'support_category_selected'
  | 'support_priority_changed'
  | 'support_status_changed';

interface SupportAnalyticsData {
  ticketId?: string;
  ticketCategory?: string;
  ticketPriority?: string;
  ticketStatus?: string;
  articleId?: string;
  articleCategory?: string;
  postId?: string;
  postCategory?: string;
  commentId?: string;
  reactionType?: string;
  searchQuery?: string;
  selectedCategory?: string;
  timeToResolution?: number;
  messageCount?: number;
  viewCount?: number;
  helpfulCount?: number;
  notHelpfulCount?: number;
  isInternal?: boolean;
}

interface AnalyticsEvent {
  event: string;
  data: Record<string, any>;
  timestamp: string;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private analyticsData: Map<string, AnalyticsData>;
  private isInitialized: boolean = false;
  private currentUser: { id: string; plan: string } | null = null;
  private readonly EVENTS_STORAGE_KEY = 'analytics_events';

  private constructor() {
    this.analyticsData = new Map();
    this.loadAnalytics();
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private loadAnalytics() {
    const savedData = localStorage.getItem('analyticsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.entries(parsed).forEach(([userId, data]) => {
        this.analyticsData.set(userId, {
          ...data as AnalyticsData,
          generationHistory: (data as AnalyticsData).generationHistory.map(
            (item: any) => ({ ...item, date: new Date(item.date) })
          ),
        });
      });
    }
  }

  private saveAnalytics() {
    const data = Object.fromEntries(this.analyticsData);
    localStorage.setItem('analyticsData', JSON.stringify(data));
  }

  private initializeUserAnalytics(userId: string) {
    if (!this.analyticsData.has(userId)) {
      this.analyticsData.set(userId, {
        totalIdeasGenerated: 0,
        favoriteIdeas: 0,
        ideasByDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
        ideasByMarketSize: { small: 0, medium: 0, large: 0 },
        averageTimeToLaunch: '0 months',
        mostCommonInterests: [],
        generationHistory: [],
      });
    }
  }

  public trackIdeaGeneration(userId: string, ideas: GeneratedIdea[]) {
    this.initializeUserAnalytics(userId);
    const analytics = this.analyticsData.get(userId)!;

    // Update total ideas generated
    analytics.totalIdeasGenerated += ideas.length;

    // Update ideas by difficulty
    ideas.forEach(idea => {
      analytics.ideasByDifficulty[idea.difficulty]++;
    });

    // Update ideas by market size
    ideas.forEach(idea => {
      const marketSize = parseFloat(idea.marketSize.replace(/[^0-9.]/g, ''));
      if (marketSize < 1) analytics.ideasByMarketSize.small++;
      else if (marketSize <= 10) analytics.ideasByMarketSize.medium++;
      else analytics.ideasByMarketSize.large++;
    });

    // Update average time to launch
    const totalMonths = ideas.reduce((sum, idea) => {
      const months = parseInt(idea.timeToLaunch.split('-')[0]);
      return sum + months;
    }, 0);
    analytics.averageTimeToLaunch = `${Math.round(totalMonths / ideas.length)} months`;

    // Update generation history
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingEntry = analytics.generationHistory.find(
      entry => entry.date.getTime() === today.getTime()
    );
    
    if (existingEntry) {
      existingEntry.count += ideas.length;
    } else {
      analytics.generationHistory.push({
        date: today,
        count: ideas.length,
      });
    }

    // Keep only last 30 days of history
    analytics.generationHistory = analytics.generationHistory
      .filter(entry => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return entry.date >= thirtyDaysAgo;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    this.saveAnalytics();
  }

  public trackIdeaFavorite(userId: string, isFavorite: boolean) {
    this.initializeUserAnalytics(userId);
    const analytics = this.analyticsData.get(userId)!;
    
    if (isFavorite) {
      analytics.favoriteIdeas++;
    } else {
      analytics.favoriteIdeas = Math.max(0, analytics.favoriteIdeas - 1);
    }

    this.saveAnalytics();
  }

  public trackInterestSelection(userId: string, interests: string[]) {
    this.initializeUserAnalytics(userId);
    const analytics = this.analyticsData.get(userId)!;
    
    // Update most common interests
    const interestCount = new Map<string, number>();
    interests.forEach(interest => {
      interestCount.set(interest, (interestCount.get(interest) || 0) + 1);
    });
    
    analytics.mostCommonInterests = Array.from(interestCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([interest]) => interest);

    this.saveAnalytics();
  }

  public getAnalytics(userId: string): AnalyticsData | null {
    return this.analyticsData.get(userId) || null;
  }

  public getAggregateAnalytics(): AnalyticsData {
    const aggregate: AnalyticsData = {
      totalIdeasGenerated: 0,
      favoriteIdeas: 0,
      ideasByDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
      ideasByMarketSize: { small: 0, medium: 0, large: 0 },
      averageTimeToLaunch: '0 months',
      mostCommonInterests: [],
      generationHistory: [],
    };

    // Aggregate data from all users
    this.analyticsData.forEach(userData => {
      aggregate.totalIdeasGenerated += userData.totalIdeasGenerated;
      aggregate.favoriteIdeas += userData.favoriteIdeas;
      
      Object.entries(userData.ideasByDifficulty).forEach(([difficulty, count]) => {
        aggregate.ideasByDifficulty[difficulty as keyof typeof aggregate.ideasByDifficulty] += count;
      });
      
      Object.entries(userData.ideasByMarketSize).forEach(([size, count]) => {
        aggregate.ideasByMarketSize[size as keyof typeof aggregate.ideasByMarketSize] += count;
      });

      // Combine generation history
      userData.generationHistory.forEach(entry => {
        const existingEntry = aggregate.generationHistory.find(
          e => e.date.getTime() === entry.date.getTime()
        );
        if (existingEntry) {
          existingEntry.count += entry.count;
        } else {
          aggregate.generationHistory.push({ ...entry });
        }
      });
    });

    // Calculate aggregate average time to launch
    const totalMonths = Object.values(this.analyticsData).reduce((sum, userData) => {
      const months = parseInt(userData.averageTimeToLaunch);
      return sum + (isNaN(months) ? 0 : months);
    }, 0);
    
    const userCount = this.analyticsData.size;
    aggregate.averageTimeToLaunch = userCount > 0
      ? `${Math.round(totalMonths / userCount)} months`
      : '0 months';

    // Get most common interests across all users
    const interestCount = new Map<string, number>();
    this.analyticsData.forEach(userData => {
      userData.mostCommonInterests.forEach(interest => {
        interestCount.set(interest, (interestCount.get(interest) || 0) + 1);
      });
    });
    
    aggregate.mostCommonInterests = Array.from(interestCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([interest]) => interest);

    // Sort generation history by date
    aggregate.generationHistory.sort((a, b) => a.date.getTime() - b.date.getTime());

    return aggregate;
  }

  private getStoredEvents(): AnalyticsEvent[] {
    const stored = localStorage.getItem(this.EVENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveEvents(events: AnalyticsEvent[]): void {
    localStorage.setItem(this.EVENTS_STORAGE_KEY, JSON.stringify(events));
  }

  private async trackSupportEvent(
    event: SupportAnalyticsEvent,
    data: SupportAnalyticsData = {}
  ): Promise<void> {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      const eventData = {
        ...data,
        timestamp: new Date().toISOString(),
        userId: this.currentUser?.id,
        userPlan: this.currentUser?.plan,
      };

      // Store in local storage for now
      const events = this.getStoredEvents();
      events.push({
        event,
        data: eventData,
        timestamp: new Date().toISOString(),
      });
      this.saveEvents(events);

      // In a real app, this would send to your analytics backend
      console.log('Support Analytics Event:', event, eventData);
    } catch (error) {
      console.error('Failed to track support event:', error);
    }
  }

  // Support Ticket Analytics
  async trackTicketCreated(ticketId: string, category: string, priority: string): Promise<void> {
    await this.trackSupportEvent('support_ticket_created', {
      ticketId,
      ticketCategory: category,
      ticketPriority: priority,
      ticketStatus: 'open',
    });
  }

  async trackTicketUpdated(
    ticketId: string,
    category: string,
    priority: string,
    status: string
  ): Promise<void> {
    await this.trackSupportEvent('support_ticket_updated', {
      ticketId,
      ticketCategory: category,
      ticketPriority: priority,
      ticketStatus: status,
    });
  }

  async trackTicketResolved(
    ticketId: string,
    category: string,
    timeToResolution: number
  ): Promise<void> {
    await this.trackSupportEvent('support_ticket_resolved', {
      ticketId,
      ticketCategory: category,
      ticketStatus: 'resolved',
      timeToResolution,
    });
  }

  async trackTicketClosed(ticketId: string, category: string): Promise<void> {
    await this.trackSupportEvent('support_ticket_closed', {
      ticketId,
      ticketCategory: category,
      ticketStatus: 'closed',
    });
  }

  async trackMessageSent(
    ticketId: string,
    messageCount: number,
    isInternal: boolean
  ): Promise<void> {
    await this.trackSupportEvent('support_message_sent', {
      ticketId,
      messageCount,
      isInternal,
    });
  }

  // Knowledge Base Analytics
  async trackArticleViewed(
    articleId: string,
    category: string,
    viewCount: number
  ): Promise<void> {
    await this.trackSupportEvent('support_article_viewed', {
      articleId,
      articleCategory: category,
      viewCount,
    });
  }

  async trackArticleFeedback(
    articleId: string,
    category: string,
    isHelpful: boolean,
    helpfulCount: number,
    notHelpfulCount: number
  ): Promise<void> {
    await this.trackSupportEvent(
      isHelpful ? 'support_article_helpful' : 'support_article_not_helpful',
      {
        articleId,
        articleCategory: category,
        helpfulCount,
        notHelpfulCount,
      }
    );
  }

  // Community Analytics
  async trackPostCreated(postId: string, category: string): Promise<void> {
    await this.trackSupportEvent('community_post_created', {
      postId,
      postCategory: category,
    });
  }

  async trackPostViewed(postId: string, category: string, viewCount: number): Promise<void> {
    await this.trackSupportEvent('community_post_viewed', {
      postId,
      postCategory: category,
      viewCount,
    });
  }

  async trackCommentAdded(
    postId: string,
    commentId: string,
    category: string
  ): Promise<void> {
    await this.trackSupportEvent('community_comment_added', {
      postId,
      commentId,
      postCategory: category,
    });
  }

  async trackReactionAdded(
    postId: string,
    reactionType: string,
    category: string
  ): Promise<void> {
    await this.trackSupportEvent('community_reaction_added', {
      postId,
      reactionType,
      postCategory: category,
    });
  }

  // Search and Filter Analytics
  async trackSupportSearch(query: string, category: string): Promise<void> {
    await this.trackSupportEvent('support_search_performed', {
      searchQuery: query,
      selectedCategory: category,
    });
  }

  async trackCategorySelected(category: string): Promise<void> {
    await this.trackSupportEvent('support_category_selected', {
      selectedCategory: category,
    });
  }

  async trackPriorityChanged(ticketId: string, priority: string): Promise<void> {
    await this.trackSupportEvent('support_priority_changed', {
      ticketId,
      ticketPriority: priority,
    });
  }

  async trackStatusChanged(ticketId: string, status: string): Promise<void> {
    await this.trackSupportEvent('support_status_changed', {
      ticketId,
      ticketStatus: status,
    });
  }

  // Analytics Reports
  async getSupportAnalytics(startDate: Date, endDate: Date): Promise<{
    ticketMetrics: {
      totalTickets: number;
      resolvedTickets: number;
      averageResolutionTime: number;
      ticketsByCategory: Record<string, number>;
      ticketsByPriority: Record<string, number>;
    };
    articleMetrics: {
      totalViews: number;
      helpfulRate: number;
      viewsByCategory: Record<string, number>;
    };
    communityMetrics: {
      totalPosts: number;
      totalComments: number;
      totalReactions: number;
      postsByCategory: Record<string, number>;
    };
  }> {
    const events = this.getStoredEvents();
    const filteredEvents = events.filter(
      (event: AnalyticsEvent) =>
        new Date(event.timestamp) >= startDate && new Date(event.timestamp) <= endDate
    );

    // Calculate ticket metrics
    const ticketEvents = filteredEvents.filter((event: AnalyticsEvent) =>
      event.event.startsWith('support_ticket_')
    );
    const ticketMetrics = {
      totalTickets: ticketEvents.filter((e: AnalyticsEvent) => e.event === 'support_ticket_created').length,
      resolvedTickets: ticketEvents.filter((e: AnalyticsEvent) => e.event === 'support_ticket_resolved').length,
      averageResolutionTime:
        ticketEvents
          .filter((e: AnalyticsEvent) => e.event === 'support_ticket_resolved')
          .reduce((acc, curr) => acc + (curr.data.timeToResolution || 0), 0) /
        ticketEvents.filter((e: AnalyticsEvent) => e.event === 'support_ticket_resolved').length || 0,
      ticketsByCategory: this.groupByCategory(ticketEvents),
      ticketsByPriority: this.groupByPriority(ticketEvents),
    };

    // Calculate article metrics
    const articleEvents = filteredEvents.filter((event: AnalyticsEvent) =>
      event.event.startsWith('support_article_')
    );
    const articleMetrics = {
      totalViews: articleEvents
        .filter((e: AnalyticsEvent) => e.event === 'support_article_viewed')
        .reduce((acc, curr) => acc + (curr.data.viewCount || 0), 0),
      helpfulRate:
        articleEvents.filter((e: AnalyticsEvent) => e.event === 'support_article_helpful').length /
        (articleEvents.filter((e: AnalyticsEvent) => e.event === 'support_article_helpful').length +
          articleEvents.filter((e: AnalyticsEvent) => e.event === 'support_article_not_helpful').length) || 0,
      viewsByCategory: this.groupByCategory(articleEvents),
    };

    // Calculate community metrics
    const communityEvents = filteredEvents.filter((event: AnalyticsEvent) =>
      event.event.startsWith('community_')
    );
    const communityMetrics = {
      totalPosts: communityEvents.filter((e: AnalyticsEvent) => e.event === 'community_post_created').length,
      totalComments: communityEvents.filter((e: AnalyticsEvent) => e.event === 'community_comment_added').length,
      totalReactions: communityEvents.filter((e: AnalyticsEvent) => e.event === 'community_reaction_added').length,
      postsByCategory: this.groupByCategory(communityEvents),
    };

    return {
      ticketMetrics,
      articleMetrics,
      communityMetrics,
    };
  }

  private groupByCategory(events: AnalyticsEvent[]): Record<string, number> {
    return events.reduce((acc, curr) => {
      const category = curr.data.ticketCategory || curr.data.articleCategory || curr.data.postCategory;
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }

  private groupByPriority(events: AnalyticsEvent[]): Record<string, number> {
    return events.reduce((acc, curr) => {
      const priority = curr.data.ticketPriority;
      if (priority) {
        acc[priority] = (acc[priority] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }
}

export const analyticsService = AnalyticsService.getInstance(); 