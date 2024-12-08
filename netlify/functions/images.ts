import { Handler } from '@netlify/functions';
import { createClient } from 'pexels';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0'
].map(url => `${url}?auto=format&fit=crop&w=1920&q=75`);

const getFallbackImage = () => 
  FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  try {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        url: getFallbackImage()
      })
    };
  } catch (error) {
    console.error('Image API Error:', error);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        url: getFallbackImage()
      })
    };
  }
};