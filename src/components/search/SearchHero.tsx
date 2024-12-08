import React, { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Image } from '../ui/Image';
import { getRandomTravelImage } from '../../utils/images';
import { getSearchSuggestions } from '../../utils/suggestions';
import { SearchSuggestions } from './SearchSuggestions';
import { useDebounce } from '../../hooks/useDebounce';

function SearchHeroComponent() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const debouncedQuery = useDebounce(query, 150);

  useEffect(() => {
    let isMounted = true;

    async function loadBackgroundImage() {
      setIsImageLoading(true);
      try {
        const imageUrl = await getRandomTravelImage();
        if (isMounted) {
          setBackgroundImage(imageUrl);
        }
      } catch (error) {
        console.error('Error loading background image:', error);
      } finally {
        if (isMounted) {
          setIsImageLoading(false);
        }
      }
    }

    loadBackgroundImage();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function fetchSuggestions() {
      if (debouncedQuery.trim().length >= 2) {
        setIsLoading(true);
        try {
          const results = await getSearchSuggestions(debouncedQuery);
          if (!isCancelled) {
            setSuggestions(results);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          if (!isCancelled) {
            setSuggestions([]);
          }
        } finally {
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }

    fetchSuggestions();

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim().length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative h-[600px]">
      <div className="absolute inset-0 w-full h-full">
        {isImageLoading ? (
          <div className="w-full h-full bg-gradient-to-b from-blue-900 to-blue-700 animate-pulse" />
        ) : backgroundImage ? (
          <Image
            className="w-full h-full object-cover transition-opacity duration-500"
            src={backgroundImage}
            alt="Travel background"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-blue-900 to-blue-700" />
        )}
        <div className="absolute inset-0 w-full h-full bg-black/50" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-200">
            Let AI guide you to the perfect destination
          </p>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
              placeholder="Try 'Hidden gems in Bali' or 'Historical landmarks in Rome'"
              className="w-full px-6 py-4 pr-16 text-lg rounded-full bg-white/90 
                       backdrop-blur-sm text-gray-900 placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              autoComplete="off"
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
          </div>

          <SearchSuggestions
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
            visible={showSuggestions}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export const SearchHero = memo(SearchHeroComponent);