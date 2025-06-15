import { Handler } from '@netlify/functions';
import { sql } from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
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
    const ideaId = event.queryStringParameters?.id;
    const userId = event.queryStringParameters?.userId;

    if (!ideaId || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Idea ID and User ID are required' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const result = await sql`
      DELETE FROM startup_ideas 
      WHERE id = ${ideaId} AND user_id = ${userId}
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Idea deleted successfully' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error deleting idea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete idea' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};