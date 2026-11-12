import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { database } from '../data/database';
import { BakeryEntity } from '../types/database.types';

interface BakeryContextType {
  currentBakery: BakeryEntity;
  isHub: boolean;
  activeSlug: string;
  allBakeries: BakeryEntity[];
  navigateToBakery: (slug: string) => void;
  navigateToHub: () => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const allBakeriesList = useMemo(() => Object.values(database.bakeries), []);

  const parseRoute = () => {
    if (typeof window === 'undefined') {
      return { isHub: true, slug: database.default_bakery_slug };
    }
    const path = window.location.pathname.replace(/\/$/, '');

    if (path === '' || path === '/' || path === '/bakery-lp') {
      return { isHub: true, slug: database.default_bakery_slug };
    }

    if (path.startsWith('/bakery-lp/')) {
      const slug = path.replace('/bakery-lp/', '');
      if (database.bakeries[slug]) {
        return { isHub: false, slug };
      }
    }

    const directSlug = path.replace(/^\//, '');
    if (database.bakeries[directSlug]) {
      return { isHub: false, slug: directSlug };
    }

    return { isHub: true, slug: database.default_bakery_slug };
  };

  const [routeState, setRouteState] = useState(parseRoute);

  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parseRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentBakery = useMemo(() => {
    return database.bakeries[routeState.slug] || database.bakeries[database.default_bakery_slug];
  }, [routeState.slug]);

  const navigateToBakery = (slug: string) => {
    if (!database.bakeries[slug]) return;
    const newPath = `/bakery-lp/${slug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    setRouteState({ isHub: false, slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHub = () => {
    const newPath = '/bakery-lp';
    if (typeof window !== 'undefined' && window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    setRouteState({ isHub: true, slug: database.default_bakery_slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BakeryContext.Provider
      value={{
        currentBakery,
        isHub: routeState.isHub,
        activeSlug: currentBakery.slug,
        allBakeries: allBakeriesList,
        navigateToBakery,
        navigateToHub,
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = (): BakeryContextType => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
