import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getSearchSuggestions } from '../../utils/suggestions';

interface RelatedQueriesProps {
  baseQuery: string;
}

export function RelatedQueries({ baseQuery }: RelatedQueriesProps) {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const results = await getSearchSuggestions(baseQuery);
        const paddedResults = results.length < 9 
          ? [...results, ...Array(9 - results.length).fill('')].filter(Boolean)
          : results.slice(0, 9);
        setSuggestions(paddedResults);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();
  }, [baseQuery]);

  const handleQueryClick = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Explore More
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleQueryClick(suggestion)}
              className="flex items-center justify-between p-6 bg-gray-50 
                       rounded-lg hover:bg-gray-100 transition-colors 
                       group text-left"
            >
              <span className="text-gray-900 font-medium">{suggestion}</span>
              <ArrowRight className="h-5 w-5 text-gray-400 
                                   group-hover:text-blue-600 
                                   transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}