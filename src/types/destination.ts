export interface Destination {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  userQuery?: string;
  directAnswer?: string;
  sections: Section[];
  practicalInfo: PracticalInfo;
  recommendations: Recommendation[];
}

export interface Section {
  title: string;
  content: string;
  image: string;
  highlights: string[];
}

export interface PracticalInfo {
  bestTimeToVisit: string;
  climate: string;
  currency: string;
  language: string;
}

export interface Recommendation {
  title: string;
  description: string;
  type: string;
}

export interface FeaturedDestination {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}