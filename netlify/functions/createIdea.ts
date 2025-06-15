import { Handler } from '@netlify/functions';
import { sql, StartupIdea } from '../../src/lib/db';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
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
    const { userId, title, description, category, estimatedRevenue, difficulty, timeToLaunch } = JSON.parse(event.body || '{}');

    if (!userId || !title || !description || !category || !estimatedRevenue || !difficulty || !timeToLaunch) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const [idea] = await sql<StartupIdea[]>`
      INSERT INTO startup_ideas (user_id, title, description, category, estimated_revenue, difficulty, time_to_launch)
      VALUES (${userId}, ${title}, ${description}, ${category}, ${estimatedRevenue}, ${difficulty}, ${timeToLaunch})
      RETURNING *
    `;

    return {
      statusCode: 201,
      body: JSON.stringify(idea),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Error creating idea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create idea' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};