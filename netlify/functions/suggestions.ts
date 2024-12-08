import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a travel assistant helping users with search suggestions.
For each query, generate 5 relevant travel suggestions.
For locations, always include the country name.
Format destinations as "🌎 City, Country" and activities as "🎯 Activity".
Return a JSON object with a "suggestions" array containing exactly 5 strings.`;

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
        { role: "user", content: `Generate travel suggestions for: ${query}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 200
    });

    return {
      statusCode: 200,
      headers,
      body: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        suggestions: [
          `🌎 ${query} City Guide`,
          `🎯 Best Places in ${query}`,
          `🎯 ${query} Local Food`,
          `🎯 ${query} Cultural Sites`,
          `🎯 ${query} Hidden Gems`
        ]
      })
    };
  }
};