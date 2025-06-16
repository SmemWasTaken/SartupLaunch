import { GeneratedIdea } from '../types/idea';

export interface IdeaGenerationParams {
  interests: string[];
  marketTrends?: string[];
  userPreferences?: {
    preferredDifficulty?: 'Easy' | 'Medium' | 'Hard';
    preferredTimeToLaunch?: string;
    preferredMarketSize?: string;
  };
}

export class AIService {
  private static instance: AIService;
  private rateLimiter: Map<string, { count: number; timestamp: number }>;
  private readonly RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
  private readonly RATE_LIMIT_COUNT = 10; // Maximum generations per window

  private constructor() {
    this.rateLimiter = new Map();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private async checkRateLimit(userId: string): Promise<boolean> {
    const now = Date.now();
    const userLimit = this.rateLimiter.get(userId);

    if (!userLimit) {
      this.rateLimiter.set(userId, { count: 1, timestamp: now });
      return true;
    }

    if (now - userLimit.timestamp > this.RATE_LIMIT_WINDOW) {
      this.rateLimiter.set(userId, { count: 1, timestamp: now });
      return true;
    }

    if (userLimit.count >= this.RATE_LIMIT_COUNT) {
      return false;
    }

    userLimit.count++;
    this.rateLimiter.set(userId, userLimit);
    return true;
  }

  public async generateIdeas(
    params: IdeaGenerationParams,
    userId: string
  ): Promise<GeneratedIdea[]> {
    if (!await this.checkRateLimit(userId)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    try {
      const response = await fetch('/.netlify/functions/generateIdea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to generate ideas');
      }

      const data = await response.json();
      return data.ideas;
    } catch (error) {
      console.error('Error generating ideas:', error);
      throw new Error('Failed to generate ideas. Please try again later.');
    }
  }
}

export const aiService = AIService.getInstance(); 