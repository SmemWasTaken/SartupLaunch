import { useState, useEffect } from 'react';
import { StartupIdea, IdeaGeneratorParams } from '../types';
import { useUser } from '@clerk/clerk-react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { supabase } from '../lib/supabase';
import { OpenAIService } from '../lib/openai';

interface UseIdeasReturn {
  ideas: StartupIdea[];
  isLoading: boolean;
  generateIdeas: (params: IdeaGeneratorParams) => Promise<StartupIdea[]>;
  saveIdea: (idea: Omit<StartupIdea, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  toggleFavorite: (ideaId: string) => Promise<void>;
  deleteIdea: (ideaId: string) => Promise<void>;
  refresh: () => Promise<void>;
  error: string | null;
  setApiKey: (apiKey: string) => void;
}

export const useIdeas = (): UseIdeasReturn => {
  const { user } = useUser();
  const { completeStep } = useOnboarding();
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadIdeas();
    }
  }, [user]);

  useEffect(() => {
    // Load API key from environment or localStorage
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const savedApiKey = localStorage.getItem('openai_api_key');
    
    if (envApiKey) {
      setApiKey(envApiKey);
    } else if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

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
    
    if (!apiKey) {
      throw new Error('OpenAI API key is required. Please configure your API key in settings.');
    }

    setIsLoading(true);
    try {
      const openAI = new OpenAIService(apiKey);
      const generatedIdeas = await openAI.generateStartupIdeas(params);

      const newIdeas: StartupIdea[] = generatedIdeas.map(idea => ({
        ...idea,
        id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        createdAt: new Date().toISOString(),
        isFavorite: false,
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

  const handleSetApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    // Only save to localStorage if not using environment variable
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      localStorage.setItem('openai_api_key', newApiKey);
    }
    setError(null);
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
      if (isDemoMode) {
        // Check for duplicates in demo mode too
        const demoIdeas = JSON.parse(localStorage.getItem('demo_ideas') || '[]');
        const existingDemoIdea = demoIdeas.find((idea: StartupIdea) => 
          idea.title === ideaData.title && 
          idea.description === ideaData.description
        );
        
        if (existingDemoIdea) {
          throw new Error('You have already saved this idea');
        }
        
        const updatedIdeas = [newIdea, ...ideas];
        setIdeas(updatedIdeas);
        localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));
        
        // Mark save-idea step as complete
        completeStep('save-idea');
      } else {
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
      }
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
      if (isDemoMode) {
        const updatedIdeas = ideas.map(i => i.id === ideaId ? updatedIdea : i);
        setIdeas(updatedIdeas);
        localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));
      } else {
        const { error } = await supabase
          .from('startup_ideas')
          .update({ is_favorite: updatedIdea.isFavorite })
          .eq('id', ideaId);

        if (error) throw error;
        setIdeas(prev => prev.map(i => i.id === ideaId ? updatedIdea : i));
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setError('Failed to update favorite status');
      throw error;
    }
  };

  const deleteIdea = async (ideaId: string) => {
    try {
      if (isDemoMode) {
        const updatedIdeas = ideas.filter(i => i.id !== ideaId);
        setIdeas(updatedIdeas);
        localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));
      } else {
        const { error } = await supabase
          .from('startup_ideas')
          .delete()
          .eq('id', ideaId);

        if (error) throw error;
        setIdeas(prev => prev.filter(i => i.id !== ideaId));
      }
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
    setApiKey: handleSetApiKey,
  };
};