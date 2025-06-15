import { createClient } from '@supabase/supabase-js';

// Use demo values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Check if we're in demo mode (no real Supabase credentials)
export const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || 
                         import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co' ||
                         !import.meta.env.VITE_SUPABASE_ANON_KEY ||
                         import.meta.env.VITE_SUPABASE_ANON_KEY === 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar: string | null;
          created_at: string;
          onboarding_completed: boolean;
          onboarding_step: number;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar?: string | null;
          created_at?: string;
          onboarding_completed?: boolean;
          onboarding_step?: number;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar?: string | null;
          created_at?: string;
          onboarding_completed?: boolean;
          onboarding_step?: number;
        };
      };
      startup_ideas: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          difficulty: string;
          time_to_launch: string;
          revenue_estimate: string;
          market_size: string;
          tags: string[];
          is_favorite: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          difficulty: string;
          time_to_launch: string;
          revenue_estimate: string;
          market_size: string;
          tags: string[];
          is_favorite?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          category?: string;
          difficulty?: string;
          time_to_launch?: string;
          revenue_estimate?: string;
          market_size?: string;
          tags?: string[];
          is_favorite?: boolean;
          created_at?: string;
        };
      };
      user_templates: {
        Row: {
          id: string;
          user_id: string;
          template_id: string;
          purchased_at: string;
          price_paid: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id: string;
          purchased_at?: string;
          price_paid: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          template_id?: string;
          purchased_at?: string;
          price_paid?: number;
        };
      };
    };
  };
}