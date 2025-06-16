import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

interface GeneratedIdea {
  title: string;
  description: string;
  category: string;
  marketSize: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToLaunch: string;
  revenueEstimate: string;
  tags: string[];
}

interface IdeaGenerationParams {
  interests: string[];
  marketTrends?: string[];
  userPreferences?: {
    preferredDifficulty?: 'Easy' | 'Medium' | 'Hard';
    preferredTimeToLaunch?: string;
    preferredMarketSize?: string;
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const params: IdeaGenerationParams = JSON.parse(event.body || '{}');
    
    const prompt = buildPrompt(params);
    
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

    const ideas = parseAIResponse(completion.choices[0].message.content || '');

    return {
      statusCode: 200,
      body: JSON.stringify({ ideas }),
    };
  } catch (error) {
    console.error('Error generating ideas:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate ideas' }),
    };
  }
};

function buildPrompt(params: IdeaGenerationParams): string {
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
  prompt += '3. Category (e.g., Technology, Healthcare, Education)\n';
  prompt += '4. Estimated market size (in $B)\n';
  prompt += '5. Difficulty level (Easy/Medium/Hard)\n';
  prompt += '6. Estimated time to launch\n';
  prompt += '7. Estimated revenue range\n';
  prompt += '8. Relevant tags (array of keywords)\n\n';
  prompt += 'Format the response as a JSON array of objects with the following structure:\n';
  prompt += '[{"title": "string", "description": "string", "category": "string", "marketSize": "string", "difficulty": "string", "timeToLaunch": "string", "revenueEstimate": "string", "tags": ["string"]}]';

  return prompt;
}

function parseAIResponse(content: string): GeneratedIdea[] {
  try {
    // Try to parse as JSON first
    const ideas = JSON.parse(content);
    if (Array.isArray(ideas)) {
      return ideas.map(idea => ({
        title: idea.title || 'Untitled Startup',
        description: idea.description || 'No description provided',
        category: idea.category || 'General',
        marketSize: idea.marketSize || 'Unknown',
        difficulty: validateDifficulty(idea.difficulty),
        timeToLaunch: idea.timeToLaunch || '3-6 months',
        revenueEstimate: idea.revenueEstimate || '$10K-$50K/year',
        tags: Array.isArray(idea.tags) ? idea.tags : ['startup', 'business'],
      }));
    }
  } catch (e) {
    // If JSON parsing fails, try to extract ideas from text
    console.warn('Failed to parse AI response as JSON, attempting text extraction');
  }

  // Fallback: Extract ideas from text
  const lines = content.split('\n');
  const ideas: GeneratedIdea[] = [];
  let currentIdea: Partial<GeneratedIdea> = {};

  for (const line of lines) {
    if (line.toLowerCase().includes('title:')) {
      if (currentIdea.title) {
        ideas.push(formatIdea(currentIdea));
        currentIdea = {};
      }
      currentIdea.title = line.split(':')[1]?.trim();
    } else if (line.toLowerCase().includes('description:')) {
      currentIdea.description = line.split(':')[1]?.trim();
    } else if (line.toLowerCase().includes('category:')) {
      currentIdea.category = line.split(':')[1]?.trim();
    } else if (line.toLowerCase().includes('market size:')) {
      currentIdea.marketSize = line.split(':')[1]?.trim();
    } else if (line.toLowerCase().includes('difficulty:')) {
      currentIdea.difficulty = validateDifficulty(line.split(':')[1]?.trim() || '');
    } else if (line.toLowerCase().includes('time to launch:')) {
      currentIdea.timeToLaunch = line.split(':')[1]?.trim();
    } else if (line.toLowerCase().includes('revenue:')) {
      currentIdea.revenueEstimate = line.split(':')[1]?.trim();
    } else if (line.toLowerCase().includes('tags:')) {
      currentIdea.tags = line.split(':')[1]?.trim().split(',').map(tag => tag.trim());
    }
  }

  if (currentIdea.title) {
    ideas.push(formatIdea(currentIdea));
  }

  return ideas;
}

function validateDifficulty(difficulty: string): 'Easy' | 'Medium' | 'Hard' {
  const validDifficulties = ['Easy', 'Medium', 'Hard'];
  return validDifficulties.includes(difficulty) ? difficulty as 'Easy' | 'Medium' | 'Hard' : 'Medium';
}

function formatIdea(idea: Partial<GeneratedIdea>): GeneratedIdea {
  return {
    title: idea.title || 'AI-Generated Startup',
    description: idea.description || 'An innovative business opportunity tailored to your skills and interests.',
    category: idea.category || 'Technology',
    marketSize: idea.marketSize || 'Growing market',
    difficulty: validateDifficulty(idea.difficulty || ''),
    timeToLaunch: idea.timeToLaunch || '3-6 months',
    revenueEstimate: idea.revenueEstimate || '$25K-$100K/year',
    tags: Array.isArray(idea.tags) ? idea.tags : ['AI-generated', 'startup', 'business'],
  };
}

export { handler }; 