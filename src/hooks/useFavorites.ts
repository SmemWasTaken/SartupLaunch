import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { GeneratedIdea } from '../types/idea';

const FAVORITES_STORAGE_KEY = 'favorites';

export const useFavorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<GeneratedIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      // Load favorites from localStorage
      const storedFavorites = localStorage.getItem(`${FAVORITES_STORAGE_KEY}_${user.id}`);
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Error parsing stored favorites:', error);
          setFavorites([]);
        }
      }
      setIsLoading(false);
    }
  }, [user]);

  const addFavorite = (idea: GeneratedIdea) => {
    if (!user?.id) return;

    // Ensure the idea has an ID
    const ideaWithId = {
      ...idea,
      id: idea.id || `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, ideaWithId];
      localStorage.setItem(
        `${FAVORITES_STORAGE_KEY}_${user.id}`,
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    });
  };

  const removeFavorite = (ideaId: string) => {
    if (!user?.id) return;

    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((idea) => idea.id !== ideaId);
      localStorage.setItem(
        `${FAVORITES_STORAGE_KEY}_${user.id}`,
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    });
  };

  const toggleFavorite = (idea: GeneratedIdea) => {
    if (!user?.id) return;

    // Ensure the idea has an ID
    const ideaWithId = {
      ...idea,
      id: idea.id || `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    const isFavorite = favorites.some((fav) => fav.id === ideaWithId.id);
    if (isFavorite) {
      removeFavorite(ideaWithId.id);
    } else {
      addFavorite(ideaWithId);
    }
  };

  const isFavorite = (ideaId: string) => {
    return favorites.some((idea) => idea.id === ideaId);
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}; 