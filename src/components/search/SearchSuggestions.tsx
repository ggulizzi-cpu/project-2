import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  visible: boolean;
  isLoading: boolean;
}

export function SearchSuggestions({ suggestions, onSelect, visible, isLoading }: SearchSuggestionsProps) {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg 
                    border border-gray-100 overflow-hidden z-50">
      <ul className="max-h-64 overflow-y-auto">
        {isLoading ? (
          <li className="px-4 py-3 flex items-center justify-center">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Searching...</span>
          </li>
        ) : suggestions.length === 0 ? (
          <li className="px-4 py-3 text-gray-500 text-center">
            No suggestions found
          </li>
        ) : (
          suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                onClick={() => onSelect(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center
                         space-x-2 transition-colors"
              >
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700">{suggestion}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}