import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a travel assistant. Generate a detailed travel guide in JSON format.
Return the response in the following structure:
{
  "id": "string",
  "name": "string",
  "title": "string",
  "subtitle": "string",
  "image": "string",
  "description": "string",
  "sections": [
    {
      "title": "string",
      "content": "string",
      "image": "string",
      "highlights": ["string"]
    }
  ],
  "practicalInfo": {
    "bestTimeToVisit": "string",
    "climate": "string",
    "currency": "string",
    "language": "string"
  },
  "recommendations": [
    {
      "title": "string",
      "description": "string",
      "type": "string"
    }
  ]
}`;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const { query } = JSON.parse(event.body || '{}');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Generate a JSON response with travel information for: ${query}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    });

    return {
      statusCode: 200,
      headers,
      body: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Return a more graceful error response
    return {
      statusCode: 200, // Keep 200 to handle errors gracefully on the client
      headers,
      body: JSON.stringify({
        id: 'fallback',
        name: query,
        title: `Exploring ${query}`,
        subtitle: 'Your next adventure awaits',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=75',
        description: 'Discover this amazing destination',
        sections: [
          {
            title: 'Overview',
            content: 'Information temporarily unavailable. Please try again later.',
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=75',
            highlights: ['Rich culture', 'Beautiful landscapes', 'Local cuisine']
          }
        ],
        practicalInfo: {
          bestTimeToVisit: 'Spring and Fall',
          climate: 'Moderate',
          currency: 'Local currency',
          language: 'Local language'
        },
        recommendations: [
          {
            title: 'Must-Visit Places',
            description: 'Explore the main attractions',
            type: 'attractions'
          }
        ]
      })
    };
  }
};