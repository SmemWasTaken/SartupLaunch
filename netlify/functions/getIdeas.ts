import { Handler } from '@netlify/functions';
import { sql, StartupIdea } from '../../src/lib/db';

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

    const ideas = await sql<StartupIdea[]>`
      SELECT * FROM startup_ideas 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return {
      statusCode: 200,
      body: JSON.stringify(ideas),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch ideas' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};