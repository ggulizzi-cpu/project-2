import React, { useState } from 'react';
import { 
  Calendar, 
  Thermometer, 
  Coins, 
  Languages,
  Info,
  Star,
  Search,
  Loader2
} from 'lucide-react';
import { Image } from '../ui/Image';
import { getIconForRecommendationType } from '../../utils/icons';
import { RelatedQueries } from './RelatedQueries';
import { getSearchResults } from '../../utils/search';
import type { Destination } from '../../types/destination';

interface SearchResultContentProps {
  content: Destination;
  isLoading: boolean;
}

export function SearchResultContent({ content, isLoading }: SearchResultContentProps) {
  const [query, setQuery] = useState('');
  const [followUpResults, setFollowUpResults] = useState<Destination | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      try {
        // Create context from current content
        const contextQuery = `Question about ${content.name}: ${query.trim()}
Context: This question is specifically about ${content.name}. 
Current destination details:
- Location: ${content.name}
- Description: ${content.description}
- Current information known: ${content.sections.map(s => s.title).join(', ')}`;

        const results = await getSearchResults(contextQuery);
        setFollowUpResults(results);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setIsSearching(false);
        setQuery('');
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <Image
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                {content.title}
              </h1>
              <p className="text-xl text-gray-200">{content.subtitle}</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about this destination..."
                  className="w-full px-6 py-4 pr-16 text-lg rounded-full bg-white/90 
                           backdrop-blur-sm text-gray-900 placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           shadow-lg"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 
                           bg-blue-600 text-white rounded-full hover:bg-blue-700 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:ring-offset-2 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Search className="h-6 w-6" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Follow-up Results */}
            {isSearching ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Finding relevant information...</p>
              </div>
            ) : followUpResults && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden animate-slide-in">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{followUpResults.title}</h2>
                  <p className="text-gray-600 mb-6">{followUpResults.subtitle}</p>
                  {followUpResults.sections?.map((section, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                      <p className="text-gray-700 mb-4">{section.content}</p>
                      <ul className="space-y-2">
                        {section.highlights.map((highlight, i) => (
                          <li key={i} className="text-gray-600">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Original Search Results */}
            {content.userQuery && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">You Searched</h3>
                    <p className="text-lg font-semibold text-gray-900">{content.userQuery}</p>
                  </div>
                  {content.directAnswer && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Answer</h3>
                      <p className="text-gray-900">{content.directAnswer}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Content Sections */}
            {content.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <p className="text-gray-700 mb-6">{section.content}</p>
                  <ul className="space-y-2">
                    {section.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Practical Information */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-600" />
                  Practical Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Best Time to Visit</p>
                      <p className="text-gray-600">{content.practicalInfo.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Thermometer className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Climate</p>
                      <p className="text-gray-600">{content.practicalInfo.climate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Coins className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Currency</p>
                      <p className="text-gray-600">{content.practicalInfo.currency}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Languages className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Language</p>
                      <p className="text-gray-600">{content.practicalInfo.language}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-600" />
                  Top Recommendations
                </h3>
                <div className="space-y-4">
                  {content.recommendations.map((rec, index) => {
                    const Icon = getIconForRecommendationType(rec.type);
                    return (
                      <div key={index} className="flex items-start">
                        <Icon className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-medium text-gray-700">{rec.title}</p>
                          <p className="text-gray-600">{rec.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Queries Section */}
      <RelatedQueries baseQuery={content.title} />
    </div>
  );
}