interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface IdeaGenerationRequest {
  interests: string[];
  skills: string[];
  industry: string;
  budget: string;
  timeframe: string;
}

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateStartupIdeas(params: IdeaGenerationRequest): Promise<any[]> {
    const prompt = this.buildPrompt(params);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert startup advisor and business strategist. Generate detailed, realistic startup ideas based on user input. Return your response as a valid JSON array of startup ideas.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      // Parse the JSON response
      try {
        const ideas = JSON.parse(content);
        return this.formatIdeas(ideas);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response as JSON:', content);
        // Fallback: try to extract ideas from text
        return this.extractIdeasFromText(content);
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate ideas. Please check your API key and try again.');
    }
  }

  private buildPrompt(params: IdeaGenerationRequest): string {
    return `
Generate 3-5 unique startup ideas based on the following criteria:

**User Profile:**
- Interests: ${params.interests.join(', ')}
- Skills: ${params.skills.join(', ')}
- Preferred Industry: ${params.industry}
- Budget Range: ${params.budget}
- Time to Launch: ${params.timeframe}

**Requirements:**
Please return a JSON array where each startup idea has the following structure:
{
  "title": "Startup Name",
  "description": "Detailed description (2-3 sentences)",
  "category": "Industry category",
  "difficulty": "Easy|Medium|Hard",
  "timeToLaunch": "Estimated time to launch",
  "revenueEstimate": "Potential revenue range per year",
  "marketSize": "Market size description",
  "tags": ["relevant", "tags", "array"]
}

**Guidelines:**
- Make ideas realistic and achievable within the specified budget and timeframe
- Consider the user's skills and interests
- Provide specific, actionable business concepts
- Include both B2B and B2C opportunities where appropriate
- Focus on modern, scalable business models
- Ensure revenue estimates are realistic for the difficulty level

Return only the JSON array, no additional text.
`;
  }

  private formatIdeas(ideas: any[]): any[] {
    return ideas.map(idea => ({
      title: idea.title || 'Untitled Startup',
      description: idea.description || 'No description provided',
      category: idea.category || 'General',
      difficulty: this.validateDifficulty(idea.difficulty),
      timeToLaunch: idea.timeToLaunch || '3-6 months',
      revenueEstimate: idea.revenueEstimate || '$10K-$50K/year',
      marketSize: idea.marketSize || 'Medium',
      tags: Array.isArray(idea.tags) ? idea.tags : ['startup', 'business'],
    }));
  }

  private validateDifficulty(difficulty: string): 'Easy' | 'Medium' | 'Hard' {
    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    return validDifficulties.includes(difficulty) ? difficulty as 'Easy' | 'Medium' | 'Hard' : 'Medium';
  }

  private extractIdeasFromText(content: string): any[] {
    // Fallback method to extract ideas from text if JSON parsing fails
    const lines = content.split('\n').filter(line => line.trim());
    const ideas = [];
    
    let currentIdea: any = {};
    
    for (const line of lines) {
      if (line.includes('Title:') || line.includes('Name:')) {
        if (currentIdea.title) {
          ideas.push(this.formatIdea(currentIdea));
          currentIdea = {};
        }
        currentIdea.title = line.split(':')[1]?.trim() || 'Startup Idea';
      } else if (line.includes('Description:')) {
        currentIdea.description = line.split(':')[1]?.trim() || 'Business opportunity';
      } else if (line.includes('Category:')) {
        currentIdea.category = line.split(':')[1]?.trim() || 'General';
      } else if (line.includes('Difficulty:')) {
        currentIdea.difficulty = line.split(':')[1]?.trim() || 'Medium';
      }
    }
    
    if (currentIdea.title) {
      ideas.push(this.formatIdea(currentIdea));
    }
    
    return ideas.length > 0 ? ideas : this.getFallbackIdeas();
  }

  private formatIdea(idea: any): any {
    return {
      title: idea.title || 'AI-Generated Startup',
      description: idea.description || 'An innovative business opportunity tailored to your skills and interests.',
      category: idea.category || 'Technology',
      difficulty: this.validateDifficulty(idea.difficulty),
      timeToLaunch: idea.timeToLaunch || '3-6 months',
      revenueEstimate: idea.revenueEstimate || '$25K-$100K/year',
      marketSize: idea.marketSize || 'Growing market',
      tags: ['AI-generated', 'startup', 'business'],
    };
  }

  private getFallbackIdeas(): any[] {
    return [
      {
        title: 'AI-Powered Business Solution',
        description: 'A technology-driven solution that leverages your skills to solve real market problems.',
        category: 'Technology',
        difficulty: 'Medium' as const,
        timeToLaunch: '4-6 months',
        revenueEstimate: '$50K-$200K/year',
        marketSize: 'Large and growing',
        tags: ['AI', 'technology', 'scalable'],
      }
    ];
  }
}