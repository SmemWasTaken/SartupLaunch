import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { GeneratedIdea } from '../types/idea';

const FAVORITES_STORAGE_KEY = 'favorites';

export const useFavorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<GeneratedIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
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
    if (!user) return;

    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, idea];
      localStorage.setItem(
        `${FAVORITES_STORAGE_KEY}_${user.id}`,
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    });
  };

  const removeFavorite = (ideaId: string) => {
    if (!user) return;

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
    if (!user) return;

    const isFavorite = favorites.some((fav) => fav.id === idea.id);
    if (isFavorite) {
      removeFavorite(idea.id);
    } else {
      addFavorite(idea);
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