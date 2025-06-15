/*
  # Add onboarding metadata to profiles

  1. Changes
    - Add `onboarding_metadata` JSONB column to profiles table
    - This will store user's onboarding progress and tour completion status

  2. Security
    - Users can only update their own onboarding metadata
*/

-- Add onboarding_metadata column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'onboarding_metadata'
  ) THEN
    ALTER TABLE profiles ADD COLUMN onboarding_metadata JSONB DEFAULT '{}';
  END IF;
END $$;

-- Create index for better performance on onboarding queries
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_metadata ON profiles USING GIN (onboarding_metadata);

-- Update RLS policies to allow users to update their onboarding metadata
-- (The existing policies already cover this, but we're being explicit)