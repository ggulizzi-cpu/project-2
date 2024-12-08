import { 
  Camera, 
  Utensils, 
  Hotel, 
  MapPin, 
  Compass,
  Music,
  Coffee,
  Wine,
  ShoppingBag,
  Ticket
} from 'lucide-react';

export function getIconForRecommendationType(type: string) {
  const iconMap: Record<string, any> = {
    attraction: Camera,
    restaurant: Utensils,
    hotel: Hotel,
    location: MapPin,
    activity: Compass,
    entertainment: Music,
    cafe: Coffee,
    bar: Wine,
    shopping: ShoppingBag,
    event: Ticket,
    // Default to Camera if type is not found
    default: Camera
  };

  return iconMap[type.toLowerCase()] || iconMap.default;
}