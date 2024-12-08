import React, { memo } from 'react';
import { Image } from '../ui/Image';

interface DestinationCardProps {
  name: string;
  image: string;
  description: string;
  price: string;
}

function DestinationCardComponent({ name, image, description, price }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={`${image}?auto=format&fit=crop&w=800&q=75`}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-4 text-lg font-medium text-blue-600">{price}</p>
      </div>
    </div>
  );
}

export const DestinationCard = memo(DestinationCardComponent);