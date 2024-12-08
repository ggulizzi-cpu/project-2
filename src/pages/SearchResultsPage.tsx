import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from '../utils/search';
import { SearchResultContent } from '../components/search/SearchResultContent';
import { Plane, MapPin, Loader2 } from 'lucide-react';
import type { Destination } from '../types/destination';

function LoadingTransition({ query }: { query: string }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        {/* Animated Plane */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
          <Plane className="w-12 h-12 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
        </div>

        {/* Location Pin and Query */}
        <div className="flex items-center justify-center space-x-2 text-2xl font-medium text-gray-800">
          <MapPin className="w-6 h-6 text-blue-600" />
          <span>{query}</span>
        </div>

        {/* Loading Message */}
        <div className="text-lg text-gray-600 animate-fade-in">
          <p className="mb-2">Discovering amazing places{dots}</p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-sm text-gray-500">Crafting your personalized travel guide</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full mx-auto mt-8 overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
}

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Destination | null>(null);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    async function fetchResults() {
      if (query) {
        setIsLoading(true);
        setIsInitialLoading(true);
        try {
          // Show transition page for at least 2 seconds
          const loadingPromise = new Promise(resolve => setTimeout(resolve, 2000));
          const resultsPromise = getSearchResults(query);

          const [results] = await Promise.all([resultsPromise, loadingPromise]);
          setSearchResults(results);
        } catch (error) {
          console.error('Error fetching results:', error);
        } finally {
          setIsInitialLoading(false);
          setIsLoading(false);
        }
      }
    }

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-gray-600">No search query provided.</p>
      </div>
    );
  }

  if (isInitialLoading) {
    return <LoadingTransition query={query} />;
  }

  if (!searchResults && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-red-600">Failed to load search results. Please try again.</p>
      </div>
    );
  }

  return <SearchResultContent content={searchResults as Destination} isLoading={isLoading} />;
}

export default SearchResultsPage;