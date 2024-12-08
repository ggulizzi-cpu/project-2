// Cache for image results
const imageCache = new Map<string, { urls: string[]; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

const PEXELS_API_KEY = 'Duy0Ezp5LkDrOcSE2UrE31KYb8wnVrIu5GR1yr8WKryf174UnrR4zpwi';
const PEXELS_API_URL = 'https://api.pexels.com/v1';

interface PexelsPhoto {
  src: {
    large2x: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}

async function fetchFromPexels(endpoint: string, params: Record<string, string>): Promise<PexelsResponse> {
  const queryString = new URLSearchParams(params).toString();
  const url = `${PEXELS_API_URL}${endpoint}?${queryString}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': PEXELS_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Pexels API');
  }

  return response.json();
}

export async function getDestinationImage(query: string): Promise<string> {
  try {
    // Check cache first
    const cached = imageCache.get(query);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.urls[Math.floor(Math.random() * cached.urls.length)];
    }

    const response = await fetchFromPexels('/search', {
      query: `${query} travel destination landscape`,
      orientation: 'landscape',
      size: 'large',
      per_page: '5'
    });

    if (response.photos.length > 0) {
      const urls = response.photos.map(photo => photo.src.large2x);
      
      // Cache the results
      imageCache.set(query, {
        urls,
        timestamp: Date.now()
      });

      return urls[Math.floor(Math.random() * urls.length)];
    }

    return getDefaultImage();
  } catch (error) {
    console.error('Error fetching image from Pexels:', error);
    return getDefaultImage();
  }
}

export async function getRandomTravelImage(): Promise<string> {
  try {
    const response = await fetchFromPexels('/curated', {
      per_page: '1'
    });

    if (response.photos.length > 0) {
      return response.photos[0].src.large2x;
    }

    return getDefaultImage();
  } catch (error) {
    console.error('Error fetching curated image from Pexels:', error);
    return getDefaultImage();
  }
}

export async function getActivityImage(activity: string): Promise<string> {
  try {
    const response = await fetchFromPexels('/search', {
      query: `${activity} travel activity`,
      orientation: 'landscape',
      size: 'large',
      per_page: '1'
    });

    if (response.photos.length > 0) {
      return response.photos[0].src.large2x;
    }

    return getDefaultImage();
  } catch (error) {
    console.error('Error fetching activity image from Pexels:', error);
    return getDefaultImage();
  }
}

function getDefaultImage(): string {
  // A beautiful default travel image from Pexels
  return 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
}