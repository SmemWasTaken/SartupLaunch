import { useState, useEffect } from 'react';
import { StartupIdea, IdeaGeneratorParams } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { generateMockIdeas } from '../utils/mockData';

interface UseIdeasReturn {
  ideas: StartupIdea[];
  isLoading: boolean;
  generateIdeas: (params: IdeaGeneratorParams) => Promise<StartupIdea[]>;
  saveIdea: (idea: Omit<StartupIdea, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  toggleFavorite: (ideaId: string) => Promise<void>;
  deleteIdea: (ideaId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useIdeas = (): UseIdeasReturn => {
  const { user, isDemoMode } = useAuth();
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadIdeas();
    }
  }, [user, isDemoMode]);

  const loadIdeas = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (isDemoMode) {
        const demoIdeas = localStorage.getItem('demo_ideas');
        if (demoIdeas) {
          setIdeas(JSON.parse(demoIdeas));
        }
      } else {
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
      }
    } catch (error) {
      console.error('Failed to load ideas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateIdeas = async (params: IdeaGeneratorParams): Promise<StartupIdea[]> => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    try {
      // Simulate AI generation with mock data
      const mockIdeas = generateMockIdeas(params);
      
      // Add realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newIdeas: StartupIdea[] = mockIdeas.map(idea => ({
        ...idea,
        id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        createdAt: new Date().toISOString(),
        isFavorite: false,
      }));

      return newIdeas;
    } catch (error) {
      console.error('Failed to generate ideas:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveIdea = async (ideaData: Omit<StartupIdea, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User not authenticated');

    const newIdea: StartupIdea = {
      ...ideaData,
      id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    try {
      if (isDemoMode) {
        const updatedIdeas = [newIdea, ...ideas];
        setIdeas(updatedIdeas);
        localStorage.setItem('demo_ideas', JSON.stringify(updatedIdeas));
      } else {
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
      }
    } catch (error) {
      console.error('Failed to save idea:', error);
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
  };
};