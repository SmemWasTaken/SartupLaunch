import { Handler } from '@netlify/functions';
import { sql, Profile } from '../../src/lib/db';

export const handler: Handler = async (event) => {
  try {
    const userId = event.queryStringParameters?.userId;
    
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
      SELECT * FROM profiles WHERE id = ${userId}
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
    console.error('Error fetching profile:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch profile' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};