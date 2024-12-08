import React, { memo } from 'react';
import { DestinationCard } from './DestinationCard';
import { featuredDestinations } from '../../data/featured';

function FeaturedDestinationsComponent() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              name={destination.name}
              image={destination.image}
              description={destination.description}
              price={destination.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const FeaturedDestinations = memo(FeaturedDestinationsComponent);