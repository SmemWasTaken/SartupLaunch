import { neon } from '@netlify/neon';

// Automatically uses process.env.NETLIFY_DATABASE_URL
export const sql = neon();

export interface Profile {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  onboarding_metadata?: any;
}

export interface StartupIdea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  estimated_revenue: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time_to_launch: string;
  created_at?: string;
}

export interface UserTemplate {
  id: string;
  user_id: string;
  template_id: string;
  purchased_at?: string;
}

// Database initialization function
export const initializeDatabase = async () => {
  try {
    // Create profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email text UNIQUE NOT NULL,
        display_name text,
        avatar_url text,
        onboarding_metadata jsonb DEFAULT '{}',
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      )
    `;

    // Create startup_ideas table
    await sql`
      CREATE TABLE IF NOT EXISTS startup_ideas (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
        title text NOT NULL,
        description text NOT NULL,
        category text NOT NULL,
        estimated_revenue text NOT NULL,
        difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
        time_to_launch text NOT NULL,
        created_at timestamptz DEFAULT now()
      )
    `;

    // Create user_templates table
    await sql`
      CREATE TABLE IF NOT EXISTS user_templates (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
        template_id text NOT NULL,
        purchased_at timestamptz DEFAULT now(),
        UNIQUE(user_id, template_id)
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_startup_ideas_user_id ON startup_ideas(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_startup_ideas_created_at ON startup_ideas(created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_user_templates_user_id ON user_templates(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_metadata ON profiles USING GIN (onboarding_metadata)`;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};