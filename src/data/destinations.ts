import type { Destination } from '../types/destination';

export const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris, France',
    title: 'Paris: City of Light and Romance',
    subtitle: 'Discover the magic of France\'s iconic capital',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=75',
    description: 'Experience the perfect blend of history, culture, and modern life',
    sections: [
      {
        title: 'Cultural Heritage',
        content: 'Paris is home to some of the world\'s most famous museums and monuments.',
        image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1920&q=75',
        highlights: [
          'Visit the iconic Louvre Museum',
          'Explore Musée d\'Orsay',
          'Discover Notre-Dame Cathedral'
        ]
      },
      {
        title: 'Culinary Excellence',
        content: 'Experience world-renowned French cuisine and wine.',
        image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=1920&q=75',
        highlights: [
          'Traditional French bistros',
          'Michelin-starred restaurants',
          'Local food markets'
        ]
      }
    ],
    practicalInfo: {
      bestTimeToVisit: 'Spring (April-June) or Fall (September-November)',
      climate: 'Temperate with mild summers and cool winters',
      currency: 'Euro (€)',
      language: 'French'
    },
    recommendations: [
      {
        title: 'Eiffel Tower',
        description: 'Visit at sunset for breathtaking views',
        type: 'attraction'
      },
      {
        title: 'Le Marais',
        description: 'Historic district with boutiques and cafes',
        type: 'location'
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    title: 'Tokyo: Where Tradition Meets Innovation',
    subtitle: 'Experience Japan\'s dynamic capital city',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=75',
    description: 'A fascinating blend of ultramodern and traditional',
    sections: [
      {
        title: 'Modern Marvels',
        content: 'Experience cutting-edge technology and architecture.',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=75',
        highlights: [
          'Shibuya Crossing',
          'Akihabara Electronics',
          'Tokyo Skytree'
        ]
      },
      {
        title: 'Traditional Japan',
        content: 'Discover ancient temples and traditional gardens.',
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=75',
        highlights: [
          'Senso-ji Temple',
          'Meiji Shrine',
          'Imperial Palace'
        ]
      }
    ],
    practicalInfo: {
      bestTimeToVisit: 'Spring (March-May) or Fall (September-November)',
      climate: 'Four distinct seasons with humid summers',
      currency: 'Japanese Yen (¥)',
      language: 'Japanese'
    },
    recommendations: [
      {
        title: 'Tsukiji Outer Market',
        description: 'Famous for fresh seafood and street food',
        type: 'food'
      },
      {
        title: 'Shinjuku Gyoen',
        description: 'Beautiful park perfect for cherry blossom viewing',
        type: 'nature'
      }
    ]
  }
];