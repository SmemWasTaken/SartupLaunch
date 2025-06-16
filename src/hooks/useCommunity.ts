import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import type { CommunityPost } from '../types/support';

export const useCommunity = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (input: Omit<CommunityPost, 'id' | 'createdAt' | 'updatedAt' | 'reactions' | 'userReactions' | 'comments' | 'viewCount'>) => {
    if (!user) {
      setError('You must be logged in to create a post');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to create post
      const newPost: CommunityPost = {
        id: Math.random().toString(36).substr(2, 9),
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reactions: { like: 0, helpful: 0, insightful: 0 },
        userReactions: {},
        comments: [],
        viewCount: 0,
      };

      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const reactToPost = useCallback(async (postId: string, reactionType: 'like' | 'helpful' | 'insightful') => {
    if (!user) {
      setError('You must be logged in to react to a post');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to update reaction
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const userReactions = post.userReactions[user.id] || [];
          const hasReaction = userReactions.includes(reactionType);

          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reactionType]: hasReaction
                ? post.reactions[reactionType] - 1
                : post.reactions[reactionType] + 1,
            },
            userReactions: {
              ...post.userReactions,
              [user.id]: hasReaction
                ? userReactions.filter(r => r !== reactionType)
                : [...userReactions, reactionType],
            },
          };
        }
        return post;
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update reaction');
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    posts,
    loading,
    error,
    createPost,
    reactToPost,
  };
}; 