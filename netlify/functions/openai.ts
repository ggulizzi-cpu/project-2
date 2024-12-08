import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are an AI travel assistant. Generate detailed, structured travel information based on user queries.
Focus on providing accurate, practical information that travelers need most.
Return the response as a JSON object with the following structure:
{
  "title": "string",
  "subtitle": "string",
  "sections": [
    {
      "title": "string",
      "content": "string",
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

    const { messages } = JSON.parse(event.body || '{}');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
        { role: "system", content: "Return the response in JSON format." }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        content: completion.choices[0].message.content
      })
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        content: JSON.stringify({
          title: "Travel Information",
          subtitle: "Exploring Amazing Destinations",
          sections: [
            {
              title: "Overview",
              content: "This destination offers a unique blend of experiences.",
              highlights: ["Rich culture", "Beautiful landscapes", "Local cuisine"]
            }
          ],
          practicalInfo: {
            bestTimeToVisit: "Spring and Fall",
            climate: "Moderate",
            currency: "Local currency",
            language: "Local language"
          },
          recommendations: [
            {
              title: "Must-Visit Places",
              description: "Explore the main attractions",
              type: "attractions"
            }
          ]
        })
      })
    };
  }
};