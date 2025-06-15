import { Handler } from '@netlify/functions';
import { initializeDatabase } from '../../src/lib/db';

export const handler: Handler = async () => {
  try {
    await initializeDatabase();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database initialized successfully' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Database initialization failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database initialization failed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};