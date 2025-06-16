import OpenAI from 'openai';
import { GeneratedIdea } from '../types/idea';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled through a backend
});

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
      const prompt = this.buildPrompt(params);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are an expert startup idea generator. Generate innovative, feasible, and market-viable startup ideas based on user interests and preferences. Format each idea with a title, description, market size estimate, difficulty level, and estimated time to launch."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const ideas = this.parseAIResponse(completion.choices[0].message.content || '');
      return ideas;
    } catch (error) {
      console.error('Error generating ideas:', error);
      throw new Error('Failed to generate ideas. Please try again later.');
    }
  }

  private buildPrompt(params: IdeaGenerationParams): string {
    const { interests, marketTrends, userPreferences } = params;
    
    let prompt = `Generate 3 innovative startup ideas based on the following interests: ${interests.join(', ')}.\n\n`;
    
    if (marketTrends?.length) {
      prompt += `Consider these market trends: ${marketTrends.join(', ')}.\n\n`;
    }

    if (userPreferences) {
      prompt += 'Preferences:\n';
      if (userPreferences.preferredDifficulty) {
        prompt += `- Preferred difficulty: ${userPreferences.preferredDifficulty}\n`;
      }
      if (userPreferences.preferredTimeToLaunch) {
        prompt += `- Preferred time to launch: ${userPreferences.preferredTimeToLaunch}\n`;
      }
      if (userPreferences.preferredMarketSize) {
        prompt += `- Preferred market size: ${userPreferences.preferredMarketSize}\n`;
      }
    }

    prompt += '\nFor each idea, provide:\n';
    prompt += '1. A catchy title\n';
    prompt += '2. A detailed description\n';
    prompt += '3. Estimated market size (in $B)\n';
    prompt += '4. Difficulty level (Easy/Medium/Hard)\n';
    prompt += '5. Estimated time to launch\n\n';
    prompt += 'Format the response as a JSON array of objects with the following structure:\n';
    prompt += '[{"title": "string", "description": "string", "marketSize": "string", "difficulty": "string", "timeToLaunch": "string"}]';

    return prompt;
  }

  private parseAIResponse(response: string): GeneratedIdea[] {
    try {
      const ideas = JSON.parse(response);
      return ideas.map((idea: any, index: number) => ({
        id: `idea-${Date.now()}-${index}`,
        title: idea.title,
        description: idea.description,
        marketSize: idea.marketSize,
        difficulty: idea.difficulty,
        timeToLaunch: idea.timeToLaunch,
        isFavorite: false
      }));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse generated ideas');
    }
  }
}

export const aiService = AIService.getInstance(); 