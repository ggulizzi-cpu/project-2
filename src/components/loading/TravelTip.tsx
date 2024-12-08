import React from 'react';
import { Lightbulb } from 'lucide-react';

interface TravelTipProps {
  tip: string;
  author?: string;
}

export function TravelTip({ tip, author }: TravelTipProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-xl mx-auto">
      <div className="flex items-start space-x-4">
        <Lightbulb className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <p className="text-white text-lg">{tip}</p>
          {author && (
            <p className="text-gray-300 mt-2 text-sm italic">- {author}</p>
          )}
        </div>
      </div>
    </div>
  );
}