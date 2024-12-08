import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a helpful travel assistant providing search suggestions.
Provide up to 10 relevant suggestions based on the following rules:

For partial queries (e.g., "New", "San"):
- Return only matching destination names in "City, Country" format

For specific destinations (e.g., "New York", "Paris, France"):
1. Include the exact destination as the first result
2. Then provide a mix of:
   - Famous landmarks (e.g., "Empire State Building")
   - Popular activities (e.g., "Central Park Walking Tour")
   - Notable neighborhoods (e.g., "Brooklyn Heights")
   - Cultural experiences (e.g., "Broadway Shows")
   - Nearby day trips if applicable

Return ONLY an array of strings without numbering or bullets.
Example for "New York":
["New York City, USA", "Times Square", "Central Park", "Empire State Building", "Brooklyn Bridge", "Metropolitan Museum of Art", "Broadway Shows", "Statue of Liberty", "High Line", "Fifth Avenue Shopping"]`;

export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];

  const isSpecificDestination = query.length > 3 && (query.includes(',') || query.includes(' '));

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: isSpecificDestination 
            ? `Provide specific suggestions for: ${query}`
            : `Suggest destinations matching: ${query}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const content = completion.choices[0].message.content;
    if (!content) return [];

    try {
      // Parse the response and ensure it's an array of strings
      const suggestions = JSON.parse(content);
      if (!Array.isArray(suggestions)) return [];

      return suggestions
        .slice(0, 10)
        .map(suggestion => {
          suggestion = suggestion.trim();
          // Check if it's a destination (contains comma) or an activity
          if (suggestion.includes(',')) {
            return `🌎 ${suggestion}`;
          } else {
            return `🎯 ${suggestion}`;
          }
        })
        .map(suggestion => suggestion.replace(/^\d+\.\s*/, ''));
    } catch (e) {
      // If JSON parsing fails, try to split the content by newlines
      const suggestions = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          const cleanLine = line.replace(/^\d+\.\s*/, '');
          if (cleanLine.includes(',')) {
            return `🌎 ${cleanLine}`;
          } else {
            return `🎯 ${cleanLine}`;
          }
        })
        .slice(0, 10);
      return suggestions;
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
}