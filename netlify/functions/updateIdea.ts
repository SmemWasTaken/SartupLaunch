import { Handler } from '@netlify/functions';
import { sql, StartupIdea } from '../../src/lib/db';

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
    const ideaId = event.queryStringParameters?.id;
    const { userId, title, description, category, estimatedRevenue, difficulty, timeToLaunch } = JSON.parse(event.body || '{}');

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

    const [idea] = await sql<StartupIdea[]>`
      UPDATE startup_ideas 
      SET 
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        category = COALESCE(${category}, category),
        estimated_revenue = COALESCE(${estimatedRevenue}, estimated_revenue),
        difficulty = COALESCE(${difficulty}, difficulty),
        time_to_launch = COALESCE(${timeToLaunch}, time_to_launch)
      WHERE id = ${ideaId} AND user_id = ${userId}
      RETURNING *
    `;

    if (!idea) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Idea not found or unauthorized' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(idea),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error updating idea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update idea' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};