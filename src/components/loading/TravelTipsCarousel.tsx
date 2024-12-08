import React, { useState, useEffect } from 'react';
import { TravelTip } from './TravelTip';
import { travelTips } from '../../data/tips';

export function TravelTipsCarousel() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTipIndex((prev) => (prev + 1) % travelTips.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTip = travelTips[currentTipIndex];

  return (
    <div className="relative overflow-hidden w-full max-w-xl mx-auto">
      <div
        className={`transform transition-all duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <TravelTip tip={currentTip.tip} author={currentTip.author} />
      </div>
    </div>
  );
}