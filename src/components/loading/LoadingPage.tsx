import React, { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';
import { TravelTipsCarousel } from './TravelTipsCarousel';

export function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast initial progress up to 60%
    const fastProgress = setInterval(() => {
      setProgress(prev => {
        if (prev >= 60) {
          clearInterval(fastProgress);
          return prev;
        }
        return prev + 5;
      });
    }, 100);

    // Slower progress from 60% to 90%
    setTimeout(() => {
      const slowProgress = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(slowProgress);
            return prev;
          }
          return prev + 1;
        });
      }, 500);

      return () => clearInterval(slowProgress);
    }, 2000);

    // Very slow progress from 90% to 99%
    setTimeout(() => {
      const finalProgress = setInterval(() => {
        setProgress(prev => {
          if (prev >= 99) {
            clearInterval(finalProgress);
            return prev;
          }
          return prev + 0.2;
        });
      }, 1000);

      return () => clearInterval(finalProgress);
    }, 6000);

    return () => clearInterval(fastProgress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-12">
        {/* Animated Plane */}
        <div className="relative inline-block">
          <Plane className="h-16 w-16 text-white animate-pulse" />
          <div className="absolute inset-0 animate-ping opacity-75">
            <Plane className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Planning Your Perfect Trip
          </h2>
          <p className="text-xl text-gray-200">
            Gathering insights and recommendations just for you...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-gray-200">{Math.round(progress)}%</p>
        </div>

        {/* Travel Tips Carousel */}
        <div className="mt-12">
          <TravelTipsCarousel />
        </div>
      </div>
    </div>
  );
}