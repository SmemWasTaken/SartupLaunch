export interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  marketSize: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToLaunch: string;
  isFavorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
} 