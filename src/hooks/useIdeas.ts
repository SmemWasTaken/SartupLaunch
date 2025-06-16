import { useState, useEffect } from 'react';
import { StartupIdea, IdeaGeneratorParams } from '../types';
import { useUser } from '@clerk/clerk-react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { supabase } from '../lib/supabase';
import { AIService } from '../services/aiService';

interface UseIdeasReturn {
  ideas: StartupIdea[];
  isLoading: boolean;
  generateIdeas: (params: IdeaGeneratorParams) => Promise<StartupIdea[]>;
  saveIdea: (idea: Omit<StartupIdea, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  toggleFavorite: (ideaId: string) => Promise<void>;
  deleteIdea: (ideaId: string) => Promise<void>;
  refresh: () => Promise<void>;
  error: string | null;
}

export const useIdeas = (): UseIdeasReturn => {
  const { user } = useUser();
  const { completeStep } = useOnboarding();
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadIdeas();
    }
  }, [user]);

  const loadIdeas = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('startup_ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedIdeas: StartupIdea[] = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        title: item.title,
        description: item.description,
        category: item.category,
        difficulty: item.difficulty as 'Easy' | 'Medium' | 'Hard',
        timeToLaunch: item.time_to_launch,
        revenueEstimate: item.revenue_estimate,
        marketSize: item.market_size,
        tags: item.tags,
        isFavorite: item.is_favorite,
        createdAt: item.created_at,
      }));

      setIdeas(formattedIdeas);
    } catch (error) {
      console.error('Failed to load ideas:', error);
      setError('Failed to load ideas');
    } finally {
      setIsLoading(false);
    }
  };

  const generateIdeas = async (params: IdeaGeneratorParams): Promise<StartupIdea[]> => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    try {
      const aiService = AIService.getInstance();
      const generatedIdeas = await aiService.generateIdeas(params, user.id);

      const newIdeas: StartupIdea[] = generatedIdeas.map(idea => ({
        ...idea,
        id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        createdAt: new Date().toISOString(),
        isFavorite: false,
        category: idea.category || 'General',
        revenueEstimate: idea.revenueEstimate || '$10K-$50K/year',
        tags: idea.tags || ['startup', 'business'],
      }));

      // Mark generate-idea step as complete
      completeStep('generate-idea');

      return newIdeas;
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate ideas');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveIdea = async (ideaData: Omit<StartupIdea, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User not authenticated');

    // Check if idea already exists for this user
    const existingIdea = ideas.find(idea => 
      idea.title === ideaData.title && 
      idea.description === ideaData.description
    );
    
    if (existingIdea) {
      throw new Error('You have already saved this idea');
    }

    const newIdea: StartupIdea = {
      ...ideaData,
      id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    try {
      // Check database for existing idea
      const { data: existingDbIdea } = await supabase
        .from('startup_ideas')
        .select('id')
        .eq('user_id', user.id)
        .eq('title', ideaData.title)
        .eq('description', ideaData.description)
        .single();
        
      if (existingDbIdea) {
        throw new Error('You have already saved this idea');
      }
      
      const { error } = await supabase
        .from('startup_ideas')
        .insert({
          id: newIdea.id,
          user_id: newIdea.userId,
          title: newIdea.title,
          description: newIdea.description,
          category: newIdea.category,
          difficulty: newIdea.difficulty,
          time_to_launch: newIdea.timeToLaunch,
          revenue_estimate: newIdea.revenueEstimate,
          market_size: newIdea.marketSize,
          tags: newIdea.tags,
          is_favorite: newIdea.isFavorite,
        });

      if (error) throw error;
      setIdeas(prev => [newIdea, ...prev]);
      
      // Mark save-idea step as complete
      completeStep('save-idea');
    } catch (error) {
      console.error('Failed to save idea:', error);
      if (error instanceof Error && error.message === 'You have already saved this idea') {
        setError('You have already saved this idea');
      } else {
        setError('Failed to save idea');
      }
      throw error;
    }
  };

  const toggleFavorite = async (ideaId: string) => {
    const idea = ideas.find(i => i.id === ideaId);
    if (!idea) return;

    const updatedIdea = { ...idea, isFavorite: !idea.isFavorite };

    try {
      const { error } = await supabase
        .from('startup_ideas')
        .update({ is_favorite: updatedIdea.isFavorite })
        .eq('id', ideaId);

      if (error) throw error;
      setIdeas(prev => prev.map(i => i.id === ideaId ? updatedIdea : i));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setError('Failed to update favorite status');
      throw error;
    }
  };

  const deleteIdea = async (ideaId: string) => {
    try {
      const { error } = await supabase
        .from('startup_ideas')
        .delete()
        .eq('id', ideaId);

      if (error) throw error;
      setIdeas(prev => prev.filter(i => i.id !== ideaId));
    } catch (error) {
      console.error('Failed to delete idea:', error);
      setError('Failed to delete idea');
      throw error;
    }
  };

  const refresh = async () => {
    await loadIdeas();
  };

  return {
    ideas,
    isLoading,
    generateIdeas,
    saveIdea,
    toggleFavorite,
    deleteIdea,
    refresh,
    error,
  };
};