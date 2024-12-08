import OpenAI from 'openai';
import type { Destination } from '../types/destination';
import { destinations } from '../data/destinations';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key is not configured. Using fallback data.');
}

const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key',
  dangerouslyAllowBrowser: true
});

export async function generateDestinationInfo(query: string): Promise<Destination> {
  if (!apiKey) {
    // Return static data if no API key is available
    return destinations.find(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase())
    ) || destinations[0];
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a travel assistant. Generate a detailed travel guide in JSON format." 
        },
        { 
          role: "user", 
          content: `Generate a JSON response with travel information for: ${query}` 
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = JSON.parse(completion.choices[0].message.content);
    return content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Fallback to static data if API fails
    return destinations.find(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase())
    ) || destinations[0];
  }
}