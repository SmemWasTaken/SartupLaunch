import { Handler } from '@netlify/functions';
import { sql, Profile } from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  try {
    const userId = event.queryStringParameters?.userId;
    const { email, displayName, avatarUrl, onboardingMetadata } = JSON.parse(event.body || '{}');

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User ID is required' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const [profile] = await sql<Profile[]>`
      UPDATE profiles 
      SET 
        email = COALESCE(${email}, email),
        display_name = COALESCE(${displayName}, display_name),
        avatar_url = COALESCE(${avatarUrl}, avatar_url),
        onboarding_metadata = COALESCE(${JSON.stringify(onboardingMetadata)}, onboarding_metadata),
        updated_at = now()
      WHERE id = ${userId}
      RETURNING *
    `;

    if (!profile) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Profile not found' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update profile' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};