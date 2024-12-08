import React, { Suspense } from 'react';
import { SearchHero } from '../components/search/SearchHero';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const FeaturedDestinations = React.lazy(() => 
  import('../components/destinations/FeaturedDestinations').then(mod => ({
    default: mod.FeaturedDestinations
  }))
);

function HomePage() {
  return (
    <>
      <SearchHero />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedDestinations />
      </Suspense>
    </>
  );
}

export default HomePage;