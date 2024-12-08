// Shared constants to avoid duplication
export const NAV_ITEMS = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#itineraries', label: 'Itineraries' },
  { href: '#chat', label: 'AI Assistant' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SOCIAL_LINKS = [
  { href: '#', label: 'Facebook' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'YouTube' },
] as const;

export const CONTACT_INFO = [
  { text: 'contact@aitravel.com' },
  { text: '+1 (555) 123-4567' },
  { text: 'New York, NY 10001' },
] as const;