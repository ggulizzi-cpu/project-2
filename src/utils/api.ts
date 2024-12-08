import { generateDestinationInfo } from './openai';

const API_BASE_URL = import.meta.env.PROD 
  ? '/.netlify/functions'
  : 'http://localhost:8888/.netlify/functions';

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

export { generateDestinationInfo };