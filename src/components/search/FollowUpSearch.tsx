import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function FollowUpSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Have another question?
        </h2>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about this destination..."
            className="w-full px-6 py-4 pr-16 text-lg rounded-lg bg-white 
                     text-gray-900 placeholder-gray-500 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 shadow-md"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 
                     bg-blue-600 text-white rounded-full hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}