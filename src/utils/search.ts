import OpenAI from 'openai';
import type { Destination } from '../types/destination';
import { getDestinationImage, getActivityImage } from './images';

// Cache implementation
const searchCache = new Map<string, { data: Destination; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a travel assistant. Generate a detailed travel guide in JSON format.
For each query, first provide a direct answer to the user's specific question, then follow with general information.

When answering follow-up questions:
- ALWAYS provide a direct, specific answer to the user's question first
- Focus ONLY on the destination mentioned in the context
- Base your answer on the provided context
- Do not include information about other destinations
- Keep answers factual and relevant to the specific location

For initial destination queries, ALWAYS include these sections:
1. 🏛️ Historical Sites & Landmarks
2. 🍽️ Food & Dining
3. 🎭 Culture & Entertainment
4. 🌳 Nature & Outdoors
5. 🛍️ Shopping & Markets
6. 🎨 Arts & Museums
7. 🌆 Neighborhoods to Explore
8. 🎉 Local Events & Festivals

Format guidelines:
- Each section should have a descriptive title with a relevant emoji prefix
- Each highlight should start with a contextual emoji
- Use emojis that match the content:
  🏰 for historical sites and castles
  🍝 for food and restaurants
  ⛪ for churches and religious sites
  🏺 for museums and artifacts
  🌊 for beaches and water activities
  🎭 for cultural events
  🌳 for parks and nature
  🛍️ for shopping
  🎪 for entertainment

Return the response in the following structure:
{
  "id": "string",
  "name": "string",
  "title": "string",
  "subtitle": "string",
  "image": "string",
  "description": "string",
  "userQuery": "string (the original user's question)",
  "directAnswer": "string (clear and specific answer to the user's question)",
  "sections": [
    {
      "title": "string (format: '🏰 Historical Sites' - always include an emoji)",
      "content": "string",
      "image": "string",
      "highlights": ["string (format: '🏰 Visit the medieval castle' - always include an emoji)"]
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
      "title": "string (include an emoji prefix)",
      "description": "string",
      "type": "string"
    }
  ]
}`;

export async function getSearchResults(query: string): Promise<Destination> {
  // Remove any emojis from the query
  const cleanQuery = query.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, '').trim();

  // Check if this is a follow-up question
  const isFollowUp = cleanQuery.startsWith('Question about');
  const destinationMatch = isFollowUp ? cleanQuery.match(/Question about (.*?):/) : null;
  const destinationName = destinationMatch ? destinationMatch[1] : '';

  // Check cache first
  const cached = searchCache.get(cleanQuery);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: isFollowUp
            ? `The user has a follow-up question about ${destinationName}:
${cleanQuery.split(':')[1].trim()}

Please provide:
1. A direct answer to this specific question about ${destinationName}
2. Only information relevant to ${destinationName}
3. Practical details that help answer the question`
            : `Generate a comprehensive travel guide for: ${cleanQuery}. Include detailed information about historical sites, food, culture, nature, shopping, arts, neighborhoods, and local events.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const baseResult = JSON.parse(completion.choices[0].message.content || '{}');

    // Add the user's query to the response
    baseResult.userQuery = cleanQuery;

    // For follow-up questions, ensure the name matches the destination being discussed
    if (isFollowUp && destinationName) {
      baseResult.name = destinationName;
      baseResult.title = `Exploring ${destinationName}`;
    }

    // Get clean name for image searches
    const nameForImages = baseResult.name.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, '').trim();

    // Fetch main destination image using the location name for better relevance
    const mainImage = await getDestinationImage(`${nameForImages} landmark`);

    // Fetch images for each section using both the section title and location for context
    const sectionsWithImages = await Promise.all(
      baseResult.sections.map(async (section: any) => ({
        ...section,
        image: await getActivityImage(`${nameForImages} ${section.title}`)
      }))
    );

    const result = {
      ...baseResult,
      image: mainImage,
      sections: sectionsWithImages
    };

    // Cache the results
    searchCache.set(cleanQuery, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Error fetching search results:', error);
    // Return a graceful fallback
    return {
      id: 'error',
      name: cleanQuery,
      title: `Exploring ${cleanQuery}`,
      subtitle: 'A captivating destination waiting to be discovered',
      image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Discover this amazing destination',
      sections: [
        {
          title: '🌟 Overview',
          content: 'Information temporarily unavailable. Please try again later.',
          image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          highlights: [
            '🏛️ Rich cultural heritage and historical sites',
            '🌅 Beautiful landscapes and scenic views',
            '🍴 Delicious local cuisine and food experiences',
            '🎭 Vibrant cultural events and festivals',
            '🌳 Natural attractions and outdoor activities'
          ]
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
          title: '🌟 Must-Visit Places',
          description: 'Explore the main attractions',
          type: 'attractions'
        },
        {
          title: '🍽️ Local Dining',
          description: 'Experience authentic cuisine',
          type: 'food'
        },
        {
          title: '🎨 Cultural Experiences',
          description: 'Immerse in local traditions',
          type: 'culture'
        }
      ]
    };
  }
}